import { logger } from './logger';

interface EnvVarConfig {
  required: boolean;
  description: string;
  validator?: (value: string) => boolean;
  errorMessage?: string;
  defaultValue?: string;
  sensitive?: boolean;
}

interface RequiredEnvVars {
  [key: string]: EnvVarConfig;
}

const requiredEnvVars: RequiredEnvVars = {
  // Core Configuration
  NODE_ENV: {
    required: true,
    description: 'Node environment (development, staging, production)',
    validator: (value) => ['development', 'staging', 'production', 'test'].includes(value),
    errorMessage: 'NODE_ENV must be one of: development, staging, production, test',
    defaultValue: 'development',
  },
  PORT: {
    required: false,
    description: 'Server port number',
    validator: (value) => !isNaN(parseInt(value)) && parseInt(value) > 0 && parseInt(value) < 65536,
    errorMessage: 'PORT must be a valid port number (1-65535)',
    defaultValue: '3001',
  },
  LOG_LEVEL: {
    required: false,
    description: 'Logging level (error, warn, info, debug)',
    validator: (value) => ['error', 'warn', 'info', 'debug'].includes(value),
    errorMessage: 'LOG_LEVEL must be one of: error, warn, info, debug',
    defaultValue: 'info',
  },

  // Supabase Configuration
  SUPABASE_URL: {
    required: true,
    description: 'Supabase project URL',
    validator: (value) => value.startsWith('http://') || value.startsWith('https://'),
    errorMessage: 'SUPABASE_URL must be a valid HTTP/HTTPS URL',
  },
  SUPABASE_ANON_KEY: {
    required: true,
    description: 'Supabase anonymous key',
    validator: (value) => value.length > 20,
    errorMessage: 'SUPABASE_ANON_KEY appears to be invalid (too short)',
    sensitive: true,
  },
  SUPABASE_SERVICE_ROLE_KEY: {
    required: true,
    description: 'Supabase service role key (required for backend operations)',
    validator: (value) => value.length > 20,
    errorMessage: 'SUPABASE_SERVICE_ROLE_KEY appears to be invalid (too short)',
    sensitive: true,
  },

  // Security Configuration
  JWT_SECRET: {
    required: true,
    description: 'JWT secret for token signing (minimum 32 characters)',
    validator: (value) => value.length >= 32,
    errorMessage: 'JWT_SECRET must be at least 32 characters long',
    sensitive: true,
  },
  SESSION_SECRET: {
    required: false,
    description: 'Session secret for session signing (minimum 32 characters)',
    validator: (value) => value.length >= 32,
    errorMessage: 'SESSION_SECRET must be at least 32 characters long',
    sensitive: true,
  },

  // External Services
  OPENAI_API_KEY: {
    required: false,
    description: 'OpenAI API key for AI services (get from https://platform.openai.com/api-keys)',
    validator: (value) => value.startsWith('sk-'),
    errorMessage: 'OPENAI_API_KEY must start with "sk-". Get your API key from https://platform.openai.com/api-keys',
    sensitive: true,
  },
  HUGGINGFACE_API_KEY: {
    required: false,
    description: 'Hugging Face API key for sentiment analysis (get from https://huggingface.co/settings/tokens)',
    validator: (value) => value.length > 10,
    errorMessage: 'HUGGINGFACE_API_KEY appears to be invalid. Get your API key from https://huggingface.co/settings/tokens',
    sensitive: true,
  },

  // Application Configuration
  FRONTEND_URL: {
    required: true,
    description: 'Frontend application URL for CORS',
    validator: (value) => value.startsWith('http://') || value.startsWith('https://'),
    errorMessage: 'FRONTEND_URL must be a valid HTTP/HTTPS URL',
    defaultValue: 'http://localhost:3000',
  },
  AI_SERVICE_URL: {
    required: false,
    description: 'AI service URL',
    validator: (value) => value.startsWith('http://') || value.startsWith('https://'),
    errorMessage: 'AI_SERVICE_URL must be a valid HTTP/HTTPS URL',
    defaultValue: 'http://localhost:8000',
  },
};

export interface ValidationResult {
  success: boolean;
  errors: string[];
  warnings: string[];
  missingRequired: string[];
  missingOptional: string[];
}

export function validateEnv(): ValidationResult {
  const result: ValidationResult = {
    success: true,
    errors: [],
    warnings: [],
    missingRequired: [],
    missingOptional: [],
  };

  // Check for missing variables and validate existing ones
  Object.entries(requiredEnvVars).forEach(([key, config]) => {
    const value = process.env[key];
    
    if (!value) {
      // Use default value if available
      if (config.defaultValue) {
        process.env[key] = config.defaultValue;
        result.warnings.push(`Using default value for ${key}: ${config.defaultValue}`);
        return;
      }

      // Track missing variables
      if (config.required) {
        result.missingRequired.push(`${key}: ${config.description}`);
        result.success = false;
      } else {
        result.missingOptional.push(`${key}: ${config.description}`);
      }
      return;
    }

    // Validate existing values
    if (config.validator && !config.validator(value)) {
      result.errors.push(config.errorMessage || `Invalid value for ${key}`);
      result.success = false;
    }
  });

  // Log results
  if (result.missingRequired.length > 0) {
    logger.error('Missing required environment variables:');
    result.missingRequired.forEach(missing => logger.error(`  - ${missing}`));
    logger.error('Please check your .env file and ensure all required variables are set.');
  }

  if (result.errors.length > 0) {
    logger.error('Environment validation errors:');
    result.errors.forEach(error => logger.error(`  - ${error}`));
  }

  if (result.missingOptional.length > 0) {
    logger.warn('Missing optional environment variables:');
    result.missingOptional.forEach(missing => logger.warn(`  - ${missing}`));
    logger.warn('Some features may not be available without these variables.');
  }

  if (result.warnings.length > 0) {
    result.warnings.forEach(warning => logger.warn(warning));
  }

  if (result.success) {
    logger.info('Environment validation completed successfully');
  } else {
    logger.error('Environment validation failed');
  }

  return result;
}

export function validateEnvAndExit(): void {
  const result = validateEnv();
  if (!result.success) {
    process.exit(1);
  }
}

export async function validateSupabaseConnection(): Promise<boolean> {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      logger.error('Cannot validate Supabase connection: missing SUPABASE_URL or SUPABASE_ANON_KEY');
      return false;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Test connection with a simple query
    const { error } = await supabase.from('profiles').select('count').limit(1);
    
    if (error && !error.message.includes('relation "profiles" does not exist')) {
      logger.error('Supabase connection failed:', error.message);
      return false;
    }

    logger.info('Supabase connection validated successfully');
    return true;
  } catch (error) {
    logger.error('Supabase connection validation error:', error);
    return false;
  }
}

export async function validateExternalServices(): Promise<{
  openai: boolean;
  huggingface: boolean;
  redis?: boolean;
}> {
  const results = {
    openai: false,
    huggingface: false,
    redis: false,
  };

  // Validate OpenAI API key
  if (process.env.OPENAI_API_KEY) {
    try {
      // Simple validation - just check if the key format is correct
      if (process.env.OPENAI_API_KEY.startsWith('sk-')) {
        results.openai = true;
        logger.info('OpenAI API key format validated');
      } else {
        logger.warn('OpenAI API key format appears invalid');
      }
    } catch (error) {
      logger.warn('Could not validate OpenAI API key:', error);
    }
  }

  // Validate Hugging Face API key
  if (process.env.HUGGINGFACE_API_KEY) {
    try {
      // Simple validation - just check if the key exists and has reasonable length
      if (process.env.HUGGINGFACE_API_KEY.length > 10) {
        results.huggingface = true;
        logger.info('Hugging Face API key format validated');
      } else {
        logger.warn('Hugging Face API key format appears invalid');
      }
    } catch (error) {
      logger.warn('Could not validate Hugging Face API key:', error);
    }
  }

  // Validate Redis connection if configured
  if (process.env.REDIS_URL) {
    try {
      // Note: Actual Redis connection validation would require redis client
      // For now, just validate URL format
      if (process.env.REDIS_URL.startsWith('redis://')) {
        results.redis = true;
        logger.info('Redis URL format validated');
      } else {
        logger.warn('Redis URL format appears invalid');
      }
    } catch (error) {
      logger.warn('Could not validate Redis connection:', error);
    }
  }

  return results;
}

export function handleMissingApiKey(service: string, keyName: string, getUrl: string): Error {
  const errorMessage = `
🚨 Missing API Key: ${keyName}

The ${service} service requires an API key to function properly.

To fix this:
1. Get your API key from: ${getUrl}
2. Add it to your .env file: ${keyName}=your_api_key_here
3. Restart the application

Without this key, ${service} features will not work.
  `.trim();

  return new Error(errorMessage);
}

export function validateApiKeysWithHelp(): {
  openai: { valid: boolean; error?: Error };
  huggingface: { valid: boolean; error?: Error };
} {
  const results = {
    openai: { valid: false },
    huggingface: { valid: false }
  };

  // Validate OpenAI API key
  if (!process.env.OPENAI_API_KEY) {
    results.openai.error = handleMissingApiKey(
      'OpenAI',
      'OPENAI_API_KEY',
      'https://platform.openai.com/api-keys'
    );
  } else if (!process.env.OPENAI_API_KEY.startsWith('sk-')) {
    results.openai.error = new Error('OPENAI_API_KEY must start with "sk-". Please check your API key format.');
  } else {
    results.openai.valid = true;
  }

  // Validate Hugging Face API key
  if (!process.env.HUGGINGFACE_API_KEY) {
    results.huggingface.error = handleMissingApiKey(
      'Hugging Face',
      'HUGGINGFACE_API_KEY',
      'https://huggingface.co/settings/tokens'
    );
  } else if (process.env.HUGGINGFACE_API_KEY.length < 10) {
    results.huggingface.error = new Error('HUGGINGFACE_API_KEY appears to be invalid. Please check your API key.');
  } else {
    results.huggingface.valid = true;
  }

  return results;
}

export function getEnvironmentInfo(): Record<string, any> {
  return {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    logLevel: process.env.LOG_LEVEL,
    hasSupabaseConfig: !!(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY),
    hasOpenAIKey: !!process.env.OPENAI_API_KEY,
    hasHuggingFaceKey: !!process.env.HUGGINGFACE_API_KEY,
    hasRedisConfig: !!process.env.REDIS_URL,
    frontendUrl: process.env.FRONTEND_URL,
    aiServiceUrl: process.env.AI_SERVICE_URL,
  };
}