import { api } from "@/utils/api";

const useDeleteJob = () => {
  const deleteJobById = async (jobId: string) => {
    try {
      const response = await api.jobVacancy.deleteJob(jobId);
      return response;
    } catch (error) {
      console.error("Error deleting job:", error);
      throw error;
    }
  };
  return {
    deleteJobById,
  };
};

export default useDeleteJob;
