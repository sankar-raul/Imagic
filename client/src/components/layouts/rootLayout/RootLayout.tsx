import Footer from "../../Footer";
import { Outlet } from "react-router";
import Topbar from "../../ui/navbar/Topbar";
import Header from "@/components/shared/header/Header";
import { Footerdemo } from "@/components/ui/footer-section";

function RootLayout() {
  return (
    <>
      {/* <Topbar /> */}
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default RootLayout;
