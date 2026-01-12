import React, { useState } from 'react';

export type FieldType = 
  | 'text' 
  | 'textarea' 
  | 'number' 
  | 'date' 
  | 'email' 
  | 'url' 
  | 'radio' 
  | 'checkbox'
  | 'select'
  | 'image-upload';

export interface FieldOption {
  label: string;
  value: string | number;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  rows?: number; // for textarea
  min?: number; // for number inputs
  max?: number; // for number inputs
  options?: FieldOption[]; // for radio, checkbox, select
  className?: string; // custom styling
  defaultValue?: string | number | boolean;
}

export interface DynamicFormProps {
  fields: FieldConfig[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
  className?: string;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ 
  fields, 
  values, 
  onChange,
  className = '' 
}) => {
  const [uploadingFiles, setUploadingFiles] = useState<Record<string, boolean>>({});

  const handleFileUpload = async (fieldName: string, file: File) => {
    setUploadingFiles(prev => ({ ...prev, [fieldName]: true }));
    
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      // TODO: Replace with your actual API endpoint
      const response = await fetch('http://localhost:8080/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const data = await response.json();
      // Assuming API returns { url: 'https://...' }
      onChange(fieldName, data.url);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingFiles(prev => ({ ...prev, [fieldName]: false }));
    }
  };
  
  const renderField = (field: FieldConfig) => {
    const value = values[field.name] ?? field.defaultValue ?? '';

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            rows={field.rows || 3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
            placeholder={field.placeholder}
            required={field.required}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            min={field.min}
            max={field.max}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder={field.placeholder}
            required={field.required}
          />
        );

      case 'date':
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            required={field.required}
          />
        );

      case 'email':
        return (
          <input
            type="email"
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder={field.placeholder}
            required={field.required}
          />
        );

      case 'url':
        return (
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder={field.placeholder}
            required={field.required}
          />
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  required={field.required}
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map((option) => {
              const checkedValues = Array.isArray(value) ? value : [];
              return (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={checkedValues.includes(option.value)}
                    onChange={(e) => {
                      const newValues = e.target.checked
                        ? [...checkedValues, option.value]
                        : checkedValues.filter((v: any) => v !== option.value);
                      onChange(field.name, newValues);
                    }}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              );
            })}
          </div>
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            required={field.required}
          >
            <option value="">Select an option</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'image-upload':
        const isUploading = uploadingFiles[field.name];
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <label className="flex-1">
                <div className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition bg-gray-50 hover:bg-blue-50">
                  <div className="text-center">
                    <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mt-1 text-sm text-gray-600">
                      {isUploading ? 'Uploading...' : 'Click to upload image'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFileUpload(field.name, file);
                      }
                    }}
                    className="hidden"
                    disabled={isUploading}
                  />
                </div>
              </label>
            </div>
            
            {isUploading && (
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Uploading image...</span>
              </div>
            )}
            
            {value && !isUploading && (
              <div className="relative inline-block">
                <img
                  src={value}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-lg border-2 border-gray-200"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/150?text=Invalid+Image';
                  }}
                />
                <button
                  type="button"
                  onClick={() => onChange(field.name, '')}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                  title="Remove image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            
            {value && !isUploading && (
              <input
                type="text"
                value={value}
                readOnly
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-600"
                placeholder="Image URL will appear here"
              />
            )}
          </div>
        );

      case 'text':
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder={field.placeholder}
            required={field.required}
          />
        );
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {fields.map((field) => (
        <div key={field.name} className={field.className || ''}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {renderField(field)}
        </div>
      ))}
    </div>
  );
};

export default DynamicForm;
