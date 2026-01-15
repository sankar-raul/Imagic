import type { FieldConfig } from '../../components/shared/form/DynamicForm';

export const jobVacancyFormFields: FieldConfig[] = [
  {
    name: 'title',
    label: 'Job Title',
    type: 'text',
    placeholder: 'e.g., Senior Software Engineer',
    required: true
  },
  {
    name: 'company',
    label: 'Company',
    type: 'text',
    placeholder: 'e.g., Tech Corp Inc.',
    required: true
  },
  {
    name: 'location',
    label: 'Location',
    type: 'text',
    placeholder: 'e.g., New York, NY',
    required: true
  },
  {
    name: 'jobTitle',
    label: 'Job Title Category',
    type: 'text',
    placeholder: 'e.g., Software Development',
    required: true
  },
  {
    name: 'type',
    label: 'Job Type',
    type: 'text',
    placeholder: 'e.g., Full-time, Part-time, Contract',
    required: true
  },
  {
    name: 'timing',
    label: 'Work Timing',
    type: 'text',
    placeholder: 'e.g., 9:00 AM - 5:00 PM',
    required: true
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    rows: 4,
    placeholder: 'Brief description of the job...',
    required: true
  },
  {
    name: 'jobDetails',
    label: 'Job Details',
    type: 'richtext',
    placeholder: 'Detailed job requirements, responsibilities, qualifications...',
    required: true
  },
  {
    name: 'image',
    label: 'Job Image',
    type: 'text',
    placeholder: 'Image URL (optional)',
    required: false
  },
  {
    name: 'posted_date',
    label: 'Posted Date',
    type: 'date',
    required: true
  }
];
