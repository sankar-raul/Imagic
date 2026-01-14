import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { Itestimonial } from "@/types/testimonials.types";

const useGetAllTestimonial = () => {
  const [testimonials, setTestimonials] = useState<Itestimonial[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const response = await api.testimonial.getAllTestimonial();
      setTestimonials(response?.testimonials || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return {
    testimonials,
    isLoading,
    refetchTestimonials: fetchTestimonials,
  };
};

export default useGetAllTestimonial;
