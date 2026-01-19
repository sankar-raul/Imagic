import { api } from "@/utils/api";
import { Itestimonial } from "@/types/testimonials.types";
import { useEffect, useState } from "react";

const useGetTestimonialById = (testimonialId: string) => {
  const [testimonial, setTestimonial] = useState<Itestimonial | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonial = async () => {
      if (!testimonialId) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.testimonial.getTestimonialById(testimonialId);
        setTestimonial(response?.testimonial || response);
      } catch (error: any) {
        console.error("Error fetching testimonial:", error);
        setError(error.message || "Failed to fetch testimonial");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonial();
  }, [testimonialId]);

  return { testimonial, isLoading, error };
};

export default useGetTestimonialById;
