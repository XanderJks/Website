/*
  # Add Password column to credentials table

  1. Changes
     - Adds a new column "Password" to store the plain text password
     - Updates the existing admin user record with the password "Xander12"

  2. Notes
     - Storing passwords in plain text is generally not recommended for security reasons
     - This is being done as specifically requested
*/

-- Add Password column to credentials table
ALTER TABLE credentials
ADD COLUMN "Password" text;

-- Update existing admin user with the password
UPDATE credentials
SET "Password" = 'Xander12'
WHERE email = 'admin@jonkersai.nl';