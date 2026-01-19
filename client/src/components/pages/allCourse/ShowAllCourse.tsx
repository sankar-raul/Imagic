import CourseCard from "@/components/shared/CourseCard";
import CourseCardSkeleton from "@/components/shared/skeletons/CourseCardSkeleton";
import useGetAllCourse from "@/hooks/course/useGetAllCourse";
import { Link, useNavigate } from "react-router";

const ShowAllCourse = () => {
  const { courses, isLoading } = useGetAllCourse();
  const navigate = useNavigate();
  return (
    <section className="flex justify-center" id="course">
      <div className="py-16 px-4 md:px-10 lg:px-20 max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mt-2 font-serif">
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
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <CourseCardSkeleton key={index} />
              ))
            : courses?.map((course, index) => (
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
            className="px-8 py-4 rounded-full bg-neutral-800 text-white font-normal text-base md:text-lg cursor-pointer hover:bg-neutral-900 hover:text-white duration-200 transition shadow-sm hover:shadow-sm transform will-change-transform hover:scale-105"
          >
            Apply for Demo Class
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShowAllCourse;
