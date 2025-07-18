# EchoScribe Frontend

React.js frontend application for EchoScribe - an AI-driven meeting analyzer.

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Code Quality**: ESLint + Prettier

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your actual values
```

### Development

```bash
# Start development server
npm run dev

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

- `VITE_API_BASE_URL` - Backend API URL
- `VITE_AI_API_BASE_URL` - AI services API URL  
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── config/        # Configuration files
├── types/         # TypeScript type definitions
└── main.tsx       # Application entry point
```

## Features

- Responsive design with Tailwind CSS
- TypeScript for type safety
- React Router for navigation
- Environment configuration
- ESLint + Prettier for code quality
- Custom design system with component classes