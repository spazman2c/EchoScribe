#!/usr/bin/env node

/**
 * Shared Environment Validation Utility
 * 
 * This utility provides common validation functions that can be used
 * across different components of the EchoScribe application.
 */

const fs = require('fs');
const path = require('path');

class EnvironmentValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.missingRequired = [];
    this.missingOptional = [];
  }

  /**
   * Validate that a URL is properly formatted
   */
  isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Validate that a string meets minimum length requirements
   */
  hasMinLength(value, minLength) {
    return value && value.length >= minLength;
  }

  /**
   * Validate that a value is one of the allowed options
   */
  isOneOf(value, allowedValues) {
    return allowedValues.includes(value);
  }

  /**
   * Validate that a port number is valid
   */
  isValidPort(port) {
    const portNum = parseInt(port);
    return !isNaN(portNum) && portNum > 0 && portNum < 65536;
  }

  /**
   * Validate OpenAI API key format
   */
  isValidOpenAIKey(key) {
    return key && key.startsWith('sk-') && key.length > 20;
  }

  /**
   * Validate that environment file exists
   */
  envFileExists(filePath) {
    return fs.existsSync(filePath);
  }

  /**
   * Load environment variables from a file
   */
  loadEnvFile(filePath) {
    if (!this.envFileExists(filePath)) {
      return {};
    }

    const envContent = fs.readFileSync(filePath, 'utf8');
    const envVars = {};

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

  /**
   * Validate a single environment variable
   */
  validateVar(key, value, config) {
    if (!value) {
      if (config.defaultValue) {
        this.warnings.push(`Using default value for ${key}: ${config.defaultValue}`);
        return config.defaultValue;
      }

      if (config.required) {
        this.missingRequired.push(`${key}: ${config.description}`);
      } else {
        this.missingOptional.push(`${key}: ${config.description}`);
      }
      return null;
    }

    // Apply validator if provided
    if (config.validator && !config.validator(value)) {
      this.errors.push(config.errorMessage || `Invalid value for ${key}`);
      return null;
    }

    return value;
  }

  /**
   * Get validation summary
   */
  getValidationSummary() {
    return {
      success: this.errors.length === 0 && this.missingRequired.length === 0,
      errors: this.errors,
      warnings: this.warnings,
      missingRequired: this.missingRequired,
      missingOptional: this.missingOptional
    };
  }

  /**
   * Reset validation state
   */
  reset() {
    this.errors = [];
    this.warnings = [];
    this.missingRequired = [];
    this.missingOptional = [];
  }

  /**
   * Print validation results in a formatted way
   */
  printResults(componentName) {
    const result = this.getValidationSummary();
    
    console.log(`\n🔍 ${componentName} Environment Validation`);
    console.log('='.repeat(componentName.length + 30));

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
    }

    return result.success;
  }
}

// Export for use in other scripts
module.exports = EnvironmentValidator;

// If run directly, provide help
if (require.main === module) {
  console.log('Environment Validator Utility');
  console.log('============================');
  console.log('');
  console.log('This utility provides validation functions for EchoScribe environment configuration.');
  console.log('It is used by component-specific validation scripts.');
  console.log('');
  console.log('Usage:');
  console.log('  const EnvironmentValidator = require("./env-validator");');
  console.log('  const validator = new EnvironmentValidator();');
  console.log('');
}