export interface User {
    id: string;
    email: string;
    name: string;
    created_at: string;
    subscription_tier: 'free' | 'pro' | 'enterprise';
}
export interface UserProfile extends User {
    avatar_url?: string;
    timezone?: string;
    preferences?: UserPreferences;
}
export interface UserPreferences {
    notifications: {
        email: boolean;
        push: boolean;
        meeting_reminders: boolean;
    };
    ui: {
        theme: 'light' | 'dark' | 'system';
        language: string;
    };
}
export interface CreateUserRequest {
    email: string;
    name: string;
    password: string;
}
export interface UpdateUserRequest {
    name?: string;
    avatar_url?: string;
    timezone?: string;
    preferences?: Partial<UserPreferences>;
}
//# sourceMappingURL=user.d.ts.map