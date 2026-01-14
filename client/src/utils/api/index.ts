import { applyDemoClass } from "./applyDemoClass/appplyDemoClass";
import { getAllBlogs, postBlog } from "./blog/blog";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
} from "./course/course";
import {
  addTestimonial,
  deleteTestimonial,
  getAllTestimonial,
} from "./testimonial/testimonial";

export const api = {
  course: {
    getAllCourses,
    createCourse,
    getCourseById,
    deleteCourse,
  },
  demoClass: {
    applyDemoClass,
  },
  blog: {
    getAllBlogs,
    postBlog,
  },
  testimonial: {
    getAllTestimonial,
    addTestimonial,
    deleteTestimonial,
  },
};
