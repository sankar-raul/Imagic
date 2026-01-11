/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavLink } from "react-router";
import AllCourcesModal from "./AllCourcesModal";
import { NavItems } from "../../../constants/nav/NavList";
import { useCallback, useState } from "react";

type navDisplayType = '-translate-y-full' | 'translate-y-0'

const Header = () => {
   const [ navDisplay, setNavDisplay ] = useState<navDisplayType>('-translate-y-full')
    const handleNavOpen = useCallback((): void => {
        setNavDisplay((prev: navDisplayType) => prev === '-translate-y-full' ? 'translate-y-0' : '-translate-y-full')
    }, [])
    const [ expandDetails, setExpandDetails ] = useState(false);

    const hanbdleExpand = useCallback((): void => {
        setExpandDetails((prev: boolean) => !prev)
    }, [])
  return (
    <header className="sticky top-0 mt-0 flex justify-between items-center pt-4 pb-2 px-8 gap-4 z-11">
      <div className="h-15">
        <img
          className="h-full object-contain"
          src="/images/logo.jpg"
          alt="Imagic"
        />
      </div>
      <div className="z-2">
        <button
          onClick={handleNavOpen}
          className="flex flex-col gap-1.5 lg:hidden relative w-8 h-6 justify-center"
        >
          <div className={`w-8 h-0.5 bg-muted-text/80 rounded-full absolute transition-all duration-300 ${navDisplay === 'translate-y-0' ? '-rotate-45' : 'top-0'}`}></div>
          <div className={`w-8 h-0.5 bg-muted-text/80 rounded-full transition-all duration-300 ${navDisplay === 'translate-y-0' ? 'opacity-0' : 'opacity-100'}`}></div>
          <div className={`w-8 h-0.5 bg-muted-text/80 rounded-full absolute transition-all duration-300 ${navDisplay === 'translate-y-0' ? 'rotate-45' : 'bottom-0'}`}></div>
        </button>
      </div>
      <div className={`grow font-semibold flex w-full justify-center flex-col lg:flex-row ${navDisplay} duration-150 fixed left-0 top-0 lg:static h-full lg:translate-y-0`}>
        <nav className="md:w-1/2 md:min-w-max md:max-w-250 font-normal w-full max-h-full overflow-x-auto scroll-smooth bg-white lg:bg-yellow-300 before:content-[''] before:absolute before:inset-0 before:border-2 before:border-white/10 before:rounded-full before:bg-white/10 shadow-nav px-2 lg:rounded-full relative before:blur-xs">
          <ul className="flex flex-col lg:flex-row md:gap-6 lg:gap-8 justify-evenly items-center my-16 lg:my-0">
            {NavItems.map(({ title, link, details }, index) => (
              <div className="h-full flex flex-col lg:items-center group w-full whitespace-nowrap px-0 md:px-8 lg:px-0 justify-center" key={index}>
                <div
                  key={index}
                  className="active:bg-neutral-50 w-full lg:bg-transparent border group flex items-end gap-0.5 border-transparent px-4 py-4 after:content-[''] after:absolute after:w-0 after:h-1 after:mb-4.5 after:bg-yellow-50 after:-bottom-2 after:cursor-pointer hover:after:w-[40%] after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-500 relative after:ease-out"
                >
                 { details ? <p className="grow flex justify-between" onClick={hanbdleExpand}>{ title }<span className="text-black/80 text-sm">&#x25BC;</span></p> : <NavLink to={link} className={({ isActive }) => isActive ? "after:w-4" : "" + " grow"}>
                    {title}
                  </NavLink> }
                </div>
                {title === "All Course" && (
                  <AllCourcesModal className={ expandDetails ? 'block opacity-100' : 'hidden' + " lg:group-hover:block group-hover:opacity-100 hover:block "} />
                )}
              </div>
            ))}
          </ul>
        </nav>
        <div onClick={handleNavOpen} className="bg-white/20 backdrop-blur-xs lg:hidden w-full grow"></div>
      </div>
    </header>
  );
};
export default Header;
