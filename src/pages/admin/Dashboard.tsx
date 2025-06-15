import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet-async';
import { Edit, Plus, FileText, Tag, Check, Clock } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';

interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  scheduledPosts: number;
  categories: number;
  tags: number;
}

interface RecentPost {
  id: string;
  title: string;
  slug: string;
  status: string;
  published_at: string | null;
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    scheduledPosts: 0,
    categories: 0,
    tags: 0,
  });
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch stats
        const [
          postsResult,
          publishedResult,
          draftResult,
          scheduledResult,
          categoriesResult,
          tagsResult,
          recentPostsResult
        ] = await Promise.all([
          // Total posts
          supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
          // Published posts
          supabase.from('blog_posts').select('id', { count: 'exact', head: true })
            .eq('status', 'published'),
          // Draft posts
          supabase.from('blog_posts').select('id', { count: 'exact', head: true })
            .eq('status', 'draft'),
          // Scheduled posts
          supabase.from('blog_posts').select('id', { count: 'exact', head: true })
            .eq('status', 'scheduled'),
          // Categories
          supabase.from('blog_categories').select('id', { count: 'exact', head: true }),
          // Tags
          supabase.from('blog_tags').select('id', { count: 'exact', head: true }),
          // Recent posts
          supabase.from('blog_posts').select('id, title, slug, status, published_at')
            .order('created_at', { ascending: false })
            .limit(5)
        ]);

        setStats({
          totalPosts: postsResult.count || 0,
          publishedPosts: publishedResult.count || 0,
          draftPosts: draftResult.count || 0,
          scheduledPosts: scheduledResult.count || 0,
          categories: categoriesResult.count || 0,
          tags: tagsResult.count || 0,
        });

        setRecentPosts(recentPostsResult.data || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <Check size={16} className="text-green-400" />;
      case 'draft':
        return <Edit size={16} className="text-yellow-400" />;
      case 'scheduled':
        return <Clock size={16} className="text-blue-400" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'draft':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'scheduled':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <AdminLayout>
      <Helmet>
        <title>Admin Dashboard | JonkersAI</title>
      </Helmet>

      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link
          to="/admin/posts/new"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md inline-flex items-center transition-colors"
        >
          <Plus size={16} className="mr-2" /> New Post
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-800/50 border border-white/10 rounded-lg p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-300">Total Posts</h3>
                <div className="p-2 bg-indigo-500/20 rounded">
                  <FileText size={20} className="text-indigo-400" />
                </div>
              </div>
              <p className="text-3xl font-bold mt-2">{stats.totalPosts}</p>
            </div>
            
            <div className="bg-gray-800/50 border border-white/10 rounded-lg p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-300">Published</h3>
                <div className="p-2 bg-green-500/20 rounded">
                  <Check size={20} className="text-green-400" />
                </div>
              </div>
              <p className="text-3xl font-bold mt-2">{stats.publishedPosts}</p>
            </div>
            
            <div className="bg-gray-800/50 border border-white/10 rounded-lg p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-300">Drafts</h3>
                <div className="p-2 bg-yellow-500/20 rounded">
                  <Edit size={20} className="text-yellow-400" />
                </div>
              </div>
              <p className="text-3xl font-bold mt-2">{stats.draftPosts}</p>
            </div>
            
            <div className="bg-gray-800/50 border border-white/10 rounded-lg p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-300">Scheduled</h3>
                <div className="p-2 bg-blue-500/20 rounded">
                  <Clock size={20} className="text-blue-400" />
                </div>
              </div>
              <p className="text-3xl font-bold mt-2">{stats.scheduledPosts}</p>
            </div>
            
            <div className="bg-gray-800/50 border border-white/10 rounded-lg p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-300">Categories</h3>
                <div className="p-2 bg-purple-500/20 rounded">
                  <Tag size={20} className="text-purple-400" />
                </div>
              </div>
              <p className="text-3xl font-bold mt-2">{stats.categories}</p>
            </div>
            
            <div className="bg-gray-800/50 border border-white/10 rounded-lg p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-300">Tags</h3>
                <div className="p-2 bg-pink-500/20 rounded">
                  <Tag size={20} className="text-pink-400" />
                </div>
              </div>
              <p className="text-3xl font-bold mt-2">{stats.tags}</p>
            </div>
          </div>

          {/* Recent Posts */}
          <div className="bg-gray-800/50 border border-white/10 rounded-lg p-5 mb-8">
            <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
            
            {recentPosts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-white/10">
                    <tr>
                      <th className="pb-3 font-medium">Title</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {recentPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-white/5">
                        <td className="py-3 pr-4">
                          <div className="truncate max-w-xs">{post.title}</div>
                        </td>
                        <td className="py-3 pr-4">
                          <span className={`inline-flex items-center px-2 py-1 text-xs rounded border ${getStatusClass(post.status)}`}>
                            {getStatusIcon(post.status)}
                            <span className="ml-1 capitalize">{post.status}</span>
                          </span>
                        </td>
                        <td className="py-3 pr-4">
                          {post.published_at 
                            ? format(new Date(post.published_at), 'MMM d, yyyy')
                            : '-'
                          }
                        </td>
                        <td className="py-3">
                          <div className="flex space-x-2">
                            <Link
                              to={`/admin/posts/edit/${post.id}`}
                              className="p-1 text-indigo-400 hover:text-indigo-300"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </Link>
                            <Link
                              to={`/blog/${post.slug}`}
                              className="p-1 text-indigo-400 hover:text-indigo-300"
                              title="View"
                              target="_blank"
                            >
                              <FileText size={16} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-400 py-4 text-center">No posts found. Create your first post!</p>
            )}
            
            <div className="mt-4 text-right">
              <Link
                to="/admin/posts"
                className="text-indigo-400 hover:text-indigo-300 inline-flex items-center"
              >
                View all posts <span className="ml-1">→</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/admin/posts/new"
              className="bg-gray-800/50 border border-white/10 hover:border-indigo-500/30 hover:bg-indigo-500/10 rounded-lg p-5 transition-colors flex items-center"
            >
              <div className="p-3 bg-indigo-500/20 rounded-full mr-4">
                <Plus size={24} className="text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium">New Post</h3>
                <p className="text-sm text-gray-400">Create a new blog post</p>
              </div>
            </Link>
            
            <Link
              to="/admin/categories"
              className="bg-gray-800/50 border border-white/10 hover:border-purple-500/30 hover:bg-purple-500/10 rounded-lg p-5 transition-colors flex items-center"
            >
              <div className="p-3 bg-purple-500/20 rounded-full mr-4">
                <Tag size={24} className="text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Categories</h3>
                <p className="text-sm text-gray-400">Manage post categories</p>
              </div>
            </Link>
            
            <Link
              to="/admin/tags"
              className="bg-gray-800/50 border border-white/10 hover:border-pink-500/30 hover:bg-pink-500/10 rounded-lg p-5 transition-colors flex items-center"
            >
              <div className="p-3 bg-pink-500/20 rounded-full mr-4">
                <Tag size={24} className="text-pink-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Tags</h3>
                <p className="text-sm text-gray-400">Manage post tags</p>
              </div>
            </Link>
          </div>
        </>
      )}
    </AdminLayout>
  );
}