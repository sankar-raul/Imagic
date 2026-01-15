import { Icourse } from "@/types/course.types";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";

const useGetCourseById = (id?: string) => {
  const [courseData, setCourseData] = useState<Icourse>();
  const [isLoading, setIsLoading] = useState(false);
  const fetchCourseData = async () => {
    if (!id) {
      setCourseData(undefined);
      return;
    }
    try {
      setIsLoading(true);
      const response = await api.course.getCourseById(id);
      setCourseData(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCourseData();
  }, [id]);
  return {
    courseData,
    refetchCourseData: fetchCourseData,
    isLoading,
  };
};

export default useGetCourseById;
