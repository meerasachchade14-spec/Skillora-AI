import {
  FaDownload,
  FaShareAlt,
  FaBookmark,
  FaPaperPlane,
} from "react-icons/fa";

function JobActions() {

  return (

    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">

      <h2 className="text-2xl font-black mb-8">

        Quick Actions

      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <button className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold hover:scale-105 transition">

          <FaPaperPlane />

          Apply to All Matching Jobs

        </button>

        <button className="flex items-center justify-center gap-3 py-4 rounded-2xl border border-slate-300 hover:bg-slate-50 font-semibold">

          <FaBookmark />

          Save Recommended Jobs

        </button>

        <button className="flex items-center justify-center gap-3 py-4 rounded-2xl border border-slate-300 hover:bg-slate-50 font-semibold">

          <FaDownload />

          Download Job Report

        </button>

        <button className="flex items-center justify-center gap-3 py-4 rounded-2xl border border-slate-300 hover:bg-slate-50 font-semibold">

          <FaShareAlt />

          Share Recommendations

        </button>

      </div>

      <div className="mt-8 rounded-3xl bg-blue-50 border border-blue-100 p-6">

        <h3 className="font-black text-blue-700 mb-3">

          Pro Tip

        </h3>

        <p className="text-slate-600 leading-7">

          Save jobs you're interested in and apply within 48 hours.
          Early applicants usually receive higher recruiter visibility.

        </p>

      </div>

    </div>

  );

}

export default JobActions;