import React, { useState, useEffect, useCallback, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps<T> {
  slides: T[];
  autoPlayDelay?: number;
  children: (slide: T, index: number) => ReactNode;
}

export default function Carousel<T>({ slides, autoPlayDelay = 6000, children }: CarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoPlayDelay);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayDelay, goToNext]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full flex justify-center">
            {children(slide, index)}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-[40%] md:top-[45%] -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-xl transition-all z-20 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-purple-600 transition" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-[40%] md:top-[45%] -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-xl transition-all z-20 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-purple-600 transition" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-[120px] md:bottom-[140px] left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentIndex
                ? "w-8 h-3 bg-purple-600"
                : "w-3 h-3"
            } rounded-full shadow-md`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
