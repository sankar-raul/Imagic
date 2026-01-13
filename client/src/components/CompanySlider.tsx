import React from 'react';

const CompanySlider = () => {
  const companies = [
    { id: 1, name: 'ICI', logo: 'https://imagic.net.in/wp-content/uploads/2023/05/3.webp', color: 'from-blue-600 to-cyan-500' },
    { id: 2, name: 'Khabor Online', logo: 'https://imagic.net.in/wp-content/uploads/2023/05/2.webp', color: 'from-red-500 to-orange-500' },
    { id: 3, name: 'StyleLoft Creation', logo: 'https://imagic.net.in/wp-content/uploads/2023/05/logo2.webp', color: 'from-purple-500 to-pink-500' },
    { id: 4, name: 'Amebel Digital', logo: 'https://imagic.net.in/wp-content/uploads/2023/05/4.webp', color: 'from-yellow-500 to-amber-500' },
    { id: 5, name: 'Babusiya', logo: 'https://imagic.net.in/wp-content/uploads/2023/05/3.webp', color: 'from-green-500 to-emerald-500' },
    { id: 6, name: 'Tech Corp', logo: 'https://imagic.net.in/wp-content/uploads/2025/11/MCC-New-Logo.jpeg', color: 'from-blue-500 to-indigo-500' },
  ];

  // Create extended array for infinite loop effect
  const extendedCompanies = [...companies, ...companies, ...companies];

  return (
    <div className="flex items-center justify-center p-4 py-16">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            <span>Our </span>
            <span className="bg-linear-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent">
              Placement
            </span>
            <span> Partners</span>
          </h1>
          <div className="w-24 h-1 bg-linear-to-r from-yellow-400 to-yellow-200 mx-auto rounded-full"></div>
        </div>

        {/* Slider Container */}
        <div className="relative overflow-hidden">
          {/* Slider */}
            <div className="relative">
              {/* Fade overlays using bg-blend */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-white via-white/50 to-transparent z-10 pointer-events-none mix-blend-normal"></div>
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-white via-white/50 to-transparent z-10 pointer-events-none mix-blend-normal"></div>
              
              <div className="flex gap-8 animate-scroll-left">
              {extendedCompanies.map((company, idx) => (
                <div
                key={`${company.id}-${idx}`}
                className="shrink-0 w-64"
                >
                <div className="bg-white rounded-xl p-6 h-40 flex items-center justify-center transition-all duration-300 hover:shadow-xs hover:-translate-y-1">
                  <img 
                  src={company.logo} 
                  alt={company.name}
                  className="max-w-full max-h-full object-contain"
                  />
                </div>
                </div>
              ))}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySlider;