import { useState, useCallback, useEffect } from "react";
import logo from '@/assets/logo.jpg';
import _ from 'lodash';
import { NavMenuItem } from "@/types";
import { motion } from "framer-motion";
import { NavLink } from "react-router";

// Navigation data structure
const initialCourseRoute = '/courses';
const navData: {
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
            type: "link"
        },
        {
            label: "Courses",
            type: "dropdown",
            items: [
                {
                    label: "Graphic Design Courses",
                    items: [
                        { label: "Graphic Design Course In Kolkata", href: `${initialCourseRoute}/graphic-design-kolkata` },
                        { label: "Certificate Course In Adobe InDesign", href: `${initialCourseRoute}/certificate-course-in-adobe-indesign` },
                        { label: "Certificate Course In Adobe Lightroom", href: `${initialCourseRoute}/certificate-course-in-adobe-lightroom` }
                    ]
                },
                {
                    label: "Video Editing Course",
                    items: [
                        { label: "FCP Video Editing & VFX Course", href: `${initialCourseRoute}/fcp-video-editing-vfx-course` },
                        { label: "Professional Video Editing Course ", href: `${initialCourseRoute}/professional-video-editing-in-kolkata` },
                        { label: "After Effect Course", href: `${initialCourseRoute}/certificate-course-in-after-effects` },
                        { label: "FCP Video Editing Course", href: `${initialCourseRoute}/fcp-video-editing` }
                    ]
                },
                {
                    label: "Digital Marketing Courses",
                    items: [
                        { label: "Digital Marketing Course In Kolkata", href: `${initialCourseRoute}/digital-marketing-course-in-kolkata` },
                    ]
                },
                {
                    label: "NSOU Diploma Courses",
                    items: [
                        { label: "NSOU Video Editing Diploma", href: `${initialCourseRoute}/video-editing-diploma-course` },
                        { label: "NSOU Digital Marketing Diploma ", href: `${initialCourseRoute}/digital-marketing-diploma-course` },
                        { label: "NSOU Graphic Design Diploma", href: `${initialCourseRoute}/graphic-design-diploma-course` },
                    ]
                }
            ]
        },
        {
            label: "Job Vacancy",
            href: "/vacancies",
            type: "link"
        },
        {
            label: "Placements",
            href: "/placements",
            type: "link"
        },
        {
            label: "Contact",
            href: "/contact",
            type: "link"
        }
    ]
};


export default function Header() {
  const [navDisplay, setNavDisplay] = useState('-translate-y-full');
  const [expandDetails, setExpandDetails] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleNavOpen = useCallback(() => {
    setNavDisplay((prev) => prev === '-translate-y-full' ? 'translate-y-0' : '-translate-y-full');
  }, []);

  const handleExpand = useCallback(() => {
    setExpandDetails((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleScroll = _.throttle(() => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }, 200);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, []);

  return (
    <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          width: isScrolled ? '100%' : 'max-content',
        }}
        transition={{ duration: 0.5}}
        className={`sticky top-0 flex justify-between min-w-full lg:min-w-max lg:w-max lg:mx-auto items-center will-change-auto py-3 px-6 md:px-12 lg:px-16 gap-4 z-50 shadow-sm ${
          !isScrolled 
            ? 'lg:bg-white/80 lg:backdrop-blur-2xl lg:rounded-full md:translate-y-2' 
            : ''
        } bg-white`}>
      {/* Logo */}
      <div className="h-10 md:h-12 z-20 shrink-0">
        <a href="/">
          <img
            className="h-full object-contain"
            src={navData.logo}
            alt={navData.logoAlt}
          />
        </a>
      </div>

      {/* Hamburger Menu */}
      <div className="z-20 lg:hidden">
        <button
          onClick={handleNavOpen}
          className="flex flex-col gap-1.5 relative w-8 h-6 justify-center"
          aria-label="Toggle menu"
        >
          <div className={`w-8 h-0.5 bg-gray-800 rounded-full absolute transition-all duration-300 ${navDisplay === 'translate-y-0' ? '-rotate-45' : 'top-0'}`}></div>
          <div className={`w-8 h-0.5 bg-gray-800 rounded-full transition-all duration-300 ${navDisplay === 'translate-y-0' ? 'opacity-0' : 'opacity-100'}`}></div>
          <div className={`w-8 h-0.5 bg-gray-800 rounded-full absolute transition-all duration-300 ${navDisplay === 'translate-y-0' ? 'rotate-45' : 'bottom-0'}`}></div>
        </button>
      </div>

      {/* Navigation Container */}
      <div className={`flex-1 flex justify-center items-center ${navDisplay} lg:translate-y-0 duration-300 fixed left-0 top-0 lg:static h-full w-full lg:w-auto lg:h-auto z-40`}>
        {/* Mobile Backdrop */}
        <div onClick={handleNavOpen} className="bg-black/30 backdrop-blur-sm lg:hidden absolute inset-0 -z-10"></div>
        
        <nav className="w-full max-w-md lg:max-w-none bg-white lg:bg-transparent rounded-none lg:rounded-full px-6 py-12 lg:py-0 lg:px-8 relative">
          <ul className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-8">
            {navData.menuItems.map((item, index) => (
              <li className="relative group" key={index}>
                {item.type === "link" ? (
                  <NavLink
                    to={item.href || '/'}
                    className="block whitespace-nowrap lg:inline-block px-4 py-3 lg:py-4 text-gray-800 hover:text-gray-900 font-medium text-base transition-colors relative lg:after:content-[''] lg:after:absolute lg:after:bottom-0 lg:after:left-1/2 lg:after:-translate-x-1/2 lg:after:w-0 lg:after:h-0.5 lg:after:bg-black lg:hover:after:w-3/4 lg:after:transition-all lg:after:duration-300"
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <>
                    <button
                      onClick={handleExpand}
                      className="w-full group/navbutton lg:w-auto flex items-center justify-between lg:justify-center px-4 py-3 lg:py-4 text-gray-800 hover:text-gray-900 font-medium text-base transition-colors relative lg:after:content-[''] lg:after:absolute lg:after:bottom-0 lg:after:left-1/2 lg:after:-translate-x-1/2 lg:after:w-0 lg:after:h-0.5 lg:after:bg-black lg:hover:after:w-3/4 lg:after:transition-all lg:after:duration-300"
                    >
                      {item.label}
                      <span className="ml-1 text-xs transition-transform duration-300 lg:inline-block origin-center group-hover/navbutton:rotate-180">▼</span>
                    </button>

                    {/* Desktop Dropdown */}
                    <div className="hidden lg:block absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl p-6 w-[650px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100">
                      <div className="grid grid-cols-2 gap-6">
                        {item.items?.map((category, catIndex) => (
                          <div key={catIndex} className="space-y-3">
                            <h3 className="font-bold text-sm text-gray-800 pb-2 border-b-2 border-black/10">
                              {category.label}
                            </h3>
                            {category.items.map((subItem, subIndex) => (
                              <a
                                key={subIndex}
                                href={subItem.href}
                                className="block px-3 py-2.5 text-sm text-gray-700 hover:text-black hover:bg-black/5 rounded-xl transition-all"
                              >
                                {subItem.label}
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mobile Dropdown */}
                    <div className={`lg:hidden overflow-hidden transition-all duration-300 ${expandDetails ? 'max-h-[600px]' : 'max-h-0'}`}>
                      <div className="pl-4 pt-2 space-y-3">
                        {item.items?.map((category, catIndex) => (
                          <div key={catIndex} className="space-y-2">
                            <h3 className="font-semibold text-sm text-gray-700 px-2">
                              {category.label}
                            </h3>
                            {category.items.map((subItem, subIndex) => (
                              <a
                                key={subIndex}
                                href={subItem.href}
                                className="block px-4 py-2 text-sm text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                              >
                                {subItem.label}
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Join Now Button */}
      <div className="hidden lg:block z-20 shrink-0">
        <a
          href="/contact"
          className="px-7 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full inline-flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Join Now
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </motion.header>
  );
}