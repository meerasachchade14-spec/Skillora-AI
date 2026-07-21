import { useState } from "react";
import {
  FaPalette,
  FaSun,
  FaMoon,
  FaDesktop,
  FaCheckCircle,
} from "react-icons/fa";

function ThemeSettings() {
  const [theme, setTheme] = useState("light");
  const [accent, setAccent] = useState("blue");

  const themes = [
    {
      id: "light",
      title: "Light",
      icon: <FaSun />,
    },
    {
      id: "dark",
      title: "Dark",
      icon: <FaMoon />,
    },
    {
      id: "system",
      title: "System",
      icon: <FaDesktop />,
    },
  ];

  const colors = [
    {
      id: "blue",
      class: "bg-blue-500",
    },
    {
      id: "green",
      class: "bg-green-500",
    },
    {
      id: "purple",
      class: "bg-purple-500",
    },
    {
      id: "orange",
      class: "bg-orange-500",
    },
    {
      id: "red",
      class: "bg-red-500",
    },
    {
      id: "pink",
      class: "bg-pink-500",
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-2xl">

          <FaPalette />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Theme Settings
          </h2>

          <p className="text-gray-500">
            Customize the appearance of Skillora AI.
          </p>

        </div>

      </div>

      {/* Theme Selection */}

      <h3 className="text-xl font-semibold text-slate-800 mb-5">
        Choose Theme
      </h3>

      <div className="grid md:grid-cols-3 gap-6">

        {themes.map((item) => (

          <button
            key={item.id}
            onClick={() => setTheme(item.id)}
            className={`border-2 rounded-2xl p-6 transition ${
              theme === item.id
                ? "border-sky-500 bg-sky-50"
                : "border-gray-200 hover:border-sky-300"
            }`}
          >

            <div className="text-4xl text-sky-600 flex justify-center mb-4">

              {item.icon}

            </div>

            <h4 className="font-bold text-lg">
              {item.title}
            </h4>

            {theme === item.id && (
              <FaCheckCircle className="mx-auto mt-4 text-green-500 text-xl" />
            )}

          </button>

        ))}

      </div>

      {/* Accent Colors */}

      <h3 className="text-xl font-semibold text-slate-800 mt-10 mb-5">
        Accent Color
      </h3>

      <div className="flex flex-wrap gap-5">

        {colors.map((color) => (

          <button
            key={color.id}
            onClick={() => setAccent(color.id)}
            className={`w-14 h-14 rounded-full ${color.class} border-4 transition ${
              accent === color.id
                ? "border-slate-800 scale-110"
                : "border-white"
            }`}
          />

        ))}

      </div>

      {/* Preview */}

      <div className="mt-10">

        <h3 className="text-xl font-semibold mb-5 text-slate-800">
          Preview
        </h3>

        <div className="rounded-3xl border bg-slate-50 p-8">

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="h-5 bg-sky-500 rounded w-44 mb-5" />

            <div className="space-y-3">

              <div className="h-4 bg-gray-300 rounded w-full" />

              <div className="h-4 bg-gray-300 rounded w-3/4" />

              <div className="h-4 bg-gray-300 rounded w-1/2" />

            </div>

            <button className="mt-8 px-6 py-3 rounded-xl bg-sky-500 text-white">
              Sample Button
            </button>

          </div>

        </div>

      </div>

      {/* Save */}

      <div className="flex justify-end mt-10">

        <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:scale-105 transition">

          Save Appearance

        </button>

      </div>

    </div>
  );
}

export default ThemeSettings;