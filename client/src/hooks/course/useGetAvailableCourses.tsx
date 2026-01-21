import { IAvailableCourse } from "@/types/availableCourse.interface";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";

const useGetAvailableCourses = () => {
  const [courses, setCourses] = useState<IAvailableCourse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fetchAvailableCourses = async () => {
    setIsLoading(true);
    try {
      const response = await api.course.availableCourses();
      setCourses(response?.data || response);
    } catch (error) {
      console.error("Error fetching available courses:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch available courses",
      );
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAvailableCourses();
  }, []);
  return {
    courses,
    isLoading,
    error,
    refetch: fetchAvailableCourses,
  };
};

export default useGetAvailableCourses;
