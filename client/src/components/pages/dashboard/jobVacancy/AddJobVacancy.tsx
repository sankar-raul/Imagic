import { useState } from 'react';
import DynamicForm from '../../../shared/form/DynamicForm';
import { jobVacancyFormFields } from '../../../../constants/forms/jobVacancyFormFields';
import useAddJobVacancy from '@/hooks/jobVacancy/useAddJobVacancy';

interface JobVacancyFormData {
  title: string;
  slug: string;
  description: string;
  jobDetails: string;
  posted_date: string;
}

export default function AddJobVacancy() {
  const { addJobVacancy } = useAddJobVacancy();

  const [formData, setFormData] = useState<Partial<JobVacancyFormData>>({
    posted_date: new Date().toISOString().split('T')[0] // Set today's date as default
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const requiredFields = ['title', 'slug', 'description', 'jobDetails', 'posted_date'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof JobVacancyFormData]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await addJobVacancy(formData);
      console.log('Submitting job vacancy:', response);

      
      alert('Job vacancy added successfully!');
      // Reset form with default date
      setFormData({
        posted_date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error submitting job vacancy:', error);
      alert('Failed to add job vacancy. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (Object.keys(formData).length > 1) { // More than just posted_date
      if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
        setFormData({
          posted_date: new Date().toISOString().split('T')[0]
        });
      }
    }
  };

  return (
    <div className="min-h-screen p-6 w-full">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Job Vacancy</h1>
          <p className="text-gray-600">Fill in the details to post a new job vacancy</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DynamicForm
                fields={jobVacancyFormFields.filter(f => f.name !== 'jobDetails')}
                values={formData}
                onChange={handleFieldChange}
              />
            </div>
            
            {/* Rich Text Editor for Job Details - Full Width */}
            <div className="mt-6">
              <DynamicForm
                fields={jobVacancyFormFields.filter(f => f.name === 'jobDetails')}
                values={formData}
                onChange={handleFieldChange}
              />
            </div>
          </div>

          {/* Preview Section */}
          {(formData.title || formData.description) && (
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
              <div className="space-y-3">
                {formData.title && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Job Title: </span>
                    <span className="text-sm text-gray-900 font-semibold">{formData.title}</span>
                  </div>
                )}
                {formData.slug && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Slug: </span>
                    <span className="text-sm text-gray-900 font-mono">{formData.slug}</span>
                  </div>
                )}
                {formData.posted_date && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Posted Date: </span>
                    <span className="text-sm text-gray-900">
                      {new Date(formData.posted_date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                )}
                {formData.description && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Description: </span>
                    <p className="text-sm text-gray-900 mt-1">{formData.description}</p>
                  </div>
                )}
                {formData.jobDetails && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Job Details: </span>
                    <div className="text-sm text-gray-900 mt-1 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: formData.jobDetails }} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Add Job Vacancy'}
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
