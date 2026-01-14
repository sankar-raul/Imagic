import React, { useState } from "react";
import { ChevronLeft, ChevronRight, BriefcaseBusiness } from "lucide-react";

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Akshay Chakraborty",
      role: "Video Editor",
      company: "Aaj Tak Bangla",
      image: "https://imagic.net.in/wp-content/uploads/2024/06/akshay.webp",
      quote:
        "Akshay from Hooghly, after completing video editing course from IMAGIC, he joined job as a Video Editor. Now he works at Aaj Tak Bangla.",
      highlight: "video editing course",
    },
    {
      name: "Protyusha Saha",
      role: "Digital Marketer",
      company: "VS Digitech Technology",
      image: "https://imagic.net.in/wp-content/uploads/2025/03/protrusha.webp",
      quote:
        "Protyusha Saha from Arambagh got her job before her 1 year Diploma in Digital Media & Marketing Course completion. Now she can learn and also earn as a Digital Marketer at VS Digitech Technology",
      highlight: "Digital Media & Marketing",
    },
    {
      name: "Riya Roy",
      role: "Graphics Designer",
      company: "MCCIT",
      image:
        "https://imagic.net.in/wp-content/uploads/2025/09/riya-roy-250x250-1.webp",
      quote:
        "Riya from Dum Dum got Graphics Design job after her course Completion. She learned one year Diploma in Graphics Design  from IMAGIC and now joined as a Graphics Designer at MCCIT.",
      highlight: "Graphics Design",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="my-20 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full border border-neutral-100 rounded-2xl p-12 relative">
        {/* Profile Image with Icon Background */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-400 rounded-lg transform rotate-12 opacity-50"></div>
            <div className="absolute -top-2 right-8 w-16 h-16 bg-green-300 rounded-lg transform -rotate-12 opacity-50"></div>
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-8 border-white shadow-xl">
              <img
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>
        </div>

        {/* Company Logo */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <div>
              <BriefcaseBusiness />
            </div>
            <span className="text-xl font-semibold text-gray-800">
              {currentTestimonial.company}
            </span>
          </div>
        </div>

        {/* Quote */}
        <div className="text-center mb-8">
          <p className="text-xl md:text-3xl text-gray-800 leading-relaxed">
            "{currentTestimonial.quote.split(currentTestimonial.highlight)[0]}
            <span className="text-blue-500 font-semibold">
              {currentTestimonial.highlight}
            </span>
            {currentTestimonial.quote.split(currentTestimonial.highlight)[1]}"
          </p>
        </div>

        {/* Author Info */}
        <div className="text-center mb-8">
          <p className="text-gray-800 font-semibold text-lg">
            {currentTestimonial.name}
            <span className="text-gray-500 font-normal">
              , {currentTestimonial.role}
            </span>
          </p>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-black hover:bg-gray-700 flex items-center justify-center transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-blue-500 w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
