import { useState } from 'react';
import DynamicForm from '../../../shared/form/DynamicForm';
import { jobVacancyFormFields } from '../../../../constants/forms/jobVacancyFormFields';
import useAddJobVacancy from '@/hooks/jobVacancy/useAddJobVacancy';
import { Ijob } from '@/types/job.types';



export default function AddJobVacancy() {
  const { addJobVacancy } = useAddJobVacancy();

  const [formData, setFormData] = useState<Partial<Ijob>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    const requiredFields: (keyof Ijob)[] = ['title', 'company', 'location', 'jobTitle', 'type', 'timing', 'description', 'jobDetails'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await addJobVacancy(formData);
      console.log('Submitting job vacancy:', response);
      
      alert('Job vacancy added successfully!');
      // Reset form
      setFormData({});
    } catch (error) {
      console.error('Error submitting job vacancy:', error);
      alert('Failed to add job vacancy. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (Object.keys(formData).length > 0) {
      if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
        setFormData({});
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
