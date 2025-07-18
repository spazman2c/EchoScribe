#!/usr/bin/env tsx

/**
 * Backend Environment Validation Script
 * 
 * This script validates the backend environment configuration
 * and provides detailed feedback about missing or invalid variables.
 */

import dotenv from 'dotenv';
import { validateEnv, validateSupabaseConnection, validateExternalServices, getEnvironmentInfo } from '../utils/validateEnv';

// Load environment variables
dotenv.config();

async function main() {
  console.log('🔍 Backend Environment Validation');
  console.log('=================================\n');

  try {
    // Basic environment validation
    const result = validateEnv();
    const envInfo = getEnvironmentInfo();

    // Display environment information
    console.log('📋 Environment Information:');
    console.log(`   Environment: ${envInfo.nodeEnv}`);
    console.log(`   Port: ${envInfo.port}`);
    console.log(`   Log Level: ${envInfo.logLevel}`);
    console.log(`   Frontend URL: ${envInfo.frontendUrl}`);
    console.log(`   AI Service URL: ${envInfo.aiServiceUrl}`);
    console.log(`   Supabase Configured: ${envInfo.hasSupabaseConfig ? '✅' : '❌'}`);
    console.log(`   OpenAI Key Present: ${envInfo.hasOpenAIKey ? '✅' : '❌'}`);
    console.log(`   Hugging Face Key Present: ${envInfo.hasHuggingFaceKey ? '✅' : '❌'}`);
    console.log(`   Redis Configured: ${envInfo.hasRedisConfig ? '✅' : '❌'}`);
    console.log('');

    // Display validation results
    if (result.success) {
      console.log('✅ Basic environment validation passed!');
      
      if (result.warnings.length > 0) {
        console.log('\n⚠️  Warnings:');
        result.warnings.forEach(warning => console.log(`   - ${warning}`));
      }

      if (result.missingOptional.length > 0) {
        console.log('\n📝 Optional variables not set:');
        result.missingOptional.forEach(missing => console.log(`   - ${missing}`));
        console.log('\n   These are optional but may enable additional features.');
      }

      // Test external service connections
      console.log('\n🔗 Testing External Service Connections:');
      
      try {
        const supabaseConnected = await validateSupabaseConnection();
        console.log(`   Supabase: ${supabaseConnected ? '✅ Connected' : '❌ Connection failed'}`);
      } catch (error) {
        console.log(`   Supabase: ❌ Connection error - ${error}`);
      }

      try {
        const serviceValidation = await validateExternalServices();
        console.log(`   OpenAI API Key: ${serviceValidation.openai ? '✅ Valid format' : '❌ Invalid format'}`);
        console.log(`   Hugging Face API Key: ${serviceValidation.huggingface ? '✅ Valid format' : '❌ Invalid format'}`);
        if (serviceValidation.redis !== undefined) {
          console.log(`   Redis: ${serviceValidation.redis ? '✅ URL format valid' : '❌ URL format invalid'}`);
        }
      } catch (error) {
        console.log(`   External Services: ❌ Validation error - ${error}`);
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
      console.log('   1. Copy backend/.env.example to backend/.env');
      console.log('   2. Update the values in .env with your actual configuration');
      console.log('   3. Ensure all required API keys are properly set');
      console.log('   4. Run this validation script again');
    }

    // Exit with appropriate code
    process.exit(result.success ? 0 : 1);

  } catch (error) {
    console.error('💥 Validation script failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}