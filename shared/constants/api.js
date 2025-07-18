"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AI_ENDPOINTS = exports.API_ENDPOINTS = exports.DEFAULT_AI_SERVICES_BASE_URL = exports.DEFAULT_API_BASE_URL = void 0;
exports.DEFAULT_API_BASE_URL = 'http://localhost:3001';
exports.DEFAULT_AI_SERVICES_BASE_URL = 'http://localhost:8000';
exports.API_ENDPOINTS = {
    HEALTH: '/api/health',
    AUTH: {
        LOGIN: '/api/auth/login',
        LOGOUT: '/api/auth/logout',
        REGISTER: '/api/auth/register',
        REFRESH: '/api/auth/refresh',
        PROFILE: '/api/auth/profile',
    },
    USERS: {
        BASE: '/api/users',
        BY_ID: (id) => `/api/users/${id}`,
        PROFILE: (id) => `/api/users/${id}/profile`,
    },
    MEETINGS: {
        BASE: '/api/meetings',
        BY_ID: (id) => `/api/meetings/${id}`,
        PARTICIPANTS: (id) => `/api/meetings/${id}/participants`,
        UPLOAD_AUDIO: (id) => `/api/meetings/${id}/audio`,
    },
    TRANSCRIPTION: {
        BASE: '/api/transcription',
        BY_MEETING_ID: (meetingId) => `/api/transcription/meeting/${meetingId}`,
        JOB_STATUS: (jobId) => `/api/transcription/job/${jobId}`,
        START_JOB: '/api/transcription/start',
    },
    ANALYSIS: {
        BASE: '/api/analysis',
        BY_MEETING_ID: (meetingId) => `/api/analysis/meeting/${meetingId}`,
        SUMMARY: (meetingId) => `/api/analysis/${meetingId}/summary`,
        ACTION_ITEMS: (meetingId) => `/api/analysis/${meetingId}/action-items`,
        SENTIMENT: (meetingId) => `/api/analysis/${meetingId}/sentiment`,
    },
    INTEGRATIONS: {
        BASE: '/api/integrations',
        ZOOM: '/api/integrations/zoom',
        GOOGLE_MEET: '/api/integrations/google-meet',
        TEAMS: '/api/integrations/teams',
        SLACK: '/api/integrations/slack',
        JIRA: '/api/integrations/jira',
        TRELLO: '/api/integrations/trello',
    },
};
exports.AI_ENDPOINTS = {
    HEALTH: '/health',
    TRANSCRIBE: '/transcribe',
    ANALYZE: '/analyze',
    SUMMARIZE: '/summarize',
    EXTRACT_ACTION_ITEMS: '/extract-action-items',
    SENTIMENT_ANALYSIS: '/sentiment-analysis',
};
//# sourceMappingURL=api.js.map