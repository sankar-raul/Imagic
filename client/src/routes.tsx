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

const routes = createBrowserRouter(createRoutesFromElements(
    <Route path="/" >
        <Route element={<RootLayout />} >
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="placements">
                <Route index element={<Placements />} />
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
            <Route path="blogs" >
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
        <Route path="dashboard">
            <Route index element={<Dashbaord />} />
        </Route>
    </Route>
))
export default routes;