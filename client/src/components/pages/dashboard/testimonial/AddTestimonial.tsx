import { useState } from 'react';
import DynamicForm from '../../../shared/form/DynamicForm';
import { testimonialFormFields } from '../../../../constants/forms/testimonialFormFields';

interface TestimonialFormData {
  studentName: string;
  studentPhoto: string;
  feedback: string;
  jobTitle: string;
  videoUrl: string;
  companyName: string;
}

export default function AddTestimonial() {
  const [formData, setFormData] = useState<Partial<TestimonialFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    const requiredFields = ['studentName', 'studentPhoto', 'feedback', 'jobTitle', 'videoUrl', 'companyName'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof TestimonialFormData]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // TODO: Replace with actual API call
      console.log('Submitting testimonial:', formData);
      
      // Example API call:
      // const response = await fetch('/api/testimonials', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // const result = await response.json();
      
      alert('Testimonial added successfully!');
      // Reset form
      setFormData({});
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      alert('Failed to add testimonial. Please try again.');
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Testimonial</h1>
          <p className="text-gray-600">Fill in the details to add a student testimonial</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DynamicForm
                fields={testimonialFormFields}
                values={formData}
                onChange={handleFieldChange}
              />
            </div>
          </div>

          {/* Preview Section */}
          {Object.keys(formData).length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
              <div className="space-y-3">
                {formData.studentName && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Name: </span>
                    <span className="text-sm text-gray-900">{formData.studentName}</span>
                  </div>
                )}
                {formData.jobTitle && formData.companyName && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Position: </span>
                    <span className="text-sm text-gray-900">{formData.jobTitle} at {formData.companyName}</span>
                  </div>
                )}
                {formData.feedback && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Feedback: </span>
                    <p className="text-sm text-gray-900 mt-1 italic">&quot;{formData.feedback}&quot;</p>
                  </div>
                )}
                {formData.studentPhoto && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Photo URL: </span>
                    <a href={formData.studentPhoto} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                      {formData.studentPhoto}
                    </a>
                  </div>
                )}
                {formData.videoUrl && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Video URL: </span>
                    <a href={formData.videoUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                      {formData.videoUrl}
                    </a>
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
              {isSubmitting ? 'Submitting...' : 'Add Testimonial'}
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
