import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { authenticateWithCredentials } from '../lib/credentialsAuth';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      checkAdminStatus(session?.user);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      checkAdminStatus(session?.user);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (user: User | null | undefined) => {
    if (!user) {
      setIsAdmin(false);
      return;
    }

    // For simplicity, we're using email domain to determine admin status
    // In a production app, you would use a more robust role-based system
    if (user.email && user.email.endsWith('@jonkersai.nl')) {
      setIsAdmin(true);
      return;
    }
    
    // You could also check against a database table of admins
    try {
      // Check from our credentials table directly as a fallback
      const { data, error } = await supabase
        .from('credentials')
        .select('is_admin')
        .eq('email', user.email)
        .single();
      
      if (!error && data && data.is_admin) {
        setIsAdmin(true);
      } else {
        // Try the RPC function as another option
        const { data: rpcData, error: rpcError } = await supabase
          .rpc('is_admin');
        
        if (!rpcError && rpcData) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    console.log('Auth context: Sign in attempt for', email);
    
    try {
      // First try authenticating with Supabase auth
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (!signInError && signInData.session) {
        console.log('Supabase authentication successful');
        setSession(signInData.session);
        setUser(signInData.user);
        await checkAdminStatus(signInData.user);
        setIsLoading(false);
        return { error: null };
      }
      
      console.log('Supabase authentication failed, trying credentials auth');
      
      // If Supabase auth fails, try our custom credentials
      const credResult = await authenticateWithCredentials(email, password);
      
      if (credResult.success) {
        console.log('Credentials authentication successful');
        setSession(credResult.session);
        setUser(credResult.user);
        setIsAdmin(credResult.isAdmin);
        setIsLoading(false);
        return { error: null };
      }
      
      console.error('Both authentication methods failed');
      setIsLoading(false);
      return { error: signInError || { message: 'Invalid email or password' } };
    } catch (error) {
      console.error('Authentication error:', error);
      setIsLoading(false);
      return { error };
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setIsAdmin(false);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ session, user, isAdmin, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};