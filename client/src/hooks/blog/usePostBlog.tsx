import { api } from "@/utils/api";
import { useState } from "react";

const usePostBlog = () => {
  const [isLoading, setIsLoading] = useState(false);

  const postBlog = async (blogData: any) => {
    try {
      setIsLoading(true);
      const response = await api.blog.postBlog(blogData);
      return response;
    } catch (error: any) {
        console.error("Error posting blog:", error);
        throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { postBlog, isLoading };
};

export default usePostBlog;
