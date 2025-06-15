import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Don't persist the session to avoid auth issues
    autoRefreshToken: true,
    detectSessionInUrl: false
  },
  global: {
    headers: {
      'Content-Type': 'application/json'
    }
  }
});

// Log to verify Supabase initialization and confirm environment variables
console.log('Supabase client initialized with URL:', supabaseUrl);