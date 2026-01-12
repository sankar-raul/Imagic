import type { FieldConfig } from '../../components/shared/form/DynamicForm';

export const basicInfoFields: FieldConfig[] = [
  {
    name: 'title',
    label: 'Course Title',
    type: 'text',
    placeholder: 'e.g., Full Stack Web Development',
    required: true
  },
  {
    name: 'slug',
    label: 'Slug',
    type: 'text',
    placeholder: 'e.g., full-stack-web-development',
    required: true
  },
  {
    name: 'shortDescription',
    label: 'Short Description',
    type: 'textarea',
    rows: 3,
    placeholder: 'Brief description of the course...',
    required: true
  },
  {
    name: 'overview',
    label: 'Course Overview',
    type: 'textarea',
    rows: 5,
    placeholder: 'Detailed overview of what students will learn...',
    required: true
  }
];

export const courseDetailsFields: FieldConfig[] = [
  {
    name: 'price',
    label: 'Price ($)',
    type: 'number',
    placeholder: '999',
    min: 0,
    required: true,
    className: 'md:col-span-1'
  },
  {
    name: 'category',
    label: 'Category',
    type: 'text',
    placeholder: 'e.g., Development, Design',
    required: true,
    className: 'md:col-span-1'
  },
  {
    name: 'startDate',
    label: 'Start Date',
    type: 'date',
    required: true,
    className: 'md:col-span-1'
  },
  {
    name: 'duration',
    label: 'Duration',
    type: 'text',
    placeholder: 'e.g., 12 weeks',
    required: true,
    className: 'md:col-span-1'
  },
  {
    name: 'branch',
    label: 'Branch',
    type: 'text',
    placeholder: 'e.g., Computer Science',
    className: 'md:col-span-1'
  },
  {
    name: 'eligibility',
    label: 'Eligibility',
    type: 'text',
    placeholder: 'e.g., Basic programming knowledge',
    className: 'md:col-span-1'
  },
  {
    name: 'imageUrl',
    label: 'Course Image URL',
    type: 'image-upload',
    placeholder: 'Upload course image',
    required: true,
    className: 'md:col-span-2'
  }
];

export const syllabusFields: FieldConfig[] = [
  {
    name: 'moduleTitle',
    label: 'Module Title',
    type: 'text',
    placeholder: 'e.g., Introduction to JavaScript',
    required: true
  },
  {
    name: 'moduleDescription',
    label: 'Module Description',
    type: 'textarea',
    rows: 2,
    placeholder: 'Description of this module...',
    required: true
  }
];

export const studentWorkFields: FieldConfig[] = [
  {
    name: 'tool',
    label: 'Tool',
    type: 'text',
    placeholder: 'e.g., React',
    required: true,
    className: 'md:col-span-1'
  },
  {
    name: 'studentName',
    label: 'Student Name',
    type: 'text',
    placeholder: 'Student name',
    required: true,
    className: 'md:col-span-1'
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    rows: 2,
    placeholder: 'Description of the work...',
    required: true,
    className: 'md:col-span-2'
  },
  {
    name: 'imageUrl',
    label: 'Image URL',
    type: 'image-upload',
    placeholder: 'Upload work image',
    required: true,
    className: 'md:col-span-2'
  }
];

export const reviewFields: FieldConfig[] = [
  {
    name: 'reviewerName',
    label: 'Reviewer Name',
    type: 'text',
    placeholder: 'Reviewer name',
    required: true,
    className: 'md:col-span-1'
  },
  {
    name: 'rating',
    label: 'Rating (1-5)',
    type: 'number',
    min: 1,
    max: 5,
    placeholder: '5',
    required: true,
    className: 'md:col-span-1'
  },
  {
    name: 'comment',
    label: 'Comment',
    type: 'textarea',
    rows: 3,
    placeholder: 'Review comment...',
    required: true,
    className: 'md:col-span-2'
  },
  {
    name: 'reviewDate',
    label: 'Review Date',
    type: 'date',
    required: true,
    className: 'md:col-span-1'
  }
];

export const testimonialFields: FieldConfig[] = [
  {
    name: 'studentName',
    label: 'Student Name',
    type: 'text',
    placeholder: 'Student name',
    required: true,
    className: 'md:col-span-1'
  },
  {
    name: 'designation',
    label: 'Designation',
    type: 'text',
    placeholder: 'e.g., Software Engineer at Google',
    required: true,
    className: 'md:col-span-1'
  },
  {
    name: 'testimonial',
    label: 'Testimonial',
    type: 'textarea',
    rows: 3,
    placeholder: "Student's testimonial...",
    required: true,
    className: 'md:col-span-2'
  },
  {
    name: 'imageUrl',
    label: 'Image URL',
    type: 'image-upload',
    placeholder: 'Upload student image',
    required: true,
    className: 'md:col-span-1'
  },
  {
    name: 'videoUrl',
    label: 'Video URL (optional)',
    type: 'url',
    placeholder: 'https://youtube.com/...',
    className: 'md:col-span-1'
  }
];
