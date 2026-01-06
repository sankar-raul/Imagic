import { createRoutesFromElements, Route } from "react-router";
import { createBrowserRouter } from "react-router";
import RootLayout from "./components/layouts/rootLayout/RootLayout";
import Home from "./components/pages/home/Home";

const routes = createBrowserRouter(createRoutesFromElements(
    <Route path="/" >
        <Route element={<RootLayout />} >
            <Route index element={<Home />} />
            <Route path="about" element={<div>About Page</div>} />
            <Route path="contact" element={<div>Contact Page</div>} />
            <Route path="placements">
                <Route index element={<div>Placements Page</div>} />
            </Route>
            <Route path="news-events">
                <Route index element={<div>News and Events Page</div>} />
                {/* <Route path="page/:pageNumber" element={<div>News and Events Pagination Page</div>} /> */}
                <Route path=":newsDetails" element={<div>News/Event Details Page</div>} />
            </Route>
            <Route path="vacancies">
                <Route index element={<div>Vacancies Page</div>} />
                {/* <Route path="page/:pageNumber" element={<div>Pagination Pagination Page</div>} /> */}
                <Route path=":vacancyId" element={<div>Vacancy Details Page</div>} />
            </Route>
            <Route path="testimonial">
                <Route index element={<div>Testimonial Page</div>} />
            </Route>
            <Route path="showcase">
                <Route index element={<div>Showcase Page</div>} />
            </Route>
            <Route path="blogs" >
                <Route index element={<div>Blogs Page</div>} />
                <Route path=":blogId" element={<div>Blog Details Page</div>} />
            </Route>
            <Route path="animation-institute-franchise">
                <Route index element={<div>Animation Institute Franchise Page</div>} />
            </Route>
            <Route path="student-work">
                <Route index element={<div>Student Work</div>} />
            </Route>
        </Route>
        <Route path="dashboard">
            <Route index element={<div>Dashboard Home</div>} />
        </Route>
    </Route>
))
export default routes;