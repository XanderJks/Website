/*
  # Fix RLS policies for blog content tables

  1. Changes
     - Add policies to allow authenticated users to create content
     - Fix the admin policy for blog posts
     - Add proper INSERT policies for junction tables
  
  2. Security
     - Maintains security while enabling proper functionality
     - Ensures admins can manage all content
     - Allows authenticated users to insert content
*/

-- Add policy for blog_tags to allow authenticated users to create tags
DROP POLICY IF EXISTS "Authenticated users can insert blog_tags" ON blog_tags;

CREATE POLICY "Authenticated users can insert blog_tags"
  ON blog_tags
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Fix blog_posts admin policy to use proper admin check
DROP POLICY IF EXISTS "Admins can manage all blog posts" ON blog_posts;

CREATE POLICY "Admins can manage all blog posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (
    (auth.email() LIKE '%@jonkersai.nl') OR 
    EXISTS (
      SELECT 1 FROM credentials
      WHERE credentials.email = auth.email() AND credentials.is_admin = true
    )
  );

-- Add specific INSERT policy for blog_posts
DROP POLICY IF EXISTS "Authenticated users can insert blog posts" ON blog_posts;

CREATE POLICY "Authenticated users can insert blog posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Fix blog_posts_categories INSERT policy to ensure it works properly
DROP POLICY IF EXISTS "Authenticated users can insert blog_posts_categories" ON blog_posts_categories;

CREATE POLICY "Authenticated users can insert blog_posts_categories"
  ON blog_posts_categories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Fix blog_posts_tags INSERT policy to ensure it works properly
DROP POLICY IF EXISTS "Authenticated users can insert blog_posts_tags" ON blog_posts_tags;

CREATE POLICY "Authenticated users can insert blog_posts_tags"
  ON blog_posts_tags
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Ensure permissions are properly granted
GRANT ALL ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_tags TO authenticated;
GRANT ALL ON public.blog_categories TO authenticated;
GRANT ALL ON public.blog_posts_categories TO authenticated;
GRANT ALL ON public.blog_posts_tags TO authenticated;