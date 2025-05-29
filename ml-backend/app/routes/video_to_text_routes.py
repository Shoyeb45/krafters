# type: ignore
from fastapi import APIRouter, UploadFile, File, HTTPException, status, Query
from pathlib import Path
from app.utils.processor import FileProcessor, YouTubeProcessor
from app.models.schemas import VideoRequest
from app.config.video_to_text_config import settings 
import logging

logger = logging.getLogger(__name__)
router = APIRouter()



@router.get(
    "/video_to_text",
    summary="It will give transcription of the video from youtube url"
)
async def video_to_text_using_url(
    url: str = Query(..., description="Word to define")
):
    try:
        processor = YouTubeProcessor()
        # file_processor = FileProcessor()
        
        transcript = processor.process_youtube(url)
        
        return {
            "transcript": transcript,
            "ok": True
        }
    except Exception as e:
        logger.error(f"Error occurred while generating transcript from youtube URL\n{str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error occurred while generating transcript from youtube URL\n{str(e)}"
        )
    

# @router.post(
#     "/video_to_text",
#     summary="It will give transcription of the video",
# )
# async def video_to_text(file: UploadFile = File(...)):
#     '''
#     Function which will handle the conversion of video to text
#     '''
#     try:
#         file_path = settings.INPUT_DIR / file.filename
#         with open(file_path, "wb") as f:
#             f.write(await file.read())

#         processor = FileProcessor()
#         transcription = processor.transcribe(file_path)

#         output_path = settings.OUTPUT_DIR / f"{file.filename}.txt"
#         output_path.write_text(transcription, encoding="utf-8")  # ✅ Fix

#         return {
#             "transcription": transcription,
#             "ok": True
#         }
#     except Exception as e:
#         logger.error(f"Error while getting text from video: \n{e}")
#         return {
#             "error": str(e),
#             "ok": False
#         }
