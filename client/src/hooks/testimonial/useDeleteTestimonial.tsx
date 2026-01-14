import { api } from "@/utils/api";
const useDeleteTestimonial = () => {
  const deleteTestimonialById = async (testimonialId: string) => {
    try {
      const response = await api.testimonial.deleteTestimonial(testimonialId);
        return response;
      
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };
  return {
    deleteTestimonialById,
  };
};

export default useDeleteTestimonial;
