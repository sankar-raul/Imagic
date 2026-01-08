/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavLink } from "react-router";
import AllCourcesModal from "./AllCourcesModal";
import { NavItems } from "../../../constants/nav/NavList";


const Header = () => {
  return (
    <header className="sticky top-0 mt-0 flex justify-between items-center pt-4 pb-2 px-8 gap-4 z-11">
      <div className="h-15">
        <img
          className="h-full object-contain"
          src="https://imagic.net.in/wp-content/uploads/2024/03/logo.jpg"
          alt="Imagic"
        />
      </div>
      <div className="grow font-semibold flex justify-center">
        <nav className="md:w-1/2 md:min-w-max md:max-w-250 font-normal bg-yellow-300 before:content-[''] before:absolute before:inset-0 before:border-2 before:border-white/10 before:rounded-full before:bg-white/10 shadow-nav px-2 rounded-full relative before:blur-xs">
          <ul className="flex mx-4 md:gap-6 lg:gap-8 justify-evenly items-center">
            {NavItems.map(({ title, link, details }, index) => (
              <div className="h-full flex items-center group" key={index}>
                <NavLink
                  key={index}
                  className={({ isActive }) => {
                    return (
                      `border group flex items-end gap-0.5 border-transparent px-4 py-4 after:content-[''] after:absolute after:w-0 after:h-1 after:mb-4.5 after:bg-yellow-50 after:-bottom-2 after:cursor-pointer hover:after:w-[40%] after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-500 relative after:ease-out ` +
                      (isActive ? "after:w-4" : "")
                    );
                  }}
                  to={link}
                >
                  {title} {details && <span className="text-black/80 text-sm">&#x25BC;</span>}
                </NavLink>
                {title === "All Course" && (
                  <AllCourcesModal className="group-hover:block group-hover:opacity-100 hover:block" />
                )}
              </div>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
