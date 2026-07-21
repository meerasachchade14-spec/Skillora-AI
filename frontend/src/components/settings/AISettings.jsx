import { useState } from 'react';
import {
  FaRobot,
  FaBrain,
  FaFileAlt,
  FaChartLine,
  FaBullseye,
  FaBell,
  FaSlidersH,
  FaSave,
} from 'react-icons/fa';

function AISettings() {
  const [settings, setSettings] = useState({
    recommendations: true,
    resumeOptimization: true,
    careerInsights: true,
    skillGap: true,
    smartAlerts: false,
  });

  const [alertFrequency, setAlertFrequency] = useState('weekly');
  const [personalization, setPersonalization] = useState(80);

  const toggleSetting = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  const aiOptions = [
    {
      key: 'recommendations',
      icon: <FaBrain />,
      title: 'AI Recommendation Engine',
      description:
        'Enable AI-powered job and career recommendations.',
    },
    {
      key: 'resumeOptimization',
      icon: <FaFileAlt />,
      title: 'Resume Optimization',
      description:
        'Receive automatic resume improvement suggestions.',
    },
    {
      key: 'careerInsights',
      icon: <FaChartLine />,
      title: 'Career Insights',
      description:
        'Get personalized career growth predictions and insights.',
    },
    {
      key: 'skillGap',
      icon: <FaBullseye />,
      title: 'Skill Gap Analysis',
      description:
        'Allow AI to identify missing skills for target roles.',
    },
    {
      key: 'smartAlerts',
      icon: <FaBell />,
      title: 'Smart AI Alerts',
      description:
        'Receive alerts when your profile matches new opportunities.',
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-2xl">
          <FaRobot />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            AI Settings
          </h2>
          <p className="text-gray-500">
            Control how Skillora AI personalizes your experience.
          </p>
        </div>
      </div>

      {/* AI Toggles */}
      <div className="space-y-5">
        {aiOptions.map((item) => (
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
              onClick={() => toggleSetting(item.key)}
              className={`w-16 h-8 rounded-full transition ${
                settings[item.key] ? 'bg-sky-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white mt-1 transition-all ${
                  settings[item.key] ? 'ml-9' : 'ml-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Alert Frequency */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-semibold text-slate-700">
            AI Alert Frequency
          </label>

          <select
            value={alertFrequency}
            onChange={(e) => setAlertFrequency(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
          >
            <option value="realtime">Real-time</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        {/* Personalization */}
        <div>
          <label className="block mb-2 font-semibold text-slate-700">
            Personalization Level
          </label>

          <div className="flex items-center gap-4">
            <FaSlidersH className="text-sky-600 text-xl" />

            <input
              type="range"
              min="0"
              max="100"
              value={personalization}
              onChange={(e) => setPersonalization(e.target.value)}
              className="w-full accent-sky-500"
            />

            <span className="font-bold text-sky-600 w-12">
              {personalization}%
            </span>
          </div>
        </div>
      </div>

      {/* AI Summary */}
      <div className="mt-8 bg-sky-50 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-3">
          AI Personalization Summary
        </h3>

        <p className="text-gray-600 leading-7">
          Your AI engine is configured for <strong>{alertFrequency}</strong> alerts with
          <strong> {personalization}% personalization</strong>.
          Skillora AI will use your resume, skills, projects, and job activity
          to generate highly relevant recommendations and insights.
        </p>
      </div>

      {/* Save */}
      <div className="flex justify-end mt-8">
        <button className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:scale-105 transition">
          <FaSave />
          Save AI Preferences
        </button>
      </div>
    </div>
  );
}

export default AISettings;