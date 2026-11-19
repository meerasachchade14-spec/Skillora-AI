import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "../../components/dashboard/Sidebar";
import DashboardHome from "../../components/dashboard/DashboardHome";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="bg-slate-100 min-h-screen flex">

      {/* Mobile Hamburger */}
      <button
        className="md:hidden p-2 m-2 rounded-md bg-white shadow-md"
        onClick={toggleSidebar}
        aria-label="Toggle navigation"
      >
        <FaBars className="text-xl" />
      </button>

      {/* Sidebar - hidden on mobile unless opened */}
      <div className={`${sidebarOpen ? "block" : "hidden"} md:block`}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <DashboardHome />
      </main>

    </div>
  );
}

export default Dashboard;