/*
  # Update password update function
  
  1. Changes
     - Modify the update_credential_password function to update both password_hash and Password columns
     - Ensures the plain text password is stored in the Password column 
     - Keeps password_hash for backward compatibility

  2. Security
     - No changes to security policies
     - Function maintains SECURITY DEFINER attribute for proper execution context
*/

-- Drop the existing function if it exists
DROP FUNCTION IF EXISTS update_credential_password;

-- Create updated function that sets both password columns
CREATE OR REPLACE FUNCTION update_credential_password(p_email text, p_new_password text)
RETURNS boolean AS $$
DECLARE
  v_user_id uuid;
  v_count int;
BEGIN
  -- Check if user exists and is the current user
  SELECT id INTO v_user_id
  FROM credentials
  WHERE email = p_email AND email = auth.email();
  
  IF NOT FOUND THEN
    RETURN false;
  END IF;
  
  -- Update both the password_hash (encrypted) and Password (plain text) columns
  UPDATE credentials
  SET 
    password_hash = crypt(p_new_password, gen_salt('bf')),
    "Password" = p_new_password
  WHERE id = v_user_id;
  
  GET DIAGNOSTICS v_count = ROW_COUNT;
  
  RETURN v_count > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure the function is accessible
GRANT EXECUTE ON FUNCTION update_credential_password(text, text) TO authenticated;