/**
 * Meeting-related type definitions
 */

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  scheduled_at: string;
  duration?: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  participants: string[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface MeetingDetails extends Meeting {
  audio_file_url?: string;
  transcription_id?: string;
  analysis_id?: string;
  integration_data?: MeetingIntegrationData;
}

export interface MeetingIntegrationData {
  platform: 'zoom' | 'google_meet' | 'teams' | 'manual';
  external_id?: string;
  join_url?: string;
  recording_url?: string;
}

export interface CreateMeetingRequest {
  title: string;
  description?: string;
  scheduled_at: string;
  duration?: number;
  participants: string[];
}

export interface UpdateMeetingRequest {
  title?: string;
  description?: string;
  scheduled_at?: string;
  duration?: number;
  participants?: string[];
  status?: Meeting['status'];
}

export interface MeetingParticipant {
  user_id: string;
  name: string;
  email: string;
  role: 'organizer' | 'participant' | 'optional';
  attendance_status: 'pending' | 'accepted' | 'declined' | 'attended' | 'absent';
}