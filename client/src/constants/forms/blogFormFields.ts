import type { FieldConfig } from '../../components/shared/form/DynamicForm';

export const blogFormFields: FieldConfig[] = [
  {
    name: 'title',
    label: 'Blog Title',
    type: 'text',
    placeholder: 'e.g., Getting Started with React',
    required: true
  },
  // {
  //   name: 'slug',
  //   label: 'Slug',
  //   type: 'text',
  //   placeholder: 'e.g., getting-started-with-react',
  //   required: true
  // },
  {
    name: 'thumbnail',
    label: 'Thumbnail',
    type: 'image-upload',
    placeholder: 'Upload blog thumbnail',
    required: true
  },
  {
    name: 'short_description',
    label: 'Short Description',
    type: 'textarea',
    rows: 3,
    placeholder: 'Brief description of the blog post...',
    required: true
  },
  {
    name: 'posted_date',
    label: 'Posted Date',
    type: 'date',
    required: true
  }
];
