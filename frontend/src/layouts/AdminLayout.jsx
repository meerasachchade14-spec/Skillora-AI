import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Toaster position="top-right" />
      <AdminSidebar />

      <div className="min-h-screen lg:ml-72 flex flex-col">
        <AdminNavbar />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="max-w-[1700px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
