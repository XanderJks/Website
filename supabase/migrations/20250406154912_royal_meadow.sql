/*
  # Update admin password

  1. Changes
     - Updates the password for the admin user (admin@jonkersai.nl) to "Xander12"
     - Creates a new bcrypt hash for the updated password

  2. Security
     - No changes to security policies
     - Only updates existing admin user
*/

-- Update the admin password in credentials table
UPDATE credentials
SET password_hash = crypt('Xander12', gen_salt('bf'))
WHERE email = 'admin@jonkersai.nl';

-- Also update the password in auth.users to keep them in sync
UPDATE auth.users
SET encrypted_password = crypt('Xander12', gen_salt('bf'))
WHERE email = 'admin@jonkersai.nl';