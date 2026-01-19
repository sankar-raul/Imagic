import { Icourse } from "@/types/course.types";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";

const useGetAllCourse = () => {
  const [courses, setCourses] = useState<Icourse[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const response = await api.course.getAllCourses();
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  return {
    courses,
    refetchCourses: fetchCourses,
    isLoading,
  };
};

export default useGetAllCourse;
