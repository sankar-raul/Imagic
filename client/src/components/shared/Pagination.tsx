import { motion } from "framer-motion";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  onNext,
  onPrev,
}: PaginationProps) {
  return (
    <motion.div
      className="flex justify-center items-center gap-2 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <motion.button
        className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
        onClick={onPrev}
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
                onClick={() => onPageChange(pageNum)}
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
        onClick={onNext}
        disabled={page === totalPages}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Next
      </motion.button>
    </motion.div>
  );
}
