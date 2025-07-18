#!/bin/bash

# EchoScribe Environment Validation Script
# This script validates environment configuration across all components

set -e

echo "🔍 EchoScribe Environment Validation"
echo "===================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

# Track validation results
VALIDATION_PASSED=true

# Function to validate component environment
validate_component() {
    local component=$1
    local validation_command=$2
    
    echo ""
    print_info "Validating $component environment..."
    
    if eval "$validation_command"; then
        print_status "$component environment validation passed"
    else
        print_error "$component environment validation failed"
        VALIDATION_PASSED=false
    fi
}

# Function to check if environment files exist
check_env_files() {
    echo ""
    print_info "Checking environment files..."
    
    # Frontend
    if [ -f "frontend/.env.local" ]; then
        print_status "Frontend environment file exists (.env.local)"
    else
        print_warning "Frontend environment file missing (.env.local)"
        print_info "Run: cp frontend/.env.example frontend/.env.local"
    fi
    
    # Backend
    if [ -f "backend/.env" ]; then
        print_status "Backend environment file exists (.env)"
    else
        print_warning "Backend environment file missing (.env)"
        print_info "Run: cp backend/.env.example backend/.env"
    fi
    
    # AI Services
    if [ -f "ai-services/.env" ]; then
        print_status "AI services environment file exists (.env)"
    else
        print_warning "AI services environment file missing (.env)"
        print_info "Run: cp ai-services/.env.example ai-services/.env"
    fi
}

# Function to show environment setup help
show_setup_help() {
    echo ""
    echo "🛠️  Environment Setup Help"
    echo "=========================="
    echo ""
    echo "If validation failed, here's how to fix it:"
    echo ""
    echo "1. Create environment files:"
    echo "   npm run setup:env"
    echo ""
    echo "2. Update the following files with your actual values:"
    echo "   📝 frontend/.env.local"
    echo "   📝 backend/.env"
    echo "   📝 ai-services/.env"
    echo ""
    echo "3. Required values to set:"
    echo "   🔑 SUPABASE_URL and SUPABASE_ANON_KEY (from Supabase dashboard)"
    echo "   🔑 SUPABASE_SERVICE_ROLE_KEY (for backend)"
    echo "   🤖 OPENAI_API_KEY (from OpenAI platform)"
    echo "   🔐 JWT_SECRET and SESSION_SECRET (generate secure 32+ char strings)"
    echo ""
    echo "4. Optional but recommended:"
    echo "   🔍 HUGGINGFACE_API_KEY (for sentiment analysis)"
    echo "   📊 SENTRY_DSN (for error tracking)"
    echo "   🗄️  REDIS_URL (for caching)"
    echo ""
    echo "5. Generate secure secrets:"
    echo "   openssl rand -base64 32  # For JWT_SECRET"
    echo "   openssl rand -base64 32  # For SESSION_SECRET"
    echo ""
}

# Main validation process
main() {
    # Check environment files first
    check_env_files
    
    # Validate each component
    validate_component "Frontend" "cd frontend && npm run validate-env"
    validate_component "Backend" "cd backend && npm run validate-env"
    validate_component "AI Services" "cd ai-services && python -c \"from app.utils.config import validate_environment; result = validate_environment(); exit(0 if result.success else 1)\""
    
    echo ""
    echo "=================================="
    
    if [ "$VALIDATION_PASSED" = true ]; then
        print_status "All environment validations passed! 🎉"
        echo ""
        print_info "Your EchoScribe environment is properly configured."
        print_info "You can now start the development environment with: npm run dev"
    else
        print_error "Environment validation failed! ❌"
        show_setup_help
        exit 1
    fi
}

# Check command line arguments
case "${1:-validate}" in
    "validate")
        main
        ;;
    "--help"|"-h")
        echo "Usage: $0 [command]"
        echo ""
        echo "Commands:"
        echo "  validate    Validate all environment configurations (default)"
        echo "  --help      Show this help message"
        echo ""
        echo "This script validates environment configuration across all EchoScribe components:"
        echo "  - Frontend (React + TypeScript)"
        echo "  - Backend (Node.js + Express)"
        echo "  - AI Services (Python + FastAPI)"
        echo ""
        echo "It checks for:"
        echo "  - Required environment variables"
        echo "  - Valid configuration values"
        echo "  - External service connectivity"
        echo "  - Security settings"
        exit 0
        ;;
    *)
        print_error "Unknown command: $1"
        print_info "Use --help for usage information"
        exit 1
        ;;
esac