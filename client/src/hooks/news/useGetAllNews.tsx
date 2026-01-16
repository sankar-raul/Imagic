import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { Inews } from "@/types/news.types";

const useGetAllNews = () => {
  const [news, setNews] = useState<Inews[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const response = await api.news.getAllNews();
      setNews(response?.news || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return {
    news,
    isLoading,
    refetchNews: fetchNews,
  };
};

export default useGetAllNews;
