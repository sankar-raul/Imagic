import { createPortal } from "react-dom";
import { Link, NavLink } from "react-router";
import { NavMenuItem } from "@/types";
import HamburgerButton from "./HamburgerButton";

interface MobileNavProps {
  isOpen: boolean;
  menuItems: NavMenuItem[];
  expandDetails: boolean;
  onToggle: () => void;
  onExpandToggle: () => void;
  onClose: () => void;
}

export default function MobileNav({
  isOpen,
  menuItems,
  expandDetails,
  onToggle,
  onExpandToggle,
  onClose,
}: MobileNavProps) {
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
                      expandDetails ? "max-h-[600px]" : "max-h-0"
                    }`}
                  >
                    <div className="pl-4 pt-2 space-y-3">
                      {item.items?.map((category, catIndex) => (
                        <div key={catIndex} className="space-y-2">
                          <h3 className="font-semibold text-sm text-gray-700 px-2">
                            {category.label}
                          </h3>
                          {category.items.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={subItem.href}
                              onClick={onClose}
                              className="block px-4 py-2 text-sm text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                            >
                              {subItem.label}
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
      </nav>
    </div>,
    document.getElementById("portals") as HTMLElement
  );
}
