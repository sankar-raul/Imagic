import { Link, Navigate, useNavigate } from "react-router";
import CourseCard from "./shared/CourseCard";
import { ICourse } from "@/types";
import { useCallback, useMemo } from "react";
import useGetAllCourse from "@/hooks/course/useGetAllCourse";

// const categories = [
//   "All",
//   "Design",
//   "Development",
//   "Business & Marketing",
//   "Finance",
//   "Language & Culture",
// ];

// const courses: ICourse[] = [
//   {
//     title: "Graphic Design Courses in Kolkata",
//     image:
//       "https://images.unsplash.com/photo-1611241893603-3c359704e0ee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     price: "₹54,000.00",
//     category: "Graphic Design",
//     id: "graphic-design-kolkata",
//     rating: "4.9",
//     reviews: "245",
//     duration: "6 Months",
//     eligibility: "10 + 12",
//     tag: "Trending",
//   },
//   {
//     title: "Certificate Course In InDesign",
//     image:
//       "https://images.unsplash.com/photo-1700887937204-69f8b8400ace?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     price: "₹11,000.00",
//     category: "Graphic Design",
//     id: "certificate-course-in-adobe-indesign",
//     rating: "4.9",
//     reviews: "245",
//     duration: "1 Months",
//     eligibility: "10 + 12",
//   },
//   {
//     title: "Certificate Course In Lightroom",
//     image:
//       "https://images.unsplash.com/photo-1560858275-a06a049554f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWRvYmUlMjBsaWdodHJvb218ZW58MHx8MHx8fDA%3D",
//     price: "₹9000.00",
//     category: "Graphic Design",
//     id: "certificate-course-in-adobe-lightroom",
//     rating: "4.9",
//     reviews: "245",
//     duration: "1 Months",
//     eligibility: "10 + 12",
//   },
//   {
//     title: "FCP Video Editing & VFX Course",
//     image:
//       "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmlkZW8lMjBlZGl0aW5nfGVufDB8fDB8fHww",
//     price: "₹1,08,000.00",
//     category: "Video Editing",
//     id: "fcp-video-editing-vfx-course",
//     rating: "4.9",
//     reviews: "245",
//     duration: "12 Months",
//     eligibility: "10 + 12",
//     tag: "Demanding",
//   },
//   {
//     title: "Video Editing & Motion Graphics Course in Kolkata",
//     image:
//       "https://images.unsplash.com/photo-1551302175-952301267d19?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     price: "₹54,000",
//     category: "Video Editing",
//     id: "professional-video-editing-in-kolkata",
//     rating: "4.9",
//     reviews: "245",
//     duration: "6 Months",
//     eligibility: "10 + 12",
//   },
//   {
//     title: "FCP Video Editing Course",
//     image:
//       "https://images.unsplash.com/photo-1605826832916-d0ea9d6fe71e?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     price: "₹40,000.00",
//     category: "Video Editing",
//     id: "fcp-video-editing",
//     rating: "4.9",
//     reviews: "245",
//     duration: "4 Months",
//     eligibility: "10 + 12",
//   },
//   {
//     title: "Certificate Course In After Effects",
//     image:
//       "https://images.unsplash.com/photo-1501780392773-287d506245a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     price: "₹40,000.00",
//     category: "Video Editing",
//     id: "certificate-course-in-after-effects",
//     rating: "4.9",
//     reviews: "245",
//     duration: "3 Months",
//     eligibility: "10 + 12",
//     tag: "Trending",
//   },
//   {
//     title: "Digital Marketing Course In Kolkata",
//     image:
//       "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     price: "₹54,000.00",
//     category: "Digital Marketing",
//     id: "digital-marketing-course-in-kolkata",
//     rating: "4.9",
//     reviews: "245",
//     duration: "6 Months",
//     eligibility: "10 + 12",
//     tag: "Demanding",
//   },
//   {
//     title: "Video Editing 1Yr. Diploma Course In Kolkata",
//     image:
//       "https://images.unsplash.com/photo-1684717417861-9c90fc3a8840?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     price: "₹60,500",
//     category: "Video Editing",
//     id: "video-editing-diploma-course",
//     rating: "4.9",
//     reviews: "245",
//     duration: "12 Months",
//     eligibility: "10 + 12",
//   },
//   {
//     title: "Digital Media & Marketing 1 Yr. Diploma Course In Kolkata",
//     image:
//       "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     price: "₹60,500",
//     category: "Digital Marketing",
//     id: "digital-marketing-diploma-course",
//     rating: "4.9",
//     reviews: "245",
//     duration: "12 Months",
//     eligibility: "10 + 12",
//   },
//   {
//     title: "Graphics Design 1 Yr. Diploma Course In Kolkata",
//     image:
//       "https://images.unsplash.com/photo-1611241893603-3c359704e0ee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     price: "₹60,500",
//     category: "Graphic Design",
//     id: "graphic-design-diploma-course",
//     rating: "4.9",
//     reviews: "245",
//     duration: "12 Months",
//     eligibility: "10 + 12",
//   },
//   {
//     title: "FCP Video Editing Course",
//     image:
//       "https://images.unsplash.com/photo-1605826832916-d0ea9d6fe71e?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     price: "₹54,000.00",
//     category: "Video Editing",
//     id: "fcp-video-editing",
//     rating: "4.9",
//     reviews: "245",
//     duration: "6 Months",
//     eligibility: "10 + 12",
//   },
// ];

export default function CoursesSection() {
  const navigate = useNavigate();
  const { courses } = useGetAllCourse();
  const courseData = useMemo(() => {
    return courses?.slice(0, 6);
  }, [courses]);
  return (
    <section className="flex justify-center" id="course">
      <div className="py-16 px-4 md:px-10 lg:px-20 max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-10 ">
          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            Imagic Job <span className="text-yellow-400">Assured Courses.</span>
          </h2>
          <p className="text-black/60 mt-6">
            Lifetime 100% Job Placement is provided to Imagic students. Learn
            online or offline from industry experts and professional faculties.
            Get a job any time you want. Get a free demo class and career
            counselling to choose the right career just for you. Imagic Own
            centers are now in Chandni, Kolkata and Shrirampur, Hooghly.
          </p>
        </div>

        {/* Courses Grid */}
        <div
          className={`transition-all duration-2000 transform grid sm:grid-cols-2 lg:grid-cols-3 gap-8`}
        >
          {courseData?.map((course, index) => (
            <CourseCard
              key={index}
              course={course}
              onClick={() => navigate(`/course/${course.slug}`)}
            />
          ))}
        </div>
        {/* View All Courses Button */}
        <div className="flex justify-center mt-12">
          <Link
            to={"/course"}
            className="px-8 py-4 rounded-full bg-yellow-400 text-black font-semibold text-base md:text-lg cursor-pointer hover:bg-yellow-300 duration-200 transition shadow-md hover:shadow-xl transform will-change-transform hover:scale-105"
          >
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  );
}
