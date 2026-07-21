import {
  FaUserCog,
  FaLock,
  FaBell,
  FaShieldAlt,
  FaPalette,
  FaLanguage,
  FaRobot,
  FaLink,
  FaDatabase,
  FaQuestionCircle,
  FaInfoCircle,
} from "react-icons/fa";

const menuItems = [
  {
    icon: <FaUserCog />,
    title: "Account Settings",
  },
  {
    icon: <FaLock />,
    title: "Change Password",
  },
  {
    icon: <FaBell />,
    title: "Notifications",
  },
  {
    icon: <FaShieldAlt />,
    title: "Privacy",
  },
  {
    icon: <FaPalette />,
    title: "Theme",
  },
  {
    icon: <FaLanguage />,
    title: "Language",
  },
  {
    icon: <FaRobot />,
    title: "AI Preferences",
  },
  {
    icon: <FaLink />,
    title: "Connected Accounts",
  },
  {
    icon: <FaDatabase />,
    title: "Data Management",
  },
  {
    icon: <FaQuestionCircle />,
    title: "Help & Support",
  },
  {
    icon: <FaInfoCircle />,
    title: "About Skillora",
  },
];

function SettingsSidebar() {
  return (
    <aside className="bg-white rounded-3xl shadow-xl p-6 sticky top-6">

      {/* Title */}

      <h2 className="text-2xl font-bold text-slate-800 mb-8">
        Settings Menu
      </h2>

      {/* Menu */}

      <div className="space-y-3">

        {menuItems.map((item, index) => (

          <button
            key={index}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 text-left
              ${
                index === 0
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg"
                  : "bg-slate-50 text-slate-700 hover:bg-sky-50 hover:text-sky-600"
              }`}
          >

            <span className="text-xl">
              {item.icon}
            </span>

            <span className="font-medium">
              {item.title}
            </span>

          </button>

        ))}

      </div>

      {/* Footer */}

      <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white">

        <h3 className="font-bold text-lg">
          Skillora AI
        </h3>

        <p className="text-sm mt-2 opacity-90">
          Manage your account, security, privacy, and AI preferences all in one place.
        </p>

      </div>

    </aside>
  );
}

export default SettingsSidebar;