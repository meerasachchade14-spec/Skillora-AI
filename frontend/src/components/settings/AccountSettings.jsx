import { FaUserEdit, FaCamera, FaSave } from "react-icons/fa";

function AccountSettings() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-2xl">

          <FaUserEdit />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Account Settings
          </h2>

          <p className="text-gray-500">
            Update your personal information and profile details.
          </p>

        </div>

      </div>

      {/* Profile Photo */}

      <div className="flex flex-col md:flex-row items-center gap-8 mb-10">

        <div className="relative">

          <img
            src="https://i.pravatar.cc/200"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-sky-500 object-cover"
          />

          <button className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-blue-600 transition">

            <FaCamera />

          </button>

        </div>

        <div>

          <h3 className="text-2xl font-bold text-slate-800">
            John Doe
          </h3>

          <p className="text-gray-500 mt-2">
            Full Stack Developer
          </p>

          <button className="mt-5 px-5 py-3 rounded-xl bg-sky-500 text-white hover:bg-blue-600 transition">

            Upload New Photo

          </button>

        </div>

      </div>

      {/* Form */}

      <div className="grid md:grid-cols-2 gap-6">

        <div>

          <label className="block mb-2 font-semibold text-slate-700">
            Full Name
          </label>

          <input
            type="text"
            defaultValue="John Doe"
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
          />

        </div>

        <div>

          <label className="block mb-2 font-semibold text-slate-700">
            Email Address
          </label>

          <input
            type="email"
            defaultValue="john@example.com"
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
          />

        </div>

        <div>

          <label className="block mb-2 font-semibold text-slate-700">
            Phone Number
          </label>

          <input
            type="text"
            defaultValue="+91 9876543210"
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
          />

        </div>

        <div>

          <label className="block mb-2 font-semibold text-slate-700">
            Location
          </label>

          <input
            type="text"
            defaultValue="New Delhi, India"
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
          />

        </div>

      </div>

      {/* Bio */}

      <div className="mt-6">

        <label className="block mb-2 font-semibold text-slate-700">
          Bio
        </label>

        <textarea
          rows="5"
          defaultValue="Passionate Full Stack Developer with expertise in React, Node.js, and AI-powered web applications."
          className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none resize-none"
        />

      </div>

      {/* Save */}

      <div className="mt-8 flex justify-end">

        <button className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:scale-105 transition">

          <FaSave />

          Save Changes

        </button>

      </div>

    </div>
  );
}

export default AccountSettings;