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
    name: 'slug',
    label: 'Slug',
    type: 'text',
    placeholder: 'e.g., senior-software-engineer',
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
    type: 'textarea',
    rows: 8,
    placeholder: 'Detailed job requirements, responsibilities, qualifications...',
    required: true
  },
  {
    name: 'posted_date',
    label: 'Posted Date',
    type: 'date',
    required: true
  }
];
