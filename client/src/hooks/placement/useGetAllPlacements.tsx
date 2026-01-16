import { Iplacement } from "@/types/placement.types";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";

interface UseGetAllPlacementsProps {
  page?: number;
  limit?: number;
}

const useGetAllPlacements = ({
  page: initialPage = 1,
  limit: initialLimit = 10,
}: UseGetAllPlacementsProps = {}) => {
  const [placements, setPlacements] = useState<Iplacement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const fetchPlacements = async (
    currentPage: number = page,
    currentLimit: number = limit
  ) => {
    try {
      setIsLoading(true);
      const response = await api.placements.getAllPlacement(
        currentPage,
        currentLimit
      );
      setPlacements(response.data || []);
      setTotalPages(Math.floor(response.totalPlacedStudents / currentLimit) || 0);
      setTotalItems(response.totalPlacedStudents || 0);
    } catch (error) {
      console.error("Error fetching placements:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("first");
    fetchPlacements(page, limit);
  }, [page, limit]);

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const nextPage = () => {
    console.log("first");
    console.log(page, totalPages);
    if (page < totalPages) {
      console.log("op");
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
    setPage(1); // Reset to first page when changing limit
  };

  return {
    placements,
    isLoading,
    page,
    limit,
    totalPages,
    totalItems,
    goToPage,
    nextPage,
    prevPage,
    changeLimit,
    refetchPlacements: fetchPlacements,
  };
};

export default useGetAllPlacements;
