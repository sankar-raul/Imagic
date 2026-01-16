import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import useGetAllTestimonial from "@/hooks/testimonial/useGetAllTestimonial";
import { Itestimonial } from "@/types/testimonials.types";

export const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const { testimonials, isLoading } = useGetAllTestimonial({
    page: 1,
    limit: 100, // Load all testimonials for slider
  });

  const itemsPerSlide = 3; // Show 3 testimonials per slide
  const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const getCurrentTestimonials = () => {
    const start = currentSlide * itemsPerSlide;
    const end = start + itemsPerSlide;
    return testimonials.slice(start, end);
  };

  // Handle drag end to change slides
  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      nextSlide();
    } else if (swipe > swipeConfidenceThreshold) {
      prevSlide();
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-20 px-4 bg-linear-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Quote className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No testimonials yet
            </h3>
            <p className="text-gray-600">
              Check back soon for inspiring stories from our clients.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            <Quote className="w-4 h-4" />
            <span>Testimonials</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Students Testimonials
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our mission is to drive progress and enhance the lives of our
            customers by delivering superior products and services that exceed
            expectations.
          </p>
        </motion.div>

        {/* Testimonials Slider */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={totalSlides <= 1}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-50 hidden md:block"
          >
            <ChevronLeft className="w-6 h-6 text-blue-600" />
          </button>

          <button
            onClick={nextSlide}
            disabled={totalSlides <= 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-50 hidden md:block"
          >
            <ChevronRight className="w-6 h-6 text-blue-600" />
          </button>

          {/* Slider Container */}
          <div className="cursor-grab active:cursor-grabbing">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {getCurrentTestimonials().map((testimonial, index) => (
                  <motion.div
                    key={testimonial._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.2 },
                    }}
                    className="relative"
                  >
                    <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      {/* Profile Section */}
                      <div className="flex flex-col items-center text-center mb-6">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="relative mb-4"
                        >
                          <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-blue-100">
                            <img
                              src={testimonial.studentPhoto}
                              alt={testimonial.studentName}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  testimonial.studentName
                                )}&background=3b82f6&color=fff&size=80`;
                              }}
                            />
                          </div>
                        </motion.div>

                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {testimonial.studentName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {testimonial.jobTitle}
                          {testimonial.companyName &&
                            `, ${testimonial.companyName}`}
                        </p>
                      </div>

                      {/* Feedback Text */}
                      <div className="flex-1 relative">
                        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-200 opacity-50" />
                        <p className="text-gray-700 leading-relaxed relative z-10">
                          {testimonial.feedback}
                        </p>
                        <Quote className="absolute -bottom-2 -right-2 w-8 h-8 text-blue-200 opacity-50 rotate-180" />
                      </div>

                      {/* Video Badge (if available) */}
                      {testimonial.videoUrl && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring" }}
                          className="absolute top-4 right-4"
                        >
                          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
                            <svg
                              className="w-5 h-5 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          {totalSlides > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "w-8 bg-blue-600"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
