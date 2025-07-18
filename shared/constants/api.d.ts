export declare const DEFAULT_API_BASE_URL = "http://localhost:3001";
export declare const DEFAULT_AI_SERVICES_BASE_URL = "http://localhost:8000";
export declare const API_ENDPOINTS: {
    readonly HEALTH: "/api/health";
    readonly AUTH: {
        readonly LOGIN: "/api/auth/login";
        readonly LOGOUT: "/api/auth/logout";
        readonly REGISTER: "/api/auth/register";
        readonly REFRESH: "/api/auth/refresh";
        readonly PROFILE: "/api/auth/profile";
    };
    readonly USERS: {
        readonly BASE: "/api/users";
        readonly BY_ID: (id: string) => string;
        readonly PROFILE: (id: string) => string;
    };
    readonly MEETINGS: {
        readonly BASE: "/api/meetings";
        readonly BY_ID: (id: string) => string;
        readonly PARTICIPANTS: (id: string) => string;
        readonly UPLOAD_AUDIO: (id: string) => string;
    };
    readonly TRANSCRIPTION: {
        readonly BASE: "/api/transcription";
        readonly BY_MEETING_ID: (meetingId: string) => string;
        readonly JOB_STATUS: (jobId: string) => string;
        readonly START_JOB: "/api/transcription/start";
    };
    readonly ANALYSIS: {
        readonly BASE: "/api/analysis";
        readonly BY_MEETING_ID: (meetingId: string) => string;
        readonly SUMMARY: (meetingId: string) => string;
        readonly ACTION_ITEMS: (meetingId: string) => string;
        readonly SENTIMENT: (meetingId: string) => string;
    };
    readonly INTEGRATIONS: {
        readonly BASE: "/api/integrations";
        readonly ZOOM: "/api/integrations/zoom";
        readonly GOOGLE_MEET: "/api/integrations/google-meet";
        readonly TEAMS: "/api/integrations/teams";
        readonly SLACK: "/api/integrations/slack";
        readonly JIRA: "/api/integrations/jira";
        readonly TRELLO: "/api/integrations/trello";
    };
};
export declare const AI_ENDPOINTS: {
    readonly HEALTH: "/health";
    readonly TRANSCRIBE: "/transcribe";
    readonly ANALYZE: "/analyze";
    readonly SUMMARIZE: "/summarize";
    readonly EXTRACT_ACTION_ITEMS: "/extract-action-items";
    readonly SENTIMENT_ANALYSIS: "/sentiment-analysis";
};
//# sourceMappingURL=api.d.ts.map