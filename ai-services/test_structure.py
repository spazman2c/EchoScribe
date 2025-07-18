#!/usr/bin/env python3
"""
Test script to validate the AI services structure
"""

import os
import sys
from pathlib import Path

def test_structure():
    """Test the project structure"""
    print("Testing AI Services Structure...")
    
    # Check main files
    required_files = [
        "main.py",
        "requirements.txt",
        ".env.example",
        "app/__init__.py",
        "app/routers/__init__.py",
        "app/routers/analysis.py",
        "app/routers/transcription.py",
        "app/services/__init__.py",
        "app/services/ai_service.py",
        "app/models/__init__.py",
        "app/models/analysis.py",
        "app/utils/__init__.py",
        "app/utils/config.py",
        "app/utils/logger.py"
    ]
    
    missing_files = []
    for file_path in required_files:
        if not os.path.exists(file_path):
            missing_files.append(file_path)
        else:
            print(f"✓ {file_path}")
    
    if missing_files:
        print(f"\n✗ Missing files: {missing_files}")
        return False
    
    # Test basic imports (without external dependencies)
    try:
        sys.path.insert(0, '.')
        
        # Test that files can be read and have basic structure
        with open('main.py', 'r') as f:
            content = f.read()
            if 'FastAPI' in content and 'health_check' in content:
                print("✓ main.py has correct FastAPI structure")
            else:
                print("✗ main.py missing expected content")
                return False
        
        with open('requirements.txt', 'r') as f:
            content = f.read()
            required_deps = ['fastapi', 'openai', 'transformers', 'uvicorn']
            missing_deps = [dep for dep in required_deps if dep not in content]
            if not missing_deps:
                print("✓ requirements.txt has all required dependencies")
            else:
                print(f"✗ requirements.txt missing: {missing_deps}")
                return False
        
        with open('.env.example', 'r') as f:
            content = f.read()
            required_vars = ['OPENAI_API_KEY', 'HUGGINGFACE_API_KEY']
            missing_vars = [var for var in required_vars if var not in content]
            if not missing_vars:
                print("✓ .env.example has required environment variables")
            else:
                print(f"✗ .env.example missing: {missing_vars}")
                return False
        
        print("\n✅ All structure tests passed!")
        print("Note: Full import testing requires installing dependencies with:")
        print("pip install -r requirements.txt")
        return True
        
    except Exception as e:
        print(f"\n✗ File validation error: {e}")
        return False

if __name__ == "__main__":
    success = test_structure()
    sys.exit(0 if success else 1)