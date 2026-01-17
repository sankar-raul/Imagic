import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showStats?: boolean;
  currentPage?: number;
  itemsPerPage?: number;
  totalItems?: number;
}

export default function PageHeader({
  title,
  subtitle,
  showStats = false,
  currentPage = 1,
  itemsPerPage = 6,
  totalItems = 0,
}: PageHeaderProps) {
  return (
    <motion.div
      className="text-center my-12"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl md:text-4xl font-bold text-gray-700 mb-2">
        {title}
      </h1>
      {subtitle && <p className="text-purple-400 text-lg">{subtitle}</p>}
      {showStats && totalItems > 0 && (
        <motion.p
          className="text-gray-600 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
          items
        </motion.p>
      )}
    </motion.div>
  );
}
