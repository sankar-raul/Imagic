import { api } from "@/utils/api";
import { useState } from "react";

const useSubmitDemoClass = () => {
  const [isLoading, setIsLoading] = useState(false);

  const submitDemoClassForm = async (courseData: any) => {
    try {
      setIsLoading(true);
      const response = await api.demoClass.applyDemoClass(courseData);
      return response?.data;
    } catch (error: any) {
        console.error("Error creating course:", error);
        throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { submitDemoClassForm, isLoading };
};

export default useSubmitDemoClass;
