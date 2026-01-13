import { api } from "@/utils/api";
import { useState } from "react";

const useCreateCourse = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createCourse = async (courseData: any) => {
    try {
      setIsLoading(true);
      const response = await api.course.createCourse(courseData);
      return response;
    } catch (error: any) {
        console.error("Error creating course:", error);
        throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { createCourse, isLoading };
};

export default useCreateCourse;
