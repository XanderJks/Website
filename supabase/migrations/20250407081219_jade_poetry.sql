/*
  # Fix Row Level Security Policies for Blog Posts

  1. Changes
     - Update RLS policy for blog_posts to correctly allow admin users to publish posts
     - Create simpler policy for authenticated users to insert blog posts
     - Fix permission issues preventing blog post creation
     - Ensure users with @jonkersai.nl email domain can manage posts

  2. Security
     - Maintains security by still requiring authentication
     - Only allows full access to admin users
     - Non-admin authenticated users have limited permissions
*/

-- First, drop the existing policy if it's causing problems
DROP POLICY IF EXISTS "Admins can manage all blog posts" ON public.blog_posts;

-- Create a more permissive policy for admins
CREATE POLICY "Admins can manage all blog posts"
  ON public.blog_posts
  FOR ALL 
  TO authenticated
  USING (
    -- Allow access if the user has an email ending with @jonkersai.nl
    auth.email() LIKE '%@jonkersai.nl' OR
    -- Or if they are marked as admin in the credentials table
    EXISTS (
      SELECT 1 FROM public.credentials
      WHERE credentials.email = auth.email()
      AND credentials.is_admin = true
    )
  );

-- Add an additional policy specifically for INSERT operations
CREATE POLICY "Authenticated users can insert blog posts"
  ON public.blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Add an additional policy for UPDATE operations
CREATE POLICY "Authenticated users can update own blog posts"
  ON public.blog_posts
  FOR UPDATE
  TO authenticated
  USING (author_id = auth.uid());

-- Make sure the user has the appropriate permissions on the database objects
GRANT ALL ON public.blog_posts TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Update the admin user to ensure they have admin privileges
UPDATE public.credentials
SET is_admin = true
WHERE email = 'admin@jonkersai.nl'
AND NOT is_admin;

-- Make sure there's a valid author_id reference by checking if the admin user exists in auth.users
DO $$
DECLARE
  admin_id uuid;
BEGIN
  -- Get the admin user ID
  SELECT id INTO admin_id FROM auth.users WHERE email = 'admin@jonkersai.nl' LIMIT 1;
  
  -- If the admin user exists, update any blog posts with null author_id to use the admin user
  IF admin_id IS NOT NULL THEN
    UPDATE public.blog_posts SET author_id = admin_id WHERE author_id IS NULL;
  END IF;
END $$;