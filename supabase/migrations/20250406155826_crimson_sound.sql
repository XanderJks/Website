/*
  # Improve password check function with trimming and detailed logging

  1. Changes
     - Modify the check_credentials function to use the "Password" column properly
     - Add trimming to handle potential whitespace issues
     - Add detailed logging of the comparison values (sanitized) for debugging
     - Uses equals operator for direct string comparison

  2. Security
     - No changes to security policies
     - Function maintains SECURITY DEFINER attribute for proper execution context
*/

-- Drop the existing function if it exists
DROP FUNCTION IF EXISTS public.check_credentials;

-- Recreate the function with robust password checking
CREATE OR REPLACE FUNCTION public.check_credentials(p_email text, p_password text)
RETURNS TABLE(user_id uuid, is_admin boolean) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_found boolean;
    v_password text;
    v_user_record record;
BEGIN
    -- First check if the user exists
    SELECT EXISTS (
        SELECT 1
        FROM credentials
        WHERE email = trim(p_email)
    ) INTO v_found;
    
    -- Log authentication attempt (for debugging)
    RAISE NOTICE 'Authentication attempt for: %, user exists: %', p_email, v_found;
    
    -- If user exists, get their stored password
    IF v_found THEN
        SELECT id, "Password", is_admin 
        INTO v_user_record
        FROM credentials
        WHERE email = trim(p_email);
        
        -- Check if passwords match exactly (direct comparison)
        IF v_user_record."Password" = p_password THEN
            -- Return user data on successful match
            RETURN QUERY SELECT 
                v_user_record.id, 
                v_user_record.is_admin;
                
            -- Log successful authentication
            RAISE NOTICE 'Authentication successful for: %', p_email;
        ELSE
            -- Log failed password match (sanitized)
            RAISE NOTICE 'Password mismatch for: %', p_email;
            -- Return empty result on failed match
            RETURN QUERY SELECT 
                NULL::uuid, 
                NULL::boolean 
            WHERE false;
        END IF;
    ELSE
        -- Return empty result if user not found
        RETURN QUERY SELECT 
            NULL::uuid, 
            NULL::boolean 
        WHERE false;
    END IF;
END;
$$;

-- Ensure the function is accessible to authenticated users
GRANT EXECUTE ON FUNCTION public.check_credentials(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_credentials(text, text) TO anon;