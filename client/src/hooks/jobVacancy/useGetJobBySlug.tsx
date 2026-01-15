import { Ijob } from "@/types/job.types";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";

const useGetJobBySlug = (slug: string) => {
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState<Ijob>();

  const fetchJobBySlug = async () => {
    try {
      setLoading(true);
      const response = await api.jobVacancy.getJobBySlug(slug);
      setJob(response?.data || null);
    } catch (error) {
      console.error("Error fetching job by slug:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchJobBySlug();
  }, [slug]);
  return {
    job,
    loading,
    refetch: fetchJobBySlug,
  };
};

export default useGetJobBySlug;
