import { useState, useEffect } from "react";
import {
  Star,
  Clock,
  Award,
  MapPin,
  BookOpen,
  Calendar,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import AccordionItem from "./ui/coursePage/Accordian";
import TestimonialSection from "./TestimonialSection";
import { useParams } from "react-router";
import DemoClassSection from "./shared/demoClassSection/DemoClassSection";
import useGetCourseById from "../hooks/course/useGetCourseById";
import { CoursePageSkeleton, CourseNotFound } from "./shared/skeletons";

export default function CoursePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const { id: slug } = useParams();
  const { courseData, isLoading } = useGetCourseById(slug);

  useEffect(() => {
    console.log(slug);
  }, [slug]);
  // if (!courseData) return <h2>Loading...</h2>;
  if (!courseData && isLoading) {
    return <CoursePageSkeleton />;
  }

  if (!courseData) return <CourseNotFound />;

  const tabs = ["Overview", "Syllabus"];

  const accordionData = courseData.courseSyllabus.map((item, index) => ({
    id: index + 1,
    title: item.title,
    content: item.description ?? "No description available",
  }));
  const formateDate = (dateString: Date | string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const learningPoints = courseData || [];

  const courseIncludes = [
    {
      icon: <Calendar className="w-5 h-5" />,
      text: "Starts on : " + formateDate(courseData.courseDetails.start_on),
    },
    {
      icon: <Clock className="w-5 h-5" />,
      text: courseData.courseDetails.duration,
    },
    {
      icon: <Award className="w-5 h-5" />,
      text: "Eligibility: " + courseData.courseDetails.eligibility,
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      text: "Branch: " + courseData.courseDetails.branch,
    },
    {
      icon: <Users className="w-5 h-5" />,
      text: "Seat Available: " + 4,
    },
  ];

  return (
    <div className="min-h-screen my-5">
      <motion.div
        initial={{ opacity: 0, y: 100, rotate: -3 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          rotate: { duration: 0.7 },
        }}
        viewport={{
          once: true,
        }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-6">
              <div className="flex gap-2 mb-4 flex-wrap">
                <span className="px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full text-sm font-medium">
                  Intermediate
                </span>
                {/* <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                  Advanced
                </span> */}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {courseData.title}
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
              {courseData.short_description}
            </p>

            {/* Tabs */}
            <div className="rounded-lg mb-8">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() =>
                      setActiveTab(tab.toLowerCase().replace(" ", "-"))
                    }
                    className={`px-6 md:cursor-pointer py-4 font-medium whitespace-nowrap transition-colors border-b-2 ${
                      activeTab === tab.toLowerCase().replace(" ", "-")
                        ? "text-pink-600 border-b-2 border-pink-600"
                        : "text-neutral-500 hover:text-neutral-800"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === "overview" && (
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="w-6 h-6 text-pink-600" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      {courseData.title} Overview
                    </h2>
                  </div>

                  <div className="grid  gap-4">
                    {learningPoints.courseSyllabus?.map((point, index) => (
                      <div key={index}>
                        <h2 className="text-2xl font-bold text-black mb-3 border-l-4 border-black pl-3">
                          {point.title}
                        </h2>
                        {/* <ul className="list-disc ml-6 space-y-2 text-gray-700">
                          {point.points.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul> */}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "syllabus" && (
                <div className="p-6 sm:p-8">
                  <h2 className="text-2xl font-semibold">Course Syllabus</h2>
                  <p className="my-10">{"ok test"}</p>
                  <AccordionItem accordionData={accordionData} />
                </div>
              )}
            </div>

            <DemoClassSection minimal={true} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-4">
              {/* Preview Image */}
              <div className="relative mb-6 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={courseData.courseDetails.image}
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
                <span className="text-4xl font-bold text-gray-900">
                  ₹{courseData.courseDetails.price}
                </span>
                <span className="text-xl text-neutral-500 line-through">
                  ₹{courseData.courseDetails.price * 1.5}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm font-semibold">
                  {(
                    100 -
                    (courseData.courseDetails.price /
                      (courseData.courseDetails.price * 1.42)) *
                      100
                  ).toFixed(0)}
                  % OFF
                </span>
              </div>

              {/* CTA Buttons */}
              <button className="w-full bg-black/90 md:cursor-pointer hover:bg-black text-white font-semibold py-3 rounded-lg mb-3 transition-colors">
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
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <div className="w-1 h-6 bg-yellow-400 rounded-full"></div>
                  Course Details
                </h3>
                <div className="space-y-2">
                  {courseIncludes.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-200 group"
                    >
                      <span className="text-neutral-500 shrink-0 group-hover:scale-110 transition-transform duration-200">
                        {item.icon}
                      </span>
                      <span className="text-sm font-medium text-gray-800 group-hover:text-gray-900">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <TestimonialSection />
      </motion.div>
    </div>
  );
}
