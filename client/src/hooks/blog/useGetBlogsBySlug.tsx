import { useState, useEffect } from "react";
import { BACKEND_END_POINT } from "@/config/config";
import { Iblog } from "@/types/blog.types";

interface BlogNavigationResponse {
  data: Iblog;
  prevSlug: string | null;
  nextSlug: string | null;
}

const useGetBlogsBySlug = (slug: string | undefined) => {
  const [blogDetails, setBlogDetails] = useState<Iblog | null>(null);
  const [prevSlug, setPrevSlug] = useState<string | null>(null);
  const [nextSlug, setNextSlug] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setIsLoading(false);
      return;
    }

    const fetchBlogBySlug = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${BACKEND_END_POINT}/blog/slug/${slug}`);

        if (!response.ok) {
          throw new Error("Failed to fetch blog details");
        }

        const data: BlogNavigationResponse = await response.json();

        setBlogDetails(data.data);
        setPrevSlug(data.prevSlug);
        setNextSlug(data.nextSlug);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching blog:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogBySlug();
  }, [slug]);

  return {
    blogDetails,
    prevSlug,
    nextSlug,
    isLoading,
    error,
  };
};

export default useGetBlogsBySlug;
