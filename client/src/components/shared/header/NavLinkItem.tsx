import { NavLink } from "react-router";

interface NavLinkItemProps {
  href: string;
  label: string;
  onClick?: () => void;
}

export default function NavLinkItem({
  href,
  label,
  onClick,
}: NavLinkItemProps) {
  return (
    <NavLink
      to={href}
      onClick={onClick}
      className="block whitespace-nowrap text-sm px-2 xl:px-4 py-4 text-gray-800 hover:text-gray-900 font-medium xl:text-md transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-black hover:after:w-3/4 after:transition-all after:duration-300"
    >
      {label}
    </NavLink>
  );
}
