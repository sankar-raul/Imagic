import { api } from "@/utils/api";
import { Iblog } from "@/types/blog.types";
import { useEffect, useState } from "react";

const useGetBlogById = (blogId: string) => {
  const [blog, setBlog] = useState<Iblog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!blogId) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.blog.getBlogById(blogId);
        setBlog(response?.data || response);
      } catch (error: any) {
        console.error("Error fetching blog:", error);
        setError(error.message || "Failed to fetch blog");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  return { blog, isLoading, error };
};

export default useGetBlogById;
