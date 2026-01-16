import { motion } from "framer-motion";

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({
  message = "No items found.",
}: EmptyStateProps) {
  return (
    <motion.div
      className="text-center py-12"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-gray-600 text-lg">{message}</p>
    </motion.div>
  );
}
