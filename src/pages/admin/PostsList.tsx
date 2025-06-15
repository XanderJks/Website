import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet-async';
import { Edit, Plus, Trash2, Eye, Check, Clock, Filter, Search } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: string;
  created_at: string;
  published_at: string | null;
}

export function PostsList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  async function fetchPosts() {
    try {
      setLoading(true);
      
      // Build query based on filter
      let query = supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (filter !== 'all') {
        query = query.eq('status', filter);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }

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

  const handleDelete = async (id: string) => {
    if (deleteConfirm !== id) return;
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Remove the post from the list
      setPosts(posts.filter(post => post.id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // Filter posts by search query
  const filteredPosts = search
    ? posts.filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.slug.toLowerCase().includes(search.toLowerCase())
      )
    : posts;

  return (
    <AdminLayout>
      <Helmet>
        <title>Manage Posts | JonkersAI</title>
      </Helmet>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link
          to="/admin/posts/new"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md inline-flex items-center transition-colors"
        >
          <Plus size={16} className="mr-2" /> New Post
        </Link>
      </div>

      <div className="bg-gray-800/50 border border-white/10 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-white/10 rounded-md text-white"
            />
          </div>
          
          <div className="flex items-center border border-white/10 rounded-md bg-gray-900/50 px-3">
            <Filter size={16} className="text-gray-400 mr-2" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent py-2 text-white outline-none"
            >
              <option value="all">All Posts</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            {filteredPosts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-white/10 bg-gray-900/30">
                    <tr>
                      <th className="px-6 py-3 font-medium">Title</th>
                      <th className="px-6 py-3 font-medium">Slug</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                      <th className="px-6 py-3 font-medium">Date</th>
                      <th className="px-6 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-white/5">
                        <td className="px-6 py-4">
                          <div className="truncate max-w-xs">{post.title}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="truncate max-w-xs font-mono text-sm text-gray-400">{post.slug}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-1 text-xs rounded border ${getStatusClass(post.status)}`}>
                            {getStatusIcon(post.status)}
                            <span className="ml-1 capitalize">{post.status}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {post.published_at 
                            ? format(new Date(post.published_at), 'MMM d, yyyy')
                            : <span className="text-gray-500">-</span>
                          }
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-3">
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
                              <Eye size={16} />
                            </Link>
                            {deleteConfirm === post.id ? (
                              <>
                                <button
                                  onClick={() => handleDelete(post.id)}
                                  className="p-1 text-red-500 hover:text-red-400"
                                  title="Confirm Delete"
                                >
                                  <Check size={16} />
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(null)}
                                  className="p-1 text-gray-400 hover:text-gray-300"
                                  title="Cancel"
                                >
                                  ✕
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirm(post.id)}
                                className="p-1 text-gray-400 hover:text-red-400"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-gray-400">
                  {search 
                    ? 'No posts found matching your search.' 
                    : filter === 'all' 
                      ? 'No posts found. Create your first post!' 
                      : `No ${filter} posts found.`
                  }
                </p>
                {filter !== 'all' && (
                  <button
                    onClick={() => setFilter('all')}
                    className="mt-2 text-indigo-400 hover:text-indigo-300"
                  >
                    Show all posts
                  </button>
                )}
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="mt-2 text-indigo-400 hover:text-indigo-300 block mx-auto"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}