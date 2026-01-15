import { api } from "@/utils/api";
import { useState } from "react";

const useAddJobVacancy = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addJobVacancy = async (jobData: any) => {
    try {
      setIsLoading(true);
      const response = await api.jobVacancy.createJob(jobData);
      return response;
    } catch (error: any) {
        console.error("Error creating job vacancy:", error);
        throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { addJobVacancy, isLoading };
};

export default useAddJobVacancy;