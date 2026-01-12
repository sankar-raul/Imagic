import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="h-100vh max-h-dvh flex">
      <Sidebar />
      <div className="content overflow-y-auto grow">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
