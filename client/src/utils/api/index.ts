import {
  applyDemoClass,
  deleteDemoClassEntry,
  demoClassEntries,
} from "./applyDemoClass/appplyDemoClass";
import { getAllBlogs, postBlog, getBlogById, updateBlog, deleteBlog } from "./blog/blog";
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
  getJobById,
  updateJob,
} from "./jobVacancy/jobVacancy";
import {
  addPlacement,
  deletePlacement,
  getAllPlacement,
  getPlacementById,
  updatePlacement,
} from "./placement/placement";
import {
  addTestimonial,
  deleteTestimonial,
  getAllTestimonial,
  getTestimonialById,
  updateTestimonial,
} from "./testimonial/testimonial";
import {
  subscribeNewsletter,
  unsubscribeNewsletter,
  getAllSubscribers,
  deleteSubscriber,
} from "./newsletter/newsletter";
import { deleteNews, getAllNews, postNews } from "./news/news";
import {
  addStudentWork,
  deleteStudentWork,
  getAllStudentWorks,
  getStudentWorkById,
  updateStudentWork,
} from "./studentWork/studentWork";
import { login as authLogin } from "./auth/auth";

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
    getBlogById,
    updateBlog,
    deleteBlog,
  },
  testimonial: {
    getAllTestimonial,
    addTestimonial,
    deleteTestimonial,
    getTestimonialById,
    updateTestimonial,
  },
  jobVacancy: {
    getAllJobs,
    createJob,
    deleteJob,
    getJobBySlug,
    getJobById,
    updateJob,
  },
  placements: {
    getAllPlacement,
    addPlacement,
    deletePlacement,
    getPlacementById,
    updatePlacement,
  },
  newsletter: {
    subscribeNewsletter,
    unsubscribeNewsletter,
    getAllSubscribers,
    deleteSubscriber,
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
    getStudentWorkById,
    updateStudentWork,
  },
  auth: {
    login: authLogin,
  },
};
