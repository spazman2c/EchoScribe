# EchoScribe

**Turn Conversations into Actionable Insights.**

EchoScribe is an AI-driven meeting analyzer that provides teams with summarized insights, emotional sentiment analysis, actionable tasks, and intelligent follow-up suggestions after meetings.

## 🚀 Features

- **AI-Powered Summarization**: Get concise meeting summaries with key points
- **Sentiment Analysis**: Understand team dynamics and emotional context
- **Action Item Extraction**: Automatically identify and assign tasks
- **Smart Follow-ups**: Intelligent recommendations for next steps
- **Platform Integrations**: Works with Zoom, Teams, Slack, Jira, and more
- **Analytics Dashboard**: Track meeting efficiency and team productivity

## 🏗️ Architecture

EchoScribe follows a monorepo structure with clear separation of concerns:

- **Frontend**: React.js with TypeScript and Tailwind CSS
- **Backend**: Node.js Express API with TypeScript
- **AI Services**: Python FastAPI for AI processing
- **Database**: Supabase (PostgreSQL) with authentication and file storage
- **Shared**: Common TypeScript types and utilities

## 📋 Prerequisites

- Node.js 18+ and npm 9+
- Python 3.11+
- Docker (for Supabase local development)
- Git

## 🛠️ Quick Start

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/your-org/echoscribe.git
cd echoscribe
npm run setup
```

### 2. Environment Configuration

Copy the example environment files and configure your API keys:

```bash
# Copy environment templates
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
cp ai-services/.env.example ai-services/.env
```

### 3. Start Development Environment

```bash
# Start all services concurrently
npm run dev

# Or start services individually
npm run dev:frontend  # React app on http://localhost:5173
npm run dev:backend   # Express API on http://localhost:3000
npm run dev:ai        # FastAPI on http://localhost:8001
```

### 4. Setup Database

```bash
# Start Supabase locally and run migrations
npm run setup:db
```

## 📁 Project Structure

```
echoscribe/
├── frontend/           # React.js application
├── backend/           # Node.js Express API
├── ai-services/       # Python FastAPI for AI processing
├── shared/            # Shared TypeScript types and utilities
├── supabase/          # Database migrations and config
├── docs/              # Documentation
└── scripts/           # Build and deployment scripts
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests for specific components
npm run test:frontend
npm run test:backend
npm run test:ai
```

## 🔧 Available Scripts

- `npm run dev` - Start all services in development mode
- `npm run build` - Build all components for production
- `npm test` - Run all test suites
- `npm run lint` - Lint all code
- `npm run clean` - Clean dependencies and build artifacts
- `npm run setup` - Install dependencies and setup database

## 🌐 API Endpoints

- `/api/auth` - Authentication and user management
- `/api/meetings` - Meeting CRUD operations
- `/api/transcription` - Audio processing and transcription
- `/api/analysis` - AI analysis and insights
- `/api/integrations` - Third-party platform connections

## 🔑 Environment Variables

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:3000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Backend (.env)
```
NODE_ENV=development
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
AI_SERVICES_URL=http://localhost:8001
```

### AI Services (.env)
```
OPENAI_API_KEY=your_openai_api_key
HUGGINGFACE_API_KEY=your_huggingface_api_key
```

## 🚀 Deployment

- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Cloudflare Workers
- **AI Services**: Deployed on cloud infrastructure
- **Database**: Supabase cloud

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- Documentation: [docs/](docs/)
- Issues: [GitHub Issues](https://github.com/your-org/echoscribe/issues)
- Discussions: [GitHub Discussions](https://github.com/your-org/echoscribe/discussions)

---

Built with ❤️ by the EchoScribe Team