import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import Sidebar from "../components/dashboard/Sidebar";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      <Sidebar />

      <div className="min-h-screen lg:ml-72 flex flex-col">

        <DashboardNavbar />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="max-w-[1700px] mx-auto">
            <Outlet />
          </div>
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;