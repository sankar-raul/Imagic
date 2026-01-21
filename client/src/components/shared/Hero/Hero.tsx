import { useNavigate } from "react-router";
import Carousel from "../Carousel";
import HeroSlide from "../HeroSlide";
import { heroSlidesData } from "@/constants/heroSlides";
import useCustomScroll from "@/hooks/global/useCustomScroll";

export default function HeroSection() {
  const { scrollToId } = useCustomScroll();
  const handleScroll = () => {
    const coursesElement = document.getElementById("course");
    coursesElement?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const navigate = useNavigate();
  const handlePrimaryClick = (link?: string | null) => {
    if (link) {
      navigate(link);
    } else {
      handleScroll();
    }
  };
  const handleScrollTodemoClass = () => {
    scrollToId("democlass");
  };

  return (
    <section className="w-full bg-white -mt-20">
      <Carousel slides={heroSlidesData} autoPlayDelay={6000}>
        {(slide) => (
          <HeroSlide
            slide={slide}
            onExploreClick={handlePrimaryClick}
            onDemoClick={handleScrollTodemoClass}
          />
        )}
      </Carousel>
    </section>
  );
}
