import { api } from "@/utils/api";
import { useState } from "react";

const useDeleteNews = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteNews = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await api.news.deleteNews(id);
      return response;
    } catch (error: any) {
      console.error("Error deleting news:", error);
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return { deleteNews, isLoading };
};

export default useDeleteNews;
