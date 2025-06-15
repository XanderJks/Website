/*
  # Update password check function

  1. Changes
     - Modify the check_credentials function to use the "Password" column instead of password_hash
     - This allows the system to use the plaintext password stored in the database

  2. Security
     - No changes to security policies
     - Function maintains SECURITY DEFINER attribute for proper execution context
*/

-- Drop the existing function if it exists
DROP FUNCTION IF EXISTS public.check_credentials;

-- Recreate the function to use the "Password" column instead of password_hash
CREATE OR REPLACE FUNCTION public.check_credentials(p_email text, p_password text)
RETURNS TABLE(user_id uuid, is_admin boolean) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id as user_id,
    c.is_admin
  FROM 
    credentials c
  WHERE 
    c.email = p_email 
    AND c."Password" = p_password;  -- Use the plain text Password column
END;
$$;

-- Ensure the function is accessible to authenticated users
GRANT EXECUTE ON FUNCTION public.check_credentials(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_credentials(text, text) TO anon;