import DemoClassSection from "@/components/shared/demoClassSection/DemoClassSection";
import TestimonialsSection from "@/components/shared/testimonial/TestimonialsSection";

const Testimonial = () => {
  return (
    <section className="pb-12">
      <TestimonialsSection itemsPerSlide={9} />
      <DemoClassSection />
    </section>
  );
};

export default Testimonial;
