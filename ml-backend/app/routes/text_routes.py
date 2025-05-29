# type: ignore
from fastapi import APIRouter, HTTPException, status
from app.models.schemas import TextRequest, TextResponse, ErrorResponse
from app.utils.text_processor import process_text_to_isl
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post(
    "/save_text",
    response_model=TextResponse,
    responses={
        400: {"model": ErrorResponse},
        500: {"model": ErrorResponse}
    },
    summary="Process text for ISL conversion",
    description="Converts English text to Indian Sign Language structure"
)
async def save_text(request: TextRequest):
    """
    Process text and convert to ISL structure
    WE need to do this in assap
    - **text**: The English text to be converted to ISL structure
    
    Returns the processed ISL structure along with the original text
    """
    try:
        text = request.text.strip()
        
        if not text:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Empty text provided"
            )
        
        logger.info(f"Processing text request: {text}")
        
        # Process text to ISL structure
        isl_structure = process_text_to_isl(text)
        
        response = TextResponse(
            isl_structure=isl_structure,
            original_text=text,
            message="Text processed successfully",
            error=False
        )
        
        logger.info(f"Successfully processed text: {text} -> {isl_structure}")
        return response
        
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        logger.error(f"Error in save_text endpoint: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error occurred while processing text"
        )

@router.get(
    "/text/health",
    summary="Text processing service health check",
    description="Check if the text processing service is working correctly"
)
async def text_service_health():
    """Health check for text processing service"""
    try:
        # Test processing with a simple text
        test_text = "hello world"
        result = process_text_to_isl(test_text)
        
        return {
            "status": "healthy",
            "message": "Text processing service is working correctly",
            "test_result": result
        }
    except Exception as e:
        logger.error(f"Text service health check failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Text processing service is not available"
        )