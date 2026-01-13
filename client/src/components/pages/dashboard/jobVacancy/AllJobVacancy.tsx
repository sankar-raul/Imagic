import { useState } from 'react';
import { Link } from 'react-router';

interface JobVacancy {
  id: number;
  title: string;
  slug: string;
  description: string;
  jobDetails: string;
  posted_date: string;
}

// Demo data
const DEMO_JOBS: JobVacancy[] = [
  {
    id: 1,
    title: "Senior 3D Animator",
    slug: "senior-3d-animator",
    description: "We are looking for an experienced 3D animator to join our creative team and work on exciting animation projects.",
    jobDetails: "Responsibilities include creating high-quality 3D animations, collaborating with the art team, and meeting project deadlines. Minimum 5 years of experience required in Maya or Blender.",
    posted_date: "2026-01-10"
  },
  {
    id: 2,
    title: "VFX Compositor",
    slug: "vfx-compositor",
    description: "Join our VFX team to create stunning visual effects for film and television productions.",
    jobDetails: "Must have expert knowledge in Nuke and After Effects. Experience with green screen compositing, color correction, and rotoscoping. Portfolio required.",
    posted_date: "2026-01-09"
  },
  {
    id: 3,
    title: "Motion Graphics Designer",
    slug: "motion-graphics-designer",
    description: "Creative motion graphics designer needed for advertising and promotional video content.",
    jobDetails: "Proficiency in After Effects, Cinema 4D, and Adobe Creative Suite. Strong portfolio showcasing motion graphics work. 3+ years experience preferred.",
    posted_date: "2026-01-08"
  },
  {
    id: 4,
    title: "Game Designer",
    slug: "game-designer",
    description: "Passionate game designer to develop engaging gameplay mechanics and level designs.",
    jobDetails: "Experience with Unity or Unreal Engine. Understanding of game mechanics, player psychology, and level design principles. Bachelor's degree in relevant field.",
    posted_date: "2026-01-07"
  },
  {
    id: 5,
    title: "Character Rigger",
    slug: "character-rigger",
    description: "Technical artist specializing in character rigging for animation projects.",
    jobDetails: "Expertise in Maya rigging, skinning, and creating control rigs. Knowledge of Python scripting is a plus. Must work well with animators.",
    posted_date: "2026-01-06"
  },
  {
    id: 6,
    title: "UI/UX Designer",
    slug: "ui-ux-designer",
    description: "Design intuitive and engaging user interfaces for our digital products and applications.",
    jobDetails: "Proficiency in Figma, Adobe XD, and prototyping tools. Understanding of user-centered design principles. Strong portfolio demonstrating UI/UX projects.",
    posted_date: "2026-01-05"
  }
];

export default function AllJobVacancy() {
  const [jobs, setJobs] = useState<JobVacancy[]>(DEMO_JOBS);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  const filteredAndSortedJobs = jobs
    .filter(job => 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.posted_date).getTime();
      const dateB = new Date(b.posted_date).getTime();
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this job vacancy? This action cannot be undone.')) {
      setJobs(jobs.filter(job => job.id !== id));
      // TODO: Replace with actual API call
      // await fetch(`/api/job-vacancies/${id}`, { method: 'DELETE' });
      alert('Job vacancy deleted successfully!');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDaysAgo = (dateString: string) => {
    const today = new Date();
    const posted = new Date(dateString);
    const diffTime = Math.abs(today.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  return (
    <div className="min-h-screen p-6 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Vacancies</h1>
            <p className="text-gray-600">Manage all job openings and career opportunities</p>
          </div>
          <Link
            to="/dashboard/job-vacancies/add"
            className="px-6 py-3 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition font-semibold shadow-lg"
          >
            + Post New Job
          </Link>
        </div>

        {/* Search and Sort Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search jobs by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredAndSortedJobs.length}</span> of <span className="font-semibold text-gray-900">{jobs.length}</span> job openings
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

        {/* Jobs Grid */}
        {filteredAndSortedJobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No job vacancies found</h3>
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
            {filteredAndSortedJobs.map(job => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                {/* Job Header */}
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 flex-1 line-clamp-2">
                      {job.title}
                    </h3>
                    <span className="ml-2 px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full whitespace-nowrap">
                      Active
                    </span>
                  </div>

                  {/* Date Posted */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Posted {getDaysAgo(job.posted_date)}</span>
                    <span className="text-gray-300">•</span>
                    <span>{formatDate(job.posted_date)}</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {job.description}
                  </p>

                  {/* Job Details Preview */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-1">Requirements:</p>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {job.jobDetails}
                    </p>
                  </div>

                  {/* Slug */}
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <span className="font-mono">{job.slug}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <div className="flex gap-2">
                    <Link
                      to={`/dashboard/job-vacancies/edit/${job.id}`}
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium text-center text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(job.id)}
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
