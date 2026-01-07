import { Outlet } from "react-router";
import Header from "../../shared/header/Header";
import Footer from "../../shared/footer/Footer";

const RootLayout = () => {
    
    return (
        <section className="bg-yellow-50/5 text-text-primary h-full">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </section>
    )
}
export default RootLayout;