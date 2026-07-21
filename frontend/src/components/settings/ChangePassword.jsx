import { useState } from "react";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaSave,
} from "react-icons/fa";

function ChangePassword() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-2xl">

          <FaLock />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Change Password
          </h2>

          <p className="text-gray-500">
            Update your password to keep your account secure.
          </p>

        </div>

      </div>

      {/* Current Password */}

      <div className="space-y-6">

        <div>

          <label className="block mb-2 font-semibold text-slate-700">
            Current Password
          </label>

          <div className="relative">

            <input
              type={showCurrent ? "text" : "password"}
              placeholder="Enter current password"
              className="w-full border rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-sky-500 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-4 top-4 text-gray-500"
            >
              {showCurrent ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

        </div>

        {/* New Password */}

        <div>

          <label className="block mb-2 font-semibold text-slate-700">
            New Password
          </label>

          <div className="relative">

            <input
              type={showNew ? "text" : "password"}
              placeholder="Enter new password"
              className="w-full border rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-sky-500 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-4 top-4 text-gray-500"
            >
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

        </div>

        {/* Password Strength */}

        <div>

          <div className="flex justify-between mb-2">

            <span className="font-medium text-slate-700">
              Password Strength
            </span>

            <span className="font-semibold text-green-600">
              Strong
            </span>

          </div>

          <div className="w-full h-3 bg-gray-200 rounded-full">

            <div
              className="h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600"
              style={{ width: "85%" }}
            />

          </div>

        </div>

        {/* Confirm Password */}

        <div>

          <label className="block mb-2 font-semibold text-slate-700">
            Confirm Password
          </label>

          <div className="relative">

            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm new password"
              className="w-full border rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-sky-500 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-4 text-gray-500"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

        </div>

      </div>

      {/* Password Tips */}

      <div className="mt-8 bg-sky-50 rounded-2xl p-6">

        <div className="flex items-center gap-3 mb-4">

          <FaShieldAlt className="text-sky-600 text-xl" />

          <h3 className="text-xl font-bold text-slate-800">
            Password Tips
          </h3>

        </div>

        <ul className="space-y-2 text-gray-600">

          <li>✔ At least 8 characters long</li>

          <li>✔ Include uppercase & lowercase letters</li>

          <li>✔ Include numbers</li>

          <li>✔ Include special characters (@, #, $, %)</li>

        </ul>

      </div>

      {/* Save Button */}

      <div className="flex justify-end mt-8">

        <button className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:scale-105 transition">

          <FaSave />

          Update Password

        </button>

      </div>

    </div>
  );
}

export default ChangePassword;