import { useState } from "react";
import {
  FaShieldAlt,
  FaUserSecret,
  FaFileAlt,
  FaChartPie,
  FaRobot,
  FaTrashAlt,
} from "react-icons/fa";

function PrivacySettings() {
  const [privacy, setPrivacy] = useState({
    profile: true,
    resume: false,
    analytics: true,
    aiData: true,
    search: false,
  });

  const toggle = (key) => {
    setPrivacy({
      ...privacy,
      [key]: !privacy[key],
    });
  };

  const options = [
    {
      key: "profile",
      icon: <FaUserSecret />,
      title: "Public Profile",
      description:
        "Allow recruiters and employers to view your profile.",
    },
    {
      key: "resume",
      icon: <FaFileAlt />,
      title: "Resume Visibility",
      description:
        "Allow your resume to appear in recruiter searches.",
    },
    {
      key: "analytics",
      icon: <FaChartPie />,
      title: "Usage Analytics",
      description:
        "Share anonymous usage data to improve Skillora AI.",
    },
    {
      key: "aiData",
      icon: <FaRobot />,
      title: "AI Data Usage",
      description:
        "Allow AI to personalize recommendations using your profile.",
    },
    {
      key: "search",
      icon: <FaShieldAlt />,
      title: "Search Engine Indexing",
      description:
        "Allow search engines to index your public profile.",
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-2xl">

          <FaShieldAlt />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Privacy Settings
          </h2>

          <p className="text-gray-500">
            Manage your privacy preferences and account visibility.
          </p>

        </div>

      </div>

      {/* Options */}

      <div className="space-y-5">

        {options.map((item) => (

          <div
            key={item.key}
            className="flex items-center justify-between border rounded-2xl p-5 hover:border-sky-400 transition"
          >

            <div className="flex items-center gap-5">

              <div className="w-14 h-14 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center text-2xl">

                {item.icon}

              </div>

              <div>

                <h3 className="text-lg font-bold text-slate-800">
                  {item.title}
                </h3>

                <p className="text-gray-500">
                  {item.description}
                </p>

              </div>

            </div>

            <button
              onClick={() => toggle(item.key)}
              className={`w-16 h-8 rounded-full transition ${
                privacy[item.key]
                  ? "bg-sky-500"
                  : "bg-gray-300"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white mt-1 transition-all ${
                  privacy[item.key]
                    ? "ml-9"
                    : "ml-1"
                }`}
              />
            </button>

          </div>

        ))}

      </div>

      {/* Danger Zone */}

      <div className="mt-10 border border-red-300 bg-red-50 rounded-3xl p-6">

        <div className="flex items-center gap-3 mb-4">

          <FaTrashAlt className="text-red-600 text-2xl" />

          <h3 className="text-2xl font-bold text-red-600">
            Danger Zone
          </h3>

        </div>

        <p className="text-gray-600 leading-7 mb-6">
          Deleting your account is permanent. All resumes, analyses,
          applications, and profile data will be removed permanently.
        </p>

        <button className="px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition">

          Delete My Account

        </button>

      </div>

    </div>
  );
}

export default PrivacySettings;