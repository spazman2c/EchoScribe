# Technology Stack

## Frontend
- **Framework:** React.js
- **Styling:** Tailwind CSS
- **Hosting:** Vercel

## Backend
- **API Server:** Node.js with Express
- **AI Services:** Python with FastAPI for AI endpoints
- **Hosting:** Cloudflare Workers for API endpoints

## AI & ML Services
- **Language Model:** GPT-4 (OpenAI)
- **Speech-to-Text:** OpenAI Whisper for transcription
- **Sentiment Analysis:** Hugging Face models
- **Audio Processing:** Real-time analysis capabilities

## Database & Storage
- **Primary Database:** Supabase (PostgreSQL-based)
- **Authentication:** Supabase Auth
- **File Storage:** Supabase Storage for audio files

## Integrations
- **Meeting Platforms:** Zoom, Google Meet, Microsoft Teams
- **Communication:** Slack integration
- **Task Management:** Jira, Trello, Monday.com APIs
- **Calendar:** Google Calendar, Outlook integration

## Development Guidelines
- Use TypeScript for type safety in frontend and Node.js backend
- Follow React best practices with functional components and hooks
- Implement proper error handling for AI service calls
- Use environment variables for API keys and sensitive configuration
- Implement rate limiting for AI service usage
- Follow RESTful API design principles

## Common Commands
*Note: Project is in early stage - these commands will be added as the codebase develops*

```bash
# Frontend development
npm run dev          # Start React development server
npm run build        # Build for production
npm run test         # Run frontend tests

# Backend development
npm run server       # Start Express server
python -m uvicorn main:app --reload  # Start FastAPI AI services

# Database
npx supabase start   # Start local Supabase
npx supabase db reset # Reset database
```