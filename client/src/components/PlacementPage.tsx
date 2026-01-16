import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useGetAllPlacements from "@/hooks/placement/useGetAllPlacements";

export default function PlacementPage() {
  const {
    placements,
    isLoading,
    page,
    totalPages,
    totalItems,
    goToPage,
    nextPage,
    prevPage,
  } = useGetAllPlacements({ page: 1, limit: 6 });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading placements...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center my-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-4xl font-bold text-gray-700 mb-2">
            IMAGIC Students Placement
          </h1>
          <p className="text-purple-400 text-lg">
            Don't just take our word for it - hear from our satisfied customers
          </p>
          {totalItems > 0 && (
            <motion.p
              className="text-gray-600 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Showing {(page - 1) * 6 + 1} - {Math.min(page * 6, totalItems)} of{" "}
              {totalItems} placements
            </motion.p>
          )}
        </motion.div>

        {!placements || placements.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-600 text-lg">No placements found.</p>
          </motion.div>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <AnimatePresence mode="wait">
                {placements.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    variants={{
                      hidden: { opacity: 0, y: 30, scale: 0.95 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          duration: 0.5,
                          ease: "easeOut",
                        },
                      },
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center border border-gray-100"
                  >
                    <motion.div
                      className="relative mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: index * 0.1 + 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-600 shadow-lg">
                        <img
                          src={testimonial.studentPhoto}
                          alt={testimonial.studentName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>

                    <motion.h3
                      className="text-xl font-bold text-gray-900 mb-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {testimonial.studentName}
                    </motion.h3>
                    <motion.p
                      className="text-gray-500 text-sm mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      {testimonial.jobTitle}
                    </motion.p>

                    <motion.div
                      className="flex gap-1 mb-4"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, rotate: -180 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          transition={{ delay: index * 0.1 + 0.5 + i * 0.05 }}
                        >
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.p
                      className="text-gray-700 leading-relaxed text-justify"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.6 }}
                    >
                      {testimonial.description}
                    </motion.p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <motion.div
              className="flex justify-center items-center gap-2 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <motion.button
                className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                onClick={prevPage}
                disabled={page === 1}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Previous
              </motion.button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNum = index + 1;
                  // Show first page, last page, current page, and pages around current
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= page - 1 && pageNum <= page + 1)
                  ) {
                    return (
                      <motion.button
                        key={index}
                        className={`px-4 py-2 border rounded-lg transition ${
                          page === pageNum
                            ? "bg-purple-600 text-white border-purple-600"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => goToPage(pageNum)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + index * 0.05 }}
                      >
                        {pageNum}
                      </motion.button>
                    );
                  } else if (pageNum === page - 2 || pageNum === page + 2) {
                    return (
                      <span key={index} className="px-2">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <motion.button
                className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                onClick={nextPage}
                disabled={page === totalPages}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next
              </motion.button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
