import { Link } from "react-router";
import { NavMenuItem } from "@/types";

interface DropdownMenuProps {
  items?: NavMenuItem["items"];
  onLinkClick?: () => void;
}

export default function DropdownMenu({ items, onLinkClick }: DropdownMenuProps) {
  if (!items) return null;

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl p-6 w-[650px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100">
      <div className="grid grid-cols-2 gap-6">
        {items.map((category, catIndex) => (
          <div key={catIndex} className="space-y-3">
            <h3 className="font-bold text-sm text-gray-800 pb-2 border-b-2 border-black/10">
              {category.label}
            </h3>
            {category.items.map((subItem, subIndex) => (
              <Link
                key={subIndex}
                to={subItem.href}
                onClick={onLinkClick}
                className="block px-3 py-2.5 text-sm text-gray-700 hover:text-black hover:bg-black/5 rounded-xl transition-all"
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
