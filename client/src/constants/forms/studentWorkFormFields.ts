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
      name: 'courseId',
      label: 'Course Name',
      type: 'select',
      placeholder: 'Select a course',
      required: true,
      options: courses?.filter(course => course._id).map(course => ({
        label: course.title,
        value: course._id!
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
