import {
FaMapMarkerAlt,
FaCheckCircle,
FaTimesCircle,
FaArrowRight,
FaLightbulb,
FaStar,
} from "react-icons/fa";

function SkillTag({ skill, variant = "matched" }) {
  const styles = {
    matched: "bg-green-50 text-green-700 border border-green-200",
    missing: "bg-red-50 text-red-600 border border-red-200",
    bonus:   "bg-blue-50 text-blue-700 border border-blue-200",
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded-lg text-[11px] font-semibold ${styles[variant]}`}>
      {skill}
    </span>
  );
}

function CompatibilityBar({ score }) {
  const pct = Math.round(score || 0);
  const color =
    pct >= 80 ? "bg-green-500" :
    pct >= 50 ? "bg-blue-500"  :
    pct >= 25 ? "bg-amber-500" :
                "bg-slate-400";

  return (
    <div className="mt-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
          Compatibility
        </span>
        <span className="text-xs font-black text-slate-700">{pct}%</span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function JobCard({ job }) {
  const matchedSkills = job.matched_skills || [];
  const missingSkills = job.missing_skills || [];
  const bonusSkills   = job.bonus_skills   || [];
  const explanation   = job.explanation    || null;
  const isAI          = !!job.compatibility_score;

  return (
    <div className="rounded-3xl border border-slate-200 hover:border-sky-400 hover:shadow-xl transition duration-300 p-6 flex flex-col">

      {/* ---- Header ---- */}
      <div className="flex justify-between items-start">

        <div className="flex gap-4">
          <div className={`w-14 h-14 rounded-2xl ${job.color} text-white flex items-center justify-center text-xl font-black flex-shrink-0`}>
            {job.logo}
          </div>
          <div>
            <h3 className="font-black text-lg leading-tight">{job.role}</h3>
            {job.company && (
              <p className="text-slate-500 text-sm">{job.company}</p>
            )}
            {job.domain && (
              <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                {job.domain}
              </span>
            )}
          </div>
        </div>

        {/* Match badge */}
        <div className={`flex-shrink-0 px-3 py-2 rounded-xl font-black text-sm ${
          (job.match || 0) >= 80 ? "bg-green-50 text-green-700" :
          (job.match || 0) >= 50 ? "bg-blue-50 text-blue-700"   :
          (job.match || 0) >= 25 ? "bg-amber-50 text-amber-700" :
                                   "bg-slate-100 text-slate-500"
        }`}>
          {Math.round(job.match || 0)}%
        </div>
      </div>

      {/* ---- Compatibility bar (AI mode only) ---- */}
      {isAI && <CompatibilityBar score={job.match} />}

      {/* ---- Location / Salary ---- */}
      <div className="mt-4 space-y-2">
        {job.location && (
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <FaMapMarkerAlt className="text-slate-400 flex-shrink-0" />
            {job.location}
          </div>
        )}
        {job.salary && (
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <span className="text-slate-400 flex-shrink-0">₹</span>
            {job.salary}
          </div>
        )}
      </div>

      {/* ---- AI Explanation ---- */}
      {explanation && (
        <div className="mt-4 flex gap-2 bg-sky-50 border border-sky-100 rounded-2xl p-3">
          <FaLightbulb className="text-sky-400 mt-0.5 flex-shrink-0 text-sm" />
          <p className="text-xs text-sky-800 leading-relaxed">{explanation}</p>
        </div>
      )}

      {/* ---- Matched Skills ---- */}
      {matchedSkills.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-1.5 mb-2">
            <FaCheckCircle className="text-green-500 text-xs" />
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">
              Matched Skills
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {matchedSkills.slice(0, 6).map((s) => (
              <SkillTag key={s} skill={s} variant="matched" />
            ))}
            {matchedSkills.length > 6 && (
              <span className="text-[11px] text-slate-400 self-center">
                +{matchedSkills.length - 6} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* ---- Missing Skills ---- */}
      {missingSkills.length > 0 && (
        <div className="mt-3">
          <div className="flex items-center gap-1.5 mb-2">
            <FaTimesCircle className="text-red-400 text-xs" />
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">
              Skills to Learn
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {missingSkills.slice(0, 5).map((s) => (
              <SkillTag key={s} skill={s} variant="missing" />
            ))}
            {missingSkills.length > 5 && (
              <span className="text-[11px] text-slate-400 self-center">
                +{missingSkills.length - 5} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* ---- Bonus Skills ---- */}
      {bonusSkills.length > 0 && (
        <div className="mt-3">
          <div className="flex items-center gap-1.5 mb-2">
            <FaStar className="text-blue-400 text-xs" />
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">
              Bonus Skills
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {bonusSkills.slice(0, 4).map((s) => (
              <SkillTag key={s} skill={s} variant="bonus" />
            ))}
          </div>
        </div>
      )}

      {/* ---- Experience Level + Actions ---- */}
      <div className="mt-auto pt-5 flex gap-3 items-center">
        {job.experience_level && (
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full border border-indigo-100">
            {job.experience_level}
          </span>
        )}
        <div className="flex gap-2 ml-auto">
          <button className="border border-slate-200 rounded-xl px-4 py-2 text-sm font-semibold hover:bg-slate-50 transition">
            Details
          </button>
          <button className="rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white px-4 py-2 text-sm font-semibold flex items-center gap-2 hover:scale-105 transition">
            Apply <FaArrowRight className="text-xs" />
          </button>
        </div>
      </div>

    </div>
  );
}

export default JobCard;