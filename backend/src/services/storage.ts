import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

export interface UploadResult {
  path: string;
  publicUrl?: string;
  error?: string;
}

export class StorageService {
  constructor(private supabase: SupabaseClient<Database>) {}

  /**
   * Upload audio file to storage
   */
  async uploadAudioFile(
    userId: string,
    meetingId: string,
    file: Buffer,
    fileName: string,
    mimeType: string
  ): Promise<UploadResult> {
    try {
      // Create file path: userId/meetingId/fileName
      const filePath = `${userId}/${meetingId}/${fileName}`;
      
      const { data, error } = await this.supabase.storage
        .from('audio-files')
        .upload(filePath, file, {
          contentType: mimeType,
          upsert: false
        });

      if (error) {
        return { path: '', error: error.message };
      }

      return { path: data.path };
    } catch (error) {
      return { 
        path: '', 
        error: error instanceof Error ? error.message : 'Unknown upload error' 
      };
    }
  }

  /**
   * Upload processed file (transcript, summary, etc.)
   */
  async uploadProcessedFile(
    userId: string,
    meetingId: string,
    content: string,
    fileName: string,
    mimeType: string = 'application/json'
  ): Promise<UploadResult> {
    try {
      const filePath = `${userId}/${meetingId}/${fileName}`;
      
      const { data, error } = await this.supabase.storage
        .from('processed-files')
        .upload(filePath, content, {
          contentType: mimeType,
          upsert: true // Allow overwriting processed files
        });

      if (error) {
        return { path: '', error: error.message };
      }

      return { path: data.path };
    } catch (error) {
      return { 
        path: '', 
        error: error instanceof Error ? error.message : 'Unknown upload error' 
      };
    }
  }

  /**
   * Get signed URL for private file access
   */
  async getSignedUrl(
    bucket: 'audio-files' | 'processed-files',
    filePath: string,
    expiresIn: number = 3600 // 1 hour default
  ): Promise<{ signedUrl?: string; error?: string }> {
    try {
      const { data, error } = await this.supabase.storage
        .from(bucket)
        .createSignedUrl(filePath, expiresIn);

      if (error) {
        return { error: error.message };
      }

      return { signedUrl: data.signedUrl };
    } catch (error) {
      return { 
        error: error instanceof Error ? error.message : 'Unknown error getting signed URL' 
      };
    }
  }

  /**
   * Delete file from storage
   */
  async deleteFile(
    bucket: 'audio-files' | 'processed-files',
    filePath: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await this.supabase.storage
        .from(bucket)
        .remove([filePath]);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown deletion error' 
      };
    }
  }

  /**
   * List files in a user's directory
   */
  async listUserFiles(
    bucket: 'audio-files' | 'processed-files',
    userId: string,
    meetingId?: string
  ): Promise<{ files?: any[]; error?: string }> {
    try {
      const prefix = meetingId ? `${userId}/${meetingId}` : userId;
      
      const { data, error } = await this.supabase.storage
        .from(bucket)
        .list(prefix);

      if (error) {
        return { error: error.message };
      }

      return { files: data };
    } catch (error) {
      return { 
        error: error instanceof Error ? error.message : 'Unknown error listing files' 
      };
    }
  }
}