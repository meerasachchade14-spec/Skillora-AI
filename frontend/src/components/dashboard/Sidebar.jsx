import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import {
  FaRobot,
  FaHome,
  FaUpload,
  FaFileAlt,
  FaChartBar,
  FaGraduationCap,
  FaBriefcase,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaPenNib,
  FaChartLine,
} from "react-icons/fa";

const menuItems = [
  {
    name: "Dashboard",
    icon: <FaHome />,
    path: "/dashboard",
  },
  {
    name: "Resume Builder",
    icon: <FaPenNib />,
    path: "/resume-builder",
  },
  {
    name: "Resume Upload",
    icon: <FaUpload />,
    path: "/resume-upload",
  },
  {
    name: "Resume Analysis",
    icon: <FaFileAlt />,
    path: "/resume-analysis",
  },
  {
    name: "Skill Matcher",
    icon: <FaChartBar />,
    path: "/skill-matcher",
  },
  {
    name: "Learning Roadmap",
    icon: <FaGraduationCap />,
    path: "/roadmap",
  },
  {
    name: "Career Insights",
    icon: <FaChartLine />,
    path: "/career-insights",
  },
  {
    name: "Job Recommendations",
    icon: <FaBriefcase />,
    path: "/jobs",
  },
  {
    name: "Profile",
    icon: <FaUser />,
    path: "/profile",
  },
  {
    name: "Settings",
    icon: <FaCog />,
    path: "/settings",
  },
];

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-slate-200 shadow-sm z-30">

      {/* Logo */}

      <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-200">

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-white text-xl shadow-lg shadow-blue-500/20">

          <FaRobot />

        </div>

        <div>

          <h1 className="text-2xl font-extrabold text-slate-900">
            Skillora AI
          </h1>

          <p className="text-xs text-slate-500 font-medium">
            AI Career Intelligence
          </p>

        </div>

      </div>

      {/* Navigation */}

      <div className="mt-6 px-4 overflow-y-auto h-[calc(100vh-210px)] pb-6">

        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-5 mb-4">
          Workspace
        </p>

        {menuItems.map((item) => (

          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-2xl mb-2 transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >

            <span className="text-xl">
              {item.icon}
            </span>

            <span className="font-semibold text-sm">
              {item.name}
            </span>

          </NavLink>

        ))}

      </div>

      {/* Logout */}

      <div className="absolute bottom-6 left-0 w-full px-4">

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-red-50 hover:bg-red-100 text-red-600 py-4 rounded-2xl font-bold transition duration-300 cursor-pointer"
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;