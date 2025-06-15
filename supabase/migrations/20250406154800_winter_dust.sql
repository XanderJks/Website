/*
  # Fix ambiguous is_admin column reference

  1. Changes
     - Update the `check_credentials` function to properly qualify the `is_admin` column
     - Ensure the function returns the correct credentials data with properly referenced columns

  2. Security
     - No changes to security policies
*/

-- Drop the existing function if it exists
DROP FUNCTION IF EXISTS public.check_credentials;

-- Recreate the function with properly qualified column references
CREATE OR REPLACE FUNCTION public.check_credentials(p_email text, p_password text)
RETURNS TABLE(user_id uuid, is_admin boolean) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id as user_id,
    c.is_admin  -- Explicitly referring to the is_admin column from credentials table
  FROM 
    credentials c
  WHERE 
    c.email = p_email 
    AND c.password_hash = crypt(p_password, c.password_hash);
END;
$$;

-- Ensure the function is accessible to authenticated users
GRANT EXECUTE ON FUNCTION public.check_credentials(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_credentials(text, text) TO anon;