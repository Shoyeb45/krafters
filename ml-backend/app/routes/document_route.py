# type: ignore
import logging
from fastapi import APIRouter, HTTPException, status, UploadFile, File, Query
from fastapi.responses import FileResponse
from app.models.schemas import ErrorResponse, QuizRequest, ChatRequest
import os, re
import shutil
from app.utils.pdf_processor import extract_text_from_pdf, extract_text_with_ocr, summarize_text
from app.utils.chatgpt_chat import chat_with_openAI, format_answer 
logging.getLogger("gtts").setLevel(logging.WARNING)

logger = logging.getLogger(__name__)

router = APIRouter()

UPLOAD_DIR = "public/uploads"
SUMMARY_AUDIO = 'public/audio'
os.makedirs(UPLOAD_DIR, exist_ok=True)  # Create uploads/ if it doesn't exist
os.makedirs(SUMMARY_AUDIO, exist_ok=True)  # Create audio/ if it doesn't exist

@router.post(
    "/summarise_text",
    responses={
        400: {"model": ErrorResponse},
        500: {"model": ErrorResponse}
    },
    summary="Summarise text from the pdf",
    description="Converts English text to Indian Sign Language structure"    
)
async def summarise_text(file: UploadFile = File(...)):
    """
    Upload a PDF file to convert its text to ISL structure.
    
    - **file**: PDF file containing English text
    """
    try:
        save_path = os.path.join(UPLOAD_DIR, file.filename)

        # Save the uploaded file to disk
        with open(save_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        logger.info(f"Saved file to: {save_path}")
        
        # extract text from pdf
        text = extract_text_from_pdf(save_path)
        
        
        if not text.strip():
            logger.info("Trying OCR fallback...")
            text = extract_text_with_ocr(save_path)
            if not text.strip():
                return "❌ No readable text found even after OCR."
        logger.info(text)
        
        systemPrompt = '''
            You are a friendly, patient, and supportive assistant for students with learning differences like ADHD and dyslexia. Your goal is to simplify complex topics in a way that’s fun, easy to read, and clear.

                When responding:
                - Use short, simple sentences.
                - Break things into bullet points or steps.
                - Highlight important ideas in *bold*.
                - Add helpful and fun emojis to each point.
                - Be encouraging and positive — like a helpful friend.
                - Avoid long paragraphs or too much info at once.
                - Explain hard words in simple ways.

                Make the summary easy to follow and not overwhelming.
        '''
        summary = chat_with_openAI(text, systemPrompt)
        logger.info("Calling generate_audio_summary...")
        generate_audio_summary(keep_words_only(summary))
        
        return {
            "summary": summary,
            "text": text,
            "ok": True
        }
      
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in summarise text endpoint: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error occurred while processing text"
        )
        
@router.get("/get_summary_audio")
def get_summary_audio():
    '''
    Function to handle frontend request
    '''
    audio_path = f"{SUMMARY_AUDIO}/summary.mp3"
    if not os.path.exists(audio_path):
        raise HTTPException(status_code=404, detail="Audio not found")
    return FileResponse(audio_path, media_type="audio/mpeg", filename="summary.mp3")
 
@router.post(
    "/generate_quiz",
    summary="Generate a quiz from provided text"   
)
def generate_quiz(request: QuizRequest):
    '''
    Function to generate quiz based on text
    '''
    try:
        prompt = (
            "Create a quiz with 5 multiple choice questions based on the following text. "
            "Each question must have 4 options and specify the correct answer.\n\n"
            f"{request.text}"
        )

        systemPrompt = (
            "You are a quiz generator for educational content. Generate clear, accurate, and well-structured multiple choice quizzes "
            "from the given text."
        )

        response = chat_with_openAI(prompt, systemPrompt)
        response = format_answer(response)
        
        return {
            "quiz": response,
            "ok": True
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Quiz generation failed: {str(e)}"
        )
        
        
def generate_audio_summary(text):
    '''
    Function to generate audio of the text
    '''
    try:
        from gtts import gTTS
        tts = gTTS(text)
        tts.save(f"{SUMMARY_AUDIO}/summary.mp3")
    except Exception as e:
        logger.error("Generating audio summary failed\n", e)
        raise e
    

@router.get(
    "/word_meaning",
    summary="Get meaning of a word in context",
    description="Returns a simple explanation of a word used in a specific text context.",
)
async def word_meaning(
    word: str = Query(..., description="Word to define")
):
    '''
    Function to give word meaning of any word in one line
    '''
    try:
        meaning = chat_with_openAI(f"Can you give the meaning of the word: {word}, in single sentence", "You are a dictionary assistant for students.")
        return {
            "word": word,
            "meaning": meaning,
            "ok": True
        }
    except Exception as e:
        logger.error(f"Error in /word_meaning: {e}")
        raise HTTPException(
            status_code=500,
            detail="Failed to get word meaning from OpenAI"
        )

@router.post(
    "/chat",
    summary="API to ask question related to the document and get answer."
)
async def chat(request: ChatRequest):
    try:
        systemPrompt = f'''
                    "🧠 Let's Think Together!\n"
                    "Please read the text below carefully. Then, answer the question using only the information from the text. "
                    "Take your time — you've got this! 😊\n\n"
                    "👉 Text:\n"
                    "{request.text}\n\n"
                    "✍️ Your Turn!\n"
                    "Based on the text above, what is the answer to the question?"
                '''
        chatResponse = chat_with_openAI(f"Here's my question, answer based on the context \n\nQuestion: {request.question}", systemPrompt)
        return {
            "ok": True,
            "answer": chatResponse
        }
    except Exception as e:
        logger.error("Error while chatting with GPT\n", e)
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )



def keep_words_only(text):
    # Keep only alphabetic words (A-Z or a-z), separated by space
    words = re.findall(r'\b[a-zA-Z]+\b', text)
    return " ".join(words)
