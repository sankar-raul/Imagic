import { Outlet } from "react-router";
import Header from "../../shared/header/Header";
import Footer from "../../shared/footer/Footer";

const RootLayout = () => {
    
    return (
        <section className="bg-black text-white h-full">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </section>
    )
}
export default RootLayout;