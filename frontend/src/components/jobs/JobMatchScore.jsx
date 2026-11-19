import {
  FaBullseye,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowUp,
  FaBrain,
} from "react-icons/fa";

/**
 * JobMatchScore
 *
 * When real AI job recommendations are available (jobs prop is non-empty),
 * derives live statistics from the actual matched/missing skills data.
 * Falls back to static demo values otherwise.
 */
function JobMatchScore({ jobs = [] }) {
  // ----------------------------------------------------------------
  // Derive real metrics from AI recommendations
  // ----------------------------------------------------------------
  const isAI = jobs.length > 0 && jobs[0]?.compatibility_score != null;

  let overallScore = 94;
  let highlights = [];

  if (isAI) {
    // Average compatibility score across all returned roles
    const scores = jobs.map((j) => j.compatibility_score ?? j.match ?? 0);
    overallScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

    // Collect all matched skills across top roles, deduplicate
    const allMatched = [
      ...new Set(jobs.flatMap((j) => j.matched_skills || [])),
    ];

    // Collect all missing skills across top roles, deduplicated
    const allMissing = [
      ...new Set(jobs.flatMap((j) => j.missing_skills || [])),
    ];

    // Best-matching role
    const bestRole = jobs[0];
    const bestScore = Math.round(bestRole?.compatibility_score ?? bestRole?.match ?? 0);

    if (allMatched.length > 0) {
      highlights.push({
        icon: "check",
        title: `${allMatched.length} Matched Skills`,
        desc: `${allMatched.slice(0, 3).join(", ")}${allMatched.length > 3 ? ` +${allMatched.length - 3} more` : ""} align with top roles.`,
      });
    }

    highlights.push({
      icon: "check",
      title: `Best Match: ${bestRole?.role || bestRole?.title}`,
      desc: `${bestScore}% compatibility — your top recommended role.`,
    });

    if (allMissing.length > 0) {
      highlights.push({
        icon: "cross",
        title: `${allMissing.length} Skills to Develop`,
        desc: `${allMissing.slice(0, 3).join(", ")} would strengthen your profile.`,
      });
    }

    // Potential score if top missing skills are added
    const potentialGain = allMissing.length > 0 ? Math.min(overallScore + 8, 100) : overallScore;
    if (potentialGain > overallScore) {
      highlights.push({
        icon: "up",
        title: "Potential Increase",
        desc: `Learn ${allMissing[0]} to reach ~${potentialGain}% average match.`,
      });
    }
  } else {
    // Static demo fallback
    highlights = [
      { icon: "check", title: "Strong React Skills", desc: "Matches 92% of Frontend jobs." },
      { icon: "check", title: "Modern Projects",     desc: "Recruiters prefer project-based profiles." },
      { icon: "cross", title: "Missing Cloud Skills",desc: "Docker & AWS can improve your score." },
      { icon: "up",    title: "Potential Increase",  desc: "Learn TypeScript to reach 98% match." },
    ];
  }

  const scoreColor =
    overallScore >= 80 ? "from-sky-500 to-blue-600" :
    overallScore >= 60 ? "from-indigo-500 to-purple-600" :
    overallScore >= 40 ? "from-amber-500 to-orange-500" :
                         "from-slate-500 to-slate-600";

  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">

      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
          {isAI ? (
            <FaBrain className="text-blue-600 text-2xl" />
          ) : (
            <FaBullseye className="text-blue-600 text-2xl" />
          )}
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900">
            {isAI ? "AI Job Match Analysis" : "AI Job Match Analysis"}
          </h2>
          <p className="text-slate-500 mt-1">
            {isAI
              ? `Based on ${jobs.length} role${jobs.length !== 1 ? "s" : ""} matched from your resume skills`
              : "Why these jobs are recommended for you"}
          </p>
        </div>
        {isAI && (
          <span className="ml-auto text-[10px] font-extrabold uppercase tracking-wider bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-200">
            Live Data
          </span>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Score card */}
        <div className={`rounded-3xl bg-gradient-to-r ${scoreColor} text-white p-7`}>
          <p className="text-sky-100">
            {isAI ? "Average Compatibility" : "Overall Compatibility"}
          </p>
          <h1 className="text-6xl font-black mt-2">{overallScore}%</h1>
          <p className="mt-4 text-sky-100 leading-7">
            {isAI
              ? `Calculated from your extracted resume skills vs ${jobs.length} recommended role${jobs.length !== 1 ? "s" : ""}.`
              : "Excellent compatibility based on your resume, skills and projects."}
          </p>
        </div>

        {/* Highlights */}
        <div className="space-y-5">
          {highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-4">
              {h.icon === "check" && <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />}
              {h.icon === "cross" && <FaTimesCircle className="text-red-500 text-xl flex-shrink-0" />}
              {h.icon === "up"    && <FaArrowUp className="text-blue-600 text-xl flex-shrink-0" />}
              <div>
                <h4 className="font-bold">{h.title}</h4>
                <p className="text-sm text-slate-500">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export default JobMatchScore;