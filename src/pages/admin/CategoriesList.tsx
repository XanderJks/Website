import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Helmet } from 'react-helmet-async';
import { Plus, Edit, Trash2, Check, X, FileText } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import slugify from 'slugify';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  post_count: number;
}

export function CategoriesList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Edit form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  
  // New category form state
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
  });

  // Load categories when component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      setLoading(true);
      setError(null);
      
      // First get all categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('blog_categories')
        .select('id, name, slug, description')
        .order('name');
        
      if (categoriesError) throw categoriesError;
      
      // Then for each category, count the posts separately
      const categoriesWithCount = await Promise.all(
        (categoriesData || []).map(async (category) => {
          try {
            // Count posts for this category
            const { count, error: countError } = await supabase
              .from('blog_posts_categories')
              .select('*', { count: 'exact', head: true })
              .eq('category_id', category.id);
              
            if (countError) throw countError;
            
            return {
              ...category,
              post_count: count || 0
            };
          } catch (err) {
            console.error(`Error counting posts for category ${category.id}:`, err);
            return {
              ...category,
              post_count: 0
            };
          }
        })
      );
      
      setCategories(categoriesWithCount);
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      setError(`Failed to load categories: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  }

  // Start editing a category
  const handleEdit = (category: Category) => {
    setEditMode(category.id);
    setFormData({
      name: category.name,
      description: category.description || '',
    });
  };

  // Update form field
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save category changes
  const handleSave = async () => {
    if (!editMode || !formData.name.trim()) return;
    
    try {
      setError(null);
      // Generate slug from name
      const slug = slugify(formData.name, { lower: true, strict: true });
      
      const { error } = await supabase
        .from('blog_categories')
        .update({
          name: formData.name.trim(),
          slug,
          description: formData.description.trim() || null,
        })
        .eq('id', editMode);
        
      if (error) throw error;
      
      // Update local state
      setCategories(prev => 
        prev.map(category => 
          category.id === editMode
            ? {
                ...category,
                name: formData.name.trim(),
                slug,
                description: formData.description.trim() || null,
              }
            : category
        )
      );
      
      // Reset edit mode
      setEditMode(null);
    } catch (error: any) {
      console.error('Error updating category:', error);
      setError(`Failed to update category: ${error.message || 'Unknown error'}`);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditMode(null);
  };

  // Delete a category
  const handleDelete = async (id: string) => {
    if (deleteConfirm !== id) return;
    
    try {
      setError(null);
      const { error } = await supabase
        .from('blog_categories')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state
      setCategories(prev => prev.filter(category => category.id !== id));
      setDeleteConfirm(null);
    } catch (error: any) {
      console.error('Error deleting category:', error);
      setError(`Failed to delete category: ${error.message || 'Unknown error'}`);
    }
  };

  // Update new category form field
  const handleNewCategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCategory(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Create a new category
  const handleCreateCategory = async () => {
    if (!newCategory.name.trim()) return;
    
    try {
      setError(null);
      // Generate slug from name
      const slug = slugify(newCategory.name, { lower: true, strict: true });
      
      const { data, error } = await supabase
        .from('blog_categories')
        .insert([{
          name: newCategory.name.trim(),
          slug,
          description: newCategory.description.trim() || null,
        }])
        .select();
        
      if (error) throw error;
      
      // Update local state with the new category and its post count (0)
      setCategories(prev => [...prev, {
        ...data[0],
        post_count: 0,
      }]);
      
      // Reset form
      setNewCategory({
        name: '',
        description: '',
      });
    } catch (error: any) {
      console.error('Error creating category:', error);
      setError(`Failed to create category: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <AdminLayout>
      <Helmet>
        <title>Manage Categories | JonkersAI</title>
      </Helmet>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 p-4 rounded-lg mb-6">
          <p className="text-white flex items-center">
            <AlertTriangle size={18} className="mr-2 text-red-400" />
            {error}
          </p>
        </div>
      )}

      {/* Add New Category */}
      <div className="bg-gray-800/50 border border-white/10 rounded-lg p-5 mb-6">
        <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={newCategory.name}
              onChange={handleNewCategoryChange}
              className="w-full px-4 py-2 bg-gray-900/70 border border-white/20 text-white rounded-md"
              placeholder="Category name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description (optional)</label>
            <textarea
              name="description"
              value={newCategory.description}
              onChange={handleNewCategoryChange}
              rows={2}
              className="w-full px-4 py-2 bg-gray-900/70 border border-white/20 text-white rounded-md"
              placeholder="Brief description"
            />
          </div>
          <div>
            <button
              onClick={handleCreateCategory}
              disabled={!newCategory.name.trim()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md inline-flex items-center transition-colors disabled:opacity-50"
            >
              <Plus size={16} className="mr-2" /> Add Category
            </button>
          </div>
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-gray-800/50 border border-white/10 rounded-lg overflow-hidden">
        <div className="p-5 border-b border-white/10">
          <h2 className="text-lg font-semibold">Categories List</h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            {categories.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-white/10 bg-gray-900/30">
                    <tr>
                      <th className="px-6 py-3 font-medium">Name</th>
                      <th className="px-6 py-3 font-medium">Slug</th>
                      <th className="px-6 py-3 font-medium">Description</th>
                      <th className="px-6 py-3 font-medium">Posts</th>
                      <th className="px-6 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {categories.map((category) => (
                      <tr key={category.id} className="hover:bg-white/5">
                        <td className="px-6 py-4">
                          {editMode === category.id ? (
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleFormChange}
                              className="w-full px-3 py-1 bg-gray-900/70 border border-white/20 text-white rounded-md"
                            />
                          ) : (
                            <div className="font-medium">{category.name}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm text-gray-400">{category.slug}</span>
                        </td>
                        <td className="px-6 py-4">
                          {editMode === category.id ? (
                            <textarea
                              name="description"
                              value={formData.description}
                              onChange={handleFormChange}
                              rows={2}
                              className="w-full px-3 py-1 bg-gray-900/70 border border-white/20 text-white rounded-md"
                            />
                          ) : (
                            <div className="text-sm text-gray-300 line-clamp-2">
                              {category.description || <span className="text-gray-500 italic">No description</span>}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <FileText size={14} className="text-gray-400 mr-2" />
                            <span>{category.post_count}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {editMode === category.id ? (
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
                                onClick={() => handleEdit(category)}
                                className="p-1 text-indigo-400 hover:text-indigo-300"
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              {deleteConfirm === category.id ? (
                                <>
                                  <button
                                    onClick={() => handleDelete(category.id)}
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
                                  onClick={() => setDeleteConfirm(category.id)}
                                  className={`p-1 text-gray-400 hover:text-red-400 ${
                                    category.post_count > 0 ? 'cursor-not-allowed opacity-50' : ''
                                  }`}
                                  title={
                                    category.post_count > 0
                                      ? `Cannot delete category with ${category.post_count} posts`
                                      : 'Delete'
                                  }
                                  disabled={category.post_count > 0}
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
                <p className="text-gray-400">No categories found. Create your first category!</p>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}