import TestimonialsSection from "@/components/ReviewsSection";
import DemoClassSection from "@/components/shared/demoClassSection/DemoClassSection";

const Testimonial = () => {
  return (
    <section className="pb-12">
      <TestimonialsSection itemsPerSlide={9} />
      <DemoClassSection />
    </section>
  );
};

export default Testimonial;
