import { useState } from 'react';
import {
  FaShieldAlt,
  FaMobileAlt,
  FaEnvelope,
  FaDesktop,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaLock,
} from 'react-icons/fa';

function SecuritySettings() {
  const [twoFactor, setTwoFactor] = useState(true);
  const [backupEmail, setBackupEmail] = useState(true);

  const activeSessions = [
    {
      device: 'Windows 11 - Chrome',
      location: 'Ahmedabad, India',
      status: 'Current Session',
      time: 'Now',
    },
    {
      device: 'Android Phone - Chrome',
      location: 'Ahmedabad, India',
      status: 'Active',
      time: '2 hours ago',
    },
    {
      device: 'MacBook - Safari',
      location: 'Mumbai, India',
      status: 'Active',
      time: 'Yesterday',
    },
  ];

  const loginHistory = [
    {
      location: 'Ahmedabad, India',
      device: 'Chrome on Windows',
      time: 'Today, 10:45 AM',
    },
    {
      location: 'Ahmedabad, India',
      device: 'Chrome on Android',
      time: 'Today, 8:10 AM',
    },
    {
      location: 'Mumbai, India',
      device: 'Safari on macOS',
      time: 'Yesterday, 7:30 PM',
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
            Security Settings
          </h2>
          <p className="text-gray-500">
            Manage authentication, devices and account security.
          </p>
        </div>
      </div>

      {/* Security Score */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-6 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">Security Score</h3>
            <p className="opacity-90 mt-1">
              Your account is well protected
            </p>
          </div>

          <div className="text-center">
            <h1 className="text-5xl font-bold">92%</h1>
            <p>Excellent</p>
          </div>
        </div>
      </div>

      {/* 2FA */}
      <div className="border rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center text-2xl">
              <FaLock />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-800">
                Two-Factor Authentication
              </h3>
              <p className="text-gray-500">
                Add an extra layer of security to your account.
              </p>
            </div>
          </div>

          <button
            onClick={() => setTwoFactor(!twoFactor)}
            className={`w-16 h-8 rounded-full transition ${
              twoFactor ? 'bg-sky-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full bg-white mt-1 transition-all ${
                twoFactor ? 'ml-9' : 'ml-1'
              }`}
            />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 text-green-600">
          <FaCheckCircle />
          <span className="font-medium">Authenticator app connected</span>
        </div>
      </div>

      {/* Backup Email */}
      <div className="border rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center text-2xl">
              <FaEnvelope />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-800">
                Backup Email Verification
              </h3>
              <p className="text-gray-500">
                Use a secondary email for account recovery.
              </p>
            </div>
          </div>

          <button
            onClick={() => setBackupEmail(!backupEmail)}
            className={`w-16 h-8 rounded-full transition ${
              backupEmail ? 'bg-sky-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full bg-white mt-1 transition-all ${
                backupEmail ? 'ml-9' : 'ml-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-800 mb-5">
          Active Sessions
        </h3>

        <div className="space-y-4">
          {activeSessions.map((session, index) => (
            <div
              key={index}
              className="border rounded-2xl p-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-2xl">
                  <FaDesktop />
                </div>

                <div>
                  <h4 className="font-bold text-slate-800">
                    {session.device}
                  </h4>

                  <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                    <FaMapMarkerAlt />
                    {session.location}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p
                  className={`font-semibold ${
                    session.status === 'Current Session'
                      ? 'text-green-600'
                      : 'text-sky-600'
                  }`}
                >
                  {session.status}
                </p>

                <p className="text-sm text-gray-500">
                  {session.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Login History */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-800 mb-5">
          Recent Login Activity
        </h3>

        <div className="space-y-4">
          {loginHistory.map((item, index) => (
            <div
              key={index}
              className="border rounded-2xl p-5 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-2xl">
                <FaMobileAlt />
              </div>

              <div className="flex-1">
                <h4 className="font-bold text-slate-800">
                  {item.device}
                </h4>

                <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                  <FaMapMarkerAlt />
                  {item.location}
                </div>
              </div>

              <p className="text-sm text-gray-500">
                {item.time}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sign Out All */}
      <div className="border border-red-300 bg-red-50 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex items-center gap-3 text-red-600">
          <FaExclamationTriangle className="text-2xl" />
          <div>
            <h3 className="text-xl font-bold">
              Sign out from all devices
            </h3>
            <p className="text-red-500 text-sm">
              This will end all active sessions except your current one.
            </p>
          </div>
        </div>

        <Spacer />

        <button className="flex items-center gap-3 px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition">
          <FaSignOutAlt />
          Sign Out All
        </button>
      </div>
    </div>
  );
}

export default SecuritySettings;