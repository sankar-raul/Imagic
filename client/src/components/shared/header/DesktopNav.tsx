import { NavMenuItem } from "@/types";
import NavLinkItem from "./NavLinkItem";
import DropdownButton from "./DropdownButton";
import DropdownMenu from "./DropdownMenu";
import { ICourseItems } from "@/types/courseItems.interface";

interface DesktopNavProps {
  menuItems: NavMenuItem[];
  onLinkClick?: () => void;
  courseItems?: ICourseItems;
}

export default function DesktopNav({
  menuItems,
  onLinkClick,
  courseItems,
}: DesktopNavProps) {
  return (
    <nav className="hidden lg:block flex-1">
      <ul className="flex flex-row items-center gap-0 xl:gap-4 justify-center">
        {menuItems.map((item, index) => (
          <li className="relative group" key={index}>
            {item.type === "link" ? (
              <NavLinkItem
                href={item.href || "/"}
                label={item.label}
                onClick={onLinkClick}
              />
            ) : (
              <>
                <DropdownButton label={item.label} />
                <DropdownMenu
                  items={item.items}
                  onLinkClick={onLinkClick}
                  courseItems={courseItems}
                />
              </>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
