/*
  # Fix Database Schema Issues

  1. Modify blog_posts table
     - Add missing 'meta_title' and 'meta_description' columns 
     - Rename 'featured_image' to 'featured_image_url' to match frontend code

  2. Fix blog_post_categories relationship issues
     - Add explicit permissions for authenticated users to manage blog_categories
     - Ensure the correct relationship between categories and posts

  3. Update RLS policies
     - Fix RLS policies to allow proper access for authenticated users
*/

-- 1. Add missing columns to blog_posts table
ALTER TABLE IF EXISTS public.blog_posts 
ADD COLUMN IF NOT EXISTS meta_title text,
ADD COLUMN IF NOT EXISTS meta_description text;

-- Rename 'featured_image' to 'featured_image_url' if it exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_schema = 'public' 
             AND table_name = 'blog_posts' 
             AND column_name = 'featured_image') THEN
    ALTER TABLE public.blog_posts RENAME COLUMN featured_image TO featured_image_url;
  END IF;
EXCEPTION
  WHEN others THEN
    -- If column doesn't exist, do nothing
    NULL;
END $$;

-- 2. Add INSERT policy for blog_categories for authenticated users
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'blog_categories' 
    AND cmd = 'INSERT'
    AND array_to_string(roles, ',') LIKE '%authenticated%'
  ) THEN
    EXECUTE 'CREATE POLICY "Authenticated users can insert blog categories"
      ON public.blog_categories
      FOR INSERT
      TO authenticated
      WITH CHECK (true)';
  END IF;
END $$;

-- 3. Add explicit INSERT permission for blog_posts_categories junction table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'blog_posts_categories' 
    AND cmd = 'INSERT'
    AND array_to_string(roles, ',') LIKE '%authenticated%'
  ) THEN
    EXECUTE 'CREATE POLICY "Authenticated users can insert blog_posts_categories"
      ON public.blog_posts_categories
      FOR INSERT
      TO authenticated
      WITH CHECK (true)';
  END IF;
END $$;

-- 4. Add explicit INSERT permission for blog_posts_tags junction table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'blog_posts_tags' 
    AND cmd = 'INSERT'
    AND array_to_string(roles, ',') LIKE '%authenticated%'
  ) THEN
    EXECUTE 'CREATE POLICY "Authenticated users can insert blog_posts_tags"
      ON public.blog_posts_tags
      FOR INSERT
      TO authenticated
      WITH CHECK (true)';
  END IF;
END $$;

-- 5. Add specific policy for credentials authentication
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'credentials' 
    AND cmd = 'SELECT'
    AND array_to_string(roles, ',') LIKE '%public%'
  ) THEN
    EXECUTE 'CREATE POLICY "Anyone can read credentials for authentication"
      ON public.credentials
      FOR SELECT
      TO public
      USING (true)';
  END IF;
END $$;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.credentials TO anon, authenticated;
GRANT ALL ON public.blog_categories TO authenticated;
GRANT ALL ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts_categories TO authenticated;
GRANT ALL ON public.blog_posts_tags TO authenticated;
GRANT ALL ON public.blog_tags TO authenticated;

-- Insert some initial data for testing if tables are empty
INSERT INTO public.blog_categories (name, slug, description)
SELECT 'Uncategorized', 'uncategorized', 'Default category for posts'
WHERE NOT EXISTS (SELECT 1 FROM public.blog_categories LIMIT 1);

INSERT INTO public.blog_tags (name, slug)
SELECT 'General', 'general'
WHERE NOT EXISTS (SELECT 1 FROM public.blog_tags LIMIT 1);