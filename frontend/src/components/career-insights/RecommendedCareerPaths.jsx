import {
  FaLaptopCode,
  FaServer,
  FaRobot,
  FaCode,
  FaDatabase,
  FaBrain,
  FaArrowRight,
} from "react-icons/fa";

// Icon map by domain keyword
const DOMAIN_ICONS = {
  "Web Development":      <FaLaptopCode />,
  "Software Development": <FaServer />,
  "AI / Machine Learning": <FaRobot />,
  "Python":               <FaCode />,
  "Databases":            <FaDatabase />,
};

// Gradient map by domain
const DOMAIN_COLORS = {
  "Web Development":      "from-sky-500 to-blue-600",
  "Software Development": "from-indigo-500 to-sky-600",
  "AI / Machine Learning": "from-cyan-500 to-blue-700",
  "Python":               "from-purple-500 to-indigo-600",
  "Databases":            "from-emerald-500 to-teal-600",
};

// Static fallback careers shown when no AI data is available
const FALLBACK_CAREERS = [
  {
    title: "Frontend Developer",
    match: "96%",
    icon: <FaLaptopCode />,
    color: "from-sky-500 to-blue-600",
    domain: null,
    experience_level: null,
    isAI: false,
  },
  {
    title: "Full Stack Developer",
    match: "91%",
    icon: <FaServer />,
    color: "from-indigo-500 to-sky-600",
    domain: null,
    experience_level: null,
    isAI: false,
  },
  {
    title: "AI Engineer",
    match: "82%",
    icon: <FaRobot />,
    color: "from-cyan-500 to-blue-700",
    domain: null,
    experience_level: null,
    isAI: false,
  },
];

/**
 * RecommendedCareerPaths
 *
 * When real AI job recommendations are passed via `jobs` prop, displays those
 * roles with live compatibility scores.  Falls back to static demo cards otherwise.
 */
function RecommendedCareerPaths({ jobs = [] }) {
  const isAI = jobs.length > 0 && jobs[0]?.compatibility_score != null;

  const careers = isAI
    ? jobs.slice(0, 4).map((job) => ({
        title: job.role || job.title || "Role",
        match: `${Math.round(job.compatibility_score ?? job.match ?? 0)}%`,
        icon: DOMAIN_ICONS[job.domain] ?? <FaBrain />,
        color: DOMAIN_COLORS[job.domain] ?? "from-blue-500 to-indigo-600",
        domain: job.domain,
        experience_level: job.experience_level,
        isAI: true,
      }))
    : FALLBACK_CAREERS;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black">Recommended Career Paths</h2>
        {isAI && (
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100">
            🤖 AI-Powered
          </span>
        )}
      </div>

      <div className="space-y-5">
        {careers.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-slate-200 p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">

              <div className="flex items-center gap-5">

                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.color} text-white flex items-center justify-center text-xl`}
                >
                  {item.icon}
                </div>

                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  {item.isAI ? (
                    <div className="flex gap-2 mt-1 flex-wrap">
                      {item.domain && (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                          {item.domain}
                        </span>
                      )}
                      {item.experience_level && (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full border border-indigo-100">
                          {item.experience_level}
                        </span>
                      )}
                    </div>
                  ) : (
                    <p className="text-slate-500">AI Match Score</p>
                  )}
                </div>

              </div>

              <div className="text-right">

                <h3 className="text-3xl font-black text-blue-600">
                  {item.match}
                </h3>

                {item.isAI && (
                  <p className="text-[10px] text-slate-400 mt-1">compatibility</p>
                )}

                <FaArrowRight className="ml-auto mt-2 text-slate-400" />

              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendedCareerPaths;