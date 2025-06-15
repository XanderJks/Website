/*
  # Create contact requests table

  1. New Tables
    - `contact_requests`
      - `id` (uuid, primary key)
      - `created_at` (timestamp with timezone)
      - `name` (text)
      - `email` (text)
      - `service` (text)
      - `company_name` (text)
      - `problems` (text)
      - `additional_info` (text, nullable)
      - `status` (text, default: 'new')

  2. Security
    - Enable RLS on `contact_requests` table
    - Add policy for inserting new contact requests
    - Add policy for reading own contact requests based on email
*/

CREATE TABLE IF NOT EXISTS contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  service text NOT NULL,
  company_name text NOT NULL,
  problems text NOT NULL,
  additional_info text,
  status text DEFAULT 'new'
);

ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert new contact requests
CREATE POLICY "Anyone can insert contact requests"
  ON contact_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow users to read their own contact requests
CREATE POLICY "Users can read own contact requests"
  ON contact_requests
  FOR SELECT
  TO public
  USING (email = current_user);