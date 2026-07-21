import Sidebar from "../../components/dashboard/Sidebar";
import DashboardHome from "../../components/dashboard/DashboardHome";

function Dashboard() {
  return (
    <div className="bg-slate-100 min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-72 flex-1">
        <DashboardHome />
      </main>

    </div>
  );
}

export default Dashboard;