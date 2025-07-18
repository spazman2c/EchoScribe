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
    description: 'Supabase project URL',
    validator: (value) => value.startsWith('http://') || value.startsWith('https://'),
    errorMessage: 'VITE_SUPABASE_URL must be a valid HTTP/HTTPS URL',
  },
  VITE_SUPABASE_ANON_KEY: {
    required: true,
    description: 'Supabase anonymous key',
    validator: (value) => value.length > 20,
    errorMessage: 'VITE_SUPABASE_ANON_KEY appears to be invalid (too short)',
  },

  // Application Configuration
  VITE_APP_NAME: {
    required: false,
    description: 'Application name',
    defaultValue: 'EchoScribe',
  },
  VITE_APP_VERSION: {
    required: false,
    description: 'Application version',
    defaultValue: '1.0.0',
  },

  // Feature Flags
  VITE_ENABLE_ANALYTICS: {
    required: false,
    description: 'Enable analytics tracking',
    validator: (value) => ['true', 'false'].includes(value),
    errorMessage: 'VITE_ENABLE_ANALYTICS must be "true" or "false"',
    defaultValue: 'false',
  },
  VITE_ENABLE_DEBUG: {
    required: false,
    description: 'Enable debug mode',
    validator: (value) => ['true', 'false'].includes(value),
    errorMessage: 'VITE_ENABLE_DEBUG must be "true" or "false"',
    defaultValue: 'false',
  },
};

// Environment configuration with validation and defaults
export const env = {
  // Core Configuration
  NODE_ENV: getEnvVar('VITE_NODE_ENV'),
  
  // API Configuration
  API_BASE_URL: getEnvVar('VITE_API_BASE_URL'),
  AI_API_BASE_URL: getEnvVar('VITE_AI_API_BASE_URL'),

  // Supabase Configuration
  SUPABASE_URL: getEnvVar('VITE_SUPABASE_URL'),
  SUPABASE_ANON_KEY: getEnvVar('VITE_SUPABASE_ANON_KEY'),

  // Application Configuration
  APP_NAME: getEnvVar('VITE_APP_NAME'),
  APP_VERSION: getEnvVar('VITE_APP_VERSION'),
  APP_DESCRIPTION: getEnvVar('VITE_APP_DESCRIPTION') || 'AI-driven meeting analyzer',

  // Feature Flags
  ENABLE_ANALYTICS: getEnvVar('VITE_ENABLE_ANALYTICS') === 'true',
  ENABLE_DEBUG: getEnvVar('VITE_ENABLE_DEBUG') === 'true',
  ENABLE_REAL_TIME: getEnvVar('VITE_ENABLE_REAL_TIME') === 'true',
  ENABLE_OFFLINE_MODE: getEnvVar('VITE_ENABLE_OFFLINE_MODE') === 'true',
  ENABLE_PWA: getEnvVar('VITE_ENABLE_PWA') === 'true',

  // File Upload Configuration
  MAX_FILE_SIZE: parseInt(getEnvVar('VITE_MAX_FILE_SIZE') || '50'),
  ALLOWED_FILE_TYPES: (getEnvVar('VITE_ALLOWED_FILE_TYPES') || 'audio/mpeg,audio/wav,audio/mp4,audio/webm').split(','),
  MAX_CONCURRENT_UPLOADS: parseInt(getEnvVar('VITE_MAX_CONCURRENT_UPLOADS') || '3'),

  // Performance Configuration
  API_TIMEOUT: parseInt(getEnvVar('VITE_API_TIMEOUT') || '30000'),
  RETRY_ATTEMPTS: parseInt(getEnvVar('VITE_RETRY_ATTEMPTS') || '3'),
  CACHE_TTL: parseInt(getEnvVar('VITE_CACHE_TTL') || '300000'),

  // UI Configuration
  THEME: getEnvVar('VITE_THEME') || 'light',
  LANGUAGE: getEnvVar('VITE_LANGUAGE') || 'en',
  TIMEZONE: getEnvVar('VITE_TIMEZONE') || 'UTC',

  // Analytics Configuration
  GOOGLE_ANALYTICS_ID: getEnvVar('VITE_GOOGLE_ANALYTICS_ID'),
  MIXPANEL_TOKEN: getEnvVar('VITE_MIXPANEL_TOKEN'),
  HOTJAR_ID: getEnvVar('VITE_HOTJAR_ID'),

  // Error Tracking
  SENTRY_DSN: getEnvVar('VITE_SENTRY_DSN'),
  SENTRY_ENVIRONMENT: getEnvVar('VITE_SENTRY_ENVIRONMENT'),

  // Computed values
  get isDevelopment() {
    return this.NODE_ENV === 'development';
  },

  get isStaging() {
    return this.NODE_ENV === 'staging';
  },

  get isProduction() {
    return this.NODE_ENV === 'production';
  },
} as const;

function getEnvVar(key: string): string {
  const config = envVarConfig[key];
  const value = import.meta.env[key];

  if (!value && config?.defaultValue) {
    return config.defaultValue;
  }

  return value || '';
}

export interface ValidationResult {
  success: boolean;
  errors: string[];
  warnings: string[];
  missingRequired: string[];
  missingOptional: string[];
}

// Enhanced validation function
export function validateEnv(): ValidationResult {
  const result: ValidationResult = {
    success: true,
    errors: [],
    warnings: [],
    missingRequired: [],
    missingOptional: [],
  };

  Object.entries(envVarConfig).forEach(([key, config]) => {
    const value = import.meta.env[key];
    
    if (!value) {
      // Use default value if available
      if (config.defaultValue) {
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
    console.error('Missing required environment variables:');
    result.missingRequired.forEach(missing => console.error(`  - ${missing}`));
    console.error('Please check your .env.local file and ensure all required variables are set.');
  }

  if (result.errors.length > 0) {
    console.error('Environment validation errors:');
    result.errors.forEach(error => console.error(`  - ${error}`));
  }

  if (result.missingOptional.length > 0) {
    console.warn('Missing optional environment variables:');
    result.missingOptional.forEach(missing => console.warn(`  - ${missing}`));
    console.warn('Some features may not be available without these variables.');
  }

  if (result.warnings.length > 0) {
    result.warnings.forEach(warning => console.warn(warning));
  }

  if (result.success) {
    console.info('Frontend environment validation completed successfully');
  } else {
    console.error('Frontend environment validation failed');
  }

  return result;
}

export function validateEnvAndThrow(): void {
  const result = validateEnv();
  if (!result.success) {
    throw new Error(`Environment validation failed: ${result.errors.join(', ')}`);
  }
}

export function getEnvironmentInfo(): Record<string, any> {
  return {
    nodeEnv: env.NODE_ENV,
    apiBaseUrl: env.API_BASE_URL,
    aiApiBaseUrl: env.AI_API_BASE_URL,
    hasSupabaseConfig: !!(env.SUPABASE_URL && env.SUPABASE_ANON_KEY),
    enableAnalytics: env.ENABLE_ANALYTICS,
    enableDebug: env.ENABLE_DEBUG,
    enableRealTime: env.ENABLE_REAL_TIME,
    appName: env.APP_NAME,
    appVersion: env.APP_VERSION,
    theme: env.THEME,
    language: env.LANGUAGE,
  };
}
