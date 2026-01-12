import type { FieldConfig } from '../../components/shared/form/DynamicForm';

export const placementFormFields: FieldConfig[] = [
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
    name: 'jobTitle',
    label: 'Job Title',
    type: 'text',
    placeholder: 'e.g., Software Engineer',
    required: true
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    rows: 5,
    placeholder: 'Enter placement details...',
    required: true
  }
];
