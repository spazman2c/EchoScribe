"""
Configuration management for AI services
"""

from pydantic_settings import BaseSettings
from functools import lru_cache
import os
import logging
from typing import Optional, List, Dict, Any
from dataclasses import dataclass


@dataclass
class ValidationResult:
    """Result of environment validation"""
    success: bool
    errors: List[str]
    warnings: List[str]
    missing_required: List[str]
    missing_optional: List[str]


class Settings(BaseSettings):
    """Application settings with comprehensive validation"""
    
    # Environment Configuration
    environment: str = "development"
    debug: bool = True
    
    # API Keys (Required)
    openai_api_key: Optional[str] = None
    huggingface_api_key: Optional[str] = None
    
    # OpenAI Configuration
    openai_model: str = "gpt-4"
    openai_whisper_model: str = "whisper-1"
    openai_max_tokens: int = 2000
    openai_temperature: float = 0.7
    openai_timeout: int = 60
    openai_max_retries: int = 3
    openai_retry_delay: int = 1
    
    # Hugging Face Configuration
    hf_sentiment_model: str = "cardiffnlp/twitter-roberta-base-sentiment-latest"
    hf_cache_dir: str = "./models"
    hf_timeout: int = 30
    hf_max_retries: int = 3
    hf_use_auth_token: bool = True
    
    # Server Configuration
    host: str = "0.0.0.0"
    port: int = 8001
    workers: int = 1
    reload: bool = True
    access_log: bool = True
    
    # CORS Configuration
    cors_origins: str = "http://localhost:3000,http://localhost:5173"
    cors_credentials: bool = True
    cors_methods: str = "GET,POST,PUT,DELETE,OPTIONS"
    cors_headers: str = "Content-Type,Authorization,X-Requested-With"
    
    # Logging Configuration
    log_level: str = "INFO"
    log_format: str = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    log_file: Optional[str] = None
    log_max_size: int = 10485760  # 10MB
    log_backup_count: int = 5
    
    # Performance Configuration
    max_concurrent_requests: int = 10
    request_timeout: int = 300
    memory_limit: int = 2048
    cpu_limit: int = 2
    
    # Model Configuration
    model_cache_size: int = 3
    model_load_timeout: int = 120
    enable_model_preload: bool = False
    cleanup_models_on_shutdown: bool = True
    
    # Audio Processing Configuration
    max_audio_size: str = "50MB"
    supported_audio_formats: str = "mp3,wav,mp4,webm,ogg,flac,m4a"
    audio_sample_rate: int = 16000
    audio_chunk_size: int = 1024
    
    # Analysis Configuration
    sentiment_threshold: float = 0.7
    summary_max_length: int = 500
    summary_min_length: int = 100
    action_item_confidence: float = 0.8
    keyword_extraction_limit: int = 20
    
    # Cache Configuration
    redis_url: Optional[str] = None
    cache_ttl: int = 3600
    cache_prefix: str = "ai_services:"
    enable_result_caching: bool = True
    
    # Monitoring Configuration
    sentry_dsn: Optional[str] = None
    sentry_environment: Optional[str] = None
    enable_metrics: bool = False
    metrics_port: int = 8002
    health_check_interval: int = 30
    
    # Development Configuration
    mock_openai: bool = False
    mock_huggingface: bool = False
    enable_profiling: bool = False
    save_debug_files: bool = False
    debug_output_dir: str = "./debug"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False
        
    @property
    def cors_origins_list(self) -> List[str]:
        """Convert CORS origins string to list"""
        return [origin.strip() for origin in self.cors_origins.split(',')]
    
    @property
    def supported_audio_formats_list(self) -> List[str]:
        """Convert supported audio formats string to list"""
        return [fmt.strip() for fmt in self.supported_audio_formats.split(',')]
    
    @property
    def max_audio_size_bytes(self) -> int:
        """Convert max audio size string to bytes"""
        size_str = self.max_audio_size.upper()
        if size_str.endswith('MB'):
            return int(size_str[:-2]) * 1024 * 1024
        elif size_str.endswith('GB'):
            return int(size_str[:-2]) * 1024 * 1024 * 1024
        else:
            return int(size_str)


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance"""
    return Settings()


def validate_environment() -> ValidationResult:
    """Comprehensive environment validation"""
    settings = get_settings()
    logger = logging.getLogger(__name__)
    
    result = ValidationResult(
        success=True,
        errors=[],
        warnings=[],
        missing_required=[],
        missing_optional=[]
    )
    
    # Required environment variables
    required_vars = {
        'OPENAI_API_KEY': {
            'value': settings.openai_api_key,
            'description': 'OpenAI API key for AI transcription and analysis (get from https://platform.openai.com/api-keys)',
            'validator': lambda x: x and x.startswith('sk-'),
            'error_msg': 'OPENAI_API_KEY must start with "sk-". Get your API key from https://platform.openai.com/api-keys'
        }
    }
    
    # Optional but recommended environment variables
    optional_vars = {
        'HUGGINGFACE_API_KEY': {
            'value': settings.huggingface_api_key,
            'description': 'Hugging Face API key for sentiment analysis features (get from https://huggingface.co/settings/tokens)',
            'validator': lambda x: x and len(x) > 10,
            'error_msg': 'HUGGINGFACE_API_KEY appears to be invalid. Get your API key from https://huggingface.co/settings/tokens'
        },
        'REDIS_URL': {
            'value': settings.redis_url,
            'description': 'Redis URL for caching (improves performance)',
            'validator': lambda x: x and x.startswith('redis://'),
            'error_msg': 'REDIS_URL must start with "redis://"'
        },
        'SENTRY_DSN': {
            'value': settings.sentry_dsn,
            'description': 'Sentry DSN for error tracking',
            'validator': lambda x: x and x.startswith('https://'),
            'error_msg': 'SENTRY_DSN must be a valid HTTPS URL'
        }
    }
    
    # Validate required variables
    for var_name, config in required_vars.items():
        if not config['value']:
            result.missing_required.append(f"{var_name}: {config['description']}")
            result.success = False
        elif config.get('validator') and not config['validator'](config['value']):
            result.errors.append(config['error_msg'])
            result.success = False
    
    # Validate optional variables
    for var_name, config in optional_vars.items():
        if not config['value']:
            result.missing_optional.append(f"{var_name}: {config['description']}")
        elif config.get('validator') and not config['validator'](config['value']):
            result.warnings.append(config['error_msg'])
    
    # Validate configuration values
    validation_checks = [
        (settings.environment in ['development', 'staging', 'production'], 
         'ENVIRONMENT must be one of: development, staging, production'),
        (1 <= settings.port <= 65535, 
         'PORT must be between 1 and 65535'),
        (settings.workers >= 1, 
         'WORKERS must be at least 1'),
        (0.0 <= settings.openai_temperature <= 2.0, 
         'OPENAI_TEMPERATURE must be between 0.0 and 2.0'),
        (settings.openai_max_tokens > 0, 
         'OPENAI_MAX_TOKENS must be greater than 0'),
        (settings.openai_timeout > 0, 
         'OPENAI_TIMEOUT must be greater than 0'),
        (settings.sentiment_threshold >= 0.0 and settings.sentiment_threshold <= 1.0, 
         'SENTIMENT_THRESHOLD must be between 0.0 and 1.0'),
        (settings.summary_min_length < settings.summary_max_length, 
         'SUMMARY_MIN_LENGTH must be less than SUMMARY_MAX_LENGTH'),
    ]
    
    for check, error_msg in validation_checks:
        if not check:
            result.errors.append(error_msg)
            result.success = False
    
    # Log results
    if result.missing_required:
        logger.error("Missing required environment variables:")
        for missing in result.missing_required:
            logger.error(f"  - {missing}")
        logger.error("Please check your .env file and ensure all required variables are set.")
    
    if result.errors:
        logger.error("Environment validation errors:")
        for error in result.errors:
            logger.error(f"  - {error}")
    
    if result.missing_optional:
        logger.warning("Missing optional environment variables:")
        for missing in result.missing_optional:
            logger.warning(f"  - {missing}")
        logger.warning("Some AI features may not be available without these variables.")
    
    if result.warnings:
        for warning in result.warnings:
            logger.warning(warning)
    
    if result.success:
        logger.info("Environment validation completed successfully")
    else:
        logger.error("Environment validation failed")
    
    return result


def validate_required_settings() -> Settings:
    """Validate environment and return settings or raise exception"""
    result = validate_environment()
    
    if not result.success:
        error_msg = "Environment validation failed"
        if result.errors:
            error_msg += f": {'; '.join(result.errors)}"
        if result.missing_required:
            missing = [var.split(':')[0] for var in result.missing_required]
            error_msg += f". Missing required variables: {', '.join(missing)}"
        
        raise ValueError(error_msg)
    
    return get_settings()


def create_api_key_error_message(service: str, key_name: str, get_url: str) -> str:
    """Create a helpful error message for missing API keys"""
    return f"""
🚨 Missing API Key: {key_name}

The {service} service requires an API key to function properly.

To fix this:
1. Get your API key from: {get_url}
2. Add it to your .env file: {key_name}=your_api_key_here
3. Restart the application

Without this key, {service} features will not work.
    """.strip()


def validate_api_keys_with_help() -> Dict[str, Dict[str, Any]]:
    """Validate API keys and provide helpful error messages"""
    settings = get_settings()
    
    results = {
        'openai': {'valid': False},
        'huggingface': {'valid': False}
    }
    
    # Validate OpenAI API key
    if not settings.openai_api_key:
        results['openai']['error'] = create_api_key_error_message(
            'OpenAI',
            'OPENAI_API_KEY',
            'https://platform.openai.com/api-keys'
        )
    elif not settings.openai_api_key.startswith('sk-'):
        results['openai']['error'] = 'OPENAI_API_KEY must start with "sk-". Please check your API key format.'
    else:
        results['openai']['valid'] = True
    
    # Validate Hugging Face API key
    if not settings.huggingface_api_key:
        results['huggingface']['error'] = create_api_key_error_message(
            'Hugging Face',
            'HUGGINGFACE_API_KEY',
            'https://huggingface.co/settings/tokens'
        )
    elif len(settings.huggingface_api_key) < 10:
        results['huggingface']['error'] = 'HUGGINGFACE_API_KEY appears to be invalid. Please check your API key.'
    else:
        results['huggingface']['valid'] = True
    
    return results


def get_environment_info() -> Dict[str, Any]:
    """Get environment information for debugging"""
    settings = get_settings()
    
    return {
        'environment': settings.environment,
        'debug': settings.debug,
        'port': settings.port,
        'workers': settings.workers,
        'log_level': settings.log_level,
        'has_openai_key': bool(settings.openai_api_key),
        'has_huggingface_key': bool(settings.huggingface_api_key),
        'has_redis_config': bool(settings.redis_url),
        'has_sentry_config': bool(settings.sentry_dsn),
        'openai_model': settings.openai_model,
        'whisper_model': settings.openai_whisper_model,
        'sentiment_model': settings.hf_sentiment_model,
        'cors_origins': settings.cors_origins_list,
        'max_audio_size': settings.max_audio_size,
        'supported_formats': settings.supported_audio_formats_list,
        'enable_caching': settings.enable_result_caching,
        'enable_metrics': settings.enable_metrics,
    }