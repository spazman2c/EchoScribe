// Common types used throughout the application

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  scheduled_at: string;
  duration_minutes?: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  participants: string[];
  transcription_id?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Transcription {
  id: string;
  meeting_id: string;
  content: string;
  audio_url?: string;
  status: 'processing' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface Analysis {
  id: string;
  meeting_id: string;
  summary: string;
  action_items: ActionItem[];
  sentiment_analysis: SentimentAnalysis;
  key_topics: string[];
  created_at: string;
}

export interface ActionItem {
  id: string;
  description: string;
  assigned_to?: string;
  due_date?: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

export interface SentimentAnalysis {
  overall_sentiment: 'positive' | 'neutral' | 'negative';
  sentiment_score: number; // -1 to 1
  emotional_indicators: {
    engagement: number;
    tension: number;
    enthusiasm: number;
  };
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}
