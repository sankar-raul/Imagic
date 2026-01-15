import { Icourse } from "@/types/course.types";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";

const useGetAllCourse = () => {
  const [courses, setCourses] = useState<Icourse[]>();
  const fetchCourses = async () => {
    try {
      const response = await api.course.getAllCourses();
      setCourses(response.data);
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
