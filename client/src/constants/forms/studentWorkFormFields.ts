import type { FieldConfig } from '../../components/shared/form/DynamicForm';

export const studentWorkFormFields: FieldConfig[] = [
  {
    name: 'title',
    label: 'Work Title',
    type: 'text',
    placeholder: 'e.g., E-commerce Website',
    required: true
  },
  {
    name: 'studentName',
    label: 'Student Name',
    type: 'text',
    placeholder: 'Enter student name',
    required: true
  },
  {
    name: 'courseName',
    label: 'Course Name',
    type: 'text',
    placeholder: 'e.g., Full Stack Web Development',
    required: true
  },
  {
    name: 'videoUrl',
    label: 'Video URL',
    type: 'url',
    placeholder: 'https://youtube.com/...'
  },
  {
    name: 'thumbnailUrl',
    label: 'Thumbnail',
    type: 'image-upload',
    placeholder: 'Upload thumbnail image',
    required: true
  }
];
