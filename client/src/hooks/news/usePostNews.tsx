import { api } from "@/utils/api";
import { useState } from "react";

const usePostNews = () => {
  const [isLoading, setIsLoading] = useState(false);

  const postNews = async (newsData: any) => {
    try {
      setIsLoading(true);
      const response = await api.news.postNews(newsData);
      return response;
    } catch (error: any) {
        console.error("Error posting news:", error);
        throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { postNews, isLoading };
};

export default usePostNews;
