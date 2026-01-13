import React, { useState, useEffect, useCallback } from 'react';
import { Star, Clock, Award, FileText, Download, CheckCircle, User, MapPin , BookOpen,Calendar , Users } from 'lucide-react';
import AccordionItem from './ui/coursePage/Accordian';
import DemoClassSection from './DemoClassSection';
import TestimonialSection from './TestimonialSection';
import { useParams } from 'react-router';

let dataStorage: Map<string, any> | null = null
export default function CoursePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [courseData, setCourseData] = useState(null);
  const { courseId } = useParams();

  const handleData = useCallback((data:any) => {
    dataStorage = new Map(
      data.map((info: { id: any; }) => ([info?.id, info]))
    )
    setCourseData(dataStorage)
  }, [])

  useEffect(() => {
      (async () => {
        if (!dataStorage) {
        let data = await fetch("/data/courseData.json")
        data = await data.json()
        handleData(data)
        }
      })()
  }, []);
  useEffect(() => {
    console.log(courseData)
  }, [])

  if (!courseData) return <h2>Loading...</h2>;




  const course = courseData.get(courseId);
  if (!course) return <h2>Course not found</h2>;
  console.log(course)

  const tabs = ['Overview', 'Syllabus'];

//  const accordionData = [
//     {
//       id: 1,
//       heading: 'What is Flowbite?',
//       content: (
//         <>
//           <p className="mb-2 text-body">
//             Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.
//           </p>
//           <p className="text-body">
//             Check out this guide to learn how to{' '}
//             <a href="/docs/getting-started/introduction/" className="text-fg-brand hover:underline">
//               get started
//             </a>{' '}
//             and start developing websites even faster with components on top of Tailwind CSS.
//           </p>
//         </>
//       ),
//     },
//     {
//       id: 2,
//       heading: 'Is there a Figma file available?',
//       content: (
//         <>
//           <p className="mb-2 text-body">
//             Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.
//           </p>
//           <p className="text-body">
//             Check out the{' '}
//             <a href="https://flowbite.com/figma/" className="text-fg-brand hover:underline">
//               Figma design system
//             </a>{' '}
//             based on the utility classes from Tailwind CSS and components from Flowbite.
//           </p>
//         </>
//       ),
//     },
//     {
//       id: 3,
//       heading: 'What are the differences between Flowbite and Tailwind UI?',
//       content: (
//         <>
//           <p className="mb-2 text-body">
//             The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.
//           </p>
//           <p className="mb-2 text-body">
//             However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.
//           </p>
//           <p className="mb-2 text-body">Learn more about these technologies:</p>
//           <ul className="ps-5 text-body list-disc">
//             <li>
//               <a href="https://flowbite.com/pro/" className="text-fg-brand hover:underline">
//                 Flowbite Pro
//               </a>
//             </li>
//             <li>
//               <a href="https://tailwindui.com/" rel="nofollow" className="text-fg-brand hover:underline">
//                 Tailwind UI
//               </a>
//             </li>
//           </ul>
//         </>
//       ),
//     },
//   ];

  const accordionData = course.modules.map((item, index) => ({
  id: index + 1,
  title: item.title,
  content: item.description ?? "No description available"
}));


  const learningPoints = course.overview || [];

  const courseIncludes = [
    { icon: <Calendar   className="w-5 h-5" />, text: "Starts on : " + course.details.start_on },
    { icon: <Clock className="w-5 h-5" />, text: course.details.duration },
    { icon: <Award className="w-5 h-5" />, text: "Eligibility: " +course.details.eligibility },
    { icon: <MapPin  className="w-5 h-5" />, text: "Branch: " + course.details.branch },
    { icon: <Users className="w-5 h-5" />, text: "Seat Available: " + course.details.seat_available }
  ];

  return (
    <div className="min-h-screen bg-gray-50 my-5">
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-6">
              <div className="flex gap-2 mb-4 flex-wrap">
                <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-medium">
                  Intermediate
                </span>
                {/* <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                  Advanced
                </span> */}
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {course.title}
              </h1>
              
              <div className="flex items-center gap-6 flex-wrap text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900">4.5</span>
                </div>
                <span>2,220</span>
                <span>21,450 students</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6 leading-relaxed">
              {course.short_description}
            </p>

            {/* Instructor */}
            <div className="flex items-center gap-4 mb-8 p-4 bg-white rounded-lg border border-gray-300">
              <img 
                src="https://imagic.net.in/wp-content/uploads/2024/03/logo.jpg" 
                alt="Instructor"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm text-gray-600">Created by</p>
                <p className="font-semibold text-gray-900">{course.creator.institute}</p>
              </div>
              <div className="ml-auto text-sm text-gray-500 hidden sm:block">
                Last updated 07.2024
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg border border-gray-300 mb-8">
              <div className="flex border-b border-gray-300 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
                    className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.toLowerCase().replace(' ', '-')
                        ? 'text-pink-600 border-b-2 border-pink-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="w-6 h-6 text-pink-600" />
                    <h2 className="text-2xl font-bold text-gray-900">{course.title} Overview</h2>
                  </div>
                  
                  <div className="grid  gap-4">
                    {learningPoints.map((point, index) => (
                      <div key={index}>
                       <h2 className='text-2xl font-bold text-black mb-3 border-l-4 border-black pl-3'>{point.title}</h2>
                       <ul className='list-disc ml-6 space-y-2 text-gray-700'>
                       {point.points.map((point,index)=>(
                        
                          <li key={index}>{point}</li>
                        
                       ))}
                       </ul>
                      </div>
                    ))}





                  </div>
                </div>
              )}



    {activeTab === 'syllabus' && (
                <div className="p-6 sm:p-8">
                  <h2 className="text-2xl font-semibold">Course Syllabus</h2>
                  <p className='my-10'>{course.syllabus_intro}</p>
                  <AccordionItem accordionData={accordionData}/>
                </div>
              )}

            </div>

            <DemoClassSection/>
            
          </div>



          

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-300 p-6 sticky top-4">
              {/* Preview Image */}
              <div className="relative mb-6 rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src={course.thumbnail}
                  alt="Course preview"
                  className="w-full h-48 object-cover"
                />
                {/* <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-all group">
                  <div className="w-16 h-16 rounded-full bg-white bg-opacity-90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-gray-900 ml-1" />
                  </div>
                </button> */}
                {/* <span className="absolute top-3 left-3 px-3 py-1 bg-white rounded-full text-sm font-medium">
                  Preview
                </span> */}
              </div>

              {/* Pricing */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold text-gray-900">₹{course.price.final_price}</span>
                <span className="text-xl text-gray-400 line-through">₹{course.price.original}</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm font-semibold">
                  {course.price.discount_percent}% off
                </span>
              </div>

              {/* CTA Buttons */}
              <button className="w-full bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-3 rounded-lg mb-3 transition-colors">
                Enroll Now
              </button>
              
              {/* <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className="w-full border-2 border-gray-300 hover:border-pink-600 text-gray-700 font-semibold py-3 rounded-lg mb-4 flex items-center justify-center gap-2 transition-colors"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-pink-600 text-pink-600' : ''}`} />
              </button> */}

              {/* <p className="text-center text-sm text-gray-600 mb-6">
                <span className="inline-block mr-1">ⓘ</span>
                <span className="underline cursor-pointer hover:text-gray-900">14 day money back guarantee</span>
              </p> */}

              {/* Course Includes */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Course Details:</h3>
                <div className="space-y-3">
                  {courseIncludes.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="text-gray-400 shrink-0">{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          
        </div>
        <TestimonialSection/>
      </div>
    </div>
  );
}