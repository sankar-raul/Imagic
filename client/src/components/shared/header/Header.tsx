import { useState, useCallback, useEffect } from "react";
import _ from "lodash";
import { motion } from "framer-motion";
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
      className={`sticky top-0 flex justify-between min-w-full lg:min-w-max lg:w-max lg:mx-auto items-center will-change-auto py-3 px-6 md:px-12 lg:px-16 gap-4 z-50 shadow-sm ${
        !isScrolled
          ? "lg:bg-white/80 lg:backdrop-blur-2xl lg:rounded-full lg:translate-y-2"
          : ""
      } bg-white`}
    >
      <Logo src={navData.logo} alt={navData.logoAlt} />

      <div className="z-200 lg:hidden">
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

      <JoinButton />
    </motion.header>
  );
}
