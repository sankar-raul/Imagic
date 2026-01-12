/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import type { Course } from '../../types';
import { FaClock, FaGraduationCap } from "react-icons/fa";

interface CourseCardProps {
  course: Course;
  onClick: () => void;
}

export default function CourseCard({ course, onClick }: CourseCardProps) {

  return (
    <motion.div
    initial={{
        opacity: 0
    }}
    whileInView={{
        opacity: 1
    }}
    viewport={{
        once: true
    }}
    transition={{
        duration: 0.6
    }}
      className="relative group rounded-3xl shadow-lg hover:shadow-xl cursor-pointer transition-all duration-500 h-112.5"
      onClick={onClick}
    >
      <div className="wrap">
        <span className="ribbon6 bg-yellow-400 text-black">50% OFF</span>

      </div>

      {/* Image Section */}
      <div className="h-1/2 rounded-t-3xl overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full scale-120 translate-y-4 duration-500 transition-transform h-full object-cover object-center group-hover:scale-135"
        />
      </div>

      {/* Content Card */}
      <div className="absolute bottom-0 rounded-3xl left-0 right-0 bg-white z-1 backdrop-blur-4xl rounded-t-3xl h-1/2 text-xs p-6 flex flex-col justify-between overflow-hidden">
        <div className="flex flex-col gap-4 text-neutral-700">
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-neutral-100 tracking-wider flex rounded-2xl text-xs font-semibold">
              {course.category || 'Course'}
            </div>
            <div className="px-3 py-1.5 bg-neutral-100 tracking-wider flex items-center gap-1 rounded-2xl text-xs font-semibold">
                <FaClock className="opacity-90" />
                <p>{course.duration || 'N/A'}</p>
            </div>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl  text-black font-bold">
              {course.title || "Course"}
            </h2>
          </div>
        </div>
        
        <div className="flex justify-between font-light items-end">
          <div className='flex gap-0.5 justify-center flex-col'>
                <div className="text-neutral-600 flex items-center gap-2 text-sm">
                  <p className="flex items-center gap-1"><FaGraduationCap /><span className="text-gray-600">Eligibility </span></p> 
                  <span>{course.eligibility || "Open"}</span>
                </div>
          </div>
          <div>
            <button className="bg-neutral-900 md:cursor-pointer px-4 py-2 rounded-sm hover:bg-neutral-800 text-white flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300">
              <span className="text-sm text-white">View Details</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
