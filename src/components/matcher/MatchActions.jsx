import {
  FaDownload,
  FaShareAlt,
  FaSave,
  FaRedo,
} from "react-icons/fa";

function MatchActions() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-slate-800">
          Quick Actions
        </h2>

        <p className="text-gray-500 mt-2">
          Save, share or download your Skill Match report.
        </p>

      </div>

      {/* Buttons */}

      <div className="grid md:grid-cols-2 gap-5">

        {/* Download */}

        <button
          className="flex items-center justify-center gap-3
          bg-gradient-to-r from-sky-500 to-blue-600
          text-white
          rounded-2xl
          py-4
          font-semibold
          hover:scale-105
          transition"
        >
          <FaDownload />

          Download Report
        </button>

        {/* Save */}

        <button
          className="flex items-center justify-center gap-3
          border-2 border-sky-500
          text-sky-600
          rounded-2xl
          py-4
          font-semibold
          hover:bg-sky-50
          transition"
        >
          <FaSave />

          Save Analysis
        </button>

        {/* Share */}

        <button
          className="flex items-center justify-center gap-3
          border-2 border-indigo-500
          text-indigo-600
          rounded-2xl
          py-4
          font-semibold
          hover:bg-indigo-50
          transition"
        >
          <FaShareAlt />

          Share Result
        </button>

        {/* Analyze Again */}

        <button
          className="flex items-center justify-center gap-3
          bg-slate-900
          text-white
          rounded-2xl
          py-4
          font-semibold
          hover:bg-black
          transition"
        >
          <FaRedo />

          Analyze Again
        </button>

      </div>

      {/* AI Tip */}

      <div className="mt-8 rounded-2xl bg-sky-50 border border-sky-200 p-5">

        <h3 className="font-bold text-slate-800 mb-2">
          💡 AI Tip
        </h3>

        <p className="text-gray-600 leading-7">
          Save your analysis after every resume update. Comparing reports
          over time helps you track your improvement and increase your
          Skill Match Score.
        </p>

      </div>

    </div>
  );
}

export default MatchActions;