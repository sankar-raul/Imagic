import { api } from "@/utils/api";
import { Ijob } from "@/types/job.types";
import { useEffect, useState } from "react";

const useGetJobById = (jobId: string) => {
  const [job, setJob] = useState<Ijob | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.jobVacancy.getJobById(jobId);
        setJob(response?.data || response);
      } catch (error: any) {
        console.error("Error fetching job:", error);
        setError(error.message || "Failed to fetch job");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  return { job, isLoading, error };
};

export default useGetJobById;
