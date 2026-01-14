import { useState } from 'react';
import { Link } from 'react-router';
import useGetAllTestimonial from '@/hooks/testimonial/useGetAllTestimonial';

export default function AllTestimonial() {
  const { testimonials, isLoading, refetchTestimonials } = useGetAllTestimonial();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCompany, setFilterCompany] = useState('All');

  const companies = ['All', ...Array.from(new Set(testimonials.map(t => t.companyName)))];

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = 
      testimonial.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.feedback.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCompany = filterCompany === 'All' || testimonial.companyName === filterCompany;
    return matchesSearch && matchesCompany;
  });

  // const handleDelete = async (id: string) => {
  //   if (window.confirm('Are you sure you want to delete this testimonial?')) {
  //     // TODO: Call delete API
  //     // await api.testimonial.deleteTestimonial(id);
  //     refetchTestimonials();
  //     alert('Testimonial deleted successfully!');
  //   }
  // };

  const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? match[1] : null;
  };

  return (
    <div className="min-h-screen p-6 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Testimonials</h1>
            <p className="text-gray-600">Manage student feedback and success stories</p>
          </div>
          <Link
            to="/dashboard/testimonials/add"
            className="px-6 py-3 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition font-semibold shadow-lg"
          >
            + Add Testimonial
          </Link>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name, feedback, job title, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:w-64">
              <select
                value={filterCompany}
                onChange={(e) => setFilterCompany(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {companies.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredTestimonials.length}</span> of <span className="font-semibold text-gray-900">{testimonials.length}</span> testimonials
          </p>
          {(searchQuery || filterCompany !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterCompany('All');
              }}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredTestimonials.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No testimonials found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterCompany('All');
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTestimonials.map(testimonial => (
              <div
                key={testimonial.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  {/* Student Info */}
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={testimonial.studentPhoto}
                      alt={testimonial.studentName}
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/100x100?text=Student';
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {testimonial.studentName}
                      </h3>
                      <p className="text-sm font-medium text-blue-600 mb-1">
                        {testimonial.jobTitle}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {testimonial.companyName}
                      </p>
                    </div>
                  </div>

                  {/* Feedback */}
                  <div className="mb-4">
                    <div className="flex items-start gap-2 mb-2">
                      <svg className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                        "{testimonial.feedback}"
                      </p>
                    </div>
                  </div>

                  {/* Video Preview */}
                  {testimonial.videoUrl && (
                    <div className="mb-4">
                      <div className="relative rounded-lg overflow-hidden bg-gray-100 group cursor-pointer">
                        <img
                          src={`https://img.youtube.com/vi/${extractVideoId(testimonial.videoUrl)}/mqdefault.jpg`}
                          alt="Video thumbnail"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition">
                          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                        </div>
                        <div className="absolute top-2 right-2">
                          <span className="px-2 py-1 bg-black/70 text-white text-xs font-medium rounded">
                            Video
                          </span>
                        </div>
                      </div>
                      <a
                        href={testimonial.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-700 mt-2 inline-flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Watch Full Video
                      </a>
                    </div>
                  )}

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">(5.0)</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <div className="flex gap-2">
                    <Link
                      to={`/dashboard/testimonials/edit/${testimonial.id}`}
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium text-center text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      // onClick={() => handleDelete(testimonial.id)}
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
