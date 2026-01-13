import { useState } from 'react';
import { Link } from 'react-router';

interface Placement {
  id: number;
  studentName: string;
  studentPhoto: string;
  jobTitle: string;
  description: string;
}

// Demo data
const DEMO_PLACEMENTS: Placement[] = [
  {
    id: 1,
    studentName: "Rahul Verma",
    studentPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    jobTitle: "Senior 3D Animator at Pixar Studios",
    description: "Secured a dream position at Pixar after completing the Advanced 3D Animation course. Now working on major feature films."
  },
  {
    id: 2,
    studentName: "Priya Deshmukh",
    studentPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    jobTitle: "VFX Artist at Industrial Light & Magic",
    description: "Joined ILM's VFX team working on blockbuster movies. Credits include work on major Hollywood productions."
  },
  {
    id: 3,
    studentName: "Arjun Kapoor",
    studentPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    jobTitle: "Game Designer at Ubisoft",
    description: "Working as a game designer on AAA titles. Contributes to level design and gameplay mechanics for popular franchises."
  },
  {
    id: 4,
    studentName: "Sneha Kulkarni",
    studentPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    jobTitle: "Motion Graphics Lead at Red Chillies VFX",
    description: "Leading motion graphics projects for Bollywood films and web series. Specializes in title sequences and promotional content."
  },
  {
    id: 5,
    studentName: "Karan Malhotra",
    studentPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    jobTitle: "Character Artist at Rockstar Games",
    description: "Creating realistic characters for open-world games. Works on character modeling, texturing, and rigging."
  },
  {
    id: 6,
    studentName: "Aisha Khan",
    studentPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    jobTitle: "3D Modeler at DreamWorks Animation",
    description: "Part of the environment modeling team creating stunning worlds for animated features. Working on upcoming projects."
  },
  {
    id: 7,
    studentName: "Rohan Chatterjee",
    studentPhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    jobTitle: "Lighting Artist at MPC",
    description: "Specializes in lighting and rendering for VFX shots. Contributing to award-winning visual effects for films."
  },
  {
    id: 8,
    studentName: "Nisha Patel",
    studentPhoto: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    jobTitle: "Concept Artist at Sony Interactive",
    description: "Designing characters and environments for PlayStation exclusive titles. Creating visual concepts for game development."
  },
  {
    id: 9,
    studentName: "Vivek Reddy",
    studentPhoto: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
    jobTitle: "Technical Animator at EA Sports",
    description: "Working on sports game animations and rigging. Ensures realistic player movements and character performance."
  }
];

export default function AllPlacements() {
  const [placements, setPlacements] = useState<Placement[]>(DEMO_PLACEMENTS);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlacements = placements.filter(placement =>
    placement.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    placement.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    placement.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this placement record?')) {
      setPlacements(placements.filter(placement => placement.id !== id));
      // TODO: Replace with actual API call
      // await fetch(`/api/placements/${id}`, { method: 'DELETE' });
      alert('Placement record deleted successfully!');
    }
  };

  return (
    <div className="min-h-screen p-6 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Placements</h1>
            <p className="text-gray-600">Showcase our successful alumni and their achievements</p>
          </div>
          <Link
            to="/dashboard/placements/add"
            className="px-6 py-3 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition font-semibold shadow-lg"
          >
            + Add Placement
          </Link>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <input
            type="text"
            placeholder="Search by student name, job title, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Results Count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredPlacements.length}</span> of <span className="font-semibold text-gray-900">{placements.length}</span> placements
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Placements Grid */}
        {filteredPlacements.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No placements found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlacements.map(placement => (
              <div
                key={placement.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Student Photo */}
                <div className="relative h-64 overflow-hidden bg-linear-to-br from-blue-100 to-indigo-100">
                  <img
                    src={placement.studentPhoto}
                    alt={placement.studentName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Student+Photo';
                    }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {placement.studentName}
                    </h3>
                  </div>
                </div>

                {/* Placement Content */}
                <div className="p-5">
                  {/* Job Title */}
                  <div className="mb-4">
                    <div className="flex items-start gap-2 mb-2">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <h4 className="text-base font-semibold text-gray-900 line-clamp-2">
                        {placement.jobTitle}
                      </h4>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-4">
                    {placement.description}
                  </p>

                  {/* Success Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Successfully Placed
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <div className="flex gap-2">
                    <Link
                      to={`/dashboard/placements/edit/${placement.id}`}
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium text-center text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(placement.id)}
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
