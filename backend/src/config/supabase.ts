import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

let _supabase: SupabaseClient<Database> | null = null;

// Lazy initialization of Supabase client
function initializeSupabase(): SupabaseClient<Database> {
  if (_supabase) {
    return _supabase;
  }

  // Supabase configuration
  const supabaseUrl = process.env.SUPABASE_URL || 'http://127.0.0.1:54321';
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseServiceKey) {
    console.error('Environment variables:', {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? '[SET]' : '[NOT SET]',
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? '[SET]' : '[NOT SET]'
    });
    throw new Error('Missing Supabase service role key or anon key');
  }

  // Connection pooling configuration
  const connectionPoolConfig = {
    // Maximum number of connections in the pool
    max: parseInt(process.env.DB_POOL_MAX || '20'),
    // Minimum number of connections in the pool
    min: parseInt(process.env.DB_POOL_MIN || '2'),
    // Maximum time a connection can be idle before being released
    idleTimeoutMillis: parseInt(process.env.DB_POOL_IDLE_TIMEOUT || '30000'),
    // Maximum time to wait for a connection
    connectionTimeoutMillis: parseInt(process.env.DB_POOL_CONNECTION_TIMEOUT || '10000'),
  };

  // Create Supabase client with service role for backend operations
  _supabase = createClient(
    supabaseUrl,
    supabaseServiceKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      },
      db: {
        schema: 'public'
      },
      global: {
        headers: {
          'x-connection-pool': 'enabled'
        }
      }
    }
  );

  return _supabase;
}

// Export getter function instead of direct client
export const supabase = new Proxy({} as SupabaseClient<Database>, {
  get(target, prop) {
    const client = initializeSupabase();
    return (client as any)[prop];
  }
});

// Create client for user authentication (with anon key)
export const createUserClient = (accessToken?: string): SupabaseClient<Database> => {
  const supabaseUrl = process.env.SUPABASE_URL || 'http://127.0.0.1:54321';
  const anonKey = process.env.SUPABASE_ANON_KEY;
  
  if (!anonKey) {
    throw new Error('Missing Supabase anon key');
  }

  const client = createClient(supabaseUrl, anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  // Set the user's access token if provided
  if (accessToken) {
    client.auth.setSession({
      access_token: accessToken,
      refresh_token: '',
      expires_in: 3600,
      expires_at: Date.now() + 3600 * 1000,
      token_type: 'bearer',
      user: null
    });
  }

  return client;
};

export default supabase;