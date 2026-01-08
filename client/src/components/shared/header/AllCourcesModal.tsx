import type { FC } from "react"
import { coursesData } from "../../../constants/nav/courseDetails";
import { motion } from "framer-motion";
interface AllCourcesModalProps {
    className?: string;
}

const AllCourcesModal:FC<AllCourcesModalProps> = ({
    className,
}) => {
  return (
    <motion.div 
    initial={{
        opacity: 0,
        height: 0,
    }}
    transition={{
        ease: "easeInOut",
        duration: 0.1,
    }}
    whileInView={{
        opacity: 1,
        height: 'auto',
    }}
    className={"absolute overflow-hidden z-10 top-full shadow-nav-modal w-full left-0 p-4 hidden opacity-0 transition-opacity duration-500 rounded-md bg-white/40 backdrop-blur-xl "+className}>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coursesData.map(({ title, courses }, index) => (
                <div key={index}>
                    <h3 className="font-semibold mb-3 text-black/80">{title}</h3>
                    <ul className="flex flex-col gap-1">
                        {courses.map(({ name, link }, cIndex) => (
                            <li key={cIndex} className="rounded-lg pr-2 py-0.5">
                                <a href={link} className="inline-block text-black/60 text-sm capitalize hover:underline hover:decoration-black/50">{name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </motion.div>
  )
}

export default AllCourcesModal
