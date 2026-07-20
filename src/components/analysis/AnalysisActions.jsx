import {
  FaPrint,
  FaShareAlt,
  FaRedo,
  FaFilePdf,
} from "react-icons/fa";

function AnalysisActions() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-slate-800">
          Analysis Actions
        </h2>

        <p className="text-gray-500 mt-2">
          Save, share or print your resume analysis report.
        </p>

      </div>

      {/* Action Buttons */}

      <div className="grid md:grid-cols-2 gap-5">

        <button
          className="flex items-center justify-center gap-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white py-4 rounded-2xl font-semibold hover:scale-105 transition"
        >
          <FaFilePdf />
          Download PDF Report
        </button>

        <button
          className="flex items-center justify-center gap-3 bg-white border-2 border-sky-500 text-sky-600 py-4 rounded-2xl font-semibold hover:bg-sky-50 transition"
        >
          <FaPrint />
          Print Report
        </button>

        <button
          className="flex items-center justify-center gap-3 bg-slate-900 text-white py-4 rounded-2xl font-semibold hover:bg-black transition"
        >
          <FaShareAlt />
          Share Analysis
        </button>

        <button
          className="flex items-center justify-center gap-3 bg-green-500 text-white py-4 rounded-2xl font-semibold hover:bg-green-600 transition"
        >
          <FaRedo />
          Analyze Again
        </button>

      </div>

      {/* Divider */}

      <div className="my-10 border-t border-slate-200"></div>

      {/* Report Summary */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-sky-50 rounded-2xl p-6 text-center">

          <h3 className="text-slate-500 text-sm">
            ATS Score
          </h3>

          <p className="text-4xl font-bold text-sky-600 mt-3">
            88%
          </p>

        </div>

        <div className="bg-green-50 rounded-2xl p-6 text-center">

          <h3 className="text-slate-500 text-sm">
            Recruiter Match
          </h3>

          <p className="text-4xl font-bold text-green-600 mt-3">
            90%
          </p>

        </div>

        <div className="bg-indigo-50 rounded-2xl p-6 text-center">

          <h3 className="text-slate-500 text-sm">
            Resume Rating
          </h3>

          <p className="text-4xl font-bold text-indigo-600 mt-3">
            A+
          </p>

        </div>

      </div>

      {/* AI Message */}

      <div className="mt-10 rounded-3xl bg-gradient-to-r from-sky-500 to-blue-600 text-white p-6">

        <h3 className="text-xl font-bold mb-4">
          AI Suggestion
        </h3>

        <p className="leading-8 text-sky-100">
          Your resume is well structured and ATS-friendly.
          Before applying for jobs, download the report and
          review the improvement tips to further increase your
          chances of getting shortlisted.
        </p>

      </div>

    </div>
  );
}

export default AnalysisActions;