import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { IStudentWork } from "@/types/studentWork.types";

interface Pagination {
  page: number;
  limit: number;
  total: number;
}

const useGetAllStudentWorks = (initialPage = 1, initialLimit = 10) => {
  const [studentWorks, setStudentWorks] = useState<IStudentWork[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<Pagination>({
    page: initialPage,
    limit: initialLimit,
    total: 0,
  });

  const fetchStudentWorks = async (
    page = pagination.page,
    limit = pagination.limit,
  ) => {
    try {
      setIsLoading(true);
      const response = await api.studentWork.getAllStudentWorks({
        page,
        limit,
      });
      setStudentWorks(response?.data || []);
      setPagination({
        page,
        limit,
        total: response?.pagination?.total || 0,
      });
    } catch (error) {
      console.error("Error fetching student works:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentWorks(pagination.page, pagination.limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.limit]);

  const setPage = (page: number) =>
    setPagination((prev) => ({ ...prev, page }));
  const setLimit = (limit: number) =>
    setPagination((prev) => ({ ...prev, limit }));

  return {
    studentWorks,
    isLoading,
    pagination,
    setPage,
    setLimit,
    refetchStudentWorks: fetchStudentWorks,
  };
};

export default useGetAllStudentWorks;
