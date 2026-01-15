import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { SearchX, ArrowLeft, Home, Briefcase } from "lucide-react";

export const JobNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50/0 to-gray-100 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full mb-6"
          >
            <SearchX className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            Job Not Found
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed"
          >
            The job you're looking for doesn't exist or may have been removed.
            Please check the URL or explore our other opportunities.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 w-full sm:w-auto"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
            <button
              onClick={() => navigate("/vacancies")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg w-full sm:w-auto"
            >
              <Briefcase className="w-5 h-5" />
              View All Jobs
            </button>
          </motion.div>

          {/* Additional Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 pt-8 border-t border-gray-200"
          >
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              <Home className="w-4 h-4" />
              Return to Homepage
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export const JobPageSkeleton = () => {
  return (
    <div className="min-h-screen my-20 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2">
            {/* Job Header Card Skeleton */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6 animate-pulse">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                <div className="flex-1 w-full">
                  {/* Title skeleton */}
                  <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>

                  {/* Company info skeleton */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                    <div className="h-5 bg-gray-300 rounded w-32"></div>
                    <div className="h-5 bg-gray-300 rounded w-24"></div>
                  </div>

                  {/* Details skeleton */}
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-300 rounded w-40"></div>
                    <div className="h-5 bg-gray-300 rounded w-36"></div>
                    <div className="h-5 bg-gray-300 rounded w-44"></div>
                    <div className="h-5 bg-gray-300 rounded w-48"></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-gray-200 gap-4">
                <div className="flex flex-wrap gap-3 sm:gap-6">
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>
              </div>
            </div>

            {/* Job Description Card Skeleton */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 animate-pulse">
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <div className="h-6 bg-gray-300 rounded w-48 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Form Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:sticky lg:top-8 animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto mb-6"></div>

              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i}>
                    <div className="h-5 bg-gray-300 rounded w-24 mb-2"></div>
                    <div className="h-10 bg-gray-300 rounded w-full"></div>
                  </div>
                ))}
                <div className="h-12 bg-gray-300 rounded w-full mt-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
