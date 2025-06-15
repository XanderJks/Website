import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import { ChevronLeft, Calendar, User, Tag, Edit, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { SEOHead } from '../components/SEOHead';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featured_image_url: string | null;
  published_at: string;
  author_name: string;
  meta_title: string | null;
  meta_description: string | null;
  categories: { id: string; name: string; slug: string }[];
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPost() {
      try {
        // Get post by slug
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            id,
            title,
            content,
            excerpt,
            featured_image_url,
            published_at,
            author_id,
            meta_title,
            meta_description
          `)
          .eq('slug', slug)
          .or(`status.eq.published,status.eq.scheduled`)
          .lte('published_at', new Date().toISOString())
          .single();

        if (error) throw error;
        
        if (!data) {
          setError('Post not found');
          setLoading(false);
          return;
        }

        console.log('Fetched post data:', data);

        // Get author info - simplified approach since auth.users table doesn't exist
        let authorName = "Admin"; // Default author name
        try {
          // Try to get author's email from credentials table
          const { data: authorData } = await supabase
            .from('credentials')
            .select('email')
            .eq('id', data.author_id)
            .single();

          if (authorData?.email) {
            authorName = authorData.email.split('@')[0] || 'Admin';
          }
        } catch (e) {
          console.log('Could not get author info, using default', e);
        }

        // Get categories for this post
        let categories = [];
        try {
          const { data: categoriesData, error: categoriesError } = await supabase
            .from('blog_posts_categories')
            .select(`
              category_id,
              blog_categories:category_id (
                id, 
                name, 
                slug
              )
            `)
            .eq('post_id', data.id);

          if (!categoriesError && categoriesData) {
            categories = categoriesData.map(item => item.blog_categories);
          } else {
            console.error('Error fetching categories:', categoriesError);
          }
        } catch (e) {
          console.error('Exception fetching categories:', e);
        }

        setPost({
          id: data.id,
          title: data.title,
          content: data.content,
          excerpt: data.excerpt,
          featured_image_url: data.featured_image_url,
          published_at: data.published_at,
          author_name: authorName,
          meta_title: data.meta_title,
          meta_description: data.meta_description,
          categories: categories,
        });
      } catch (error: any) {
        console.error('Error fetching blog post:', error);
        setError(error.message || 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  // Navigate to edit page
  const handleEdit = () => {
    if (post) {
      navigate(`/admin/posts/edit/${post.id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">{error || 'Post not found'}</h2>
        <Link to="/blog" className="text-indigo-400 hover:text-indigo-300 inline-flex items-center">
          <ArrowLeft size={16} className="mr-1" /> Back to blog
        </Link>
      </div>
    );
  }

  const categoryNames = post.categories?.map(cat => cat.name).join(', ') || '';
  const tagNames = post.categories?.map(cat => cat.name) || [];

  return (
    <div className="relative z-10">
      <SEOHead
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt}
        keywords={`AI telefonie, ${categoryNames}, kunstmatige intelligentie, telefoonautomatisering`}
        url={`https://jonkersai.nl/blog/${slug}`}
        image={post.featured_image_url || "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop"}
        type="article"
        author={post.author_name}
        publishedTime={post.published_at}
        section={post.categories?.[0]?.name}
        tags={tagNames}
      />

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Back to blog link */}
        <nav className="mb-8">
          <Link 
            to="/blog"
            className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <ChevronLeft size={16} className="mr-1" aria-hidden="true" /> Back to all posts
          </Link>
        </nav>

        {/* Post header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {post.categories && post.categories.length > 0 ? (
              post.categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/blog?category=${category.slug}`}
                  className="inline-flex items-center text-xs px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full hover:bg-indigo-500/30 transition-colors"
                >
                  <Tag size={12} className="mr-1" aria-hidden="true" />
                  {category.name}
                </Link>
              ))
            ) : (
              <span className="inline-flex items-center text-xs px-3 py-1 bg-gray-500/20 text-gray-300 rounded-full">
                <Tag size={12} className="mr-1" aria-hidden="true" />
                Uncategorized
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
          <div className="flex items-center text-gray-300 space-x-4">
            <span className="flex items-center">
              <User size={16} className="mr-2" aria-hidden="true" />
              {post.author_name}
            </span>
            <span className="flex items-center">
              <Calendar size={16} className="mr-2" aria-hidden="true" />
              <time dateTime={post.published_at}>
                {format(new Date(post.published_at), 'MMMM d, yyyy')}
              </time>
            </span>
            {isAdmin && (
              <button 
                onClick={handleEdit}
                className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <Edit size={16} className="mr-2" aria-hidden="true" />
                Edit Post
              </button>
            )}
          </div>
        </header>

        {/* Featured image */}
        {post.featured_image_url && (
          <div className="mb-10 rounded-lg overflow-hidden">
            <img 
              src={post.featured_image_url} 
              alt={post.title} 
              className="w-full h-auto object-cover max-h-[500px]"
              loading="lazy"
            />
          </div>
        )}

        {/* Post content */}
        <div 
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </article>
    </div>
  );
}