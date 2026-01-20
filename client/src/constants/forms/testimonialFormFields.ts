import type { FieldConfig } from '../../components/shared/form/DynamicForm';
import { useMemo } from 'react';
import useGetAllCourse from '../../hooks/course/useGetAllCourse';

export const useTestimonialFormFields = () => {
  const { courses, isLoading } = useGetAllCourse();

  const testimonialFormFields: FieldConfig[] = useMemo(() => [
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
      // required: true
    }, 
    {
      name: 'courseName',
      label: 'Course Name',
      type: 'select',
      placeholder: 'Select a course',
      required: true,
      options: courses?.map(course => ({
        label: course.title,
        value: course.slug
      })) || []
    }
  ], [courses]);

  return { testimonialFormFields, isLoading };
};
