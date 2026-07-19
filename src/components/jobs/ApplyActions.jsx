import {
  FaPaperPlane,
  FaBookmark,
  FaShareAlt,
  FaDownload,
  FaRobot,
} from "react-icons/fa";

function ApplyActions() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <h2 className="text-3xl font-bold text-slate-800 mb-2">
        Quick Actions
      </h2>

      <p className="text-gray-500 mb-8">
        Take action on this opportunity with one click.
      </p>

      {/* Buttons */}

      <div className="space-y-5">

        <button className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white text-lg font-semibold hover:scale-105 transition">

          <FaPaperPlane />

          Apply Now

        </button>

        <button className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border-2 border-sky-500 text-sky-600 font-semibold hover:bg-sky-50 transition">

          <FaBookmark />

          Save Job

        </button>

        <button className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border border-slate-300 hover:bg-slate-100 transition">

          <FaShareAlt />

          Share Job

        </button>

        <button className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border border-slate-300 hover:bg-slate-100 transition">

          <FaDownload />

          Download Job Description

        </button>

        <button className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-slate-900 text-white hover:bg-black transition">

          <FaRobot />

          Analyze Resume for this Job

        </button>

      </div>

      {/* AI Note */}

      <div className="mt-8 bg-sky-50 rounded-2xl p-5 border border-sky-200">

        <h3 className="font-bold text-sky-700 mb-2">
          AI Suggestion
        </h3>

        <p className="text-gray-600 leading-7">
          Your profile has a
          <span className="font-bold text-sky-600">
            {" "}91% job match{" "}
          </span>
          for this role. Updating your resume with more React,
          TypeScript, and AWS keywords can increase your chances
          of getting shortlisted.
        </p>

      </div>

    </div>
  );
}

export default ApplyActions;