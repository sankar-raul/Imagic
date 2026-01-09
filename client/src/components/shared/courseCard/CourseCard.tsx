import { type FC } from "react";
import { useNavigate } from "react-router";
import  {motion } from "framer-motion";
interface CourseCardProps {
    course: {
        title: string;
        image: string;
        price: string;
        category: string;
        id: string;
        rating: string;
        reviews: string;
    };
    index: number;
}

const CourseCard:FC<CourseCardProps> = ({
    course, index
}) => {
    const navigate = useNavigate();
  return (
     <motion.div
            initial={{ opacity: 0}}
            whileInView={{
                opacity: 1,
            }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            key={index}
            className="bg-white shrink-0 flex-wrap rounded-xl shadow-sm md:hover:scale-105 hover:shadow-md overflow-hidden md:cursor-pointer transition-all duration-300 ease-out"
            onClick={()=> navigate(`/course/${course.id}`)}
          >
            {/* Image */}
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-52 object-cover rounded-t-md "
            />

            {/* Content */}
            <div className="p-5">
              <div className="flex items-center space-x-1 mb-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i} className="text-orange-400 text-sm">★</span>
                  ))}
                <span className="text-sm text-gray-500">
                  {course.rating} ({course.reviews} reviews)
                </span>
              </div>

              <h3 className="font-normal text-lg mb-2">{course.title}</h3>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  {/* <img
                    src="https://i.pravatar.cc/50"
                    className="w-8 h-8 rounded-full"
                  /> */}
                  <p className="text-gray-600 text-sm">{course.category}</p>
                </div>
                <p className="font-semibold text-gray-800">{course.price}</p>
              </div>
            </div>
          </motion.div>
  )
}

export default CourseCard
