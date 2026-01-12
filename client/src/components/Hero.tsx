import Carousel from "./shared/Carousel";
import HeroSlide from "./shared/HeroSlide";

export default function HeroSection() {
  const handleScroll = () => {
    const coursesElement = document.getElementById("course");
    coursesElement?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleScrollTodemoClass = () => {
    const coursesElement = document.getElementById("demoClass");
    coursesElement?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Slide data
  const slides = [
    {
      heading: (
        <>
          Transform Your <br /> Career Today
        </>
      ),
      description: "Join thousands of successful students who have transformed their careers",
      primaryButtonText: "View All Courses",
      secondaryButtonText: "Book Free Session",
      backgroundImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
      imageAlt: "Career transformation",
      showBadge: true,
      bottomText: "Industry-leading placement programs",
    },
    {
      heading: (
        <>
          Fun and creative <br /> courses designed to <br /> spark curiosity
        </>
      ),
      description: null,
      primaryButtonText: "Explore Courses",
      secondaryButtonText: null,
      backgroundImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
      imageAlt: "Students learning together",
      showBadge: true,
      bottomText: "Highly recommended courses for kids",
    },
    {
      heading: (
        <>
          Learn From <br /> Industry Experts
        </>
      ),
      description: "Get trained by professionals with years of industry experience",
      primaryButtonText: "Start Learning",
      secondaryButtonText: "Meet Our Instructors",
      backgroundImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=2069&auto=format&fit=crop",
      imageAlt: "Expert instructors",
      showBadge: true,
      bottomText: "Expert-led training programs",
    },
  ];

  return (
    <section className="w-full bg-white -mt-20">
      <Carousel slides={slides} autoPlayDelay={6000}>
        {(slide) => (
          <HeroSlide
            slide={slide}
            onExploreClick={handleScroll}
            onDemoClick={handleScrollTodemoClass}
          />
        )}
      </Carousel>
    </section>
  );
}
