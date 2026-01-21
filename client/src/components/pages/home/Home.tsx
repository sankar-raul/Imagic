import CompanySlider from "@/components/CompanySlider";
import CoursesSection from "@/components/CourseSection";
import FeatureSection from "@/components/FeatureSection";
import JobsSection from "@/components/JobsSection";
import DemoClassSection from "@/components/shared/demoClassSection/DemoClassSection";
import HeroSection from "@/components/shared/Hero/Hero";
import TestimonialsSection from "@/components/shared/testimonial/TestimonialsSection";
import PlacementsSection from "@/components/Testimonial";

// import Hero from './components/Hero'
function Home() {
  return (
    <>
      {/* <Hero/> */}
      <HeroSection />
      <CompanySlider />
      <FeatureSection />
      <CoursesSection />
      <DemoClassSection />
      <PlacementsSection />
      <JobsSection />
      <TestimonialsSection />
    </>
  );
}

export default Home;
