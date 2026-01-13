import { applyDemoClass } from "./applyDemoClass/appplyDemoClass";
import { createCourse, getAllCourses } from "./course/course";


export const api = {
  course: {
    getAllCourses,
    createCourse,
  },
  demoClass: {
    applyDemoClass,
  }
};
