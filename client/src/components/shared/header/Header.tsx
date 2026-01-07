/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { NavLink } from "react-router";

const NavItems = [
    { title: "Home", link: "/" },
    { title: "All Course", link: "/courses" },
    { title: "Placements", link: "/placements" },
    { title: "Job Vacancies", link: "/vacancies" },
    { title: "Blogs", link: "/blogs" },
    { title: "Contact", link: "/contact" },
];

const Header = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isTransitioning, setIsTransitioning ] = useState(false);
    const [ loaderWidth, setLoaderWidth ] = useState(100);
    
    const animateLoader = () => {
        if(isLoading) {
            setLoaderWidth(30);
            setTimeout(() => {
                setLoaderWidth(60);
            }, 500);
        } else if(isTransitioning) {
            setLoaderWidth(90);
        } else {
            setLoaderWidth(100);
            setTimeout(() => {
                setLoaderWidth(0);
            }, 300);
        }
    }
    return (
        <header className="flex relative justify-between items-center pt-4 pb-2 px-8 gap-4">
            <div className="absolute top-0 left-0 w-full pointer-events-none">
                <div style={{'--width': loaderWidth+"%"} as React.CSSProperties} className={`h-1.5 w-(--width) bg-brand transition-all duration-300 ease-out`}>
                </div>
            </div>
            <div className="h-15">
                <img className="h-full" src="https://imagic.net.in/wp-content/uploads/2024/03/logo.jpg" alt="Imagic" />
            </div>
            <div className="grow font-semibold flex justify-center">
                <nav className="md:w-1/2 md:min-w-max md:max-w-250 font-normal bg-yellow-300 before:content-[''] before:absolute before:inset-0 before:border-2 before:border-white/10 before:rounded-full before:bg-white/10 shadow-nav px-2 py-2 rounded-full sticky top-0 before:blur-xs">
                    <ul className="flex md:gap-6 lg:gap-8 justify-evenly items-center">
                        {NavItems.map(({title, link}, index) => (
                            <NavLink key={index} className={({isActive, isPending, isTransitioning}) => {
                                setIsLoading(isPending);
                                setIsTransitioning(isTransitioning);
                                animateLoader();
                                return `border border-transparent px-4 py-2 after:content-[''] after:absolute after:w-0 after:h-1 after:mb-2.5 after:bg-yellow-50 after:-bottom-2 after:cursor-pointer  hover:after:w-[40%] after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-500 relative after:ease-out ` + (isActive ? "after:w-4" : "");
                            }} to={link}>{title}</NavLink>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    )
}
export default Header;