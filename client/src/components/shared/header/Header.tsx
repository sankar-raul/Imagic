import { useState, useCallback, useEffect } from "react";
import _ from "lodash";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Logo from "./Logo";
import HamburgerButton from "./HamburgerButton";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import JoinButton from "./JoinButton";
import { navData } from "./navData";
import useNavCourse from "@/hooks/course/useNavCourse";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [expandDetails, setExpandDetails] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { coursesItems } = useNavCourse();

  const handleNavToggle = useCallback(() => {
    setIsNavOpen((prev) => !prev);
  }, []);

  const handleNavClose = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  const handleExpand = useCallback(() => {
    setExpandDetails((prev) => !prev);
  }, []);
  const gotoDemo = useCallback(() => {
    scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handleScroll = _.throttle(() => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        width: isScrolled ? "100%" : "max-content",
      }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 flex justify-between min-w-full lg:min-w-max lg:w-max lg:mx-auto items-center will-change-auto py-2 sm:py-3 px-3 sm:px-6 md:px-12 lg:px-16 gap-2 sm:gap-4 z-50  ${
        !isScrolled
          ? "lg:bg-white/90 lg:backdrop-blur-2xl shadow-none lg:rounded-full lg:translate-y-2"
          : "shadow-sm shadow-neutral-500/10"
      } bg-white`}
    >
      <Logo src={navData.logo} alt={navData.logoAlt} />

      {/* Contact Info - Mobile (visible when nav is closed) */}
      <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
        {!isNavOpen && (
          <>
            <a
              href="https://wa.me/917044393332"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-green-50 hover:bg-green-100 active:bg-green-200 transition-all duration-300 border border-green-200"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="text-green-600 text-base sm:text-lg" />
            </a>
            <a
              href="tel:+917044393332"
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-50 hover:bg-blue-100 active:bg-blue-200 transition-all duration-300 border border-blue-200"
              aria-label="Call Now"
            >
              <Phone className="text-blue-600 w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
          </>
        )}
        <HamburgerButton isOpen={isNavOpen} onClick={handleNavToggle} />
      </div>

      <MobileNav
        isOpen={isNavOpen}
        courseItems={coursesItems}
        menuItems={navData.menuItems}
        expandDetails={expandDetails}
        onToggle={handleNavToggle}
        onExpandToggle={handleExpand}
        onClose={handleNavClose}
      />

      <DesktopNav
        courseItems={coursesItems}
        menuItems={navData.menuItems}
        onLinkClick={handleNavClose}
      />

      {/* Contact Info - Desktop */}
      <div className="hidden lg:flex items-center gap-2 xl:gap-3">
        <a
          href="https://wa.me/917044393332"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 xl:gap-2 px-2 xl:px-4 py-2 rounded-full bg-green-50 hover:bg-green-100 transition-all duration-300 group border border-green-200"
          aria-label="WhatsApp +91 7044393332"
        >
          <FaWhatsapp className="text-green-600 text-lg xl:text-xl group-hover:scale-110 transition-transform" />
          <span className="hidden xl:inline text-xs xl:text-sm font-semibold text-green-700 whitespace-nowrap">
            +91 7044393332
          </span>
        </a>
        <a
          href="tel:+917044393332"
          className="flex items-center gap-1.5 xl:gap-2 px-2 xl:px-4 py-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-all duration-300 group border border-blue-200"
          aria-label="Call +91 7044393332"
        >
          <Phone className="text-blue-600 w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="hidden xl:inline text-xs xl:text-sm font-semibold text-blue-700 whitespace-nowrap">
            Call Now
          </span>
        </a>
      </div>

      <div className="hidden lg:block">
        <JoinButton
          onClick={() => {
            const element = document.getElementById("democlass");
            if (element) {
              const yOffset = -80; // Adjust this value to control offset
              const y =
                element.getBoundingClientRect().top +
                window.pageYOffset +
                yOffset;
              window.scrollTo({ top: y, behavior: "smooth" });
            }
          }}
        />
      </div>
    </motion.header>
  );
}
