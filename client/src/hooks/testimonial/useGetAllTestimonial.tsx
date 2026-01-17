import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { Itestimonial } from "@/types/testimonials.types";

interface UseGetAllTestimonialProps {
  page?: number;
  limit?: number;
}

const useGetAllTestimonial = ({
  page: initialPage = 1,
  limit: initialLimit = 10,
}: UseGetAllTestimonialProps = {}) => {
  const [testimonials, setTestimonials] = useState<Itestimonial[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const fetchTestimonials = async (
    currentPage: number = page,
    currentLimit: number = limit
  ) => {
    try {
      setIsLoading(true);
      const response = await api.testimonial.getAllTestimonial(
        currentPage,
        currentLimit
      );
      setTestimonials(response?.testimonials || []);
      setTotalPages(response?.totalPages || 0);
      setTotalItems(response?.totalTestimonials || 0);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials(page, limit);
  }, [page, limit]);

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const changeLimit = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when changing limit
  };

  return {
    testimonials,
    isLoading,
    page,
    limit,
    totalPages,
    totalItems,
    goToPage,
    nextPage,
    prevPage,
    changeLimit,
    refetchTestimonials: () => fetchTestimonials(page, limit),
  };
};

export default useGetAllTestimonial;
