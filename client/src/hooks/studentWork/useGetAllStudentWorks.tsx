import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { IStudentWork } from "@/types/studentWork.types";

const useGetAllStudentWorks = () => {
  const [studentWorks, setStudentWorks] = useState<IStudentWork[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStudentWorks = async () => {
    try {
      setIsLoading(true);
      const response = await api.studentWork.getAllStudentWorks();
      setStudentWorks(response?.data || []);
    } catch (error) {
      console.error("Error fetching student works:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentWorks();
  }, []);

  return {
    studentWorks,
    isLoading,
    refetchStudentWorks: fetchStudentWorks,
  };
};

export default useGetAllStudentWorks;
