import Carousel from "../Carousel";
import HeroSlide from "../HeroSlide";
import { heroSlidesData } from "@/constants/heroSlides";


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

  return (
    <section className="w-full bg-white -mt-20">
      <Carousel slides={heroSlidesData} autoPlayDelay={6000}>
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
