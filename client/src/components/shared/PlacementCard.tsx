import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Iplacement } from "@/types/placement.types";

interface PlacementCardProps {
  placement: Iplacement;
  index: number;
}

export default function PlacementCard({
  placement,
  index,
}: PlacementCardProps) {
  return (
    <motion.div
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
      className="bg-white rounded-2xl p-8 flex flex-col items-center text-center border border-gray-100"
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
            src={placement.studentPhoto}
            alt={placement.studentName}
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
        {placement.studentName}
      </motion.h3>
      <motion.p
        className="text-gray-500 text-sm mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.4 }}
      >
        {placement.jobTitle}
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
        {placement.description}
      </motion.p>
    </motion.div>
  );
}
