/*
  # Add blog tables

  1. New Tables
    - `blog_posts`: Stores blog post content and metadata
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `slug` (text, unique, not null)
      - `content` (text)
      - `excerpt` (text)
      - `featured_image` (text)
      - `status` (text, not null, default: 'draft')
      - `published_at` (timestamp with time zone)
      - `created_at` (timestamp with time zone, default: now())
      - `updated_at` (timestamp with time zone, default: now())
      - `author_id` (uuid, references auth.users)
    
    - `blog_categories`: Stores blog categories
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `slug` (text, unique, not null)
      - `description` (text)
      - `created_at` (timestamp with time zone, default: now())
    
    - `blog_tags`: Stores blog tags
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `slug` (text, unique, not null)
      - `created_at` (timestamp with time zone, default: now())
    
    - `blog_posts_categories`: Junction table for posts and categories
      - `post_id` (uuid, references blog_posts.id)
      - `category_id` (uuid, references blog_categories.id)
      - `created_at` (timestamp with time zone, default: now())
    
    - `blog_posts_tags`: Junction table for posts and tags
      - `post_id` (uuid, references blog_posts.id)
      - `tag_id` (uuid, references blog_tags.id)
      - `created_at` (timestamp with time zone, default: now())

  2. Security
    - Enable RLS on all tables
    - Add policies for admins to manage all blog content
    - Add policies for public to read published blog content
*/

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text,
  excerpt text,
  featured_image text,
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  author_id uuid REFERENCES auth.users(id)
);

-- Create blog_categories table
CREATE TABLE IF NOT EXISTS public.blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create blog_tags table
CREATE TABLE IF NOT EXISTS public.blog_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Create junction table for posts and categories
CREATE TABLE IF NOT EXISTS public.blog_posts_categories (
  post_id uuid REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  category_id uuid REFERENCES public.blog_categories(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (post_id, category_id)
);

-- Create junction table for posts and tags
CREATE TABLE IF NOT EXISTS public.blog_posts_tags (
  post_id uuid REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES public.blog_tags(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (post_id, tag_id)
);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts_tags ENABLE ROW LEVEL SECURITY;

-- POLICIES FOR blog_posts

-- Admin can do everything with blog posts
CREATE POLICY "Admins can manage all blog posts"
  ON public.blog_posts
  FOR ALL 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.credentials
      WHERE credentials.email = auth.email()
      AND credentials.is_admin = true
    )
  );

-- Public can read published posts
CREATE POLICY "Public can read published blog posts"
  ON public.blog_posts
  FOR SELECT
  TO public
  USING (status = 'published' AND published_at <= now());

-- POLICIES FOR blog_categories

-- Admin can do everything with categories
CREATE POLICY "Admins can manage all blog categories"
  ON public.blog_categories
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.credentials
      WHERE credentials.email = auth.email()
      AND credentials.is_admin = true
    )
  );

-- Public can read categories
CREATE POLICY "Public can read blog categories"
  ON public.blog_categories
  FOR SELECT
  TO public
  USING (true);

-- POLICIES FOR blog_tags

-- Admin can do everything with tags
CREATE POLICY "Admins can manage all blog tags"
  ON public.blog_tags
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.credentials
      WHERE credentials.email = auth.email()
      AND credentials.is_admin = true
    )
  );

-- Public can read tags
CREATE POLICY "Public can read blog tags"
  ON public.blog_tags
  FOR SELECT
  TO public
  USING (true);

-- POLICIES FOR blog_posts_categories

-- Admin can do everything with post-category relationships
CREATE POLICY "Admins can manage all blog post categories"
  ON public.blog_posts_categories
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.credentials
      WHERE credentials.email = auth.email()
      AND credentials.is_admin = true
    )
  );

-- Public can read post-category relationships for published posts
CREATE POLICY "Public can read blog post categories for published posts"
  ON public.blog_posts_categories
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM public.blog_posts
      WHERE blog_posts.id = post_id
      AND blog_posts.status = 'published'
      AND blog_posts.published_at <= now()
    )
  );

-- POLICIES FOR blog_posts_tags

-- Admin can do everything with post-tag relationships
CREATE POLICY "Admins can manage all blog post tags"
  ON public.blog_posts_tags
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.credentials
      WHERE credentials.email = auth.email()
      AND credentials.is_admin = true
    )
  );

-- Public can read post-tag relationships for published posts
CREATE POLICY "Public can read blog post tags for published posts"
  ON public.blog_posts_tags
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM public.blog_posts
      WHERE blog_posts.id = post_id
      AND blog_posts.status = 'published'
      AND blog_posts.published_at <= now()
    )
  );