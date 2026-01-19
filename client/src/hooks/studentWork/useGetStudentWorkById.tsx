import { api } from "@/utils/api";
import { IStudentWork } from "@/types/studentWork.types";
import { useEffect, useState } from "react";

const useGetStudentWorkById = (id: string) => {
  const [studentWork, setStudentWork] = useState<IStudentWork | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentWork = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.studentWork.getStudentWorkById(id);
        setStudentWork(response?.data || response);
      } catch (error: any) {
        console.error("Error fetching student work:", error);
        setError(error.message || "Failed to fetch student work");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentWork();
  }, [id]);

  return { studentWork, isLoading, error };
};

export default useGetStudentWorkById;
