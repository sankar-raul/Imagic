import {
  applyDemoClass,
  deleteDemoClassEntry,
  demoClassEntries,
} from "./applyDemoClass/appplyDemoClass";
import {
  getAllBlogs,
  postBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
  getBlogBySlug,
} from "./blog/blog";
import {
  availableCourses,
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
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
  getTestimonialByCourseSlug,
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
  getStudentWorksByCourseId,
  updateStudentWork,
} from "./studentWork/studentWork";
import { login as authLogin } from "./auth/auth";
import {
  commentOnBlogPost,
  deleteComment,
  getBlogComments,
  likeComment,
} from "./comment/comment";
import {
  getAllPendingStudents,
  getAllVerifiedStudents,
  verifyStudent,
} from "./students/student";
import { requestOtp, verifyOtp } from "./otp/otp.api";

export const api = {
  course: {
    getAllCourses,
    createCourse,
    getCourseById,
    deleteCourse,
    availableCourses,
    updateCourse,
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
    getBlogBySlug,
  },
  testimonial: {
    getAllTestimonial,
    addTestimonial,
    deleteTestimonial,
    getTestimonialById,
    updateTestimonial,
    getTestimonialByCourseSlug,
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
    getStudentWorksByCourseId,
  },
  auth: {
    login: authLogin,
  },
  comment: {
    getBlogComments,
    commentOnBlogPost,
    likeComment,
    deleteComment,
  },
  otp: {
    requestOtp,
    verifyOtp,
  },
  student: {
    getAllPendingStudents,
    getAllVerifiedStudents,
    verifyStudent,
  },
};
