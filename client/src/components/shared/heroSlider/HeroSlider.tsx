import { useCallback, useEffect, useRef } from "react"
import HeroSlide from "../heroSlide/HeroSlide"
import SliderButton from "../sliderButton/SliderButton"
import _ from "lodash"

const HeroSlider = () => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const currentIndex = useRef(0);
    const handleScroll = useCallback(() => {
        if (!sliderRef.current) return;
        const slider = sliderRef.current;
        const slideWidth = slider.clientWidth;
        const newIndex = Math.round(slider.scrollLeft / slideWidth);
        currentIndex.current = newIndex;
    }, []);
    const scrollToIndex = useCallback((index: number) => {
        if (!sliderRef.current) return;
        const slider = sliderRef.current;
        const slideWidth = slider.clientWidth;
        const newScrollPosition = index * slideWidth;
        slider.scrollTo({
            left: newScrollPosition,
            behavior: "smooth",
        });
    }, [])
    const handlePrev = useCallback(() => {
        if (currentIndex?.current <= 0) {
            const totalSlides = sliderRef.current?.children.length;
            currentIndex.current = (totalSlides ?? 1) - 1;
            scrollToIndex(currentIndex.current);
            return;
        };
        currentIndex.current -= 1;
        scrollToIndex(currentIndex.current);
    }, [scrollToIndex]);
    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        const slider = sliderRef.current;
        const totalSlides = slider.children.length;
        if (currentIndex.current >= totalSlides - 1) {
            currentIndex.current = 0;
            scrollToIndex(currentIndex.current);
            return;
        }
        currentIndex.current += 1;
        scrollToIndex(currentIndex.current);
    }, [scrollToIndex]);
    useEffect(() => {
        if (sliderRef.current) {
            const slider = sliderRef.current;
            const scrollHandler = _.throttle(handleScroll, 200);
            slider.addEventListener("scroll", scrollHandler);
            return () => {
                slider.removeEventListener("scroll", scrollHandler);
            }
        }
    }, [handleScroll])
  return (
    <section className="max-w-dvw">

        <div className="relative">
            <SliderButton onClick={handlePrev} varient="left" />
            <div ref={sliderRef} className="flex touch-pan-x snap-x snap-mandatory scroll-smooth overflow-x-scroll flex-nowrap [&::-webkit-scrollbar]:hidden">
                <HeroSlide />
                <HeroSlide />
                <HeroSlide />
            </div>
        <SliderButton onClick={handleNext} varient="right" />

        </div>
    </section>
  )
}

export default HeroSlider
