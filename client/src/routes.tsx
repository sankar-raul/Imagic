import { createRoutesFromElements, Route } from "react-router";
import { createBrowserRouter } from "react-router";
import RootLayout from "./components/layouts/rootLayout/RootLayout";
import Home from "./components/pages/home/Home";
import About from "./components/pages/about/About";
import Contact from "./components/pages/contact/Contact";
import Placements from "./components/pages/placements/Placements";
import Blogs from "./components/pages/blogs/Blogs";
import BlogDetails from "./components/pages/blogs/BlogDetails";
import Vacancies from "./components/pages/vacancies/Vacancies";
import Testimonial from "./components/pages/testimonial/Testimonial";
import ShowCase from "./components/pages/showcase/ShowCase";
import NewsAndEvent from "./components/pages/newsAndEvent/NewsAndEvent";
import NewsAndEventDetails from "./components/pages/newsAndEvent/NewsAndEventDetails";
import Fanchise from "./components/pages/franchise/Fanchise";
import StudentWork from "./components/pages/studentwork/StudentWork";
import Dashbaord from "./components/pages/dashboard/Dashbaord";
import CourseDetails from "./components/pages/course/CourseDetails";
import WhyImagic from "./components/pages/whyImagic/WhyImagic";
import AllCourse from "./components/pages/dashboard/course/AllCourse";
import AddCourse from "./components/pages/dashboard/course/AddCourse";
import AllTestimonial from "./components/pages/dashboard/testimonial/AllTestimonial";
import AddTestimonial from "./components/pages/dashboard/testimonial/AddTestimonial";
import AllEntries from "./components/pages/dashboard/demoClass/AllEntries";
import AllPlacements from "./components/pages/dashboard/placement/AllPlacements";
import AddPlacement from "./components/pages/dashboard/placement/AddPlacement";
import AddBlog from "./components/pages/dashboard/blog/AddBlog";
import AddStudentWork from "./components/pages/dashboard/studentWork/AddStudentWork";
import AllJobVacancy from "./components/pages/dashboard/jobVacancy/AllJobVacancy";
import AddJobVacancy from "./components/pages/dashboard/jobVacancy/AddJobVacancy";

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
          <Route path=":vacancyId" element={<Vacancies />} />
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
      </Route>
      <Route path="dashboard" element={<Dashbaord />}>
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
          <Route path="add" element={<AddBlog />} />
        </Route>
        <Route path="student-work">
          <Route path="add" element={<AddStudentWork />} />
        </Route>
        <Route path="job-vacancy">
          <Route index element={<AllJobVacancy />} />
          <Route path="add" element={<AddJobVacancy />} />
        </Route>
      </Route>
    </Route>
  )
);
export default routes;
