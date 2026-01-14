import { applyDemoClass } from "./applyDemoClass/appplyDemoClass";
import { createCourse, getAllCourses, getCourseById } from "./course/course";

export const api = {
  course: {
    getAllCourses,
    createCourse,
    getCourseById,
  },
  demoClass: {
    applyDemoClass,
  },
};
