import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { Iblog } from "@/types/blog.types";

const useGetAllBlogs = () => {
  const [blogs, setBlogs] = useState<Iblog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await api.blog.getAllBlogs();
      setBlogs(response?.blogs || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return {
    blogs,
    isLoading,
    refetchBlogs: fetchBlogs,
  };
};

export default useGetAllBlogs;
