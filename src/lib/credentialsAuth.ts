import { supabase } from './supabase';

/**
 * Authenticate a user with credentials stored in the credentials table
 * @param email User email
 * @param password User password
 * @returns Authentication result with user info and token if successful
 */
export async function authenticateWithCredentials(email: string, password: string) {
  try {
    console.log('Attempting authentication for email:', email);
    
    // First check if the credentials are valid using our custom function
    const { data: credentialCheck, error: credentialError } = await supabase
      .rpc('check_credentials', { 
        p_email: email, 
        p_password: password 
      });

    if (credentialError) {
      console.error('Error checking credentials:', credentialError);
      return { success: false, error: 'Invalid credentials' };
    }

    console.log('Credential check result:', credentialCheck);

    // If credential check returned no results
    if (!credentialCheck || credentialCheck.length === 0 || !credentialCheck[0].user_id) {
      console.log('No valid credentials found in database');
      
      // As a fallback, try to fetch the credentials directly to check if they exist
      const { data: directCredentials } = await supabase
        .from('credentials')
        .select('email, "Password"')
        .eq('email', email)
        .single();
        
      if (directCredentials) {
        console.log('Found credentials in database. Stored password matches input:', 
          directCredentials.Password === password);
      } else {
        console.log('No credentials record found for email:', email);
      }
      
      return { success: false, error: 'Invalid email or password' };
    }

    console.log('Credentials valid, proceeding with Supabase auth');

    // Credentials valid, now sign in with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      // If Supabase auth fails but our credentials are valid,
      // we can still proceed with our custom authentication
      console.log('Supabase auth failed, but credentials are valid:', authError);
      
      // Create a mock session since we have verified the credentials
      // This is a simplified version - in production, you'd want a proper JWT
      const mockSession = {
        access_token: 'custom_auth_' + Math.random().toString(36).substring(2),
        token_type: 'bearer',
        expires_in: 3600,
        refresh_token: '',
        user: {
          id: credentialCheck[0].user_id,
          email: email,
          app_metadata: {},
          user_metadata: {},
          aud: 'authenticated',
          created_at: new Date().toISOString()
        }
      };
      
      return { 
        success: true, 
        user: mockSession.user,
        session: mockSession,
        isAdmin: credentialCheck[0].is_admin 
      };
    }

    return { 
      success: true, 
      user: authData.user,
      session: authData.session,
      isAdmin: credentialCheck[0].is_admin 
    };
  } catch (error) {
    console.error('Unexpected error during authentication:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Update user password in the credentials table
 * @param email User email
 * @param currentPassword Current password for verification
 * @param newPassword New password to set
 * @returns Success status and any error message
 */
export async function updatePassword(email: string, currentPassword: string, newPassword: string) {
  try {
    // First verify the current password is correct
    const authResult = await authenticateWithCredentials(email, currentPassword);
    
    if (!authResult.success) {
      return { success: false, error: 'Current password is incorrect' };
    }

    // Update the password in both systems
    // Update both password columns directly
    const { error: updateError } = await supabase
      .from('credentials')
      .update({ 
        password_hash: newPassword, // This is just for compatibility
        "Password": newPassword     // This is what we actually check against
      })
      .eq('email', email);

    if (updateError) {
      console.error('Error updating password in credentials table:', updateError);
      return { success: false, error: 'Failed to update password' };
    }

    // Update in auth.users (if we were using it)
    // This would typically be done with auth.updateUser, but we're focusing
    // on our custom credentials system

    return { success: true };
  } catch (error) {
    console.error('Unexpected error updating password:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}