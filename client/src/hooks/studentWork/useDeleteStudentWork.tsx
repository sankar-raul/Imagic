import { api } from "@/utils/api";
import { useState } from "react";

const useDeleteStudentWork = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteStudentWork = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await api.studentWork.deleteStudentWork(id);
      return response;
    } catch (error: any) {
      console.error("Error deleting student work:", error);
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return { deleteStudentWork, isLoading };
};

export default useDeleteStudentWork;
