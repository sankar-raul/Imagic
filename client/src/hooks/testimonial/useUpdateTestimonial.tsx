import { api } from "@/utils/api";
import { useState } from "react";

const useUpdateTestimonial = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateTestimonial = async (testimonialId: string, testimonialData: any) => {
    try {
      setIsLoading(true);
      const response = await api.testimonial.updateTestimonial(testimonialId, testimonialData);
      return response;
    } catch (error: any) {
        console.error("Error updating testimonial:", error);
        throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { updateTestimonial, isLoading };
};

export default useUpdateTestimonial;
