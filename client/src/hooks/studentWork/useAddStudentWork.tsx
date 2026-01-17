import { api } from "@/utils/api";
import { useState } from "react";

const useAddStudentWork = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addStudentWork = async (studentWorkData: any) => {
    try {
      setIsLoading(true);
      const response = await api.studentWork.addStudentWork(studentWorkData);
      return response;
    } catch (error: any) {
      console.error("Error adding student work:", error);
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return { addStudentWork, isLoading };
};

export default useAddStudentWork;
