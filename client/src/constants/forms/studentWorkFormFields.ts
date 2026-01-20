import type { FieldConfig } from '../../components/shared/form/DynamicForm';
import { useMemo } from 'react';
import useGetAllCourse from '../../hooks/course/useGetAllCourse';

export const useStudentWorkFormFields = () => {
  const { courses, isLoading } = useGetAllCourse();

  const studentWorkFormFields: FieldConfig[] = useMemo(() => [
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
      type: 'select',
      placeholder: 'Select a course',
      required: true,
      options: courses?.map(course => ({
        label: course.title,
        value: course.slug
      })) || []
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
  ], [courses]);

  return { studentWorkFormFields, isLoading };
};
