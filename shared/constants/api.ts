/**
 * API endpoint constants
 */

// Default API URLs - these should be overridden by environment variables in the consuming applications
export const DEFAULT_API_BASE_URL = 'http://localhost:3001';
export const DEFAULT_AI_SERVICES_BASE_URL = 'http://localhost:8000';

// API Endpoints
export const API_ENDPOINTS = {
  // Health
  HEALTH: '/api/health',
  
  // Authentication
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REGISTER: '/api/auth/register',
    REFRESH: '/api/auth/refresh',
    PROFILE: '/api/auth/profile',
  },
  
  // Users
  USERS: {
    BASE: '/api/users',
    BY_ID: (id: string) => `/api/users/${id}`,
    PROFILE: (id: string) => `/api/users/${id}/profile`,
  },
  
  // Meetings
  MEETINGS: {
    BASE: '/api/meetings',
    BY_ID: (id: string) => `/api/meetings/${id}`,
    PARTICIPANTS: (id: string) => `/api/meetings/${id}/participants`,
    UPLOAD_AUDIO: (id: string) => `/api/meetings/${id}/audio`,
  },
  
  // Transcription
  TRANSCRIPTION: {
    BASE: '/api/transcription',
    BY_MEETING_ID: (meetingId: string) => `/api/transcription/meeting/${meetingId}`,
    JOB_STATUS: (jobId: string) => `/api/transcription/job/${jobId}`,
    START_JOB: '/api/transcription/start',
  },
  
  // Analysis
  ANALYSIS: {
    BASE: '/api/analysis',
    BY_MEETING_ID: (meetingId: string) => `/api/analysis/meeting/${meetingId}`,
    SUMMARY: (meetingId: string) => `/api/analysis/${meetingId}/summary`,
    ACTION_ITEMS: (meetingId: string) => `/api/analysis/${meetingId}/action-items`,
    SENTIMENT: (meetingId: string) => `/api/analysis/${meetingId}/sentiment`,
  },
  
  // Integrations
  INTEGRATIONS: {
    BASE: '/api/integrations',
    ZOOM: '/api/integrations/zoom',
    GOOGLE_MEET: '/api/integrations/google-meet',
    TEAMS: '/api/integrations/teams',
    SLACK: '/api/integrations/slack',
    JIRA: '/api/integrations/jira',
    TRELLO: '/api/integrations/trello',
  },
} as const;

// AI Services Endpoints
export const AI_ENDPOINTS = {
  HEALTH: '/health',
  TRANSCRIBE: '/transcribe',
  ANALYZE: '/analyze',
  SUMMARIZE: '/summarize',
  EXTRACT_ACTION_ITEMS: '/extract-action-items',
  SENTIMENT_ANALYSIS: '/sentiment-analysis',
} as const;