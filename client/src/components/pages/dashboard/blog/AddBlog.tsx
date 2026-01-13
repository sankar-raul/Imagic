import { useState } from 'react';
import './tiptap.css';
import { blogFormFields } from '@/constants/forms/blogFormFields';
import DynamicForm from '@/components/shared/form/DynamicForm';
import RichTextEditor from '@/components/shared/RichTextEditor';

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
  const [blogContent, setBlogContent] = useState('');

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

    if (!blogContent.trim() || blogContent === '<p></p>') {
      alert('Please write the blog content');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const blogData = { ...formData, content: blogContent };
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
      setBlogContent('');
    } catch (error) {
      console.error('Error submitting blog:', error);
      alert('Failed to add blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    const hasContent = blogContent !== '<p></p>' && blogContent !== '';
    if (Object.keys(formData).length > 1 || hasContent) {
      if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
        setFormData({ posted_date: new Date().toISOString().split('T')[0] });
        setBlogContent('');
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
          <RichTextEditor
            value={blogContent}
            onChange={setBlogContent}
            label="Blog Content"
          />

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
              className="flex-1 px-6 py-3 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
