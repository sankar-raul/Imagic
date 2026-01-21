import { Itestimonial } from "@/types/testimonials.types";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";

const useGetTestimonialByCourseSlug = (slug?: string) => {
  const [testimonials, setTestimonials] = useState<Itestimonial[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonialsByCourseSlug = async (courseSlug: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response =
        await api.testimonial.getTestimonialByCourseSlug(courseSlug);
      setTestimonials(response?.data || response);
    } catch (error: any) {
      console.error("Error fetching testimonials:", error);
      setError(error.message || "Failed to fetch testimonials");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    slug && fetchTestimonialsByCourseSlug(slug);
  }, [slug]);
  return {
    testimonials,
    isLoading,
    error,
    refetch: fetchTestimonialsByCourseSlug,
  };
};

export default useGetTestimonialByCourseSlug;
