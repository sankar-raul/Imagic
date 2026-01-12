/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, type FC } from 'react';
import boyImage from '../../../assets/images/boy.avif'
import { FaStar } from 'react-icons/fa';

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

const NewCourseCard:FC<CourseCardProps> = ({
    course,
    index,
}) => {

  const starRatingGradient = useMemo(() => {
    const rating = parseFloat(course.rating);
    const from = Math.round((rating / 5) * 100);
    const style = {
        background: `linear-gradient(to right, rgb(245, 158, 11) ${from}%, rgb(209, 213, 219) ${from}%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      };
    return style;
  }, [course.rating]);

  return (
    <div style={{
        // background: "radial-gradient(107.48% 111.076% at 4.6875% -4.53587%, rgb(183, 240, 253) 0%, rgb(99, 183, 232) 46.3146%, rgb(26, 77, 150) 100%)",
        background: "radial-gradient(76.3992% 72.7848% at 54.9716% 35.443%, rgb(255, 199, 69) 0%, rgb(254, 176, 3) 28.5%, rgb(255, 146, 3) 71.0326%, rgb(255, 80, 4) 100%)",
        borderBottomLeftRadius: "calc(48px*var(--one-if-corner-shape-supported,var(--corner-shape-fallback,1)))",
        borderBottomRightRadius: "calc(48px*var(--one-if-corner-shape-supported,var(--corner-shape-fallback,1)))",
        borderTopLeftRadius: "calc(48px*var(--one-if-corner-shape-supported,var(--corner-shape-fallback,1)))",
        borderTopRightRadius: "calc(48px*var(--one-if-corner-shape-supported,var(--corner-shape-fallback,1)))",
        opacity: 1,
        willChange: "auto"
        }} className="relative flex p-4 flex-auto justify-between flex-col rounded-3xl shadow-lg md:cursor-pointer min-w-80 max-w-96 aspect-4/5 hover:z-1 group/card">
          <div className='absolute inset-0 bg-contain bg-top-left opacity-50' style={{
            backgroundImage: 'url(/svg/noise.svg)'
          }}></div>
          <div className="h-1/2 rounded-3xl flex items-end justify-center">
             <img className='group
                transform-gpu
                transition-all
                duration-500
                ease-[cubic-bezier(0.16,1,0.3,1,0.5)]
                origin-[50%_90%]
                group-hover/card:transform-[perspective(1200px)_scale(1.3)_rotate(3deg)_translateY(1%)]' draggable={false} src={boyImage} alt="Boy Image" />
            </div>
        <div className="bg-white/90 z-1 backdrop-blur-4xl rounded-4xl min-h-max h-1/2 text-xs p-6 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
              <div className="flex items-center">
                  <div className="px-2 py-1 bg-orange-400/10 tracking-wider flex rounded-2xl text-orange-600 text-xs border border-orange-400/10 font-semibold">{course.category || 'Course'}</div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-yellow-800 font-biennale-black">{course.title || "Course"}</h2>
              </div>
          </div>
          <div className="flex justify-between text-blue-800 font-light items-baseline-last">
            {/* <p>{course.price}</p> */}
            <div className='flex text-orange-400 gap-0 justify-center flex-col'>
              <div className='flex items-center gap-1'>
                <p className='tracking-wide text-orange-400 font-black'>{course.rating || 0}</p>
                <div className={'flex gap-0 text-transparent text-sm bg-clip-text font-bold items-center bg-gray-300 -tracking-widest select-none'} style={starRatingGradient}>
                  { Array.from({length: 5}).map((_, i) => <p>⭐</p>) }
                </div>
              </div>
              <p className='font-semibold text-black/50'>( {course.reviews || 0} reviews )</p>
            </div>
            <div>
              <p className='font-black text-lg text-black'>{course.price || "₹0"}</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default NewCourseCard
