import { supabase } from '../config/supabase';
import { Database } from '../types/database';

export interface DatabaseHealthCheck {
  connected: boolean;
  latency?: number;
  error?: string;
  poolStatus?: {
    activeConnections: number;
    idleConnections: number;
    totalConnections: number;
  };
}

export class DatabaseService {
  /**
   * Check database connection health
   */
  async healthCheck(): Promise<DatabaseHealthCheck> {
    try {
      const startTime = Date.now();
      
      // Simple query to test connection
      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1);

      const latency = Date.now() - startTime;

      if (error) {
        return {
          connected: false,
          latency,
          error: error.message
        };
      }

      return {
        connected: true,
        latency
      };
    } catch (error) {
      return {
        connected: false,
        error: error instanceof Error ? error.message : 'Unknown database error'
      };
    }
  }

  /**
   * Initialize user profile after signup
   */
  async createUserProfile(
    userId: string,
    email: string,
    name: string,
    subscriptionTier: 'free' | 'pro' | 'enterprise' = 'free'
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          email,
          name,
          subscription_tier: subscriptionTier
        });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error creating profile'
      };
    }
  }

  /**
   * Get user profile
   */
  async getUserProfile(userId: string): Promise<{
    profile?: Database['public']['Tables']['profiles']['Row'];
    error?: string;
  }> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        return { error: error.message };
      }

      return { profile: data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Unknown error fetching profile'
      };
    }
  }

  /**
   * Update user profile
   */
  async updateUserProfile(
    userId: string,
    updates: Database['public']['Tables']['profiles']['Update']
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error updating profile'
      };
    }
  }

  /**
   * Test database migrations
   */
  async testMigrations(): Promise<{ success: boolean; error?: string; tables?: string[] }> {
    try {
      // Check if all required tables exist
      const requiredTables = ['profiles', 'meetings', 'transcriptions'];
      const existingTables: string[] = [];

      for (const table of requiredTables) {
        const { data, error } = await supabase
          .from(table as any)
          .select('*')
          .limit(0);

        if (!error) {
          existingTables.push(table);
        }
      }

      if (existingTables.length !== requiredTables.length) {
        const missingTables = requiredTables.filter(t => !existingTables.includes(t));
        return {
          success: false,
          error: `Missing tables: ${missingTables.join(', ')}`,
          tables: existingTables
        };
      }

      return {
        success: true,
        tables: existingTables
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error testing migrations'
      };
    }
  }

  /**
   * Test storage buckets
   */
  async testStorageBuckets(): Promise<{ success: boolean; error?: string; buckets?: string[] }> {
    try {
      const { data: buckets, error } = await supabase.storage.listBuckets();

      if (error) {
        return { success: false, error: error.message };
      }

      const requiredBuckets = ['audio-files', 'processed-files'];
      const existingBuckets = buckets?.map(b => b.name) || [];
      const missingBuckets = requiredBuckets.filter(b => !existingBuckets.includes(b));

      if (missingBuckets.length > 0) {
        return {
          success: false,
          error: `Missing storage buckets: ${missingBuckets.join(', ')}`,
          buckets: existingBuckets
        };
      }

      return {
        success: true,
        buckets: existingBuckets
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error testing storage buckets'
      };
    }
  }
}

export const databaseService = new DatabaseService();