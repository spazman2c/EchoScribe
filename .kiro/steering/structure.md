# Project Structure

## Overview
EchoScribe follows a monorepo structure with separate frontend and backend applications, organized for clear separation of concerns between web interface, API services, and AI processing.

## Recommended Directory Structure

```
echoscribe/
├── frontend/                 # React.js application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components and routing
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API client and external service calls
│   │   ├── utils/           # Helper functions and utilities
│   │   ├── types/           # TypeScript type definitions
│   │   └── styles/          # Tailwind CSS configurations
│   ├── public/              # Static assets
│   └── package.json
├── backend/                 # Node.js Express API
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   ├── middleware/      # Express middleware
│   │   ├── services/        # Business logic services
│   │   ├── models/          # Database models and schemas
│   │   ├── utils/           # Backend utilities
│   │   └── types/           # TypeScript type definitions
│   └── package.json
├── ai-services/             # Python FastAPI for AI processing
│   ├── app/
│   │   ├── routers/         # FastAPI route handlers
│   │   ├── services/        # AI processing services
│   │   ├── models/          # Pydantic models
│   │   └── utils/           # Python utilities
│   ├── requirements.txt
│   └── main.py
├── shared/                  # Shared types and utilities
│   ├── types/               # Common TypeScript interfaces
│   └── constants/           # Shared constants
├── docs/                    # Documentation
├── scripts/                 # Build and deployment scripts
└── supabase/               # Database migrations and config
    ├── migrations/
    └── config.toml
```

## Key Conventions

### File Naming
- Use kebab-case for file and folder names
- Component files should match component name (PascalCase)
- Use descriptive names that indicate purpose

### Code Organization
- Group related functionality together
- Separate business logic from presentation logic
- Keep API routes thin, move logic to services
- Use barrel exports (index.ts) for clean imports

### Database
- Use Supabase migrations for schema changes
- Follow PostgreSQL naming conventions (snake_case)
- Implement proper foreign key relationships
- Use RLS (Row Level Security) for data access control

### AI Services
- Separate AI processing from main API for scalability
- Implement proper error handling for external AI service calls
- Use async processing for long-running AI tasks
- Cache AI results when appropriate to reduce costs

### Integration Points
- `/api/meetings` - Core meeting management
- `/api/transcription` - Audio processing and transcription
- `/api/analysis` - AI analysis and insights
- `/api/integrations` - Third-party platform connections
- `/api/auth` - Authentication and user management