import React from 'react';
import { Briefcase, MapPin, Calendar, Star, Bookmark } from 'lucide-react';

export default function JobCard({
  key,
    date,
    title,
    image,
    company,
    location,
    jobTitle,
    type,
    timing,
}) {
  return (
    <div className="max-w-4xl p-4">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
             {title}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <span className="font-medium text-gray-900">{company}</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{location}</span>
              </div>
              <span className="text-gray-400">•</span>
              <span>{jobTitle}</span>
            </div>
          </div>
          
          {/* Company Logo */}
          {/* <div className="shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border border-gray-200 rounded-lg flex items-center justify-center p-2">
              <img 
                src={image}
                alt="Tech Mahindra Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div> */}
        </div>

        {/* Job Details */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 text-sm sm:text-base text-gray-700">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            <span>0-5 Yrs</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">₹</span>
            <span>1.75-2 Lacs PA</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            <span>{type}</span>
          </div>
        </div>

        {/* Requirements */}
        <div className="flex items-start gap-2 mb-4 text-sm text-gray-700 bg-gray-50 p-3 rounded">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 shrink-0 mt-0.5" />
          <span>{timing}</span>
        </div>

        {/* Tags and Footer */}
        {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-600">
            <span className="hover:text-gray-900 cursor-pointer">Customer Support</span>
            <span className="text-gray-300">•</span>
            <span className="hover:text-gray-900 cursor-pointer">Voice Process</span>
            <span className="text-gray-300">•</span>
            <span className="hover:text-gray-900 cursor-pointer">Customer Care</span>
            <span className="text-gray-300">•</span>
            <span className="hover:text-gray-900 cursor-pointer">Process</span>
            <span className="text-gray-300">•</span>
            <span className="hover:text-gray-900 cursor-pointer">Voice</span>
            <span className="text-gray-300">•</span>
            <span className="hover:text-gray-900 cursor-pointer">Technical</span>
          </div>
          
          <div className="flex items-center justify-between w-full sm:w-auto gap-4">
            <span className="text-sm text-gray-500">2 weeks ago</span>
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
              <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Save</span>
            </button>
          </div>
        </div> */}


      </div>
    </div>
  );
}