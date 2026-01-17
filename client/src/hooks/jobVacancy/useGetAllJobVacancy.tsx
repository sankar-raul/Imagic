import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { Ijob } from "@/types/job.types";

interface UseGetAllJobVacancyProps {
  page?: number;
  limit?: number;
}

const useGetAllJobVacancy = ({
  page: initialPage = 1,
  limit: initialLimit = 10,
}: UseGetAllJobVacancyProps = {}) => {
  const [jobVacancy, setJobVacancy] = useState<Ijob[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const fetchJobVacancy = async (
    currentPage: number = page,
    currentLimit: number = limit
  ) => {
    try {
      setIsLoading(true);
      const response = await api.jobVacancy.getAllJobs(
        currentPage,
        currentLimit
      );
      setJobVacancy(response?.data || []);
      setTotalPages(response?.totalPages || 0);
      setTotalItems(response?.total || 0);
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobVacancy(page, limit);
  }, [page, limit]);

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const nextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const changeLimit = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  return {
    jobVacancy,
    isLoading,
    page,
    limit,
    totalPages,
    totalItems,
    goToPage,
    nextPage,
    prevPage,
    changeLimit,
    refetchJobVacancy: fetchJobVacancy,
  };
};

export default useGetAllJobVacancy;
