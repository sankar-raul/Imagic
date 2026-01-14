import { api } from "@/utils/api";
const useDeleteCourse = () => {
  const deleteCourseById = async (courseId: string) => {
    try {
      const response = await api.course.deleteCourse(courseId);
        return response;
      
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };
  return {
    deleteCourseById,
  };
};

export default useDeleteCourse;
