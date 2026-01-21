import { ReactNode } from "react";
import slide1Image from "@/assets/images/heroSlide1.png";
import slide2Image from "@/assets/images/heroSlide2.png";
export interface HeroSlide {
  heading: ReactNode;
  description: string | null;
  primaryButtonText: string;
  secondaryButtonText: string | null;
  backgroundImage: string;
  imageAlt: string;
  showBadge: boolean;
  bottomText: string;
  link: string | null;
}

export const heroSlidesData: HeroSlide[] = [
  {
    heading: (
      <>
        Build Skills.<br />Build Careers.
      </>
    ),
    description: "Your Creative Career Starts Here",
    primaryButtonText: "View All Courses",
    secondaryButtonText: "Apply Demo Class",
    backgroundImage: slide1Image,
    imageAlt: "Career transformation",
    showBadge: true,
    bottomText: "Industry-leading placement programs",
    link: null
  },
  {
    heading: (
      <>
      Explore Career  <br /> Opportunities
      </>
    ),
    description: null,
    primaryButtonText: "Explore Job Vacancies",
    secondaryButtonText: null,
    backgroundImage: slide2Image,
    imageAlt: "Students learning together",
    showBadge: false,
    bottomText: "Highly recommended courses for kids",
    link: "/vacancies"
  },
  
];
