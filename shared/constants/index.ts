/**
 * General application constants
 */

export * from './api';

// Application Configuration
export const APP_CONFIG = {
  NAME: 'EchoScribe',
  VERSION: '1.0.0',
  DESCRIPTION: 'Turn Conversations into Actionable Insights',
  SUPPORT_EMAIL: 'support@echoscribe.com',
} as const;

// Subscription Tiers
export const SUBSCRIPTION_TIERS = {
  FREE: {
    name: 'Free',
    meetings_per_month: 5,
    features: ['Basic transcription', 'Simple summaries', 'Email support'],
  },
  PRO: {
    name: 'Pro',
    price: 15,
    meetings_per_month: -1, // unlimited
    features: [
      'Unlimited meetings',
      'Advanced AI analysis',
      'Action item extraction',
      'Sentiment analysis',
      'Integration support',
      'Priority support',
    ],
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: null, // custom pricing
    meetings_per_month: -1, // unlimited
    features: [
      'Everything in Pro',
      'Custom integrations',
      'Advanced analytics',
      'Team management',
      'SSO support',
      'Dedicated support',
    ],
  },
} as const;

// Meeting Status
export const MEETING_STATUS = {
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

// Transcription Job Status
export const TRANSCRIPTION_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

// Action Item Priority
export const ACTION_ITEM_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

// Action Item Status
export const ACTION_ITEM_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
} as const;

// Sentiment Types
export const SENTIMENT_TYPES = {
  POSITIVE: 'positive',
  NEUTRAL: 'neutral',
  NEGATIVE: 'negative',
} as const;

// Integration Platforms
export const INTEGRATION_PLATFORMS = {
  ZOOM: 'zoom',
  GOOGLE_MEET: 'google_meet',
  TEAMS: 'teams',
  MANUAL: 'manual',
} as const;

// File Upload Limits
export const FILE_LIMITS = {
  AUDIO: {
    MAX_SIZE: 100 * 1024 * 1024, // 100MB
    ALLOWED_TYPES: ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/m4a'],
  },
  AVATAR: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  },
} as const;

// Pagination Defaults
export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 20,
  MAX_LIMIT: 100,
} as const;