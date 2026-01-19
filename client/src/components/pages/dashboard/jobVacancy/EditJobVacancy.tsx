import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import DynamicForm from '../../../shared/form/DynamicForm';
import { jobVacancyFormFields } from '../../../../constants/forms/jobVacancyFormFields';
import useUpdateJob from '@/hooks/jobVacancy/useUpdateJob';
import useGetJobById from '@/hooks/jobVacancy/useGetJobById';
import { Ijob } from '@/types/job.types';

export default function EditJobVacancy() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updateJob, isLoading: isUpdating } = useUpdateJob();
  const { job, isLoading, error } = useGetJobById(id || '');
  const [formData, setFormData] = useState<Partial<Omit<Ijob, 'posted_date'> & { posted_date?: string }>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (job) {
      // Convert ISO date string to yyyy-MM-dd format for date input
      const formatDateForInput = (dateString: Date): string => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      };

      setFormData({
        title: job.title,
        company: job.company,
        location: job.location,
        jobTitle: job.jobTitle,
        type: job.type,
        timing: job.timing,
        description: job.description,
        jobDetails: job.jobDetails,
        image: job.image,
        posted_date: formatDateForInput(job.posted_date),
      });
    }
  }, [job]);

  const handleFieldChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) {
      alert('Job ID is missing');
      return;
    }
    
    // Validate all required fields
    const requiredFields: (keyof Ijob)[] = ['title', 'company', 'location', 'jobTitle', 'type', 'timing', 'description', 'jobDetails'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await updateJob(id, formData);
      alert('Job vacancy updated successfully!');
      navigate('/dashboard/job-vacancy');
    } catch (error) {
      console.error('Error updating job vacancy:', error);
      alert('Failed to update job vacancy. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      navigate('/dashboard/job-vacancy');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-6 w-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen p-6 w-full">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Job Vacancy</h3>
            <p className="text-gray-600 mb-4">{error || 'Job vacancy not found'}</p>
            <button
              onClick={() => navigate('/dashboard/job-vacancy')}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Back to Job Vacancies
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 w-full">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Job Vacancy</h1>
          <p className="text-gray-600">Update the job vacancy details</p>
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
                {formData.company && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Company: </span>
                    <span className="text-sm text-gray-900">{formData.company}</span>
                  </div>
                )}
                {formData.location && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Location: </span>
                    <span className="text-sm text-gray-900">{formData.location}</span>
                  </div>
                )}
                {formData.description && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Description: </span>
                    <p className="text-sm text-gray-900 mt-1">{formData.description}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting || isUpdating}
              className="flex-1 px-6 py-3 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting || isUpdating ? 'Updating...' : 'Update Job Vacancy'}
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
