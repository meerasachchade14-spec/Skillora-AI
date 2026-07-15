import { NavLink } from "react-router-dom";
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
  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-slate-200 shadow-lg">

      {/* Logo */}
      <div className="h-20 flex items-center gap-3 px-6 border-b">

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-xl">
          <FaRobot />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Skillora AI
          </h1>

          <p className="text-xs text-slate-500">
            Career Platform
          </p>
        </div>

      </div>

      {/* Menu */}
      <div className="mt-6 px-4">

        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-2xl mb-3 transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg"
                  : "text-slate-600 hover:bg-sky-50 hover:text-blue-600"
              }`
            }
          >
            <span className="text-xl">
              {item.icon}
            </span>

            <span className="font-medium">
              {item.name}
            </span>
          </NavLink>
        ))}

      </div>

      {/* Bottom */}
      <div className="absolute bottom-6 left-0 w-full px-4">

        <button className="w-full flex items-center justify-center gap-3 bg-red-50 hover:bg-red-100 text-red-600 py-4 rounded-2xl font-semibold transition">

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;