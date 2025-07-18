export interface Transcription {
    id: string;
    meeting_id: string;
    content: string;
    confidence_score: number;
    language: string;
    created_at: string;
    segments?: TranscriptionSegment[];
}
export interface TranscriptionSegment {
    id: string;
    start_time: number;
    end_time: number;
    text: string;
    speaker?: string;
    confidence: number;
}
export interface MeetingAnalysis {
    id: string;
    meeting_id: string;
    transcription_id: string;
    summary: string;
    key_points: string[];
    action_items: ActionItem[];
    sentiment_analysis: SentimentAnalysis;
    follow_up_suggestions: string[];
    created_at: string;
}
export interface ActionItem {
    id: string;
    description: string;
    assigned_to?: string;
    due_date?: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'in_progress' | 'completed';
    context?: string;
}
export interface SentimentAnalysis {
    overall_sentiment: 'positive' | 'neutral' | 'negative';
    sentiment_score: number;
    emotional_indicators: {
        enthusiasm: number;
        concern: number;
        agreement: number;
        confusion: number;
    };
    participant_sentiments?: ParticipantSentiment[];
}
export interface ParticipantSentiment {
    participant_id: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    engagement_level: number;
    speaking_time_percentage: number;
}
export interface CreateTranscriptionRequest {
    meeting_id: string;
    audio_file_url: string;
    language?: string;
}
export interface TranscriptionJob {
    id: string;
    meeting_id: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress: number;
    error_message?: string;
    created_at: string;
    completed_at?: string;
}
//# sourceMappingURL=transcription.d.ts.map