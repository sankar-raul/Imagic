import { useState } from "react";
import { Link, useLocation } from "react-router";
import { FaChevronDown } from "react-icons/fa";
import { IoGridSharp } from "react-icons/io5"

interface MenuItem {
  label: string;
  path?: string;
  isActive?: boolean;
  submenu?: SubMenuItem[];
}

interface SubMenuItem {
  label: string;
  path: string;
}
function Sidebar() {
    const location = useLocation();
    const [openMenus, setOpenMenus] = useState<{ [key: number]: boolean }>({});

    const menuItems: MenuItem[] = [
    {  label: 'Course', submenu: [
        { label: 'All Courses', path: '/dashboard/course' },
        { label: 'Add New Course', path: '/dashboard/course/add' },
      ]},
    {  label: 'Testimonial', submenu: [
        { label: 'All Testimonial', path: '/dashboard/testimonial' },
        { label: 'Add New Testimonial', path: '/dashboard/testimonial/add' },
      ] },
    {  label: 'Demo class', path: '/dashboard/demo-class' },
    {  label: 'Placement', submenu: [
        { label: 'All Placements', path: '/dashboard/placement' },
        { label: 'Add New Placement', path: '/dashboard/placement/add' },
      ]},
    {  label: 'Blog', submenu: [
        { label: 'All Blogs', path: '/dashboard/blog' },
        { label: 'Add New Blog', path: '/dashboard/blog/add' },
      ]},
    {  label: 'News & Events', path: '/dashboard/news-events' , submenu: [
        { label: 'All News & Events', path: '/dashboard/news-events' },
        { label: 'Add New News & Event', path: '/dashboard/news-events/add' },
      ]
    },
    {  label: 'Student Work', submenu: [
        { label: 'All Student Works', path: '/dashboard/student-work' },
        { label: 'Add New Student Work', path: '/dashboard/student-work/add' },
      ]},
    {  label: 'Job Vacancy', submenu: [
        { label: 'All Job Vacancies', path: '/dashboard/job-vacancy' },
        { label: 'Add New Job Vacancy', path: '/dashboard/job-vacancy/add' },
      ]},
  ];

  const toggleSubmenu = (index: number) => {
    setOpenMenus(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const isPathActive = (path?: string, submenu?: SubMenuItem[]) => {
    if (path) {
      return location.pathname === path;
    }
    if (submenu) {
      return submenu.some(item => location.pathname === item.path);
    }
    return false;
  };
  return (
    <div className="w-64 min-h-screen border-r border-gray-300 shadow-md overflow-y-scroll ">
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
         
          <span className="text-xl font-semibold text-gray-900 flex gap-4 items-center"><IoGridSharp />Dashbord</span>
          
        </div>
        <div className="flex-col px-4">
            {menuItems.map((item, index) => {
              const isActive = isPathActive(item.path, item.submenu);
              const isSubmenuOpen = openMenus[index] || false;

              return (
                <div key={index}>
                  {item.path ? (
                    <Link
                      to={item.path}
                      className={`flex items-center justify-between gap-4 p-3 rounded-lg mb-2 cursor-pointer select-none` +
                        (isActive ? ' bg-blue-400/10 text-blue-400' : ' text-gray-700 hover:bg-blue-400/5')}
                    >
                      <span className="font-normal">{item.label}</span>
                    </Link>
                  ) : (
                    <div
                      className={`flex items-center justify-between gap-4 p-3 rounded-lg mb-2 cursor-pointer select-none` +
                        (isActive ? ' bg-blue-400/10 text-blue-400' : ' text-gray-700 hover:bg-blue-400/5')}
                      onClick={() => toggleSubmenu(index)}
                    >
                      <span className="font-normal">{item.label}</span>
                      {item.submenu && (
                        <FaChevronDown
                          size={16}
                          className={`text-gray-400 transition-transform ${
                            isSubmenuOpen ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </div>
                  )}
                  {item.submenu && isSubmenuOpen && (
                    <div className="ml-6">
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className={`block p-2 rounded-lg cursor-pointer ` +
                            (location.pathname === subItem.path 
                              ? 'bg-blue-400/10 text-blue-400 font-medium' 
                              : 'text-gray-500 hover:bg-gray-100')}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>


    </div>
  )
}

export default Sidebar