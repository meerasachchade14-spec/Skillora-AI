import { useState } from 'react';
import {
  FaLanguage,
  FaGlobe,
  FaClock,
  FaCalendarAlt,
  FaCheckCircle,
} from 'react-icons/fa';

function LanguageSettings() {
  const [language, setLanguage] = useState('en');
  const [region, setRegion] = useState('IN');
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-2xl">
          <FaLanguage />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Language & Region
          </h2>
          <p className="text-gray-500">
            Configure your preferred language, region and time settings.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Application Language */}
        <div>
          <label className="block mb-2 font-semibold text-slate-700">
            Application Language
          </label>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="gu">Gujarati</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>

        {/* Region */}
        <div>
          <label className="block mb-2 font-semibold text-slate-700">
            Region
          </label>

          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
          >
            <option value="IN">India</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
          </select>
        </div>

        {/* Timezone */}
        <div>
          <label className="block mb-2 font-semibold text-slate-700">
            Time Zone
          </label>

          <div className="relative">
            <FaClock className="absolute left-4 top-4 text-gray-400" />

            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full border rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
              <option value="Australia/Sydney">Australia/Sydney (AEST)</option>
            </select>
          </div>
        </div>

        {/* Date Format */}
        <div>
          <label className="block mb-2 font-semibold text-slate-700">
            Date Format
          </label>

          <div className="relative">
            <FaCalendarAlt className="absolute left-4 top-4 text-gray-400" />

            <select
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              className="w-full border rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-8 bg-slate-50 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <FaGlobe className="text-sky-600 text-2xl" />
          <h3 className="text-xl font-bold text-slate-800">
            Current Preferences
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4 text-slate-700">
          <p><strong>Language:</strong> {language.toUpperCase()}</p>
          <p><strong>Region:</strong> {region}</p>
          <p><strong>Time Zone:</strong> {timezone}</p>
          <p><strong>Date Format:</strong> {dateFormat}</p>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end mt-8">
        <button className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:scale-105 transition">
          <FaCheckCircle />
          Save Preferences
        </button>
      </div>
    </div>
  );
}

export default LanguageSettings;