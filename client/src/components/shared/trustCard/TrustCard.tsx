import type { FC } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { motion } from "framer-motion";
interface TrustCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}
const TrustCard:FC<TrustCardProps> = ({
    title,
    description,
    icon = <FaUserGraduate />,
}) => {
  return (
    <motion.div 
    initial={{
        opacity: 0,
        y: 50,
    }}
    whileInView={{
        opacity: 1,
        y: 0,
    }}
    transition={{
        duration: 0.6,
    }}
    whileHover={{
      scale: 1.1
    }}
    className="flex even:justify-end">
      <div className="flex gap-4 items-center bg-white/50 backdrop-blur-xl border-2 border-white rounded-xl px-6 py-4 shadow-card w-full md:w-1/2 md:min-w-max">
        <div className="text-xl bg-pink-50 text-pink-400 rounded-lg w-12 h-12 flex items-center justify-center">
          {icon}
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold text-muted-text/80">{title}</h1>
          <p className="text-sm text-muted-text/80">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TrustCard;
