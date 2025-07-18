"""
EchoScribe AI Services
FastAPI application for AI-powered meeting analysis
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging
import os
from datetime import datetime

from app.routers import analysis, transcription
from app.utils.config import get_settings, validate_required_settings, validate_environment, get_environment_info
from app.utils.logger import setup_logging

# Setup logging
setup_logging()
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    logger.info("Starting EchoScribe AI Services")
    
    # Startup - validate environment
    try:
        validation_result = validate_environment()
        if not validation_result.success:
            logger.error("Environment validation failed during startup")
            logger.error(f"Errors: {validation_result.errors}")
            logger.error(f"Missing required: {validation_result.missing_required}")
            # Don't exit in production, but log the issues
            if os.getenv("ENVIRONMENT", "development") == "development":
                raise ValueError("Environment validation failed")
        
        settings = validate_required_settings()
        logger.info(f"Environment: {settings.environment}")
        
        # Log environment information
        env_info = get_environment_info()
        logger.info(f"Environment configuration: {env_info}")
        
    except Exception as e:
        logger.error(f"Startup validation failed: {str(e)}")
        if os.getenv("ENVIRONMENT", "development") == "development":
            raise
    
    yield
    
    # Shutdown
    logger.info("Shutting down EchoScribe AI Services")

# Create FastAPI app
app = FastAPI(
    title="EchoScribe AI Services",
    description="AI-powered meeting analysis and transcription services",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
settings = get_settings()
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=settings.cors_credentials,
    allow_methods=settings.cors_methods.split(','),
    allow_headers=settings.cors_headers.split(','),
)

# Include routers
app.include_router(analysis.router, prefix="/api/analysis", tags=["analysis"])
app.include_router(transcription.router, prefix="/api/transcription", tags=["transcription"])

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "EchoScribe AI Services",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        settings = get_settings()
        
        # Check if required environment variables are set
        health_status = {
            "status": "healthy",
            "timestamp": datetime.utcnow().isoformat(),
            "version": "1.0.0",
            "environment": settings.environment,
            "services": {
                "openai": bool(settings.openai_api_key),
                "huggingface": bool(settings.huggingface_api_key)
            }
        }
        
        return health_status
        
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        raise HTTPException(status_code=503, detail="Service unhealthy")

if __name__ == "__main__":
    import uvicorn
    
    # Get port from environment or default to 8001
    port = int(os.getenv("PORT", 8001))
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=True,
        log_level="info"
    )