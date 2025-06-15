/*
  # Fix check_credentials function

  1. Changes
     - Update the check_credentials RPC function to fix ambiguous column reference
     - Properly qualify is_admin column with table name to avoid ambiguity
     - Return both user_id and is_admin fields with clear table references

  This migration fixes an error where "column reference 'is_admin' is ambiguous" by
  ensuring all column references are properly qualified with their table names.
*/

CREATE OR REPLACE FUNCTION public.check_credentials(p_email text, p_password text)
RETURNS TABLE(user_id uuid, is_admin boolean) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    credentials.id AS user_id, 
    credentials.is_admin
  FROM 
    credentials
  WHERE 
    credentials.email = p_email 
    AND credentials."Password" = p_password;
END;
$$;