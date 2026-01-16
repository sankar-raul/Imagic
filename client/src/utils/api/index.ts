import { applyDemoClass, deleteDemoClassEntry, demoClassEntries } from "./applyDemoClass/appplyDemoClass";
import { getAllBlogs, postBlog } from "./blog/blog";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
} from "./course/course";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobBySlug,
} from "./jobVacancy/jobVacancy";
import { addPlacement, deletePlacement, getAllPlacement } from "./placement/placement";
import {
  addTestimonial,
  deleteTestimonial,
  getAllTestimonial,
} from "./testimonial/testimonial";
import { getAllNews, postNews, deleteNews } from "./news/news";
import { getAllStudentWorks, addStudentWork, deleteStudentWork } from "./studentWork/studentWork";

export const api = {
  course: {
    getAllCourses,
    createCourse,
    getCourseById,
    deleteCourse,
  },
  demoClass: {
    applyDemoClass,
    demoClassEntries,
    deleteDemoClassEntry,
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
  jobVacancy: {
    getAllJobs,
    createJob,
    deleteJob,
    getJobBySlug,
  },
  placements:{
    getAllPlacement,
    addPlacement,
    deletePlacement,
  },
  news: {
    getAllNews,
    postNews,
    deleteNews,
  },
  studentWork: {
    getAllStudentWorks,
    addStudentWork,
    deleteStudentWork,
  }
};
