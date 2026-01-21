import Testimonials from "./Testimonials";
import useGetTestimonialByCourseSlug from "@/hooks/testimonial/useGetTestimonialByCourseSlug";

interface TestimonialsSectionProps {
  itemsPerSlide?: number;
  slug?: string;
}

export const CourseTestimonial = ({
  itemsPerSlide = 3,
  slug,
}: TestimonialsSectionProps) => {
  const { testimonials, isLoading } = useGetTestimonialByCourseSlug(slug);
  return (
    <Testimonials
      testimonials={testimonials}
      isLoading={isLoading}
      itemsPerSlide={itemsPerSlide}
    />
  );
};

export default CourseTestimonial;
