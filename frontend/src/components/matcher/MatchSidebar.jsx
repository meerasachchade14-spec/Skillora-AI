import { useState } from "react";
import {
  FaAward,
  FaBullseye,
  FaRocket,
  FaChartLine,
  FaSearch,
} from "react-icons/fa";


function MatchSidebar({ matchResult, onCalculateMatch, isMatching }) {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const score = matchResult ? matchResult.matchScore : 88;
  const atsScore = matchResult ? (matchResult.atsScore || 85) : 94;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jobDescription) return;
    onCalculateMatch({ job_title: jobTitle, job_description: jobDescription });
  };

  return (

    <div className="space-y-6 sticky top-6">

      <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-[32px] text-white p-8 shadow-xl">

        <FaAward className="text-4xl mb-6"/>

        <h2 className="text-2xl font-black">
          Overall Match
        </h2>

        <h1 className="text-6xl font-black mt-5">
          {score}%
        </h1>

        <p className="text-sky-100 mt-5 leading-7">
          {score >= 85 
            ? "Excellent profile. Only a few skills are required to become interview ready." 
            : score >= 70 
            ? "Good compatibility. Consider acquiring the missing skills to improve your match." 
            : "Needs improvement. Review the missing skills list to align with target role."}
        </p>

      </div>

      {/* MATCH FORM */}
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-6">
        <h3 className="font-black text-xl mb-4 flex items-center gap-2">
          <FaSearch className="text-sky-500 text-lg"/>
          Analyze Compatibility
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Target Job Title
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Full Stack Developer"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500 text-slate-800"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Job Description *
            </label>
            <textarea
              required
              rows={4}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job details or requirements here..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500 text-slate-800 resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={isMatching || !jobDescription}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-sm shadow-md hover:scale-[1.02] active:scale-95 transition disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            {isMatching ? "Calculating Match..." : "Match Skills"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-6">

        <h3 className="font-black text-xl mb-6">
          Quick Stats
        </h3>

        <div className="space-y-5">

          <div className="flex justify-between">

            <div className="flex gap-3 items-center">

              <FaBullseye className="text-green-500"/>

              Resume Match

            </div>

            <span className="font-bold">
              {score}%
            </span>

          </div>

          <div className="flex justify-between">

            <div className="flex gap-3 items-center">

              <FaRocket className="text-orange-500"/>

              Interview Ready

            </div>

            <span className="font-bold">
              {Math.min(98, Math.max(50, score - 7))}%
            </span>

          </div>

          <div className="flex justify-between">

            <div className="flex gap-3 items-center">

              <FaChartLine className="text-blue-500"/>

              ATS Score

            </div>

            <span className="font-bold">
              {atsScore}%
            </span>

          </div>

        </div>

      </div>

    </div>

  );

}


export default MatchSidebar;