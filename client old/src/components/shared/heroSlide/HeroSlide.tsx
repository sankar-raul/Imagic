import girltWithLaptop from "../../../assets/images/girl-with-laptop.png";
import student1 from "../../../assets/images/students/akshay.webp";
import student2 from "../../../assets/images/students/APARNA_PANJA.webp";
import student3 from "../../../assets/images/students/NEHA-KARMAKAR.webp";
import student4 from "../../../assets/images/students/protrusha.webp";
import { motion } from 'framer-motion'
const HeroSlide = () => {
  return (
    <motion.main initial={{
      opacity: 0,
      x: 50,
    }} whileInView={{
      opacity: 1,
      x: 0,
    }} 
    viewport={{
      once: true
    }}
    transition={{
      duration: 0.8,
    }} className="h-max lg:min-h-[calc(100dvh-140px)] flex flex-auto flex-wrap min-w-dvw max-w-dvw shrink-0 snap-start will-change-transform">
    <motion.div
        whileInView={{
        opacity: 1,
        x: 0,
        }}
        initial={{
        opacity: 0,
        x: -50,
        }}
        transition={{
        duration: 0.8,
        }}
        viewport={{ once: true }}
        className="my-46 md:ml-30 lg:ml-50 flex flex-col gap-4 w-max justify-center">
        <p className="text-xl mt-20 border-l-4 pl-4 border-yellow-400 tracking-wider">
          Wellcome To Our School
        </p>
        <div className="flex flex-col gap-6">
          <h1 className="text-6xl font-bold text-deep-brand tracking-wide">
          Start Your Dream Career
          </h1>
          <h2 className="font-medium text-2xl text-muted-text">
          Industry-ready <b>Graphics Design courses with job support</b>
          </h2>
        </div>
        <div className="mt-6 flex gap-4">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-shadow duration-300 hover:shadow-xl">
          Explore Courses
          </button>
          <button className="bg-white/30 backdrop-blur-md border-white border-2 hover:bg-white/90 text-deep-brand px-6 py-3 rounded-full font-semibold shadow-xs transition-shadow duration-300 hover:shadow-lg">
          Apply For Demo Class
          </button>
        </div>
        <div className="bg-white/40 border-2 border-white w-max rounded-2xl px-6 py-4 flex items-center gap-6 mt-8">
          <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white p-0.5">
            <img src={student1} className="rounded-full object-cover" alt="Student Image" />
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white p-0.5">
            <img src={student2} className="rounded-full object-cover" alt="Student Image" />
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white p-0.5">
            <img src={student3} className="rounded-full object-cover" alt="Student Image" />
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white p-0.5">
            <img src={student4} className="rounded-full object-cover" alt="Student Image" />
            </div>
          </div>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">1 Thousand+</p>
            <p className="text-xs text-gray-500">Successfull Student</p>
          </div>
        </div>
        </motion.div>
          <div className="relative flex items-center justify-center grow">
            <img
              src={girltWithLaptop}
              alt="Student with books"
              className="max-w-md 2xl:max-w-130 object-contain drop-shadow-md"
            />
            <div className="absolute top-12 right-1/6 bg-white rounded-full px-6 py-3 shadow-lg border-2 border-blue-200">
              <span className="text-blue-600 font-semibold text-lg">
                20% OFF
              </span>
            </div>
            <div className="absolute bottom-8 left-0 xl:bottom-12 xl:left-0 bg-white rounded-lg px-6 py-4 shadow-lg flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-yellow-500 text-2xl">⭐</span>
                <div>
                  <p className="text-2xl font-bold">
                    4.7<span className="text-gray-400 font-normal">/5.00</span>
                  </p>
                  <p className="text-sm text-gray-500">Trusted by students</p>
                </div>
              </div>
            </div>
          </div>
        </motion.main>
  )
}

export default HeroSlide
