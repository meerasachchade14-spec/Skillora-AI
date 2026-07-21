import { FaDownload, FaUpload, FaCalendarAlt } from "react-icons/fa";

function AnalysisHeader() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200">

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

        {/* Left */}

        <div>

          <span className="inline-block px-4 py-2 rounded-full bg-sky-100 text-sky-700 font-semibold text-sm mb-4">
            AI Resume Analysis
          </span>

          <h1 className="text-4xl font-bold text-slate-900">
            Resume Analysis Report
          </h1>

          <p className="text-slate-500 mt-3 text-lg">
            View your ATS score, strengths, weaknesses, keyword analysis and AI suggestions.
          </p>

          <div className="flex flex-wrap items-center gap-6 mt-6 text-gray-600">

            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-sky-500" />
              <span>Uploaded Today</span>
            </div>

            <div className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
              ATS Ready
            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-wrap gap-4">

          <button className="flex items-center gap-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition">

            <FaDownload />

            Download Report

          </button>

          <button className="flex items-center gap-3 border-2 border-sky-500 text-sky-600 px-6 py-3 rounded-xl font-semibold hover:bg-sky-50 transition">

            <FaUpload />

            Upload Another Resume

          </button>

        </div>

      </div>

    </div>
  );
}

export default AnalysisHeader;