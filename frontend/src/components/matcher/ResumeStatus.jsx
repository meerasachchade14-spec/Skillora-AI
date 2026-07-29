import {
  FaFileAlt,
  FaCheckCircle,
  FaClock,
  FaRobot,
} from "react-icons/fa";

function ResumeStatus() {
  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">

      <div className="flex justify-between items-center">

        <div className="flex gap-5">

          <div className="w-16 h-16 rounded-3xl bg-sky-100 flex items-center justify-center">
            <FaFileAlt className="text-sky-600 text-3xl"/>
          </div>

          <div>

            <h2 className="text-2xl font-black text-slate-800">
              Resume Loaded Successfully
            </h2>

            <p className="text-slate-500 mt-2">
              Resume_2026.pdf
            </p>

            <div className="flex gap-3 mt-5">

              <span className="px-4 py-2 rounded-full bg-green-50 text-green-600 font-semibold text-sm flex items-center gap-2">
                <FaCheckCircle/>
                ATS Ready
              </span>

              <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-semibold text-sm flex items-center gap-2">
                <FaRobot/>
                AI Analyzed
              </span>

              <span className="px-4 py-2 rounded-full bg-orange-50 text-orange-600 font-semibold text-sm flex items-center gap-2">
                <FaClock/>
                Uploaded Today
              </span>

            </div>

          </div>

        </div>

        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold hover:scale-105 transition">
          Analyze Again
        </button>

      </div>

    </div>
  );
}

export default ResumeStatus;