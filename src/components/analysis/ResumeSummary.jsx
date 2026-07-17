import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaBriefcase,
  FaMapMarkerAlt,
} from "react-icons/fa";

function ResumeSummary({ summary }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-slate-800">
          Resume Summary
        </h2>

        <p className="text-gray-500 mt-2">
          Personal information extracted from your resume.
        </p>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Name */}

        <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-5">

          <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">

            <FaUser className="text-sky-600 text-xl" />

          </div>

          <div>

            <p className="text-gray-500 text-sm">Full Name</p>

            <h3 className="font-bold text-slate-800">
              {summary.name}
            </h3>

          </div>

        </div>

        {/* Email */}

        <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-5">

          <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">

            <FaEnvelope className="text-sky-600 text-xl" />

          </div>

          <div>

            <p className="text-gray-500 text-sm">Email</p>

            <h3 className="font-semibold text-slate-800 break-all">
              {summary.email}
            </h3>

          </div>

        </div>

        {/* Phone */}

        <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-5">

          <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">

            <FaPhone className="text-sky-600 text-xl" />

          </div>

          <div>

            <p className="text-gray-500 text-sm">Phone</p>

            <h3 className="font-semibold text-slate-800">
              {summary.phone}
            </h3>

          </div>

        </div>

        {/* Education */}

        <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-5">

          <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">

            <FaGraduationCap className="text-sky-600 text-xl" />

          </div>

          <div>

            <p className="text-gray-500 text-sm">Education</p>

            <h3 className="font-semibold text-slate-800">
              {summary.education}
            </h3>

          </div>

        </div>

        {/* Experience */}

        <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-5">

          <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">

            <FaBriefcase className="text-sky-600 text-xl" />

          </div>

          <div>

            <p className="text-gray-500 text-sm">Experience</p>

            <h3 className="font-semibold text-slate-800">
              {summary.experience}
            </h3>

          </div>

        </div>

        {/* Location */}

        <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-5">

          <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">

            <FaMapMarkerAlt className="text-sky-600 text-xl" />

          </div>

          <div>

            <p className="text-gray-500 text-sm">Location</p>

            <h3 className="font-semibold text-slate-800">
              Gandhinagar, Gujarat
            </h3>

          </div>

        </div>

      </div>

      {/* Professional Summary */}

      <div className="mt-8 bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-6 border border-sky-100">

        <h3 className="text-lg font-bold text-slate-800 mb-3">
          Professional Summary
        </h3>

        <p className="text-gray-600 leading-8">

          Passionate Computer Engineering student with strong
          knowledge of React.js, JavaScript, Python and Machine
          Learning. Experienced in developing responsive web
          applications and AI-based projects with a focus on
          modern UI design and problem solving.

        </p>

      </div>

    </div>
  );
}

export default ResumeSummary;