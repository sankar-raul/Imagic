// function ReviewsSection() {
//   return (
//     <div>
// <script src="https://elfsightcdn.com/platform.js" async></script>
// <div class="elfsight-app-771235f7-fb67-4742-953d-cd4c9eb08d46" data-elfsight-app-lazy></div>
//     </div>
//   )
// }

// export default ReviewsSection

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const testimonials = [
    {
      id: 1,
      name: "Rohan Falia",
      image:
        "https://imagic.net.in/wp-content/uploads/2023/09/rohan-website-final.jpg",
      description:
        "Rohan from Bandel, got Digital marketing job before his NSOU Digital Marketing course completion.",
      hasVideo: true,
    },
    {
      id: 2,
      name: "Rahul Dewan",
      image:
        "https://imagic.net.in/wp-content/uploads/2023/09/rahul-jpeg-final-2-1.jpg",
      description:
        "Rahul Dewan from Siliguri, Imagic Video editing Student. He share his learning experience.",
      hasVideo: true,
    },
    {
      id: 3,
      name: "Sanjay Gayen",
      image:
        "https://imagic.net.in/wp-content/uploads/2024/03/sanjoy-gayen_nsou_DM.jpg",
      description:
        "Sanjay from North 24 Parganas, got Digital marketing job before his NSOU Digital Marketing course completion.",
      hasVideo: true,
    },
    {
      id: 4,
      name: "Niva Shaw",
      image: "https://imagic.net.in/wp-content/uploads/2023/03/Pic-1.webp",
      description:
        "Watch her journey after learning NSOU Web Design & Development Course from Imagic.",
      hasVideo: true,
    },
    {
      id: 5,
      name: "Pabitra Naskar",
      image: "https://imagic.net.in/wp-content/uploads/2023/03/Pic-2.webp",
      description:
        "Pabitra from Baruipur got his first job after completing NSOU Web Design and Diploma course from IMAGIC.",
      hasVideo: true,
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const getVisibleTestimonials = () => {
    const prev = (currentIndex - 1 + testimonials.length) % testimonials.length;
    const next = (currentIndex + 1) % testimonials.length;
    return [prev, currentIndex, next];
  };

  const visibleIndices = getVisibleTestimonials();

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="relative flex items-center justify-center">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 z-10 p-2 sm:p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>

          {/* Testimonial Cards Container */}
          <div className="w-full  px-8 sm:px-12 md:px-16 lg:px-20">
            <div className="flex items-end justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
              {visibleIndices.map((index, position) => {
                const testimonial = testimonials[index];
                const isCenter = position === 1;

                return (
                  <div
                    key={testimonial.id}
                    className={`transition-all duration-500 ease-in-out ${
                      isCenter
                        ? "scale-100 opacity-100 z-10"
                        : "scale-90 sm:scale-80 opacity-80 blur-[1px]"
                    } ${position === 0 ? "hidden sm:block" : ""} ${
                      position === 2 ? "hidden sm:block" : ""
                    }`}
                    style={{
                      flex: isCenter ? "0 0 280px" : "0 0 200px",
                      maxWidth: isCenter ? "280px" : "200px",
                    }}
                  >
                    <div
                      className="flex flex-col items-center text-center"
                      onClick={nextSlide}
                    >
                      {/* Image Container */}
                      <div className="relative mb-4 sm:mb-6">
                        <div
                          className={`rounded-full overflow-hidden border-4 ${
                            isCenter
                              ? "border-purple-300 shadow-2xl shadow-purple-300/50 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56"
                              : "border-gray-200 w-32 h-32 sm:w-36 sm:h-36"
                          } transition-all duration-500`}
                        >
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Play Button */}
                        {testimonial.hasVideo && isCenter && (
                          <a
                            href="https://www.youtube.com/watch?v=dB6sowSVcZw&pp=0gcJCRYKAYcqIYzv"
                            target="_blank"
                          >
                            <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 sm:p-3 shadow-lg">
                              <div className="bg-linear-to-r from-orange-400 to-yellow-400 rounded-full p-1.5 sm:p-2">
                                <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
                              </div>
                            </div>
                          </a>
                        )}

                        {/* Glow Effect for Center Card */}
                        {isCenter && (
                          <div className="absolute inset-0 rounded-full bg-linear-to-r from-purple-400 to-pink-400 opacity-20 blur-2xl -z-10"></div>
                        )}
                      </div>

                      {/* Name */}
                      <h3
                        className={`font-bold mb-2 sm:mb-3 transition-all duration-500 ${
                          isCenter
                            ? "text-xl sm:text-2xl md:text-3xl text-gray-900"
                            : "text-base sm:text-lg text-gray-400"
                        }`}
                      >
                        {testimonial.name}
                      </h3>

                      {/* Description */}
                      <p
                        className={`transition-all duration-500 leading-relaxed ${
                          isCenter
                            ? "text-sm sm:text-base md:text-lg text-gray-600 px-2"
                            : "text-xs sm:text-sm text-gray-400 px-1"
                        }`}
                      >
                        {testimonial.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-0 z-10 p-2 sm:p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8 sm:mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-8 sm:w-10 h-2 sm:h-2.5 bg-linear-to-r from-purple-500 to-pink-500"
                  : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
