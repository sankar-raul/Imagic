import { Outlet } from "react-router";
import Header from "../../shared/header/Header";
import Footer from "../../shared/footer/Footer";

const RootLayout = () => {
    
    return (
        <section className="bg-linear-10 from-yellow-50 via-yellow-100 via-100% to-transparent scroll-smooth text-text-primary h-dvh overflow-y-scroll flex flex-col [&::-webkit-scrollbar]:hidden">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </section>
    )
}
export default RootLayout;