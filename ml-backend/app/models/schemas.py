# type: ignore
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class TextRequest(BaseModel):
    """Request model for text processing"""
    text: str = Field(..., min_length=1, description="Text to be processed")

class TextResponse(BaseModel):
    """Response model for text processing"""
    isl_structure: str = Field(..., description="Processed ISL structure")
    original_text: str = Field(..., description="Original input text")
    message: str = Field(..., description="Processing status message")
    error: bool = Field(..., description="Whether an error occurred")

class HealthResponse(BaseModel):
    """Response model for health check"""
    status: str = Field(..., description="Service status")
    message: str = Field(..., description="Status message")

class HistoryEntry(BaseModel):
    """Model for history entry"""
    id: Optional[str] = Field(None, description="Entry ID")
    original_text: str = Field(..., description="Original text")
    isl_structure: str = Field(..., description="ISL structure")
    created_at: datetime = Field(default_factory=datetime.now, description="Creation timestamp")

class ErrorResponse(BaseModel):
    """Error response model"""
    message: str = Field(..., description="Error message")
    error: bool = Field(True, description="Error flag")
    detail: Optional[str] = Field(None, description="Error details") 
    
class QuizRequest(BaseModel):
    text: str  # This will be the full document text sent from frontend
   
class ChatRequest(BaseModel):
    text: str
    question: str
    
class VideoRequest(BaseModel):
    url: str