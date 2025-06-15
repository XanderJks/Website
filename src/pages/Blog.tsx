import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import { ChevronRight, Tag, Calendar, User } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image_url: string | null;
  published_at: string;
  author_name: string;
  categories: { id: string; name: string; slug: string }[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  post_count: number;
}

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        setError(null);
        
        // First, get the published posts
        const { data: postsData, error: postsError } = await supabase
          .from('blog_posts')
          .select(`
            id,
            title,
            slug,
            excerpt,
            featured_image_url,
            published_at,
            author_id
          `)
          .eq('status', 'published')
          .lt('published_at', new Date().toISOString())
          .order('published_at', { ascending: false });

        if (postsError) {
          console.error("Error fetching posts:", postsError);
          throw postsError;
        }

        if (!postsData || postsData.length === 0) {
          console.log("No posts found in database");
          setPosts([]);
          setLoading(false);
          return;
        }

        console.log(`Found ${postsData.length} posts:`, postsData);

        // Format the data and get related information separately
        const formattedPosts = await Promise.all((postsData || []).map(async (post) => {
          // Get author name - simplified approach since auth.users table doesn't exist
          let authorName = "Admin"; // Default author name

          try {
            // If there's a users table, try to get the user's email
            const { data: userData } = await supabase
              .from('credentials')
              .select('email')
              .eq('id', post.author_id)
              .single();
            
            if (userData && userData.email) {
              authorName = userData.email.split('@')[0];
            }
          } catch (err) {
            console.log("Error fetching author, using default name:", err);
          }

          // Get categories for this post
          let postCategories = [];
          try {
            const { data: categoriesData, error: categoriesError } = await supabase
              .from('blog_posts_categories') // Correct table name (not blog_post_categories)
              .select(`
                category_id,
                blog_categories:category_id (
                  id,
                  name,
                  slug
                )
              `)
              .eq('post_id', post.id);
              
            if (categoriesError) {
              console.error('Error fetching categories for post:', post.id, categoriesError);
            }

            // Extract categories properly
            if (categoriesData && categoriesData.length > 0) {
              postCategories = categoriesData
                .map(item => item.blog_categories)
                .filter(Boolean);
            }
          } catch (err) {
            console.error("Error processing categories:", err);
          }

          return {
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            featured_image_url: post.featured_image_url,
            published_at: post.published_at,
            author_name: authorName,
            categories: postCategories,
          };
        }));

        console.log('Formatted posts with categories:', formattedPosts);
        setPosts(formattedPosts);
        
        // Set the first post as featured (or the most recent)
        if (formattedPosts.length > 0) {
          setFeaturedPost(formattedPosts[0]);
        }

        // Get all categories
        const { data: allCategories, error: categoriesError } = await supabase
          .from('blog_categories')
          .select('id, name, slug');
          
        if (categoriesError) throw categoriesError;
        
        // For each category, count how many posts it has
        const categoriesWithCount = await Promise.all(
          (allCategories || []).map(async (category) => {
            const { count, error: countError } = await supabase
              .from('blog_posts_categories') // Correct table name
              .select('*', { count: 'exact', head: true })
              .eq('category_id', category.id);
              
            if (countError) {
              console.error('Error counting posts for category:', category.id, countError);
            }
            
            return {
              id: category.id,
              name: category.name,
              slug: category.slug,
              post_count: count || 0
            };
          })
        );

        setCategories(categoriesWithCount);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // Log when category changes to help debug
  useEffect(() => {
    console.log('Selected category changed to:', selectedCategory);
    
    if (selectedCategory) {
      // Log posts that match the selected category
      const matchingPosts = posts.filter(post => 
        post.categories.some(cat => cat.slug === selectedCategory)
      );
      console.log('Posts matching category:', matchingPosts);
    }
  }, [selectedCategory, posts]);

  // Filter posts by category if one is selected
  const filteredPosts = selectedCategory
    ? posts.filter((post) => 
        post.categories && post.categories.some((category) => category.slug === selectedCategory)
      )
    : posts;

  // Get the posts to display (excluding the featured post if we're showing all posts)
  const displayPosts = !selectedCategory && featuredPost
    ? filteredPosts.filter((post) => post.id !== featuredPost.id)
    : filteredPosts;

  return (
    <main className="relative min-h-screen bg-black text-white">
      <SEOHead
        title="Blog - AI Telefonie Insights en Tips"
        description="Lees de laatste artikelen en inzichten van JonkersAI over kunstmatige intelligentie, AI telefonie, automatisering en technologie trends."
        keywords="AI blog, AI telefonie, kunstmatige intelligentie artikelen, telefoonautomatisering, AI trends, technologie blog Nederland"
        url="https://jonkersai.nl/blog"
        image="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop"
      />

      {/* Enhanced background effects - same as homepage */}
      <div className="fixed inset-0 z-0">
        {/* Main center glow - enhanced */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 rounded-full blur-[150px] animate-pulse"
          style={{ animationDuration: '8s' }}
        ></div>
        
        {/* Secondary glows */}
        <div 
          className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-gradient-to-br from-violet-500/8 to-pink-500/8 rounded-full blur-[120px] animate-pulse"
          style={{ animationDuration: '10s', animationDelay: '2s' }}
        ></div>
        
        <div 
          className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-gradient-to-tl from-blue-500/8 to-teal-500/8 rounded-full blur-[130px] animate-pulse"
          style={{ animationDuration: '12s', animationDelay: '4s' }}
        ></div>
      </div>

      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden opacity-10 z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-white animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="mb-8">
            <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-full text-sm font-medium text-indigo-300 tracking-wide uppercase">
              Kennisbank
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-none mb-6">
            <span className="gradient-text">Our Blog_</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-xl leading-relaxed">
            Stay updated with the latest insights, tips, and news on AI technology and innovation.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="glass-strong rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-red-400 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main content area */}
            <div className="lg:col-span-3">
              {/* Featured post */}
              {featuredPost && !selectedCategory && (
                <article className="mb-12 glass-strong rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-500">
                  <Link to={`/blog/${featuredPost.slug}`} className="block">
                    {featuredPost.featured_image_url && (
                      <div className="h-64 sm:h-80 relative overflow-hidden">
                        <img 
                          src={featuredPost.featured_image_url} 
                          alt={featuredPost.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent flex items-end">
                          <div className="p-6">
                            <div className="flex items-center text-sm text-gray-300 space-x-4 mb-2">
                              <span className="flex items-center">
                                <Calendar size={14} className="mr-1" aria-hidden="true" />
                                <time dateTime={featuredPost.published_at}>
                                  {format(new Date(featuredPost.published_at), 'MMM d, yyyy')}
                                </time>
                              </span>
                              <span className="flex items-center">
                                <User size={14} className="mr-1" aria-hidden="true" />
                                {featuredPost.author_name}
                              </span>
                            </div>
                            <h2 className="text-2xl font-bold mb-2">{featuredPost.title}</h2>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {featuredPost.categories && featuredPost.categories.map((category) => (
                                <span 
                                  key={category.id} 
                                  className="inline-flex items-center text-xs px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded"
                                >
                                  <Tag size={12} className="mr-1" aria-hidden="true" />
                                  {category.name}
                                </span>
                              ))}
                            </div>
                            <p className="text-gray-300 line-clamp-2">{featuredPost.excerpt}</p>
                            <div className="mt-4">
                              <span className="inline-flex items-center text-indigo-400 group-hover:text-indigo-300 transition-colors">
                                Read more <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {!featuredPost.featured_image_url && (
                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-300 space-x-4 mb-2">
                          <span className="flex items-center">
                            <Calendar size={14} className="mr-1" aria-hidden="true" />
                            <time dateTime={featuredPost.published_at}>
                              {format(new Date(featuredPost.published_at), 'MMM d, yyyy')}
                            </time>
                          </span>
                          <span className="flex items-center">
                            <User size={14} className="mr-1" aria-hidden="true" />
                            {featuredPost.author_name}
                          </span>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">{featuredPost.title}</h2>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {featuredPost.categories && featuredPost.categories.map((category) => (
                            <span 
                              key={category.id} 
                              className="inline-flex items-center text-xs px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded"
                            >
                              <Tag size={12} className="mr-1" aria-hidden="true" />
                              {category.name}
                            </span>
                          ))}
                        </div>
                        <p className="text-gray-300">{featuredPost.excerpt}</p>
                        <div className="mt-4">
                          <span className="inline-flex items-center text-indigo-400 group-hover:text-indigo-300 transition-colors">
                            Read more <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                          </span>
                        </div>
                      </div>
                    )}
                  </Link>
                </article>
              )}

              {/* Post grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayPosts && displayPosts.length > 0 ? (
                  displayPosts.map((post) => (
                    <article 
                      key={post.id}
                      className="glass rounded-2xl overflow-hidden hover:glass-strong transition-all duration-300 flex flex-col h-full group hover:scale-[1.02]"
                    >
                      <Link to={`/blog/${post.slug}`} className="block flex-grow">
                        {post.featured_image_url && (
                          <div className="h-48 relative overflow-hidden">
                            <img 
                              src={post.featured_image_url} 
                              alt={post.title} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="p-5">
                          <div className="flex items-center text-xs text-gray-400 space-x-3 mb-2">
                            <span className="flex items-center">
                              <Calendar size={12} className="mr-1" aria-hidden="true" />
                              <time dateTime={post.published_at}>
                                {format(new Date(post.published_at), 'MMM d, yyyy')}
                              </time>
                            </span>
                            <span className="flex items-center">
                              <User size={12} className="mr-1" aria-hidden="true" />
                              {post.author_name}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h3>
                          <p className="text-gray-300 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {post.categories && post.categories.map((category) => (
                              <span 
                                key={category.id} 
                                className="text-xs px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded"
                              >
                                {category.name}
                              </span>
                            ))}
                          </div>
                          <span className="text-indigo-400 text-sm flex items-center group-hover:text-indigo-300 transition-colors">
                            Read more <ChevronRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                          </span>
                        </div>
                      </Link>
                    </article>
                  ))
                ) : (
                  <div className="md:col-span-2 py-12 text-center">
                    <div className="glass-strong rounded-2xl p-8">
                      <p className="text-gray-400">
                        {selectedCategory ? 'No posts found in this category.' : 'No posts found.'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="glass-strong rounded-2xl p-5 mb-6">
                <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">Categories</h3>
                <nav>
                  <ul className="space-y-2">
                    <li>
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 flex items-center justify-between transition-colors ${
                          selectedCategory === null ? 'text-indigo-400 bg-indigo-500/10' : 'text-white'
                        }`}
                      >
                        <span>All Posts</span>
                        <span className="text-xs bg-white/10 px-2 py-0.5 rounded">
                          {posts.length}
                        </span>
                      </button>
                    </li>
                    {categories.map((category) => (
                      <li key={category.id}>
                        <button
                          onClick={() => setSelectedCategory(category.slug)}
                          className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 flex items-center justify-between transition-colors ${
                            selectedCategory === category.slug ? 'text-indigo-400 bg-indigo-500/10' : 'text-white'
                          }`}
                        >
                          <span>{category.name}</span>
                          <span className="text-xs bg-white/10 px-2 py-0.5 rounded">
                            {category.post_count}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="glass-strong rounded-2xl p-5">
                <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">Recent Posts</h3>
                <nav>
                  <ul className="space-y-4">
                    {posts.slice(0, 5).map((post) => (
                      <li key={post.id} className="pb-3 border-b border-white/5 last:border-b-0 last:pb-0">
                        <Link 
                          to={`/blog/${post.slug}`}
                          className="hover:text-indigo-400 transition-colors group"
                        >
                          <h4 className="font-medium line-clamp-2 group-hover:text-indigo-300 transition-colors">{post.title}</h4>
                          <span className="text-xs text-gray-400 flex items-center mt-1">
                            <Calendar size={12} className="mr-1" aria-hidden="true" />
                            <time dateTime={post.published_at}>
                              {format(new Date(post.published_at), 'MMM d, yyyy')}
                            </time>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}