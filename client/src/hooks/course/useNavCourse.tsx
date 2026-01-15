// import { ICourseItems } from "@/components/shared/header/DesktopNav";
import { Icourse } from "@/types/course.types";
import { ICourseItems } from "@/types/courseItems.interface";
import { api } from "@/utils/api";
import { useCallback, useEffect, useState } from "react";

const useNavCourse = () => {
  const [coursesItems, setCoursesItems] = useState<ICourseItems>();
  const [loading, setLoading] = useState<boolean>(false);
  const formateCourseItems = useCallback((courseData: Icourse[]) => {
    setCoursesItems((prev) => {
      const items: ICourseItems = {};
      courseData.forEach((course) => {
        const existingItems = items?.[course.courseDetails.category];
        items[course.courseDetails.category] = [
          {
            title: course.courseDetails.category,
            slug: course.slug,
          },
          ...(Array.isArray(existingItems) ? existingItems : []),
        ];
      });
      return items;
    });
  }, []);
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await api.course.getAllCourses();
      if (response.data) {
        formateCourseItems(response.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  return {
    coursesItems,
    refetchCourses: fetchCourses,
  };
};

export default useNavCourse;
