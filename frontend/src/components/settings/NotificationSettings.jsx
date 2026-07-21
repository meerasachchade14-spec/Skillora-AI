import { useState } from "react";
import {
  FaBell,
  FaEnvelope,
  FaMobileAlt,
  FaBriefcase,
  FaRobot,
  FaChartBar,
  FaBullhorn,
} from "react-icons/fa";

function NotificationSettings() {
  const [settings, setSettings] = useState({
    email: true,
    push: true,
    jobs: true,
    ai: true,
    reports: false,
    marketing: false,
  });

  const toggleSetting = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  const notificationItems = [
    {
      key: "email",
      icon: <FaEnvelope />,
      title: "Email Notifications",
      description: "Receive important updates through email.",
    },
    {
      key: "push",
      icon: <FaMobileAlt />,
      title: "Push Notifications",
      description: "Get instant notifications on your device.",
    },
    {
      key: "jobs",
      icon: <FaBriefcase />,
      title: "Job Alerts",
      description: "Receive recommended job opportunities.",
    },
    {
      key: "ai",
      icon: <FaRobot />,
      title: "AI Recommendations",
      description: "Get AI-powered resume and career suggestions.",
    },
    {
      key: "reports",
      icon: <FaChartBar />,
      title: "Weekly Reports",
      description: "Receive your weekly progress report.",
    },
    {
      key: "marketing",
      icon: <FaBullhorn />,
      title: "Marketing Emails",
      description: "Receive offers, news and feature updates.",
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-2xl">

          <FaBell />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Notification Settings
          </h2>

          <p className="text-gray-500">
            Manage how Skillora AI keeps you informed.
          </p>

        </div>

      </div>

      {/* Notification Options */}

      <div className="space-y-5">

        {notificationItems.map((item) => (

          <div
            key={item.key}
            className="flex items-center justify-between p-5 rounded-2xl border hover:border-sky-400 transition"
          >

            <div className="flex items-center gap-5">

              <div className="w-14 h-14 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center text-2xl">

                {item.icon}

              </div>

              <div>

                <h3 className="font-bold text-lg text-slate-800">
                  {item.title}
                </h3>

                <p className="text-gray-500">
                  {item.description}
                </p>

              </div>

            </div>

            {/* Toggle */}

            <button
              onClick={() => toggleSetting(item.key)}
              className={`w-16 h-8 rounded-full transition duration-300 ${
                settings[item.key]
                  ? "bg-sky-500"
                  : "bg-gray-300"
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full mt-1 transition-all duration-300 ${
                  settings[item.key]
                    ? "ml-9"
                    : "ml-1"
                }`}
              />
            </button>

          </div>

        ))}

      </div>

      {/* Footer */}

      <div className="mt-8 bg-sky-50 rounded-2xl p-5">

        <h3 className="font-bold text-slate-800 mb-2">
          Notification Summary
        </h3>

        <p className="text-gray-600">
          Customize which alerts you receive to stay updated with
          job recommendations, AI insights, resume analysis,
          and Skillora AI announcements.
        </p>

      </div>

    </div>
  );
}

export default NotificationSettings;