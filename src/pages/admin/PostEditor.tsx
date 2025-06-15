import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Helmet } from 'react-helmet-async';
import { format, parseISO, addDays } from 'date-fns';
import { Save, EyeOff, Eye, Calendar, Clock, Image, FileCheck, X, AlertTriangle } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { RichTextEditor } from '../../components/RichTextEditor';
import slugify from 'slugify';
import { useAuth } from '../../contexts/AuthContext';

interface Category {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
}

interface FormErrors {
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
}

export function PostEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, session } = useAuth();
  const isEditMode = !!id;

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featured_image_url: '',
    status: 'draft',
    published_at: format(addDays(new Date(), 1), "yyyy-MM-dd'T'HH:mm"),
    meta_title: '',
    meta_description: '',
  });
  
  // Categories and tags state
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [saveError, setSaveError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [showFeaturedImageInput, setShowFeaturedImageInput] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  // Load post data if in edit mode
  useEffect(() => {
    async function fetchPostData() {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Fetch post data
        const { data: post, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        
        if (!post) {
          navigate('/admin/posts');
          return;
        }
        
        setFormData({
          title: post.title || '',
          slug: post.slug || '',
          content: post.content || '',
          excerpt: post.excerpt || '',
          featured_image_url: post.featured_image_url || '',
          status: post.status || 'draft',
          published_at: post.published_at 
            ? format(parseISO(post.published_at), "yyyy-MM-dd'T'HH:mm") 
            : format(addDays(new Date(), 1), "yyyy-MM-dd'T'HH:mm"),
          meta_title: post.meta_title || '',
          meta_description: post.meta_description || '',
        });
        
        // Show featured image input if there's an image
        if (post.featured_image_url) {
          setShowFeaturedImageInput(true);
        }
        
        // Fetch post categories
        const { data: postCategories, error: categoriesError } = await supabase
          .from('blog_posts_categories')
          .select('category_id')
          .eq('post_id', id);
          
        if (categoriesError) throw categoriesError;
        
        setSelectedCategories(postCategories ? postCategories.map(item => item.category_id) : []);
        
        // Fetch post tags
        const { data: postTags, error: tagsError } = await supabase
          .from('blog_posts_tags')
          .select('tag_id')
          .eq('post_id', id);
          
        if (tagsError) throw tagsError;
        
        setSelectedTags(postTags ? postTags.map(item => item.tag_id) : []);
      } catch (error) {
        console.error('Error fetching post data:', error);
        setSaveError('Failed to load post data. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchPostData();
  }, [id, navigate]);

  // Load categories and tags
  useEffect(() => {
    async function fetchCategoriesAndTags() {
      try {
        // Fetch categories
        const { data: categories, error: categoriesError } = await supabase
          .from('blog_categories')
          .select('id, name')
          .order('name');
          
        if (categoriesError) throw categoriesError;
        
        setAllCategories(categories || []);
        
        // Fetch tags
        const { data: tags, error: tagsError } = await supabase
          .from('blog_tags')
          .select('id, name')
          .order('name');
          
        if (tagsError) throw tagsError;
        
        setAllTags(tags || []);
      } catch (error) {
        console.error('Error fetching categories and tags:', error);
        setSaveError('Failed to load categories and tags. Please refresh the page.');
      }
    }
    
    fetchCategoriesAndTags();
  }, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Auto-generate slug from title if slug is empty
    if (name === 'title' && formData.slug === '') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        slug: slugify(value, { lower: true, strict: true }),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle rich text editor changes
  const handleContentChange = (html: string) => {
    setFormData(prev => ({
      ...prev,
      content: html,
    }));
  };

  // Toggle category selection
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Toggle tag selection
  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  // Create a new category
  const handleCreateCategory = async () => {
    if (!newCategory.trim()) return;
    
    try {
      const slug = slugify(newCategory, { lower: true, strict: true });
      
      // Make sure we're authenticated
      if (!session) {
        throw new Error("You must be logged in to create a category");
      }
      
      const { data, error } = await supabase
        .from('blog_categories')
        .insert([{ name: newCategory.trim(), slug }])
        .select();
        
      if (error) throw error;
      
      if (!data || data.length === 0) {
        throw new Error("No data returned after creating category");
      }
      
      setAllCategories(prev => [...prev, data[0]]);
      setSelectedCategories(prev => [...prev, data[0].id]);
      setNewCategory('');
    } catch (error) {
      console.error('Error creating category:', error);
      setSaveError('Failed to create category. Please try again.');
    }
  };

  // Create a new tag
  const handleCreateTag = async () => {
    if (!newTag.trim()) return;
    
    try {
      const slug = slugify(newTag, { lower: true, strict: true });
      
      // Make sure we're authenticated
      if (!session) {
        throw new Error("You must be logged in to create a tag");
      }
      
      const { data, error } = await supabase
        .from('blog_tags')
        .insert([{ name: newTag.trim(), slug }])
        .select();
        
      if (error) throw error;
      
      if (!data || data.length === 0) {
        throw new Error("No data returned after creating tag");
      }
      
      setAllTags(prev => [...prev, data[0]]);
      setSelectedTags(prev => [...prev, data[0].id]);
      setNewTag('');
    } catch (error) {
      console.error('Error creating tag:', error);
      setSaveError('Failed to create tag. Please try again.');
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save post
  const handleSave = async (status: string = formData.status) => {
    setSaveError(null);
    
    if (!validateForm()) {
      console.log("Form validation failed", errors);
      return;
    }
    
    if (!user) {
      console.error('User not authenticated');
      setSaveError('You must be logged in to save a post');
      return;
    }
    
    try {
      setSaving(true);
      
      // Convert published_at to ISO string if it's not null
      const publishedDate = status === 'draft' ? null : 
        new Date(formData.published_at).toISOString();
      
      // Prepare post data with only the columns that exist in the table
      const postData = {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        excerpt: formData.excerpt,
        featured_image_url: formData.featured_image_url,
        status: status,
        published_at: publishedDate,
        author_id: user.id
      };
      
      // Only add meta fields if they're not empty
      if (formData.meta_title) {
        postData['meta_title'] = formData.meta_title;
      }
      
      if (formData.meta_description) {
        postData['meta_description'] = formData.meta_description;
      }
      
      console.log('Saving post with data:', postData);
      
      let postId = id;
      
      if (isEditMode) {
        // Update existing post
        console.log('Updating post with ID:', postId);
        const { error, data } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', postId)
          .select();
          
        if (error) {
          console.error('Error updating post:', error);
          throw error;
        }
        
        if (!data || data.length === 0) {
          throw new Error('No data returned from update operation');
        }
        
        console.log('Post updated successfully:', data);
        
        // Use the returned post ID
        postId = data[0].id;
      } else {
        // Create new post
        console.log('Creating new post');
        const { data, error } = await supabase
          .from('blog_posts')
          .insert([postData])
          .select();
          
        if (error) {
          console.error('Error creating post:', error);
          throw error;
        }
        
        if (!data || data.length === 0) {
          throw new Error('No data returned from insert operation');
        }
        
        postId = data[0].id;
        console.log('Post created successfully with ID:', postId);
      }
      
      if (!postId) {
        throw new Error('Failed to get post ID');
      }
      
      // Handle categories
      if (isEditMode) {
        // Delete existing categories
        console.log('Removing existing categories for post:', postId);
        const { error: deleteError } = await supabase
          .from('blog_posts_categories')
          .delete()
          .eq('post_id', postId);
          
        if (deleteError) {
          console.error('Error deleting categories:', deleteError);
          throw deleteError;
        }
      }
      
      // Add selected categories
      if (selectedCategories.length > 0) {
        console.log('Adding categories for post:', postId, selectedCategories);
        const categoryData = selectedCategories.map(categoryId => ({
          post_id: postId,
          category_id: categoryId,
        }));
        
        const { error: categoriesError } = await supabase
          .from('blog_posts_categories')
          .insert(categoryData);
          
        if (categoriesError) {
          console.error('Error adding categories:', categoriesError);
          throw categoriesError;
        }
      }
      
      // Handle tags
      if (isEditMode) {
        // Delete existing tags
        console.log('Removing existing tags for post:', postId);
        const { error: deleteTagsError } = await supabase
          .from('blog_posts_tags')
          .delete()
          .eq('post_id', postId);
          
        if (deleteTagsError) {
          console.error('Error deleting tags:', deleteTagsError);
          throw deleteTagsError;
        }
      }
      
      // Add selected tags
      if (selectedTags.length > 0) {
        console.log('Adding tags for post:', postId, selectedTags);
        const tagData = selectedTags.map(tagId => ({
          post_id: postId,
          tag_id: tagId,
        }));
        
        const { error: tagsError } = await supabase
          .from('blog_posts_tags')
          .insert(tagData);
          
        if (tagsError) {
          console.error('Error adding tags:', tagsError);
          throw tagsError;
        }
      }
      
      console.log('Post saved successfully, navigating to post list');
      
      // Navigate to the post list
      navigate('/admin/posts');
    } catch (error: any) {
      console.error('Error saving post:', error);
      setSaveError(error.message || 'An error occurred while saving the post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Helmet>
        <title>{isEditMode ? 'Edit Post' : 'Create Post'} | JonkersAI</title>
      </Helmet>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Post' : 'Create Post'}</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md flex items-center transition-colors"
            title={previewMode ? 'Edit Mode' : 'Preview Mode'}
          >
            {previewMode ? (
              <>
                <EyeOff size={16} className="mr-2" /> Edit
              </>
            ) : (
              <>
                <Eye size={16} className="mr-2" /> Preview
              </>
            )}
          </button>
          
          <button
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md flex items-center transition-colors disabled:opacity-50"
          >
            <Save size={16} className="mr-2" /> Save Draft
          </button>
          
          <button
            onClick={() => handleSave('published')}
            disabled={saving}
            className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-md flex items-center transition-colors disabled:opacity-50"
          >
            <FileCheck size={16} className="mr-2" /> {saving ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>

      {saveError && (
        <div className="mb-6 bg-red-500/20 border border-red-500/50 p-4 rounded-lg text-white">
          <p className="flex items-center">
            <AlertTriangle size={18} className="mr-2 text-red-400" />
            {saveError}
          </p>
        </div>
      )}

      {/* Main editing interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Post content (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-gray-800/50 border border-white/10 rounded-lg p-5">
            <label className="block text-sm font-medium mb-2">Post Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-gray-900/70 border ${
                errors.title ? 'border-red-500' : 'border-white/20'
              } text-white rounded-md`}
              placeholder="Enter post title"
            />
            {errors.title && (
              <p className="mt-1 text-red-500 text-xs">{errors.title}</p>
            )}
          </div>
          
          {/* URL Slug */}
          <div className="bg-gray-800/50 border border-white/10 rounded-lg p-5">
            <label className="block text-sm font-medium mb-2">URL Slug</label>
            <div className="flex items-center">
              <span className="bg-gray-900/90 border-y border-l border-white/20 rounded-l-md px-3 py-3 text-gray-400">
                /blog/
              </span>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className={`flex-1 px-4 py-3 bg-gray-900/70 border-y border-r ${
                  errors.slug ? 'border-red-500' : 'border-white/20'
                } text-white rounded-r-md`}
                placeholder="post-slug"
              />
            </div>
            {errors.slug && (
              <p className="mt-1 text-red-500 text-xs">{errors.slug}</p>
            )}
          </div>
          
          {/* Content */}
          <div className="bg-gray-800/50 border border-white/10 rounded-lg p-5">
            <label className="block text-sm font-medium mb-2">Content</label>
            
            {previewMode ? (
              <div className="min-h-[300px] bg-gray-900/70 border border-white/20 rounded-md p-5 prose prose-invert max-w-none overflow-auto">
                <div dangerouslySetInnerHTML={{ __html: formData.content }} />
              </div>
            ) : (
              <>
                <RichTextEditor content={formData.content} onChange={handleContentChange} />
                {errors.content && (
                  <p className="mt-1 text-red-500 text-xs">{errors.content}</p>
                )}
              </>
            )}
          </div>
          
          {/* Excerpt */}
          <div className="bg-gray-800/50 border border-white/10 rounded-lg p-5">
            <label className="block text-sm font-medium mb-2">Excerpt</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={3}
              className={`w-full px-4 py-3 bg-gray-900/70 border ${
                errors.excerpt ? 'border-red-500' : 'border-white/20'
              } text-white rounded-md`}
              placeholder="Brief summary of the post (used in listings and meta description)"
            />
            {errors.excerpt && (
              <p className="mt-1 text-red-500 text-xs">{errors.excerpt}</p>
            )}
          </div>
          
          {/* Featured Image */}
          <div className="bg-gray-800/50 border border-white/10 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium">Featured Image</label>
              <button
                type="button"
                onClick={() => setShowFeaturedImageInput(!showFeaturedImageInput)}
                className="text-indigo-400 text-sm flex items-center"
              >
                {showFeaturedImageInput ? (
                  <>
                    <X size={14} className="mr-1" /> Remove
                  </>
                ) : (
                  <>
                    <Image size={14} className="mr-1" /> Add Image
                  </>
                )}
              </button>
            </div>
            
            {showFeaturedImageInput && (
              <input
                type="text"
                name="featured_image_url"
                value={formData.featured_image_url}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900/70 border border-white/20 text-white rounded-md"
                placeholder="https://example.com/image.jpg"
              />
            )}
            
            {formData.featured_image_url && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Preview:</p>
                <div className="border border-white/10 rounded overflow-hidden h-40">
                  <img
                    src={formData.featured_image_url}
                    alt="Featured preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL';
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          
          {/* SEO Settings */}
          <div className="bg-gray-800/50 border border-white/10 rounded-lg p-5">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
            >
              <h3 className="text-lg font-medium">SEO & Advanced Settings</h3>
              <button
                type="button"
                className="text-indigo-400"
              >
                {showAdvancedOptions ? '▲' : '▼'}
              </button>
            </div>
            
            {showAdvancedOptions && (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Meta Title (optional)</label>
                  <input
                    type="text"
                    name="meta_title"
                    value={formData.meta_title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/70 border border-white/20 text-white rounded-md"
                    placeholder="Custom title for SEO (leave empty to use post title)"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Meta Description (optional)</label>
                  <textarea
                    name="meta_description"
                    value={formData.meta_description}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-3 bg-gray-900/70 border border-white/20 text-white rounded-md"
                    placeholder="Custom description for SEO (leave empty to use excerpt)"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Publication Date & Time</label>
                  <div className="flex items-center">
                    <Calendar size={16} className="text-gray-400 mr-2" />
                    <input
                      type="datetime-local"
                      name="published_at"
                      value={formData.published_at}
                      onChange={handleChange}
                      className="px-4 py-3 bg-gray-900/70 border border-white/20 text-white rounded-md"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <div className="flex items-center">
                    <Clock size={16} className="text-gray-400 mr-2" />
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="px-4 py-3 bg-gray-900/70 border border-white/20 text-white rounded-md"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                  </div>
                  
                  {formData.status === 'scheduled' && (
                    <div className="mt-2 text-yellow-500 text-sm flex items-center">
                      <AlertTriangle size={14} className="mr-1" />
                      Post will be published automatically at the scheduled date and time.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Sidebar (1/3 width) */}
        <div className="space-y-6">
          {/* Categories */}
          <div className="bg-gray-800/50 border border-white/10 rounded-lg p-5">
            <h3 className="text-lg font-medium mb-4">Categories</h3>
            
            <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
              {allCategories.length > 0 ? (
                allCategories.map(category => (
                  <label key={category.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryToggle(category.id)}
                      className="rounded text-indigo-600 bg-gray-900 border-white/20 focus:ring-indigo-500"
                    />
                    <span>{category.name}</span>
                  </label>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No categories found.</p>
              )}
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Add New Category</label>
              <div className="flex">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-1 px-4 py-2 bg-gray-900/70 border border-white/20 text-white rounded-l-md"
                  placeholder="Category name"
                />
                <button
                  type="button"
                  onClick={handleCreateCategory}
                  disabled={!newCategory.trim()}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-md disabled:opacity-50"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          
          {/* Tags */}
          <div className="bg-gray-800/50 border border-white/10 rounded-lg p-5">
            <h3 className="text-lg font-medium mb-4">Tags</h3>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedTags.length > 0 && allTags.length > 0 ? (
                selectedTags.map(tagId => {
                  const tag = allTags.find(t => t.id === tagId);
                  return tag ? (
                    <span 
                      key={tag.id}
                      className="inline-flex items-center px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 text-sm"
                    >
                      {tag.name}
                      <button
                        type="button"
                        onClick={() => handleTagToggle(tag.id)}
                        className="ml-1 text-indigo-300 hover:text-indigo-100"
                      >
                        ×
                      </button>
                    </span>
                  ) : null;
                })
              ) : (
                <p className="text-gray-400 text-sm">No tags selected.</p>
              )}
            </div>
            
            {allTags.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Available Tags</label>
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                  {allTags
                    .filter(tag => !selectedTags.includes(tag.id))
                    .map(tag => (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => handleTagToggle(tag.id)}
                        className="px-2 py-1 rounded bg-gray-700 text-gray-300 text-sm hover:bg-gray-600"
                      >
                        {tag.name}
                      </button>
                    ))
                  }
                </div>
              </div>
            )}
            
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Add New Tag</label>
              <div className="flex">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="flex-1 px-4 py-2 bg-gray-900/70 border border-white/20 text-white rounded-l-md"
                  placeholder="Tag name"
                />
                <button
                  type="button"
                  onClick={handleCreateTag}
                  disabled={!newTag.trim()}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-md disabled:opacity-50"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}