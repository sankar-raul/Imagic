import type { FieldConfig } from '../../components/shared/form/DynamicForm';

export const testimonialFormFields: FieldConfig[] = [
  {
    name: 'studentName',
    label: 'Student Name',
    type: 'text',
    placeholder: 'Enter student name',
    required: true
  },
  {
    name: 'studentPhoto',
    label: 'Student Photo',
    type: 'image-upload',
    placeholder: 'Upload student photo',
    required: true
  },
  {
    name: 'feedback',
    label: 'Feedback',
    type: 'textarea',
    rows: 5,
    placeholder: 'Student feedback/testimonial...',
    required: true
  },
  {
    name: 'jobTitle',
    label: 'Job Title',
    type: 'text',
    placeholder: 'e.g., Software Engineer',
    required: true
  },
  {
    name: 'companyName',
    label: 'Company Name',
    type: 'text',
    placeholder: 'e.g., Google',
    required: true
  },
  {
    name: 'videoUrl',
    label: 'Video URL',
    type: 'url',
    placeholder: 'https://youtube.com/...',
    required: true
  }
];
