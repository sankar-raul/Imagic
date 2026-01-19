import { api } from "@/utils/api";
import { useState } from "react";

const useUpdateJob = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateJob = async (jobId: string, jobData: any) => {
    try {
      setIsLoading(true);
      const response = await api.jobVacancy.updateJob(jobId, jobData);
      return response;
    } catch (error: any) {
        console.error("Error updating job:", error);
        throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { updateJob, isLoading };
};

export default useUpdateJob;
