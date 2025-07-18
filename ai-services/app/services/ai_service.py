"""
Base AI service class for common functionality
"""

import logging
from abc import ABC, abstractmethod
from typing import Any, Dict, Optional
import asyncio
import time

from app.utils.config import get_settings

logger = logging.getLogger(__name__)


class AIServiceError(Exception):
    """Custom exception for AI service errors"""
    pass


class BaseAIService(ABC):
    """Base class for AI services"""
    
    def __init__(self):
        self.settings = get_settings()
        self.logger = logging.getLogger(self.__class__.__name__)
    
    async def process_with_retry(
        self, 
        func, 
        *args, 
        max_retries: int = 3, 
        delay: float = 1.0,
        **kwargs
    ) -> Any:
        """
        Process function with retry logic
        """
        last_exception = None
        
        for attempt in range(max_retries):
            try:
                start_time = time.time()
                result = await func(*args, **kwargs)
                processing_time = time.time() - start_time
                
                self.logger.info(f"Processing completed in {processing_time:.2f}s")
                return result
                
            except Exception as e:
                last_exception = e
                self.logger.warning(
                    f"Attempt {attempt + 1}/{max_retries} failed: {str(e)}"
                )
                
                if attempt < max_retries - 1:
                    await asyncio.sleep(delay * (2 ** attempt))  # Exponential backoff
        
        self.logger.error(f"All {max_retries} attempts failed")
        raise AIServiceError(f"Service failed after {max_retries} attempts: {str(last_exception)}")
    
    @abstractmethod
    async def process(self, *args, **kwargs) -> Any:
        """Abstract method for processing"""
        pass
    
    def validate_input(self, text: str, min_length: int = 10) -> bool:
        """Validate input text"""
        if not text or not isinstance(text, str):
            raise ValueError("Text input is required and must be a string")
        
        if len(text.strip()) < min_length:
            raise ValueError(f"Text must be at least {min_length} characters long")
        
        return True