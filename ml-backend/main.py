# main.py
# type: ignore
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse 
import logging
import os
from dotenv import load_dotenv

from app.config.database import init_database
from app.config.nlp_setup import setup_nlp
from app.routes.text_routes import router as text_router
from app.routes.document_route import router as document_router
from app.routes.video_to_text_routes import router as video_to_text_router
from app.middleware.logging_middleware import LoggingMiddleware

# Setup logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)
logging.getLogger("pymongo").setLevel(logging.WARNING)

# Load environment variables
load_dotenv()

# # Initialize FastAPI app
app = FastAPI(
    title="Tech Sangram Backend",
    description="API for converting English text to Indian Sign Language structure",
    version="1.0.0"
)


# Initialize database and NLP models using lifespan events
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan event handler for startup and shutdown"""
    # Startup
    try:
        # init_database()
        setup_nlp()
        logger.info("Application started successfully!")
        yield
    except Exception as e:
        logger.error(f"Failed to initialize application: {e}")
        raise e
    finally:
        # Shutdown (optional cleanup)
        logger.info("Application shutting down...")

# Update FastAPI app initialization
app = FastAPI(
    title="Tech Sangam Backend",
    description="API for converting English text to Indian Sign Language structure",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://pwsaksham.vercel.app/"],  # Configure this for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(LoggingMiddleware)

# Include routers
app.include_router(text_router, prefix="/api", tags=["Text Processing"])
app.include_router(document_router, prefix="/api", tags=["Document Processing"])
print("✅ Including video_to_text_router")
app.include_router(video_to_text_router, prefix="/api", tags=["Video to text Processing"])
print(video_to_text_router.routes)

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "ISL Converter API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)