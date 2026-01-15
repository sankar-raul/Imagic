import { Link } from "react-router";
import { NavMenuItem } from "@/types";
import { ICourseItems } from "@/types/courseItems.interface";
import { useMemo } from "react";

interface DropdownMenuProps {
  items?: NavMenuItem["items"];
  onLinkClick?: () => void;
  courseItems?: ICourseItems;
}

export default function DropdownMenu({
  items,
  onLinkClick,
  courseItems,
}: DropdownMenuProps) {
  if (!items) return null;
  const courseData = useMemo(
    () => (courseItems ? Object.keys(courseItems) : []),
    [courseItems]
  );

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white backdrop-blur-xl shadow-xl rounded-3xl p-6 w-[650px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100">
      <div className="grid grid-cols-2 gap-6">
        {courseData.map((title: string, index) => (
          <div key={index} className="space-y-3">
            <h3 className="font-bold text-sm text-gray-800 pb-2 border-b-2 border-black/10">
              {title} Courses
            </h3>
            {courseItems?.[title].map((subItem, subIndex) => (
              <Link
                key={subIndex}
                to={`course/${subItem.slug}`}
                onClick={onLinkClick}
                className="block px-3 py-2.5 text-sm text-gray-700 hover:text-black hover:bg-black/5 rounded-xl transition-all"
              >
                {subItem.title}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
