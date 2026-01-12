// import Hero from './components/Hero'
import CourseSection from './components/CourseSection'
import DemoClassSection from './components/DemoClassSection'
import TestimonialSlider from './components/TestimonialSection'
import { TestimonialsSection } from './components/Testimonial'
import FeatureSection from './components/FeatureSection'
import ReviewsSection from './components/ReviewsSection'
import PlacementSection from './components/PlacementsSection'
import JobsSection from './components/JobsSection'
import HeroSection from './components/Hero'
function Home() {
  return (
    <>
    {/* <Hero/> */}
    <HeroSection/>
    <PlacementSection/>
    <FeatureSection/>
    <CourseSection/>
    <DemoClassSection/>
    <TestimonialsSection />
    <TestimonialSlider/>
    <JobsSection/>
    <ReviewsSection/>
    
    
    </>
  )
}

export default Home