import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import './tiptap.css';
import { blogFormFields } from '@/constants/forms/blogFormFields';
import DynamicForm from '@/components/shared/form/DynamicForm';
import RichTextEditor from '@/components/shared/RichTextEditor';
import useUpdateBlog from '@/hooks/blog/useUpdateBlog';
import useGetBlogById from '@/hooks/blog/useGetBlogById';

interface BlogFormData {
  title: string;
  slug: string;
  thumbnail: string;
  short_description: string;
  posted_date: string;
  content: string;
}

export default function EditBlog() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updateBlog, isLoading: isUpdating } = useUpdateBlog();
  const { blog, isLoading, error } = useGetBlogById(id || '');
  const [formData, setFormData] = useState<Partial<BlogFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blogContent, setBlogContent] = useState('');

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        slug: blog.slug,
        thumbnail: blog.thumbnail,
        short_description: blog.short_description,
        posted_date: new Date(blog.posted_date).toISOString().split('T')[0],
      });
      setBlogContent(blog.content || '');
    }
  }, [blog]);

  const handleFieldChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from title
    if (name === 'title' && value) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\\s-]/g, '')
        .replace(/\\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) {
      alert('Blog ID is missing');
      return;
    }
    
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
      await updateBlog(id, blogData);
      alert('Blog post updated successfully!');
      navigate('/dashboard/blog');
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Failed to update blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      navigate('/dashboard/blog');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-6 w-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen p-6 w-full">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Blog</h3>
            <p className="text-gray-600 mb-4">{error || 'Blog not found'}</p>
            <button
              onClick={() => navigate('/dashboard/blog')}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Back to Blogs
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 w-full">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Blog Post</h1>
          <p className="text-gray-600">Update your blog article</p>
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
              disabled={isSubmitting || isUpdating}
              className="flex-1 px-6 py-3 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting || isUpdating ? 'Updating...' : 'Update Blog Post'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting || isUpdating}
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
