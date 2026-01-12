import React from 'react';

export default function StudentPlacement() {
  return (
      <div className="bg-white rounded-3xl shadow-lg max-w-xl w-full overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          {/* Image Section */}
          <div className="relative sm:w-2/5 w-full">
            <img
              src="https://imagic.net.in/wp-content/uploads/2025/09/riya-roy-250x250-1.webp"
              alt="James Anderson"
              className="w-full h-64 sm:h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-6">
              <h3 className="text-white text-xl font-semibold">James Anderson</h3>
            </div>
          </div>

          {/* Content Section */}
          <div className="sm:w-3/5 w-full p-8 sm:p-10 flex flex-col justify-center bg-linear-to-br from-blue-50 to-cyan-50">
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
              Riya from Dum Dum got Graphics Design job after her course Completion. 
              She learned one year Diploma in Graphics Design from IMAGIC and now 
              joined as a Graphics Designer at MCCIT.
            </p>
            <div className="inline-block">
              <span className="text-gray-900 font-semibold text-lg px-4 py-2 bg-white rounded-full shadow-sm">
                Digital Marketing
              </span>
            </div>
          </div>
        </div>
      </div>
  );
}