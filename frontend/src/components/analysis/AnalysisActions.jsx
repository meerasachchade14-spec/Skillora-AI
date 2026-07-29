import {
  FaPrint,
  FaShareAlt,
  FaRedo,
  FaFilePdf,
  FaDownload,
} from "react-icons/fa";

function AnalysisActions() {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">

      <div className="mb-8">

        <p className="text-xs font-bold uppercase tracking-widest text-sky-500">
          Report Management
        </p>

        <h2 className="mt-2 text-3xl font-black text-slate-800">
          Analysis Actions
        </h2>

        <p className="mt-2 text-slate-500">
          Save, share or export your complete AI resume report.
        </p>

      </div>

      <div className="grid gap-4 md:grid-cols-2">

        <button className="group flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 py-4 font-bold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-1">
          <FaFilePdf />
          Download PDF Report
        </button>

        <button className="flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 py-4 font-bold text-slate-700 transition hover:border-sky-400 hover:bg-sky-50">
          <FaPrint />
          Print Report
        </button>

        <button className="flex items-center justify-center gap-3 rounded-2xl bg-slate-950 py-4 font-bold text-white transition hover:bg-slate-800">
          <FaShareAlt />
          Share Analysis
        </button>

        <button className="flex items-center justify-center gap-3 rounded-2xl bg-emerald-500 py-4 font-bold text-white transition hover:bg-emerald-600">
          <FaRedo />
          Analyze Another Resume
        </button>

      </div>

      <div className="my-10 h-px bg-slate-200" />

      <div className="grid gap-5 md:grid-cols-3">

        <div className="rounded-2xl bg-sky-50 p-6">
          <p className="text-sm text-slate-500">
            ATS Score
          </p>

          <p className="mt-2 text-4xl font-black text-sky-600">
            88%
          </p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-6">
          <p className="text-sm text-slate-500">
            Recruiter Match
          </p>

          <p className="mt-2 text-4xl font-black text-emerald-600">
            90%
          </p>
        </div>

        <div className="rounded-2xl bg-indigo-50 p-6">
          <p className="text-sm text-slate-500">
            Resume Rating
          </p>

          <p className="mt-2 text-4xl font-black text-indigo-600">
            A+
          </p>
        </div>

      </div>

      <div className="mt-8 flex items-start gap-4 rounded-3xl bg-gradient-to-r from-slate-950 to-blue-950 p-6 text-white">

        <FaDownload className="mt-1 text-xl text-sky-400" />

        <div>

          <h3 className="font-bold">
            Ready to improve your chances?
          </h3>

          <p className="mt-2 text-sm leading-7 text-slate-300">
            Download your report and use the AI recommendations
            to optimize your resume before applying.
          </p>

        </div>

      </div>

    </div>
  );
}

export default AnalysisActions;