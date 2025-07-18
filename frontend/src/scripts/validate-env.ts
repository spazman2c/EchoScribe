#!/usr/bin/env tsx

/**
 * Frontend Environment Validation Script
 * 
 * This script validates the frontend environment configuration
 * and provides detailed feedback about missing or invalid variables.
 */

import * as fs from 'fs';
import * as path from 'path';

interface EnvVarConfig {
  required: boolean;
  description: string;
  validator?: (value: string) => boolean;
  errorMessage?: string;
  defaultValue?: string;
}

interface RequiredEnvVars {
  [key: string]: EnvVarConfig;
}

const envVarConfig: RequiredEnvVars = {
  // Core Configuration
  VITE_NODE_ENV: {
    required: true,
    description: 'Application environment',
    validator: (value) => ['development', 'staging', 'production'].includes(value),
    errorMessage: 'VITE_NODE_ENV must be one of: development, staging, production',
    defaultValue: 'development',
  },

  // API Configuration
  VITE_API_BASE_URL: {
    required: true,
    description: 'Backend API base URL',
    validator: (value) => value.startsWith('http://') || value.startsWith('https://'),
    errorMessage: 'VITE_API_BASE_URL must be a valid HTTP/HTTPS URL',
    defaultValue: 'http://localhost:3001/api',
  },
  VITE_AI_API_BASE_URL: {
    required: true,
    description: 'AI services API base URL',
    validator: (value) => value.startsWith('http://') || value.startsWith('https://'),
    errorMessage: 'VITE_AI_API_BASE_URL must be a valid HTTP/HTTPS URL',
    defaultValue: 'http://localhost:8000',
  },

  // Supabase Configuration
  VITE_SUPABASE_URL: {
    required: true,
    description: 'Supabase project URL (get from https://supabase.com/dashboard)',
    validator: (value) => value.startsWith('http://') || value.startsWith('https://'),
    errorMessage: 'VITE_SUPABASE_URL must be a valid HTTP/HTTPS URL',
  },
  VITE_SUPABASE_ANON_KEY: {
    required: true,
    description: 'Supabase anonymous key (get from https://supabase.com/dashboard)',
    validator: (value) => value.length > 20,
    errorMessage: 'VITE_SUPABASE_ANON_KEY appears to be invalid (too short)',
  },
};

function loadEnvFile(filePath: string): Record<string, string> {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const envContent = fs.readFileSync(filePath, 'utf8');
  const envVars: Record<string, string> = {};

  envContent.split('\n').forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#') && line.includes('=')) {
      const [key, ...valueParts] = line.split('=');
      const value = valueParts.join('=').trim();
      envVars[key.trim()] = value;
    }
  });

  return envVars;
}

function validateFrontendEnv() {
  const envFilePath = path.join(process.cwd(), '.env.local');
  const envVars = loadEnvFile(envFilePath);
  
  const result = {
    success: true,
    errors: [] as string[],
    warnings: [] as string[],
    missingRequired: [] as string[],
    missingOptional: [] as string[],
  };

  Object.entries(envVarConfig).forEach(([key, config]) => {
    const value = envVars[key];
    
    if (!value) {
      if (config.defaultValue) {
        result.warnings.push(`Using default value for ${key}: ${config.defaultValue}`);
        return;
      }

      if (config.required) {
        result.missingRequired.push(`${key}: ${config.description}`);
        result.success = false;
      } else {
        result.missingOptional.push(`${key}: ${config.description}`);
      }
      return;
    }

    if (config.validator && !config.validator(value)) {
      result.errors.push(config.errorMessage || `Invalid value for ${key}`);
      result.success = false;
    }
  });

  return result;
}

function getEnvironmentInfo() {
  const envFilePath = path.join(process.cwd(), '.env.local');
  const envVars = loadEnvFile(envFilePath);
  
  return {
    nodeEnv: envVars.VITE_NODE_ENV || 'development',
    apiBaseUrl: envVars.VITE_API_BASE_URL || 'http://localhost:3001/api',
    aiApiBaseUrl: envVars.VITE_AI_API_BASE_URL || 'http://localhost:8000',
    hasSupabaseConfig: !!(envVars.VITE_SUPABASE_URL && envVars.VITE_SUPABASE_ANON_KEY),
    enableAnalytics: envVars.VITE_ENABLE_ANALYTICS === 'true',
    enableDebug: envVars.VITE_ENABLE_DEBUG === 'true',
    enableRealTime: envVars.VITE_ENABLE_REAL_TIME === 'true',
    appName: envVars.VITE_APP_NAME || 'EchoScribe',
    appVersion: envVars.VITE_APP_VERSION || '1.0.0',
    theme: envVars.VITE_THEME || 'light',
    language: envVars.VITE_LANGUAGE || 'en',
  };
}

function main() {
  console.log('🔍 Frontend Environment Validation');
  console.log('==================================\n');

  try {
    const result = validateFrontendEnv();
    const envInfo = getEnvironmentInfo();

    // Display environment information
    console.log('📋 Environment Information:');
    console.log(`   Environment: ${envInfo.nodeEnv}`);
    console.log(`   API Base URL: ${envInfo.apiBaseUrl}`);
    console.log(`   AI API Base URL: ${envInfo.aiApiBaseUrl}`);
    console.log(`   Supabase Configured: ${envInfo.hasSupabaseConfig ? '✅' : '❌'}`);
    console.log(`   Analytics Enabled: ${envInfo.enableAnalytics ? '✅' : '❌'}`);
    console.log(`   Debug Mode: ${envInfo.enableDebug ? '✅' : '❌'}`);
    console.log(`   Real-time Features: ${envInfo.enableRealTime ? '✅' : '❌'}`);
    console.log('');

    // Display validation results
    if (result.success) {
      console.log('✅ Environment validation passed!');
      
      if (result.warnings.length > 0) {
        console.log('\n⚠️  Warnings:');
        result.warnings.forEach(warning => console.log(`   - ${warning}`));
      }

      if (result.missingOptional.length > 0) {
        console.log('\n📝 Optional variables not set:');
        result.missingOptional.forEach(missing => console.log(`   - ${missing}`));
        console.log('\n   These are optional but may enable additional features.');
      }

    } else {
      console.log('❌ Environment validation failed!');
      
      if (result.missingRequired.length > 0) {
        console.log('\n🚨 Missing required variables:');
        result.missingRequired.forEach(missing => console.log(`   - ${missing}`));
      }

      if (result.errors.length > 0) {
        console.log('\n❌ Validation errors:');
        result.errors.forEach(error => console.log(`   - ${error}`));
      }

      console.log('\n💡 To fix these issues:');
      console.log('   1. Copy frontend/.env.example to frontend/.env.local');
      console.log('   2. Update the values in .env.local with your actual configuration');
      console.log('   3. Run this validation script again');
    }

    // Exit with appropriate code
    process.exit(result.success ? 0 : 1);

  } catch (error) {
    console.error('💥 Validation script failed:', error);
    process.exit(1);
  }
}

// Run the main function if this script is executed directly
main();