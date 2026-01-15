import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { Ijob } from "@/types/job.types";

const useGetAllJobVacancy = () => {
  const [jobVacancy, setJobVacancy] = useState<Ijob[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchJobVacancy = async () => {
    try {
      setIsLoading(true);
      const response = await api.jobVacancy.getAllJobs();
      setJobVacancy(response?.jobs || []);
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobVacancy();
  }, []);

  return {
    jobVacancy,
    isLoading,
    refetchJobVacancy: fetchJobVacancy,
  };
};

export default useGetAllJobVacancy;
