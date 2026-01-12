import { createRoutesFromElements, Routes, Route } from "react-router";
import { createBrowserRouter } from "react-router";
import Home from "./Home";
import CoursePage from "./components/CoursePage";
import RootLayout from "./layout";
import JobListingPage from "./components/JobsPage";
import PlacementPage from "./components/PlacementPage";
import JobVacancy from "./components/JobVacancy";
import ContactPage from "./components/ContactPage";

const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
            <Route index element={<Home/>}/>
            <Route path="/course/:courseId" element={<CoursePage/>}/>
            <Route path="/jobvacancy" element={<JobVacancy/>}/>
            <Route path="jobs/:jobId" element={<JobListingPage/>}/>
            <Route path="placement" element={<PlacementPage/>}/>
             <Route path="contact" element={<ContactPage/>}/>
            </Route>

    )
)
export default routes;