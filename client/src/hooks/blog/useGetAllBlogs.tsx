import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { Iblog } from "@/types/blog.types";

interface UseGetAllBlogsParams {
  page?: number;
  limit?: number;
  infinite?: boolean;
}

const useGetAllBlogs = ({
  page = 1,
  limit = 6,
  infinite = false,
}: UseGetAllBlogsParams = {}) => {
  const [blogs, setBlogs] = useState<Iblog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);
  const [hasMore, setHasMore] = useState(true);

  const fetchBlogs = async (
    pageNum: number = currentPage,
    append: boolean = false,
  ) => {
    try {
      if (append) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }
      const response = await api.blog.getAllBlogs({
        page: pageNum,
        limit,
      });

      if (append && infinite) {
        setBlogs((prev) => [...prev, ...(response?.data || [])]);
      } else {
        setBlogs(response?.data || []);
      }

      setTotalBlogs(response?.total || 0);
      const totalPagesCalc = Math.ceil((response?.total || 0) / limit);
      setTotalPages(totalPagesCalc);
      setCurrentPage(pageNum);
      console.log(response);
      setHasMore(pageNum < totalPagesCalc);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const goToPage = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      fetchBlogs(pageNum, false);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      fetchBlogs(currentPage + 1, false);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      fetchBlogs(currentPage - 1, false);
    }
  };

  const loadMore = () => {
    if (hasMore && !isLoadingMore && infinite) {
      fetchBlogs(currentPage + 1, true);
    }
  };

  useEffect(() => {
    fetchBlogs(page, false);
  }, []);

  return {
    blogs,
    isLoading,
    isLoadingMore,
    currentPage,
    totalPages,
    totalBlogs,
    hasMore,
    goToPage,
    nextPage,
    prevPage,
    loadMore,
    refetchBlogs: fetchBlogs,
  };
};

export default useGetAllBlogs;
