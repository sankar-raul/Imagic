import CompanySlider from "@/components/CompanySlider"
import CoursesSection from "@/components/CourseSection"
import DemoClassSection from "@/components/DemoClassSection"
import FeatureSection from "@/components/FeatureSection"
import HeroSection from "@/components/Hero"
import JobsSection from "@/components/JobsSection"
import ReviewsSection from "@/components/ReviewsSection"
import { TestimonialsSection } from "@/components/Testimonial"
import TestimonialSlider from "@/components/TestimonialSection"

// import Hero from './components/Hero'
function Home() {
  return (
    <>
    {/* <Hero/> */}
    <HeroSection/>
    <CompanySlider />
    <FeatureSection />
    <CoursesSection />
    <DemoClassSection/>
    <TestimonialsSection />
    <TestimonialSlider/>
    <JobsSection />
    <ReviewsSection />
    
    
    </>
  )
}

export default Home