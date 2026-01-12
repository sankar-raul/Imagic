import React from 'react';

const StudentPlacementCard = ({ student }) => {
  // Example data structure for the 'student' prop
  const {
    name,
    program,
    photoUrl,
    companyLogoUrl,
    placementDetails, // This is the new paragraph/testimonial field
    batch,
    department,
  } = student;

  return (
    <div className="
        w-full m-5 max-w-sm mx-auto bg-white 
        rounded-xl shadow-xl overflow-hidden 
        transform transition duration-500 hover:scale-[1.02]
        border border-gray-200
    ">
      
      {/* ==============================
        I. Visual/Identity (Top)
        ==============================
      */}
      <div className="p-6 text-center bg-gray-50/50">
        <img 
          className="w-28 h-28 object-cover rounded-full mx-auto ring-4 ring-blue-100/50" 
          src={photoUrl} 
          alt={`${name}'s photo`}
        />
        <h3 className="mt-4 text-2xl font-bold text-gray-900 tracking-tight">
          {name}
        </h3>
        <p className="text-sm font-medium text-gray-500 mt-1">
          {program}
        </p>
      </div>

      {/* Separator */}
      <div className="mx-8">
        <div className="border-t border-blue-500/50"></div>
      </div>

      {/* ==============================
        II. Placement Details (Middle - Paragraph/Testimonial)
        ==============================
      */}
      <div className="px-6 py-4">
        
        {/* Company Logo and Details */}
        <div className="flex items-center justify-center space-x-3 mb-4">
          
           <span className="text-lg font-semibold text-blue-700">
             PLACED AT GOOGLE
           </span>
        </div>
        
        {/* Paragraph/Testimonial Section */}
        <p className="text-sm italic text-gray-700 text-center leading-relaxed">
          {placementDetails || 
            "\"My journey here was transformative. The faculty guidance and rigorous curriculum prepared me not just for the interview, but for the challenges of a fast-paced corporate environment. Truly grateful for this opportunity!\""
          }
        </p>
      </div>

      {/* ==============================
        III. Institute Context (Bottom)
        ==============================
      */}
      <div className="px-6 py-4 border-t border-gray-100 text-xs text-gray-500 flex justify-between">
        <span className="font-semibold">{batch}</span>
        <span className="text-right">{department}</span>
      </div>
      
    </div>
  );
};

// ==============================================
// Example Usage (for demonstration)
// ==============================================

export default StudentPlacementCard
