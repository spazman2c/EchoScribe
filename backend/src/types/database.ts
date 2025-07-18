export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string
          subscription_tier: 'free' | 'pro' | 'enterprise'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          subscription_tier?: 'free' | 'pro' | 'enterprise'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          subscription_tier?: 'free' | 'pro' | 'enterprise'
          created_at?: string
          updated_at?: string
        }
      }
      meetings: {
        Row: {
          id: string
          title: string
          description: string | null
          scheduled_at: string | null
          duration: number | null
          status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
          participants: string[]
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          scheduled_at?: string | null
          duration?: number | null
          status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
          participants?: string[]
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          scheduled_at?: string | null
          duration?: number | null
          status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
          participants?: string[]
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      transcriptions: {
        Row: {
          id: string
          meeting_id: string
          content: string
          confidence_score: number | null
          audio_file_url: string | null
          processing_status: 'pending' | 'processing' | 'completed' | 'failed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          meeting_id: string
          content: string
          confidence_score?: number | null
          audio_file_url?: string | null
          processing_status?: 'pending' | 'processing' | 'completed' | 'failed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          meeting_id?: string
          content?: string
          confidence_score?: number | null
          audio_file_url?: string | null
          processing_status?: 'pending' | 'processing' | 'completed' | 'failed'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}