import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Helmet } from 'react-helmet-async';
import { Plus, Edit, Trash2, Check, X, FileText } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import slugify from 'slugify';

interface Tag {
  id: string;
  name: string;
  slug: string;
  post_count: number;
}

export function TagsList() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
  // Edit form state
  const [editName, setEditName] = useState('');
  
  // New tag form state
  const [newTagName, setNewTagName] = useState('');

  // Load tags when component mounts
  useEffect(() => {
    fetchTags();
  }, []);

  async function fetchTags() {
    try {
      setLoading(true);
      
      // Get all tags with post count
      const { data, error } = await supabase
        .from('blog_tags')
        .select(`
          id,
          name,
          slug,
          blog_post_tags (
            count
          )
        `)
        .order('name');
        
      if (error) throw error;
      
      // Format data with post count
      const formattedData = data.map(tag => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
        post_count: tag.blog_post_tags[0].count,
      }));
      
      setTags(formattedData);
    } catch (error) {
      console.error('Error fetching tags:', error);
    } finally {
      setLoading(false);
    }
  }

  // Start editing a tag
  const handleEdit = (tag: Tag) => {
    setEditMode(tag.id);
    setEditName(tag.name);
  };

  // Save tag changes
  const handleSave = async () => {
    if (!editMode || !editName.trim()) return;
    
    try {
      // Generate slug from name
      const slug = slugify(editName, { lower: true, strict: true });
      
      const { error } = await supabase
        .from('blog_tags')
        .update({
          name: editName.trim(),
          slug,
        })
        .eq('id', editMode);
        
      if (error) throw error;
      
      // Update local state
      setTags(prev => 
        prev.map(tag => 
          tag.id === editMode
            ? {
                ...tag,
                name: editName.trim(),
                slug,
              }
            : tag
        )
      );
      
      // Reset edit mode
      setEditMode(null);
    } catch (error) {
      console.error('Error updating tag:', error);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditMode(null);
  };

  // Delete a tag
  const handleDelete = async (id: string) => {
    if (deleteConfirm !== id) return;
    
    try {
      const { error } = await supabase
        .from('blog_tags')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state
      setTags(prev => prev.filter(tag => tag.id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  // Create a new tag
  const handleCreateTag = async () => {
    if (!newTagName.trim()) return;
    
    try {
      // Generate slug from name
      const slug = slugify(newTagName, { lower: true, strict: true });
      
      const { data, error } = await supabase
        .from('blog_tags')
        .insert([{
          name: newTagName.trim(),
          slug,
        }])
        .select();
        
      if (error) throw error;
      
      // Update local state with the new tag and its post count (0)
      setTags(prev => [...prev, {
        ...data[0],
        post_count: 0,
      }]);
      
      // Reset form
      setNewTagName('');
    } catch (error) {
      console.error('Error creating tag:', error);
    }
  };

  return (
    <AdminLayout>
      <Helmet>
        <title>Manage Tags | JonkersAI</title>
      </Helmet>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">Tags</h1>
      </div>

      {/* Add New Tag */}
      <div className="bg-gray-800/50 border border-white/10 rounded-lg p-5 mb-6">
        <h2 className="text-lg font-semibold mb-4">Add New Tag</h2>
        <div className="flex items-center">
          <input
            type="text"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-900/70 border border-white/20 text-white rounded-l-md"
            placeholder="Tag name"
          />
          <button
            onClick={handleCreateTag}
            disabled={!newTagName.trim()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-md flex items-center transition-colors disabled:opacity-50"
          >
            <Plus size={16} className="mr-2" /> Add Tag
          </button>
        </div>
      </div>

      {/* Tags List */}
      <div className="bg-gray-800/50 border border-white/10 rounded-lg overflow-hidden">
        <div className="p-5 border-b border-white/10">
          <h2 className="text-lg font-semibold">Tags List</h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            {tags.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-white/10 bg-gray-900/30">
                    <tr>
                      <th className="px-6 py-3 font-medium">Name</th>
                      <th className="px-6 py-3 font-medium">Slug</th>
                      <th className="px-6 py-3 font-medium">Posts</th>
                      <th className="px-6 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {tags.map((tag) => (
                      <tr key={tag.id} className="hover:bg-white/5">
                        <td className="px-6 py-4">
                          {editMode === tag.id ? (
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="w-full px-3 py-1 bg-gray-900/70 border border-white/20 text-white rounded-md"
                            />
                          ) : (
                            <div className="font-medium">{tag.name}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm text-gray-400">{tag.slug}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <FileText size={14} className="text-gray-400 mr-2" />
                            <span>{tag.post_count}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {editMode === tag.id ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={handleSave}
                                className="p-1 text-green-500 hover:text-green-400"
                                title="Save"
                              >
                                <Check size={18} />
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="p-1 text-gray-400 hover:text-gray-300"
                                title="Cancel"
                              >
                                <X size={18} />
                              </button>
                            </div>
                          ) : (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(tag)}
                                className="p-1 text-indigo-400 hover:text-indigo-300"
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              {deleteConfirm === tag.id ? (
                                <>
                                  <button
                                    onClick={() => handleDelete(tag.id)}
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
                                    <X size={16} />
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={() => setDeleteConfirm(tag.id)}
                                  className={`p-1 text-gray-400 hover:text-red-400 ${
                                    tag.post_count > 0 ? 'cursor-not-allowed opacity-50' : ''
                                  }`}
                                  title={
                                    tag.post_count > 0
                                      ? `Cannot delete tag with ${tag.post_count} posts`
                                      : 'Delete'
                                  }
                                  disabled={tag.post_count > 0}
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-gray-400">No tags found. Create your first tag!</p>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}