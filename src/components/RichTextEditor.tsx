import React, { useCallback, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  SeparatorHorizontal,
  Heading1,
  Heading2,
  Image as ImageIcon,
  Link as LinkIcon,
  Undo,
  Redo,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-indigo-400 underline',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    try {
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `blog/${fileName}`;

      // Upload the file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = await uploadImage(file);
    if (url) {
      setImageUrl(url);
    }
  };

  const insertImage = useCallback(() => {
    if (!editor || !imageUrl) return;
    
    editor.chain().focus().setImage({ src: imageUrl }).run();
    setImageUrl('');
    setIsImageModalOpen(false);
  }, [editor, imageUrl]);

  const insertLink = useCallback(() => {
    if (!editor || !linkUrl) return;
    
    if (linkText) {
      // If we have link text, insert a new node
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkUrl })
        .insertContent(linkText)
        .run();
    } else {
      // Otherwise, update the selected text
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkUrl })
        .run();
    }

    setLinkUrl('');
    setLinkText('');
    setIsLinkModalOpen(false);
  }, [editor, linkUrl, linkText]);

  if (!editor) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-900/50 border border-white/20">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 border border-white/20 rounded overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 border-b border-white/10">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-white/10 ${editor.isActive('bold') ? 'bg-white/10' : ''}`}
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-white/10 ${editor.isActive('italic') ? 'bg-white/10' : ''}`}
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-white/10 ${editor.isActive('heading', { level: 1 }) ? 'bg-white/10' : ''}`}
          title="Heading 1"
        >
          <Heading1 size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-white/10 ${editor.isActive('heading', { level: 2 }) ? 'bg-white/10' : ''}`}
          title="Heading 2"
        >
          <Heading2 size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-white/10 ${editor.isActive('bulletList') ? 'bg-white/10' : ''}`}
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-white/10 ${editor.isActive('orderedList') ? 'bg-white/10' : ''}`}
          title="Ordered List"
        >
          <ListOrdered size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-white/10 ${editor.isActive('blockquote') ? 'bg-white/10' : ''}`}
          title="Quote"
        >
          <Quote size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-2 rounded hover:bg-white/10"
          title="Horizontal Rule"
        >
          <SeparatorHorizontal size={18} />
        </button>
        <button
          onClick={() => setIsImageModalOpen(true)}
          className="p-2 rounded hover:bg-white/10"
          title="Insert Image"
        >
          <ImageIcon size={18} />
        </button>
        <button
          onClick={() => setIsLinkModalOpen(true)}
          className={`p-2 rounded hover:bg-white/10 ${editor.isActive('link') ? 'bg-white/10' : ''}`}
          title="Insert Link"
        >
          <LinkIcon size={18} />
        </button>
        <div className="ml-auto flex">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-2 rounded hover:bg-white/10 disabled:opacity-50"
            title="Undo"
          >
            <Undo size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-2 rounded hover:bg-white/10 disabled:opacity-50"
            title="Redo"
          >
            <Redo size={18} />
          </button>
        </div>
      </div>
      <div className="min-h-[300px] p-4">
        <EditorContent editor={editor} className="prose prose-invert max-w-none" />
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-white/20 p-4 rounded w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Insert Image</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 bg-gray-800 border border-white/20 text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Or upload an image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="w-full px-4 py-2 bg-gray-800 border border-white/20 text-white"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={insertImage}
                disabled={!imageUrl || isUploading}
                className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
              >
                {isUploading ? 'Uploading...' : 'Insert Image'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Link Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-white/20 p-4 rounded w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Insert Link</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">URL</label>
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-2 bg-gray-800 border border-white/20 text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Text (optional)</label>
              <input
                type="text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="Leave empty to use selection"
                className="w-full px-4 py-2 bg-gray-800 border border-white/20 text-white"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsLinkModalOpen(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={insertLink}
                disabled={!linkUrl}
                className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};