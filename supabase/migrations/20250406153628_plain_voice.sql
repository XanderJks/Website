/*
  # Create credentials table

  1. New Tables
    - `credentials`
      - `id` (uuid, primary key)
      - `created_at` (timestamp with timezone)
      - `email` (text, unique)
      - `password_hash` (text)
      - `is_admin` (boolean)
      - `last_login` (timestamp with timezone, nullable)

  2. Initial Data
    - Add admin user with email: admin@jonkersai.nl

  3. Security
    - Enable RLS on the table
    - Add policy for admins to read all credentials
    - Add policy for users to read their own credential
*/

-- Create credentials table
CREATE TABLE IF NOT EXISTS credentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  is_admin boolean DEFAULT false,
  last_login timestamptz
);

-- Insert admin credentials
-- Note: In production, use a more secure password and don't store plaintext password in migration files
INSERT INTO credentials (email, password_hash, is_admin)
VALUES (
  'admin@jonkersai.nl', 
  -- This is a hash of 'JonkersAI2025!' using bcrypt
  '$2a$10$XSNYNfYA8qTcJ0Ov1pZ8H.XK3CjoZfCLmDNLJVGlLY78X.2PKqeFS',
  true
);

-- Enable Row Level Security
ALTER TABLE credentials ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
-- Policy for admins to read all credentials
CREATE POLICY "Admins can read all credentials"
  ON credentials
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM credentials 
      WHERE email = auth.email() AND is_admin = true
    )
  );

-- Policy for users to read their own credential
CREATE POLICY "Users can read own credential"
  ON credentials
  FOR SELECT
  TO authenticated
  USING (email = auth.email());

-- Policy for users to update their own credential
CREATE POLICY "Users can update own credential"
  ON credentials
  FOR UPDATE
  TO authenticated
  USING (email = auth.email())
  WITH CHECK (email = auth.email());

-- Helper function to validate credentials
CREATE OR REPLACE FUNCTION check_credentials(p_email text, p_password text)
RETURNS TABLE (user_id uuid, is_admin boolean) AS $$
DECLARE
  v_password_hash text;
  v_user_id uuid;
  v_is_admin boolean;
BEGIN
  -- Get the password hash and user ID for the given email
  SELECT id, password_hash, is_admin
  INTO v_user_id, v_password_hash, v_is_admin
  FROM credentials
  WHERE email = p_email;
  
  -- If user exists and password matches, return user_id and is_admin
  IF FOUND AND crypt(p_password, v_password_hash) = v_password_hash THEN
    -- Update last login time
    UPDATE credentials 
    SET last_login = now()
    WHERE id = v_user_id;
    
    RETURN QUERY SELECT v_user_id, v_is_admin;
  ELSE
    -- Return empty result
    RETURN QUERY SELECT NULL::uuid, NULL::boolean WHERE false;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;