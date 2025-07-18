#!/bin/bash

# EchoScribe Environment Setup Script
# This script helps set up environment files for all components

set -e

echo "🚀 EchoScribe Environment Setup"
echo "================================"

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

# Function to copy env file if it doesn't exist
setup_env_file() {
    local component=$1
    local env_type=${2:-"local"}
    
    local source_file=""
    local target_file=""
    
    case $component in
        "frontend")
            if [ "$env_type" = "local" ]; then
                source_file="frontend/.env.example"
                target_file="frontend/.env.local"
            else
                source_file="frontend/.env.$env_type"
                target_file="frontend/.env.$env_type"
            fi
            ;;
        "backend")
            source_file="backend/.env.example"
            target_file="backend/.env"
            if [ "$env_type" != "local" ]; then
                source_file="backend/.env.$env_type"
                target_file="backend/.env.$env_type"
            fi
            ;;
        "ai-services")
            source_file="ai-services/.env.example"
            target_file="ai-services/.env"
            if [ "$env_type" != "local" ]; then
                source_file="ai-services/.env.$env_type"
                target_file="ai-services/.env.$env_type"
            fi
            ;;
    esac
    
    if [ -f "$target_file" ]; then
        print_warning "$target_file already exists, skipping..."
        return 0
    fi
    
    if [ -f "$source_file" ]; then
        cp "$source_file" "$target_file"
        print_status "Created $target_file from $source_file"
    else
        print_error "Source file $source_file not found"
        return 1
    fi
}

# Function to validate environment files
validate_env_files() {
    print_info "Validating environment files..."
    
    # Check frontend
    if [ -f "frontend/.env.local" ]; then
        print_status "Frontend environment file exists"
    else
        print_error "Frontend environment file missing"
    fi
    
    # Check backend
    if [ -f "backend/.env" ]; then
        print_status "Backend environment file exists"
    else
        print_error "Backend environment file missing"
    fi
    
    # Check AI services
    if [ -f "ai-services/.env" ]; then
        print_status "AI services environment file exists"
    else
        print_error "AI services environment file missing"
    fi
}

# Function to generate secure secrets
generate_secrets() {
    print_info "Generating secure secrets..."
    
    # Generate JWT secret
    JWT_SECRET=$(openssl rand -base64 32 2>/dev/null || python3 -c "import secrets; print(secrets.token_urlsafe(32))" 2>/dev/null || node -e "console.log(require('crypto').randomBytes(32).toString('base64'))" 2>/dev/null)
    
    # Generate session secret
    SESSION_SECRET=$(openssl rand -base64 32 2>/dev/null || python3 -c "import secrets; print(secrets.token_urlsafe(32))" 2>/dev/null || node -e "console.log(require('crypto').randomBytes(32).toString('base64'))" 2>/dev/null)
    
    if [ -n "$JWT_SECRET" ] && [ -n "$SESSION_SECRET" ]; then
        print_status "Generated secure secrets"
        
        # Update backend .env file with generated secrets
        if [ -f "backend/.env" ]; then
            sed -i.bak "s/your_jwt_secret_key_minimum_32_characters_long/$JWT_SECRET/g" backend/.env
            sed -i.bak "s/your_session_secret_key_minimum_32_characters_long/$SESSION_SECRET/g" backend/.env
            rm -f backend/.env.bak
            print_status "Updated backend/.env with generated secrets"
        fi
    else
        print_warning "Could not generate secrets automatically. Please set them manually."
    fi
}

# Function to show next steps
show_next_steps() {
    echo ""
    echo "🎯 Next Steps:"
    echo "=============="
    echo ""
    echo "1. Update the environment files with your actual values:"
    echo "   - frontend/.env.local"
    echo "   - backend/.env"
    echo "   - ai-services/.env"
    echo ""
    echo "2. Required values to update:"
    echo "   📝 Supabase URL and keys (get from Supabase dashboard)"
    echo "   🤖 OpenAI API key (get from OpenAI platform)"
    echo "   🔍 Hugging Face API key (optional, for sentiment analysis)"
    echo ""
    echo "3. Secure secrets have been generated automatically ✅"
    echo "   If you need to regenerate them:"
    echo "   openssl rand -base64 32  # For JWT_SECRET"
    echo "   openssl rand -base64 32  # For SESSION_SECRET"
    echo ""
    echo "4. Validate your environment setup:"
    echo "   npm run validate-env"
    echo ""
    echo "5. Start the development environment:"
    echo "   npm run dev"
    echo ""
    echo "💡 Pro tip: Use 'npm run validate-env' anytime to check your configuration!"
    echo ""
}

# Main setup process
main() {
    local env_type=${1:-"local"}
    
    echo "Setting up environment files for: $env_type"
    echo ""
    
    # Setup environment files
    print_info "Setting up environment files..."
    setup_env_file "frontend" "$env_type"
    setup_env_file "backend" "$env_type"
    setup_env_file "ai-services" "$env_type"
    
    echo ""
    validate_env_files
    
    if [ "$env_type" = "local" ]; then
        # Generate secure secrets for local development
        generate_secrets
        show_next_steps
    else
        print_info "Environment files for $env_type have been set up."
        print_warning "Remember to update the files with your actual $env_type values!"
        print_warning "Don't forget to generate secure secrets for production use!"
    fi
}

# Check command line arguments
case "${1:-local}" in
    "local"|"development")
        main "local"
        ;;
    "staging")
        main "staging"
        ;;
    "production")
        main "production"
        ;;
    "--help"|"-h")
        echo "Usage: $0 [environment]"
        echo ""
        echo "Environments:"
        echo "  local       Setup local development environment (default)"
        echo "  staging     Setup staging environment"
        echo "  production  Setup production environment"
        echo ""
        echo "Examples:"
        echo "  $0                 # Setup local development"
        echo "  $0 staging         # Setup staging environment"
        echo "  $0 production      # Setup production environment"
        exit 0
        ;;
    *)
        print_error "Unknown environment: $1"
        print_info "Use --help for usage information"
        exit 1
        ;;
esac