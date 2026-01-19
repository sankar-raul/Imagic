import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import RootLayout from "./components/layouts/rootLayout/RootLayout";
import About from "./components/pages/about/About";
import BlogDetails from "./components/pages/blogs/BlogDetails";
import Blogs from "./components/pages/blogs/Blogs";
import Contact from "./components/pages/contact/Contact";
import CourseDetails from "./components/pages/course/CourseDetails";
import AddBlog from "./components/pages/dashboard/blog/AddBlog";
import AllBlog from "./components/pages/dashboard/blog/AllBlog";
import AddCourse from "./components/pages/dashboard/course/AddCourse";
import AllCourse from "./components/pages/dashboard/course/AllCourse";
import Dashbaord from "./components/pages/dashboard/Dashbaord";
import AllEntries from "./components/pages/dashboard/demoClass/AllEntries";
import AddJobVacancy from "./components/pages/dashboard/jobVacancy/AddJobVacancy";
import AllJobVacancy from "./components/pages/dashboard/jobVacancy/AllJobVacancy";
import AddPlacement from "./components/pages/dashboard/placement/AddPlacement";
import AllPlacements from "./components/pages/dashboard/placement/AllPlacements";
import AddStudentWork from "./components/pages/dashboard/studentWork/AddStudentWork";
import AddTestimonial from "./components/pages/dashboard/testimonial/AddTestimonial";
import AllTestimonial from "./components/pages/dashboard/testimonial/AllTestimonial";
import Fanchise from "./components/pages/franchise/Fanchise";
import Home from "./components/pages/home/Home";
import NewsAndEvent from "./components/pages/newsAndEvent/NewsAndEvent";
import NewsAndEventDetails from "./components/pages/newsAndEvent/NewsAndEventDetails";
import Placements from "./components/pages/placements/Placements";
import ShowCase from "./components/pages/showcase/ShowCase";
import StudentWork from "./components/pages/studentwork/StudentWork";
import Testimonial from "./components/pages/testimonial/Testimonial";
import Vacancies from "./components/pages/vacancies/Vacancies";
import WhyImagic from "./components/pages/whyImagic/WhyImagic";
import JobListingPage from "./components/JobsPage";
import AddNews from "./components/pages/dashboard/news-events/AddNews";
import AllNews from "./components/pages/dashboard/news-events/AllNews";
import AllStudentWork from "./components/pages/dashboard/studentWork/AllStudentWork";
import NewsletterEntries from "./components/pages/dashboard/newsletter/NewsletterEntries";
import Login from "./components/pages/dashboard/Login";
import ProtectedRoute from "./components/pages/dashboard/ProtectedRoute";
import DashboardHome from "./components/pages/dashboard/DashboardHome";
import ShowAllCourse from "./components/pages/allCourse/ShowAllCourse";
import TestimonialsSection from "./components/ReviewsSection";
import NotFound from "./components/pages/notFound/NotFound";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="whyimagic">
          <Route path=":id" element={<WhyImagic />} />
        </Route>
        <Route path="placements">
          <Route index element={<Placements />} />
        </Route>
        <Route path="course">
          <Route index element={<ShowAllCourse />} />
          <Route path=":id" element={<CourseDetails />} />
        </Route>
        <Route path="news-events">
          <Route index element={<NewsAndEvent />} />
          {/* <Route path="page/:pageNumber" element={<div>News and Events Pagination Page</div>} /> */}
          <Route path=":newsDetails" element={<BlogDetails />} />
        </Route>
        <Route path="vacancies">
          <Route index element={<Vacancies />} />
          {/* <Route path="page/:pageNumber" element={<div>Pagination Pagination Page</div>} /> */}
          <Route path=":slug" element={<JobListingPage />} />
        </Route>
        <Route path="testimonial">
          <Route index element={<Testimonial />} />
        </Route>
        <Route path="showcase">
          <Route index element={<ShowCase />} />
        </Route>
        <Route path="blogs">
          <Route index element={<Blogs />} />
          <Route path=":blogId" element={<NewsAndEventDetails />} />
        </Route>
        <Route path="animation-institute-franchise">
          <Route index element={<Fanchise />} />
        </Route>
        <Route path="student-work">
          <Route index element={<StudentWork />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="dashboard">
        <Route path="login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <Dashbaord />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="course">
            <Route index element={<AllCourse />} />
            <Route path="add" element={<AddCourse />} />
          </Route>

          <Route path="testimonial">
            <Route index element={<AllTestimonial />} />
            <Route path="add" element={<AddTestimonial />} />
          </Route>
          <Route path="demo-class">
            <Route index element={<AllEntries />} />
          </Route>
          <Route path="Placement">
            <Route index element={<AllPlacements />} />
            <Route path="add" element={<AddPlacement />} />
          </Route>
          <Route path="blog">
            <Route index element={<AllBlog />} />
            <Route path="add" element={<AddBlog />} />
          </Route>
          <Route path="newsletter">
            <Route index element={<NewsletterEntries />} />
          </Route>
          <Route path="news-events">
            <Route index element={<AllNews />} />
            <Route path="add" element={<AddNews />} />
          </Route>
          <Route path="student-work">
            <Route index element={<AllStudentWork />} />
            <Route path="add" element={<AddStudentWork />} />
          </Route>
          <Route path="job-vacancy">
            <Route index element={<AllJobVacancy />} />
            <Route path="add" element={<AddJobVacancy />} />
          </Route>
        </Route>
      </Route>
    </Route>,
  ),
);
export default routes;
