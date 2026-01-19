import { api } from "@/utils/api";
import { useState } from "react";

const useUpdateStudentWork = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateStudentWork = async (id: string, studentWorkData: any) => {
    try {
      setIsLoading(true);
      const response = await api.studentWork.updateStudentWork(id, studentWorkData);
      return response;
    } catch (error: any) {
        console.error("Error updating student work:", error);
        throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { updateStudentWork, isLoading };
};

export default useUpdateStudentWork;
