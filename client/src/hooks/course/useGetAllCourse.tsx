import { api } from "@/utils/api";
import { useEffect, useState } from "react";

const useGetAllCourse = () => {
  const [courses, setCourses] = useState<any[]>();
  const fetchCourses = async () => {
    try {
      const response = await api.course.getAllCourses();
      setCourses(response);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  return {
    courses,
    refetchCourses: fetchCourses,
  };
};

export default useGetAllCourse;
