import {
  FaUserEdit,
  FaCamera,
  FaLock,
  FaFileDownload,
  FaRobot,
} from "react-icons/fa";

function EditProfile() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">

      {/* Header */}

      <h2 className="text-2xl font-bold text-slate-800 mb-2">
        Profile Actions
      </h2>

      <p className="text-gray-500 mb-8">
        Manage and improve your profile.
      </p>

      {/* Buttons */}

      <div className="space-y-4">

        <button className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold hover:scale-105 transition">

          <FaUserEdit />

          Edit Profile

        </button>

        <button className="w-full flex items-center justify-center gap-3 py-4 rounded-xl border-2 border-sky-500 text-sky-600 hover:bg-sky-50 transition">

          <FaCamera />

          Change Profile Photo

        </button>

        <button className="w-full flex items-center justify-center gap-3 py-4 rounded-xl border border-gray-300 hover:bg-gray-100 transition">

          <FaLock />

          Change Password

        </button>

        <button className="w-full flex items-center justify-center gap-3 py-4 rounded-xl border border-gray-300 hover:bg-gray-100 transition">

          <FaFileDownload />

          Download Resume

        </button>

        <button className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-slate-900 text-white hover:bg-black transition">

          <FaRobot />

          AI Optimize Profile

        </button>

      </div>

      {/* AI Suggestion */}

      <div className="mt-8 bg-sky-50 border border-sky-200 rounded-2xl p-5">

        <h3 className="font-bold text-sky-700 mb-3">
          AI Suggestion
        </h3>

        <p className="text-gray-600 leading-7">
          Add more projects, certifications, and work experience
          to increase your profile score from
          <span className="font-bold text-sky-600">
            {" "}82% to 96%
          </span>.
        </p>

      </div>

    </div>
  );
}

export default EditProfile;