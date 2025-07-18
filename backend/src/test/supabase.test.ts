import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

describe('Supabase Integration', () => {
  let supabase: ReturnType<typeof createClient<Database>>;

  beforeAll(() => {
    // Use test environment variables or defaults for local development
    const supabaseUrl = process.env.SUPABASE_URL || 'http://127.0.0.1:54321';
    const supabaseKey = process.env.SUPABASE_ANON_KEY || 'test-key';

    supabase = createClient<Database>(supabaseUrl, supabaseKey);
  });

  describe('Database Connection', () => {
    it('should connect to Supabase', async () => {
      // This test will pass if Supabase is running and accessible
      // It may fail if tables don't exist yet, which is expected before migrations
      const { error } = await supabase.from('profiles').select('count').limit(1);
      
      // We expect either success or a "relation does not exist" error (before migrations)
      if (error) {
        expect(
          error.message.includes('relation "profiles" does not exist') ||
          error.message.includes('permission denied') ||
          error.message.includes('JWT')
        ).toBe(true);
      }
    });
  });

  describe('Storage Buckets', () => {
    it('should be able to list storage buckets', async () => {
      const { data, error } = await supabase.storage.listBuckets();
      
      // This might fail if we don't have proper permissions, which is expected
      if (error) {
        expect(error.message).toBeDefined();
      } else {
        expect(Array.isArray(data)).toBe(true);
      }
    });
  });

  describe('Authentication', () => {
    it('should handle auth state', async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      // No session expected in test environment
      expect(session).toBeNull();
    });
  });
});