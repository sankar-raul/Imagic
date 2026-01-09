import { useNavigate } from "react-router";
import CourseCard from "../courseCard/CourseCard";


// const categories = [
//   "All",
//   "Design",
//   "Development",
//   "Business & Marketing",
//   "Finance",
//   "Language & Culture",
// ];

const courses = [
  {
    title: "Graphic Design Courses in Kolkata",
    image: "https://images.unsplash.com/photo-1611241893603-3c359704e0ee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "₹54,000.00",
    category: "Graphic Design",
    id:"graphic-design-kolkata",
    rating: "4.9",
    reviews: "245",
  },
  {
    title: "Certificate Course In InDesign",
    image: "https://images.unsplash.com/photo-1700887937204-69f8b8400ace?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "₹11,000.00",
    category: "Graphic Design",
    id:"certificate-course-in-adobe-indesign",
    rating: "4.9",
    reviews: "245",
  },
  {
    title: "Certificate Course In Lightroom",
    image: "https://images.unsplash.com/photo-1560858275-a06a049554f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWRvYmUlMjBsaWdodHJvb218ZW58MHx8MHx8fDA%3D",
    price: "₹9000.00",
    category: "Graphic Design",
    id:"certificate-course-in-adobe-lightroom",
    rating: "4.9",
    reviews: "245",
  },
  {
    title: "FCP Video Editing & VFX Course",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmlkZW8lMjBlZGl0aW5nfGVufDB8fDB8fHww",
    price: "₹1,08,000.00",
    category: "Video Editing",
    id:"fcp-video-editing-vfx-course",
    rating: "4.9",
    reviews: "245",
  },
  {
    title: "Professional Video Editing in Kolkata",
    image: "https://images.unsplash.com/photo-1551302175-952301267d19?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "₹36,000",
    category: "Video Editing",
    id:"professional-video-editing-in-kolkata",
    rating: "4.9",
    reviews: "245",
  },
  {
    title: "FCP Video Editing Course",
    image: "https://images.unsplash.com/photo-1605826832916-d0ea9d6fe71e?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "₹54,000.00",
    category: "Video Editing",
    id:"fcp-video-editing",
    rating: "4.9",
    reviews: "245",
  },
  {
    title: "Certificate Course In After Effects",
    image: "https://images.unsplash.com/photo-1501780392773-287d506245a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "₹40,000.00",
    category: "Video Editing",
    id:"certificate-course-in-after-effects",
    rating: "4.9",
    reviews: "245",
  },
  {
    title: "Digital Marketing Course In Kolkata",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "₹54,000.00",
    category: "Digital Marketing",
    id:"digital-marketing-course-in-kolkata",
    rating: "4.9",
    reviews: "245",
  },
  {
    title: "Video Editing 1Yr. Diploma Course In Kolkata",
    image: "https://images.unsplash.com/photo-1684717417861-9c90fc3a8840?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "₹60,500",
    category: "Video Editing",
    id:"video-editing-diploma-course",
    rating: "4.9",
    reviews: "245",
  },
  {
    title: "Digital Media & Marketing 1 Yr. Diploma Course In Kolkata",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "₹60,500",
    category: "Digital Marketing",
    id:"digital-marketing-diploma-course",
    rating: "4.9",
    reviews: "245",
  },
  {
    title: "Graphics Design 1 Yr. Diploma Course In Kolkata",
    image: "https://images.unsplash.com/photo-1611241893603-3c359704e0ee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "₹60,500",
    category: "Graphic Design",
    id:"graphic-design-diploma-course",
    rating: "4.9",
    reviews: "245",
  },
   {
    title: "FCP Video Editing Course",
    image: "https://images.unsplash.com/photo-1605826832916-d0ea9d6fe71e?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "₹40,000.00",
    category: "Video Editing",
    id:"fcp-video-editing",
    rating: "4.9",
    reviews: "245",
  },

];

export default function CoursesSection() {
//   const [visible, setVisible] = useState(false);

  return (
    <section className="flex justify-center overflow-hidden">
      <div className="px-10 md:px-20  gap-6 flex flex-col">
      {/* Heading */}
      <div className="text-center mb-10 ">
        <span className="uppercase text-gray-400 tracking-wider text-sm border rounded-2xl border-gray-200 px-4 py-2">
          Our Courses
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">
          Learn. Grow. Succeed.
        </h2>
      </div>

      {/* Courses Grid */}
      <div
      className="transition-all pb-10 duration-2000 transform opacity-100 translate-y-0 w-full gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4">
        {courses.map((course, index) => (
            <CourseCard key={index} course={course} index={index} />
        ))}
      </div>
    </div>
    </section>
  );
}