import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  LayoutDashboard,
  Users,
  FileText,
  Briefcase,
  Brain,
  BookOpen,
  Bug,
  LineChart,
  Settings,
  LogOut,
  ShieldAlert
} from "lucide-react";

const menuItems = [
  {
    name: "Overview",
    icon: <LayoutDashboard className="w-5 h-5" />,
    path: "/admin/dashboard",
  },
  {
    name: "User Management",
    icon: <Users className="w-5 h-5" />,
    path: "/admin/users",
  },
  {
    name: "Resume Management",
    icon: <FileText className="w-5 h-5" />,
    path: "/admin/resumes",
  },
  {
    name: "Job Management",
    icon: <Briefcase className="w-5 h-5" />,
    path: "/admin/jobs",
  },
  {
    name: "Skills Management",
    icon: <Brain className="w-5 h-5" />,
    path: "/admin/skills",
  },
  {
    name: "Learning Resources",
    icon: <BookOpen className="w-5 h-5" />,
    path: "/admin/resources",
  },
  {
    name: "Bug Reports",
    icon: <Bug className="w-5 h-5" />,
    path: "/admin/bugs",
  },
  {
    name: "AI Analytics",
    icon: <LineChart className="w-5 h-5" />,
    path: "/admin/analytics",
  },
  {
    name: "Admin Settings",
    icon: <Settings className="w-5 h-5" />,
    path: "/admin/settings",
  },
];

function AdminSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-slate-200 shadow-sm z-30 flex flex-col justify-between">
      {/* Brand Logo & Admin badge */}
      <div>
        <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-200">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-1.5 leading-none">
              Skillora AI <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-black uppercase tracking-wider">Admin</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-medium mt-1">
              Management Suite
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mt-6 px-4 overflow-y-auto h-[calc(100vh-220px)] pb-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-4">
            System Control
          </p>
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3.5 rounded-2xl mb-1.5 transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-semibold"
                }`
              }
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Logout button */}
      <div className="p-4 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2.5 bg-red-50 hover:bg-red-100 text-red-600 py-3.5 rounded-2xl font-bold transition duration-300 cursor-pointer text-sm shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          Logout Panel
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
