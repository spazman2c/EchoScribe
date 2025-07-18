export * from './api';
export declare const APP_CONFIG: {
    readonly NAME: "EchoScribe";
    readonly VERSION: "1.0.0";
    readonly DESCRIPTION: "Turn Conversations into Actionable Insights";
    readonly SUPPORT_EMAIL: "support@echoscribe.com";
};
export declare const SUBSCRIPTION_TIERS: {
    readonly FREE: {
        readonly name: "Free";
        readonly meetings_per_month: 5;
        readonly features: readonly ["Basic transcription", "Simple summaries", "Email support"];
    };
    readonly PRO: {
        readonly name: "Pro";
        readonly price: 15;
        readonly meetings_per_month: -1;
        readonly features: readonly ["Unlimited meetings", "Advanced AI analysis", "Action item extraction", "Sentiment analysis", "Integration support", "Priority support"];
    };
    readonly ENTERPRISE: {
        readonly name: "Enterprise";
        readonly price: null;
        readonly meetings_per_month: -1;
        readonly features: readonly ["Everything in Pro", "Custom integrations", "Advanced analytics", "Team management", "SSO support", "Dedicated support"];
    };
};
export declare const MEETING_STATUS: {
    readonly SCHEDULED: "scheduled";
    readonly IN_PROGRESS: "in_progress";
    readonly COMPLETED: "completed";
    readonly CANCELLED: "cancelled";
};
export declare const TRANSCRIPTION_STATUS: {
    readonly PENDING: "pending";
    readonly PROCESSING: "processing";
    readonly COMPLETED: "completed";
    readonly FAILED: "failed";
};
export declare const ACTION_ITEM_PRIORITY: {
    readonly LOW: "low";
    readonly MEDIUM: "medium";
    readonly HIGH: "high";
};
export declare const ACTION_ITEM_STATUS: {
    readonly PENDING: "pending";
    readonly IN_PROGRESS: "in_progress";
    readonly COMPLETED: "completed";
};
export declare const SENTIMENT_TYPES: {
    readonly POSITIVE: "positive";
    readonly NEUTRAL: "neutral";
    readonly NEGATIVE: "negative";
};
export declare const INTEGRATION_PLATFORMS: {
    readonly ZOOM: "zoom";
    readonly GOOGLE_MEET: "google_meet";
    readonly TEAMS: "teams";
    readonly MANUAL: "manual";
};
export declare const FILE_LIMITS: {
    readonly AUDIO: {
        readonly MAX_SIZE: number;
        readonly ALLOWED_TYPES: readonly ["audio/mpeg", "audio/wav", "audio/mp4", "audio/m4a"];
    };
    readonly AVATAR: {
        readonly MAX_SIZE: number;
        readonly ALLOWED_TYPES: readonly ["image/jpeg", "image/png", "image/webp"];
    };
};
export declare const PAGINATION_DEFAULTS: {
    readonly PAGE: 1;
    readonly LIMIT: 20;
    readonly MAX_LIMIT: 100;
};
//# sourceMappingURL=index.d.ts.map