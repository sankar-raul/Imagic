import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import DynamicForm from '../../../shared/form/DynamicForm';
import { placementFormFields } from '../../../../constants/forms/placementFormFields';
import useUpdatePlacement from '@/hooks/placement/useUpdatePlacement';
import useGetPlacementById from '@/hooks/placement/useGetPlacementById';

interface PlacementFormData {
  studentName: string;
  studentPhoto: string;
  jobTitle: string;
  description: string;
}

export default function EditPlacement() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updatePlacement, isLoading: isUpdating } = useUpdatePlacement();
  const { placement, isLoading, error } = useGetPlacementById(id || '');
  const [formData, setFormData] = useState<Partial<PlacementFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (placement) {
      setFormData({
        studentName: placement.studentName,
        studentPhoto: placement.studentPhoto,
        jobTitle: placement.jobTitle,
        description: placement.description,
      });
    }
  }, [placement]);

  const handleFieldChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) {
      alert('Placement ID is missing');
      return;
    }
    
    // Validate all required fields
    const requiredFields = ['studentName', 'studentPhoto', 'jobTitle', 'description'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof PlacementFormData]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await updatePlacement(id, formData);
      alert('Placement updated successfully!');
      navigate('/dashboard/placement');
    } catch (error) {
      console.error('Error updating placement:', error);
      alert('Failed to update placement. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      navigate('/dashboard/placement');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-6 w-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !placement) {
    return (
      <div className="min-h-screen p-6 w-full">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Placement</h3>
            <p className="text-gray-600 mb-4">{error || 'Placement not found'}</p>
            <button
              onClick={() => navigate('/dashboard/placement')}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Back to Placements
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Placement</h1>
          <p className="text-gray-600">Update the placement details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DynamicForm
                fields={placementFormFields}
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
                    <span className="text-sm font-medium text-gray-600">Student Name: </span>
                    <span className="text-sm text-gray-900">{formData.studentName}</span>
                  </div>
                )}
                {formData.jobTitle && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Job Title: </span>
                    <span className="text-sm text-gray-900">{formData.jobTitle}</span>
                  </div>
                )}
                {formData.description && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Description: </span>
                    <p className="text-sm text-gray-900 mt-1">{formData.description}</p>
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
              {isSubmitting || isUpdating ? 'Updating...' : 'Update Placement'}
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
