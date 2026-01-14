import logo from "@/assets/logo.jpg";
import { NavMenuItem } from "@/types";

const initialCourseRoute = "/course";

export const navData: {
  logo: string;
  logoAlt: string;
  menuItems: NavMenuItem[];
} = {
  logo: logo,
  logoAlt: "Company Logo",
  menuItems: [
    {
      label: "Home",
      href: "/",
      type: "link",
    },
    {
      label: "Courses",
      type: "dropdown",
      items: [
        {
          label: "Graphic Design Courses",
          items: [
            {
              label: "Graphic Design Course In Kolkata",
              href: `${initialCourseRoute}/graphic-design-kolkata`,
            },
            {
              label: "Certificate Course In Adobe InDesign",
              href: `${initialCourseRoute}/certificate-course-in-adobe-indesign`,
            },
            {
              label: "Certificate Course In Adobe Lightroom",
              href: `${initialCourseRoute}/certificate-course-in-adobe-lightroom`,
            },
          ],
        },
        {
          label: "Video Editing Course",
          items: [
            {
              label: "FCP Video Editing & VFX Course",
              href: `${initialCourseRoute}/fcp-video-editing-vfx-course`,
            },
            {
              label: "Professional Video Editing Course ",
              href: `${initialCourseRoute}/professional-video-editing-in-kolkata`,
            },
            {
              label: "After Effect Course",
              href: `${initialCourseRoute}/certificate-course-in-after-effects`,
            },
            {
              label: "FCP Video Editing Course",
              href: `${initialCourseRoute}/fcp-video-editing`,
            },
          ],
        },
        {
          label: "Digital Marketing Courses",
          items: [
            {
              label: "Digital Marketing Course In Kolkata",
              href: `${initialCourseRoute}/digital-marketing-course-in-kolkata`,
            },
          ],
        },
        {
          label: "NSOU Diploma Courses",
          items: [
            {
              label: "NSOU Video Editing Diploma",
              href: `${initialCourseRoute}/video-editing-diploma-course`,
            },
            {
              label: "NSOU Digital Marketing Diploma ",
              href: `${initialCourseRoute}/digital-marketing-diploma-course`,
            },
            {
              label: "NSOU Graphic Design Diploma",
              href: `${initialCourseRoute}/graphic-design-diploma-course`,
            },
          ],
        },
      ],
    },
    {
      label: "Job Vacancy",
      href: "/vacancies",
      type: "link",
    },
    {
      label: "Placements",
      href: "/placements",
      type: "link",
    },
    {
      label: "Contact",
      href: "/contact",
      type: "link",
    },
  ],
};
