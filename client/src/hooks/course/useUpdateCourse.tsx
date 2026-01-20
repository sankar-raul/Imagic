import { useState } from "react";
import { api } from "@/utils/api";
import { Icourse } from "@/types/course.types";

const useUpdateCourse = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateCourse = async (courseId: string, courseData: Partial<Icourse>) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.course.updateCourse(courseId, courseData);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to update course";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateCourse,
    isLoading,
    error,
  };
};

export default useUpdateCourse;
