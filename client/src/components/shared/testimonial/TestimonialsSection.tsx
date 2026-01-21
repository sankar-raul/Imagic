import useGetAllTestimonial from "@/hooks/testimonial/useGetAllTestimonial";
import Testimonials from "./Testimonials";

interface TestimonialsSectionProps {
  itemsPerSlide?: number;
}

export const TestimonialsSection = ({
  itemsPerSlide = 3,
}: TestimonialsSectionProps) => {
  const { testimonials, isLoading } = useGetAllTestimonial({
    page: 1,
    limit: 100, // Load all testimonials for slider
  });
  return (
    <Testimonials
      testimonials={testimonials}
      isLoading={isLoading}
      itemsPerSlide={itemsPerSlide}
    />
  );
};

export default TestimonialsSection;
