
import {
  FaCalendarAlt,
  FaRobot,
} from "react-icons/fa";

function AnalysisHeader() {
  return (
    <section className="relative overflow-hidden bg-white rounded-[28px] border border-slate-200 shadow-sm">

      {/* Decorative Background */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-100/60 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 left-1/3 w-72 h-72 bg-sky-100/50 rounded-full blur-3xl" />

      <div className="relative p-6 md:p-8 lg:p-10">

        <div className="flex flex-col">

          {/* LEFT CONTENT */}
          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <FaRobot />
              AI Resume Intelligence
            </div>

            <h1 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              Resume Analysis
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-700">
                Report
              </span>
            </h1>

            <p className="mt-4 text-slate-500 text-base md:text-lg leading-relaxed max-w-2xl">
              Get a complete AI-powered breakdown of your resume, including ATS compatibility, keyword strength, skills, experience and actionable improvement insights.
            </p>

            {/* META INFO */}
            <div className="flex flex-wrap items-center gap-3 mt-7">

              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-600">
                <FaCalendarAlt className="text-blue-500" />
                Uploaded Today
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-sm font-bold text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                ATS Ready
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-50 border border-violet-100 text-sm font-bold text-violet-700">
                <FaRobot />
                AI Powered
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default AnalysisHeader;
