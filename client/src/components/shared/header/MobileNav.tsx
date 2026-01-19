import { createPortal } from "react-dom";
import { Link, NavLink } from "react-router";
import { NavMenuItem } from "@/types";
import HamburgerButton from "./HamburgerButton";
import { ICourseItems } from "@/types/courseItems.interface";
import { useMemo } from "react";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface MobileNavProps {
  isOpen: boolean;
  menuItems: NavMenuItem[];
  expandDetails: boolean;
  onToggle: () => void;
  onExpandToggle: () => void;
  onClose: () => void;
  courseItems?: ICourseItems;
}

export default function MobileNav({
  isOpen,
  menuItems,
  expandDetails,
  onToggle,
  onExpandToggle,
  onClose,
  courseItems,
}: MobileNavProps) {
  const courseTitles = useMemo(
    () => (courseItems ? Object.keys(courseItems) : []),
    [courseItems],
  );

  return createPortal(
    <div
      className={`${
        isOpen ? "translate-y-0" : "-translate-y-full"
      } max-h-dvh flex-col lg:hidden duration-300 fixed left-0 top-0 h-full w-full z-50`}
    >
      {/* Mobile Backdrop */}
      <div
        onClick={onToggle}
        className="bg-black/30 backdrop-blur-sm absolute inset-0"
      ></div>

      <nav className="w-full bg-white overflow-y-auto max-h-full rounded-none px-6 py-8 relative h-max">
        <div className="flex flex-col bg-white z-6 p-6 sticky top-0 ml-auto">
          <HamburgerButton isOpen={isOpen} onClick={onToggle} />
        </div>

        <ul className="flex flex-col gap-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.type === "link" ? (
                <NavLink
                  to={item.href || "/"}
                  onClick={onClose}
                  className="block whitespace-nowrap px-4 py-3 text-gray-800 hover:text-gray-900 font-medium text-base transition-colors"
                >
                  {item.label}
                </NavLink>
              ) : (
                <>
                  <button
                    onClick={onExpandToggle}
                    className="w-full group/navbutton flex items-center justify-between px-4 py-3 text-gray-800 hover:text-gray-900 font-medium text-base transition-colors"
                  >
                    {item.label}
                    <span className="ml-1 text-xs transition-transform duration-300 inline-block origin-center group-hover/navbutton:rotate-180">
                      ▼
                    </span>
                  </button>

                  {/* Mobile Dropdown */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      expandDetails ? "max-h-150" : "max-h-0"
                    }`}
                  >
                    <div className="pl-4 pt-2 space-y-3">
                      {courseTitles?.map((title: string, catIndex) => (
                        <div key={catIndex} className="space-y-2">
                          <h3 className="font-semibold text-sm text-gray-700 px-2">
                            {title}
                          </h3>
                          {courseItems?.[title]?.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={`course/${subItem.slug}`}
                              onClick={onClose}
                              className="block px-4 py-2 text-sm text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                            >
                              {subItem.title}
                            </Link>
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

        {/* Contact Buttons at Bottom */}
        <div className="mt-6 pt-6 border-t border-gray-200 px-4">
          <p className="text-xs text-gray-500 mb-3 font-medium">Get in Touch</p>
          <div className="flex flex-col gap-3">
            <a
              href="https://wa.me/917044393332"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-50 hover:bg-green-100 transition-all duration-300 border border-green-200"
            >
              <FaWhatsapp className="text-green-600 text-2xl" />
              <div className="flex flex-col">
                <span className="text-xs text-green-600 font-medium">
                  WhatsApp
                </span>
                <span className="text-sm font-bold text-green-700">
                  +91 7044393332
                </span>
              </div>
            </a>
            <a
              href="tel:+917044393332"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-300 border border-blue-200"
            >
              <Phone className="text-blue-600 w-5 h-5" />
              <div className="flex flex-col">
                <span className="text-xs text-blue-600 font-medium">
                  Call Now
                </span>
                <span className="text-sm font-bold text-blue-700">
                  +91 7044393332
                </span>
              </div>
            </a>
          </div>
        </div>
      </nav>
    </div>,
    document.getElementById("portals") as HTMLElement,
  );
}
