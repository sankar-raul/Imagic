import type { FieldConfig } from '../../components/shared/form/DynamicForm';

/* =====================================================
   BASIC COURSE INFO
   Maps to:
   - title
   - slug
   - short_description
   - course_overview
===================================================== */

export const basicInfoFields: FieldConfig[] = [
  {
    name: 'title',
    label: 'Course Title',
    type: 'text',
    required: true,
  },
  // {
  //   name: 'slug',
  //   label: 'Slug',
  //   type: 'text',
  //   required: true,
  // },
  {
    name: 'short_description',
    label: 'Short Description',
    type: 'textarea',
    rows: 3,
    required: true,
  },
  {
    name: 'course_overview',
    label: 'Course Overview',
    type: 'textarea',
    rows: 5,
    required: true,
  },
];

/* =====================================================
   COURSE DETAILS
   Maps to: courseDetails (IcourseDetails)
===================================================== */

export const courseDetailsFields: FieldConfig[] = [
  {
    name: 'price',
    label: 'Price',
    type: 'number',
    min: 0,
    required: true,
  },
  {
    name: 'category',
    label: 'Category',
    type: 'text',
    required: true,
  },
  {
    name: 'start_on',
    label: 'Start Date',
    type: 'date',
    required: true,
  },
  {
    name: 'duration',
    label: 'Duration',
    type: 'text',
    required: true,
  },
  {
    name: 'eligibility',
    label: 'Eligibility',
    type: 'text',
    required: true,
  },
  {
    name: 'branch',
    label: 'Branch',
    type: 'text',
    required: true,
  },
  {
    name: 'image',
    label: 'Course Image',
    type: 'image-upload',
    required: true,
  },
];

/* =====================================================
   COURSE SYLLABUS
   Maps to: courseSyllabus: ISyllabusSection[]
===================================================== */

export const syllabusFields: FieldConfig[] = [
  {
    name: 'courseSyllabus',
    label: 'Syllabus Modules',
    type: 'group',
    repeatable: true,
    fields: [
      {
        name: 'title',
        label: 'Module Title',
        type: 'text',
        required: true,
      },
      {
        name: 'description',
        label: 'Module Description',
        type: 'textarea',
        rows: 2,
        required: true,
      },
    ],
  },
];

/* =====================================================
   STUDENT WORK
   Maps to: students_work: IstudentWork[]
===================================================== */

// export const studentWorkFields: FieldConfig[] = [
//   {
//     name: 'students_work',
//     label: 'Student Work',
//     type: 'group',
//     repeatable: true,
//     fields: [
//       {
//         name: 'tool',
//         label: 'Tool',
//         type: 'text',
//         required: true,
//       },
//       {
//         name: 'name',
//         label: 'Student Name',
//         type: 'text',
//         required: true,
//       },
//       {
//         name: 'description',
//         label: 'Work Description',
//         type: 'textarea',
//         rows: 2,
//         required: true,
//       },
//       {
//         name: 'image',
//         label: 'Work Image',
//         type: 'image-upload',
//         required: true,
//       },
//     ],
//   },
// ];

/* =====================================================
   COURSE REVIEWS
   Maps to: reviews: IcourseReview[]
===================================================== */

export const reviewFields: FieldConfig[] = [
  {
    name: 'reviews',
    label: 'Course Reviews',
    type: 'group',
    repeatable: true,
    fields: [
      {
        name: 'name',
        label: 'Reviewer Name',
        type: 'text',
        required: true,
      },
      {
        name: 'rating',
        label: 'Rating (1–5)',
        type: 'number',
        min: 1,
        max: 5,
        required: true,
      },
      {
        name: 'comment',
        label: 'Comment',
        type: 'textarea',
        rows: 3,
        required: true,
      },
      {
        name: 'date',
        label: 'Review Date',
        type: 'date',
        required: true,
      },
    ],
  },
];

/* =====================================================
   STUDENT TESTIMONIALS
   Maps to: students_testimonials: IcourseTestimonial[]
===================================================== */

// export const testimonialFields: FieldConfig[] = [
//   {
//     name: 'students_testimonials',
//     label: 'Student Testimonials',
//     type: 'group',
//     repeatable: true,
//     fields: [
//       {
//         name: 'name',
//         label: 'Student Name',
//         type: 'text',
//         required: true,
//       },
//       {
//         name: 'designation',
//         label: 'Designation',
//         type: 'text',
//         required: true,
//       },
//       {
//         name: 'testimonial',
//         label: 'Testimonial',
//         type: 'textarea',
//         rows: 3,
//         required: true,
//       },
//       {
//         name: 'image',
//         label: 'Student Image',
//         type: 'image-upload',
//         required: true,
//       },
//       {
//         name: 'video',
//         label: 'Video URL (optional)',
//         type: 'url',
//       },
//     ],
//   },
// ];
