import { api } from "@/utils/api";
import { useState } from "react";

const useAddTestimonial = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addTestimonial = async (testimonialData: any) => {
    try {
      setIsLoading(true);
      const response = await api.testimonial.addTestimonial(testimonialData);
      return response;
    } catch (error: any) {
        console.error("Error adding testimonial:", error);
        throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { addTestimonial, isLoading };
};

export default useAddTestimonial;
