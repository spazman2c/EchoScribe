#!/bin/bash

# EchoScribe Supabase Setup Script
# This script helps set up the local Supabase development environment

set -e

echo "🚀 Setting up EchoScribe Supabase environment..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI is not installed."
    echo "Please install it first: https://supabase.com/docs/guides/cli"
    exit 1
fi

# Check if we're in the project root
if [ ! -f "supabase/config.toml" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

echo "✅ Supabase CLI found"

# Start Supabase local development
echo "🔄 Starting Supabase local development environment..."
supabase start

# Check if start was successful
if [ $? -eq 0 ]; then
    echo "✅ Supabase started successfully"
else
    echo "❌ Failed to start Supabase"
    exit 1
fi

# Check database status (migrations are already applied during start)
echo "🔄 Checking database status..."
supabase status

if [ $? -eq 0 ]; then
    echo "✅ Database is ready and migrations are applied"
else
    echo "❌ Database status check failed"
    exit 1
fi

# Display connection information
echo ""
echo "🎉 Supabase setup completed successfully!"
echo ""
echo "📋 Connection Details:"
echo "   API URL: http://127.0.0.1:54321"
echo "   GraphQL URL: http://127.0.0.1:54321/graphql/v1"
echo "   DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres"
echo "   Studio URL: http://127.0.0.1:54323"
echo "   Inbucket URL: http://127.0.0.1:54324"
echo "   JWT secret: super-secret-jwt-token-with-at-least-32-characters-long"
echo "   anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"
echo "   service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU"
echo ""
echo "🔧 Next steps:"
echo "   1. Update your backend/.env file with the connection details above"
echo "   2. Start your backend server: cd backend && npm run dev"
echo "   3. Test the connection: curl http://localhost:3001/health/detailed"
echo ""
echo "📚 Useful commands:"
echo "   supabase status    - Check service status"
echo "   supabase stop      - Stop all services"
echo "   supabase db reset  - Reset database and run migrations"
echo "   supabase studio    - Open Supabase Studio"