# EchoScribe AI Services

Python FastAPI service for AI-powered meeting analysis and transcription.

## Features

- **Transcription**: Audio-to-text using OpenAI Whisper
- **Analysis**: Meeting summarization using GPT-4
- **Sentiment Analysis**: Emotion detection using Hugging Face models
- **Action Items**: Automatic extraction of tasks and assignments

## Setup

### Prerequisites

- Python 3.9+
- pip or conda

### Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Copy environment configuration:
```bash
cp .env.example .env
```

3. Configure your API keys in `.env`:
```bash
OPENAI_API_KEY=your_openai_api_key_here
HUGGINGFACE_API_KEY=your_huggingface_api_key_here
```

### Running the Service

Development mode:
```bash
python main.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8001
```

### API Documentation

Once running, visit:
- API Documentation: http://localhost:8001/docs
- Health Check: http://localhost:8001/health

## API Endpoints

### Analysis
- `POST /api/analysis/analyze` - General analysis endpoint
- `POST /api/analysis/sentiment` - Sentiment analysis
- `POST /api/analysis/action-items` - Extract action items
- `POST /api/analysis/summary` - Generate meeting summary

### Transcription
- `POST /api/transcription/transcribe` - Transcribe from URL
- `POST /api/transcription/transcribe-file` - Transcribe uploaded file
- `GET /api/transcription/status/{job_id}` - Check transcription status

## Project Structure

```
ai-services/
├── main.py                 # FastAPI application entry point
├── requirements.txt        # Python dependencies
├── .env.example           # Environment variables template
├── app/
│   ├── routers/           # API route handlers
│   │   ├── analysis.py    # Analysis endpoints
│   │   └── transcription.py # Transcription endpoints
│   ├── services/          # Business logic services
│   │   └── ai_service.py  # Base AI service class
│   ├── models/            # Pydantic data models
│   │   └── analysis.py    # Analysis data models
│   └── utils/             # Utility modules
│       ├── config.py      # Configuration management
│       └── logger.py      # Logging setup
```

## Development

### Testing Structure
```bash
python test_structure.py
```

### Code Quality
```bash
# Format code
black .

# Lint code
flake8 .

# Run tests
pytest
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for GPT-4 and Whisper | Yes |
| `HUGGINGFACE_API_KEY` | Hugging Face API key for models | Yes |
| `ENVIRONMENT` | Environment (development/production) | No |
| `LOG_LEVEL` | Logging level (INFO/DEBUG/WARNING) | No |
| `PORT` | Server port (default: 8001) | No |

## Notes

- This is the foundation setup for AI services
- Actual AI processing will be implemented in subsequent tasks
- Current endpoints return placeholder responses for testing
- Ensure you have valid API keys before running in production