import React,{useState} from 'react';
import { Star } from 'lucide-react';
import data from "../assets/placements.json";
export default function PlacementPage() {
const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
  
    const totalPages = Math.ceil(data.length / itemsPerPage);
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startIndex, startIndex + itemsPerPage);
  
  console.log(currentData)

  const testimonials = [
    {
      id: 1,
      name: "Liam Young",
      role: "ReviewCollector / CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      text: "It's the best plugin for that purpose, even better than the most popular of this kind of plugin. I will recommend strongly to try, it's probably you will adopt it forever. One of the best plugins I ever try!"
    },
    {
      id: 2,
      name: "Sarah Mitchell",
      role: "Product Manager",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      text: "Absolutely outstanding service! The attention to detail and customer support exceeded all my expectations. Highly recommended for anyone looking for quality."
    },
    {
      id: 3,
      name: "James Anderson",
      role: "Tech Lead / Startup Founder",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
      text: "Game-changing solution for our business. The features are intuitive and powerful. Our team productivity increased by 40% since we started using it."
    },
    {
      id: 4,
      name: "Emma Davis",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      text: "I've tried many similar products, but this one stands out from the crowd. The user experience is seamless and the results speak for themselves."
    },
    {
      id: 5,
      name: "Michael Chen",
      role: "Software Engineer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      text: "Clean, efficient, and exactly what we needed. The development team clearly understands their users. Five stars all the way!"
    },
    {
      id: 6,
      name: "Olivia Brown",
      role: "Business Consultant",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop",
      text: "Exceptional quality and reliability. I've been using this for months now and it has become an essential part of my daily workflow."
    },
    {
      id: 7,
      name: "Daniel Martinez",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
      text: "The best investment we made this year. The ROI has been incredible and the team behind it is always responsive and helpful."
    },
    {
      id: 8,
      name: "Sophia Wilson",
      role: "Operations Manager",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
      text: "Incredible experience from start to finish. The onboarding was smooth and the ongoing support has been fantastic. Couldn't be happier!"
    },
    {
      id: 9,
      name: "Ryan Thompson",
      role: "E-commerce Specialist",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop",
      text: "This has transformed how we do business. The features are robust, the interface is beautiful, and it just works perfectly every time."
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center my-12">
          <h1 className="text-4xl md:text-4xl font-bold text-gray-700 mb-2">
            IMAGIC Students Placement
          </h1>
          <p className="text-purple-400 text-lg">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-102 hover:shadow-lg border border-gray-100"
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-600 shadow-lg">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {testimonial.name}
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                {testimonial.role}
              </p>

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed text-justify">
                {testimonial.description}
              </p>
            </div>
          ))}
        </div>
 <div className="flex justify-center gap-2 mt-4">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {/* Page numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-1 border rounded ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      </div>
    </div>
  );
}