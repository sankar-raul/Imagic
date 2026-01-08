import { motion } from "framer-motion"
import { useCallback, type FC } from "react";
import { FaChevronLeft } from "react-icons/fa"
interface SliderButtonProps {
    varient?: "left" | "right";
    onClick?: () => void;
}
const SliderButton:FC<SliderButtonProps> = ({
    varient = "left",
    onClick,
}) => {
    const handleClick = useCallback(() => {
        onClick?.();
    }, [onClick]);
  return (
    <motion.button 
        onClick={handleClick}
        whileHover={{
            width: 80,
        }}
        animate={{
            rotate: varient === "left" ? 0 : 180,
            right: varient === "left" ? "auto" : 16,
        }}
        whileTap={{
            scale: 0.9,
        }} className="bg-white overflow-hidden group p-3 rounded-full shadow-lg absolute top-1/2 ml-4 w-10 -translate-y-1/2 z-10 flex justify-start ease-out md:cursor-pointer">
            <div className="hidden group-hover:flex -space-x-1 text-black/50">
                <FaChevronLeft className="text-black/50" />
                <FaChevronLeft className="text-black/35" />
                <FaChevronLeft className="text-black/20" />
                <FaChevronLeft className="text-black/10" />
            </div>
        <FaChevronLeft className="group-hover:hidden text-muted-text" />
    </motion.button>
  )
}

export default SliderButton
