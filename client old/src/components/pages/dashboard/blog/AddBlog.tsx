import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import DynamicForm from '../../../shared/form/DynamicForm';
import { blogFormFields } from '../../../../constants/forms/blogFormFields';
import './tiptap.css';

interface BlogFormData {
  title: string;
  slug: string;
  thumbnail: string;
  short_description: string;
  posted_date: string;
  content: string;
}

export default function AddBlog() {
  const [formData, setFormData] = useState<Partial<BlogFormData>>({
    posted_date: new Date().toISOString().split('T')[0]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-[400px] p-4 focus:outline-none',
      },
    },
  });

  const handleFieldChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from title
    if (name === 'title' && value) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    const requiredFields = ['title', 'slug', 'thumbnail', 'short_description', 'posted_date'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof BlogFormData]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    const content = editor?.getHTML() || '';
    if (!content.trim() || content === '<p></p>') {
      alert('Please write the blog content');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const blogData = { ...formData, content };
      console.log('Submitting blog:', blogData);
      
      // TODO: Replace with actual API call
      // const response = await fetch('/api/blogs', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(blogData)
      // });
      // const result = await response.json();
      
      alert('Blog post added successfully!');
      // Reset form
      setFormData({ posted_date: new Date().toISOString().split('T')[0] });
      editor?.commands.setContent('');
    } catch (error) {
      console.error('Error submitting blog:', error);
      alert('Failed to add blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    const hasContent = editor?.getHTML() !== '<p></p>' && editor?.getHTML() !== '';
    if (Object.keys(formData).length > 1 || hasContent) {
      if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
        setFormData({ posted_date: new Date().toISOString().split('T')[0] });
        editor?.commands.setContent('');
      }
    }
  };

  return (
    <div className="min-h-screen p-6 w-full">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Blog Post</h1>
          <p className="text-gray-600">Write and publish a new blog article</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DynamicForm
                fields={blogFormFields}
                values={formData}
                onChange={handleFieldChange}
              />
            </div>
          </div>

          {/* Content Editor Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Blog Content</h3>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('write')}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      activeTab === 'write'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Write
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('preview')}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      activeTab === 'preview'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Preview
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'write' ? (
                <div>
                  {/* Editor Toolbar */}
                  <div className="tiptap-toolbar border border-gray-300 rounded-t-lg p-2 bg-gray-50 flex flex-wrap gap-1">
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleBold().run()}
                      className={`px-3 py-1 rounded hover:bg-gray-200 font-bold ${editor?.isActive('bold') ? 'bg-gray-300' : ''}`}
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleItalic().run()}
                      className={`px-3 py-1 rounded hover:bg-gray-200 italic ${editor?.isActive('italic') ? 'bg-gray-300' : ''}`}
                    >
                      I
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleStrike().run()}
                      className={`px-3 py-1 rounded hover:bg-gray-200 line-through ${editor?.isActive('strike') ? 'bg-gray-300' : ''}`}
                    >
                      S
                    </button>
                    <span className="border-l border-gray-300 mx-1"></span>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                      className={`px-3 py-1 rounded hover:bg-gray-200 ${editor?.isActive('heading', { level: 1 }) ? 'bg-gray-300' : ''}`}
                    >
                      H1
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                      className={`px-3 py-1 rounded hover:bg-gray-200 ${editor?.isActive('heading', { level: 2 }) ? 'bg-gray-300' : ''}`}
                    >
                      H2
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                      className={`px-3 py-1 rounded hover:bg-gray-200 ${editor?.isActive('heading', { level: 3 }) ? 'bg-gray-300' : ''}`}
                    >
                      H3
                    </button>
                    <span className="border-l border-gray-300 mx-1"></span>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleBulletList().run()}
                      className={`px-3 py-1 rounded hover:bg-gray-200 ${editor?.isActive('bulletList') ? 'bg-gray-300' : ''}`}
                    >
                      • List
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                      className={`px-3 py-1 rounded hover:bg-gray-200 ${editor?.isActive('orderedList') ? 'bg-gray-300' : ''}`}
                    >
                      1. List
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                      className={`px-3 py-1 rounded hover:bg-gray-200 ${editor?.isActive('blockquote') ? 'bg-gray-300' : ''}`}
                    >
                      Quote
                    </button>
                    <span className="border-l border-gray-300 mx-1"></span>
                    <button
                      type="button"
                      onClick={() => {
                        const url = window.prompt('Enter URL:');
                        if (url) {
                          editor?.chain().focus().setLink({ href: url }).run();
                        }
                      }}
                      className={`px-3 py-1 rounded hover:bg-gray-200 ${editor?.isActive('link') ? 'bg-gray-300' : ''}`}
                    >
                      Link
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const url = window.prompt('Enter image URL:');
                        if (url) {
                          editor?.chain().focus().setImage({ src: url }).run();
                        }
                      }}
                      className="px-3 py-1 rounded hover:bg-gray-200"
                    >
                      Image
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                      className="px-3 py-1 rounded hover:bg-gray-200"
                    >
                      Table
                    </button>
                    <span className="border-l border-gray-300 mx-1"></span>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().undo().run()}
                      className="px-3 py-1 rounded hover:bg-gray-200"
                      disabled={!editor?.can().undo()}
                    >
                      ↶ Undo
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().redo().run()}
                      className="px-3 py-1 rounded hover:bg-gray-200"
                      disabled={!editor?.can().redo()}
                    >
                      ↷ Redo
                    </button>
                  </div>
                  
                  {/* Editor Content */}
                  <div className="border border-t-0 border-gray-300 rounded-b-lg">
                    <EditorContent editor={editor} />
                  </div>
                </div>
              ) : (
                <div className="min-h-96 prose prose-sm max-w-none border border-gray-200 rounded-lg p-6">
                  {editor?.getHTML() && editor.getHTML() !== '<p></p>' ? (
                    <div dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
                  ) : (
                    <p className="text-gray-400 italic">No content to preview</p>
                  )}
                </div>
              )}
              
              <p className="text-sm text-gray-500 mt-2">
                Tip: Use the toolbar above to format your content with headings, bold, italic, lists, links, images, and more.
              </p>
            </div>
          </div>

          {/* Thumbnail Preview */}
          {formData.thumbnail && (
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thumbnail Preview</h3>
              <img
                src={formData.thumbnail}
                alt="Blog thumbnail"
                className="w-full max-w-2xl h-auto rounded-lg border border-gray-300"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL';
                }}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Blog Post'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
