import fitz
from pdf2image import convert_from_path
import pytesseract
import os, requests



def extract_text_from_pdf(filepath):
    '''
    Function to extract text from pdf
    '''
    doc = fitz.open(filepath)
    return "\n".join([page.get_text() for page in doc])

def extract_text_with_ocr(pdf_path):
    '''
    If simple pdf reader fails, then this will read text from everything(like image, document, etc..)
    '''
    try:
        images = convert_from_path(pdf_path)
        text = ""
        for img in images:
            text += pytesseract.image_to_string(img)
        return text
    except Exception as e:
        print("OCR Extraction Error:", e)
        return ""
    
def summarize_text(text: str) -> str: 
    '''
    Function to summarise the text 
    '''
    
    prompt = f"Summarize this educational note into 5-7 key bullet points for people who have dyslexia and ADHD:\n\n{text}"
    return groq_chat(prompt)


def groq_chat(prompt: str) -> str:
    '''
    Function to send the prompt to groq
    '''
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")
    GROQ_MODEL = os.getenv("GROQ_MODEL")
    GROQ_API_URL = os.getenv("GROQ_API_URL")
    
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": GROQ_MODEL,
        "messages": [{"role": "user", "content": prompt}]
    }
    response = requests.post(GROQ_API_URL, headers=headers, json=data)
    res_json = response.json()

    if "choices" not in res_json:
        print("❌ Groq API Error:", res_json)
        return "❌ LLM Error: " + res_json.get("error", {}).get("message", "Unknown issue")

    return res_json["choices"][0]["message"]["content"]    



        