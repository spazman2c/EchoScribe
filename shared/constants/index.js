"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAGINATION_DEFAULTS = exports.FILE_LIMITS = exports.INTEGRATION_PLATFORMS = exports.SENTIMENT_TYPES = exports.ACTION_ITEM_STATUS = exports.ACTION_ITEM_PRIORITY = exports.TRANSCRIPTION_STATUS = exports.MEETING_STATUS = exports.SUBSCRIPTION_TIERS = exports.APP_CONFIG = void 0;
__exportStar(require("./api"), exports);
exports.APP_CONFIG = {
    NAME: 'EchoScribe',
    VERSION: '1.0.0',
    DESCRIPTION: 'Turn Conversations into Actionable Insights',
    SUPPORT_EMAIL: 'support@echoscribe.com',
};
exports.SUBSCRIPTION_TIERS = {
    FREE: {
        name: 'Free',
        meetings_per_month: 5,
        features: ['Basic transcription', 'Simple summaries', 'Email support'],
    },
    PRO: {
        name: 'Pro',
        price: 15,
        meetings_per_month: -1,
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
        price: null,
        meetings_per_month: -1,
        features: [
            'Everything in Pro',
            'Custom integrations',
            'Advanced analytics',
            'Team management',
            'SSO support',
            'Dedicated support',
        ],
    },
};
exports.MEETING_STATUS = {
    SCHEDULED: 'scheduled',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
};
exports.TRANSCRIPTION_STATUS = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
};
exports.ACTION_ITEM_PRIORITY = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
};
exports.ACTION_ITEM_STATUS = {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
};
exports.SENTIMENT_TYPES = {
    POSITIVE: 'positive',
    NEUTRAL: 'neutral',
    NEGATIVE: 'negative',
};
exports.INTEGRATION_PLATFORMS = {
    ZOOM: 'zoom',
    GOOGLE_MEET: 'google_meet',
    TEAMS: 'teams',
    MANUAL: 'manual',
};
exports.FILE_LIMITS = {
    AUDIO: {
        MAX_SIZE: 100 * 1024 * 1024,
        ALLOWED_TYPES: ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/m4a'],
    },
    AVATAR: {
        MAX_SIZE: 5 * 1024 * 1024,
        ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    },
};
exports.PAGINATION_DEFAULTS = {
    PAGE: 1,
    LIMIT: 20,
    MAX_LIMIT: 100,
};
//# sourceMappingURL=index.js.map