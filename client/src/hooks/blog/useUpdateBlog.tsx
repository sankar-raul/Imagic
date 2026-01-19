import { api } from "@/utils/api";
import { useState } from "react";

const useUpdateBlog = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateBlog = async (blogId: string, blogData: any) => {
    try {
      setIsLoading(true);
      const response = await api.blog.updateBlog(blogId, blogData);
      return response;
    } catch (error: any) {
        console.error("Error updating blog:", error);
        throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { updateBlog, isLoading };
};

export default useUpdateBlog;
