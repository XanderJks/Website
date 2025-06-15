/*
  # Add authentication user

  1. Create admin user
    - Email: admin@jonkersai.nl
    - Password: JonkersAI2025! (you should change this after first login)

  2. This user will automatically have admin permissions based on the email domain check in AuthContext.tsx
*/

-- Create a new user with email/password authentication
-- Note: Passwords are automatically hashed by Supabase Auth
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@jonkersai.nl',
  -- Password: JonkersAI2025!
  crypt('JonkersAI2025!', gen_salt('bf')),
  now(),
  null,
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"name": "Admin User"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- Create stored procedure for admin check
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_user_email TEXT;
BEGIN
  -- Get the email of the current logged in user
  SELECT email INTO current_user_email
  FROM auth.users
  WHERE id = auth.uid();
  
  -- Check if the email ends with @jonkersai.nl
  RETURN current_user_email LIKE '%@jonkersai.nl';
END;
$$;