import { NavMenuItem } from "@/types";
import NavLinkItem from "./NavLinkItem";
import DropdownButton from "./DropdownButton";
import DropdownMenu from "./DropdownMenu";

interface DesktopNavProps {
  menuItems: NavMenuItem[];
  onLinkClick?: () => void;
}

export default function DesktopNav({ menuItems, onLinkClick }: DesktopNavProps) {
  return (
    <nav className="hidden lg:block flex-1">
      <ul className="flex flex-row items-center gap-8 justify-center">
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
                <DropdownMenu items={item.items} onLinkClick={onLinkClick} />
              </>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
