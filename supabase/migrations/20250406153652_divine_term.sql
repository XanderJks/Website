/*
  # Add password update function
  
  Creates a secure function to update passwords in the credentials table
  with proper hashing.
*/

-- Function to update password with proper hashing
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
  
  -- Update the password with proper hashing
  UPDATE credentials
  SET password_hash = crypt(p_new_password, gen_salt('bf'))
  WHERE id = v_user_id;
  
  GET DIAGNOSTICS v_count = ROW_COUNT;
  
  RETURN v_count > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;