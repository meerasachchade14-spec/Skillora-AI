import {
  FaChartPie,
  FaFileAlt,
  FaSearch,
  FaCode,
  FaGraduationCap,
  FaBriefcase,
  FaProjectDiagram,
  FaLightbulb,
  FaArrowCircleUp,
  FaRobot,
  FaChartBar,
  FaExclamationTriangle,
  FaBalanceScale,
  FaChartLine,
} from "react-icons/fa";

const menuItems = [
  {
    id: "overall",
    title: "Overall Score",
    icon: <FaChartPie />,
  },
  {
    id: "summary",
    title: "Resume Summary",
    icon: <FaFileAlt />,
  },
  {
    id: "ats",
    title: "ATS Analysis",
    icon: <FaSearch />,
  },
  {
    id: "skills",
    title: "Skills",
    icon: <FaCode />,
  },
  {
    id: "experience",
    title: "Experience",
    icon: <FaBriefcase />,
  },
  {
    id: "education",
    title: "Education",
    icon: <FaGraduationCap />,
  },
  {
    id: "projects",
    title: "Projects",
    icon: <FaProjectDiagram />,
  },
  {
    id: "keywords",
    title: "Keyword Match",
    icon: <FaLightbulb />,
  },
  {
    id: "missing",
    title: "Missing Skills",
    icon: <FaExclamationTriangle />,
  },
  {
    id: "strengths",
    title: "Strength & Weakness",
    icon: <FaBalanceScale />,
  },
  {
    id: "improvement",
    title: "Improvement Tips",
    icon: <FaArrowCircleUp />,
  },
  {
    id: "recommendations",
    title: "AI Recommendation",
    icon: <FaRobot />,
  },
  {
    id: "charts",
    title: "Analytics",
    icon: <FaChartBar />,
  },
];

function AnalysisSidebar({
  score = 87,
  activeSection,
  setActiveSection,
}) {
  return (
    <aside className="sticky top-6">

      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl">

        {/* Header */}

        <div className="mb-6 px-2">

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-500">
            Resume Intelligence
          </p>

          <h2 className="mt-2 text-2xl font-black text-slate-800">
            Analysis
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Explore your AI-generated resume insights.
          </p>

        </div>

        {/* Score Card */}

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-sky-900 p-6 text-white">

          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-sky-400/20 blur-2xl" />

          <div className="relative">

            <div className="flex items-center justify-between">

              <p className="text-sm text-slate-300">
                Overall ATS Score
              </p>

              <FaChartLine className="text-sky-300" />

            </div>

            <h1 className="mt-3 text-5xl font-black">
              {score}
              <span className="text-2xl text-sky-300">
                %
              </span>
            </h1>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/20">

              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-300 to-blue-400 transition-all duration-700"
                style={{
                  width: `${score}%`,
                }}
              />

            </div>

            <p className="mt-3 text-xs text-slate-300">
              Excellent ATS compatibility
            </p>

          </div>

        </div>

        {/* Navigation */}

        <nav className="mt-6 space-y-1">

          {menuItems.map((item) => {

            const isActive =
              activeSection === item.id;

            return (

              <button
                key={item.id}
                onClick={() =>
                  setActiveSection(item.id)
                }
                className={`group flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left transition-all duration-300 ${
                  isActive
                    ? "bg-sky-50 text-sky-600 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >

                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg transition ${
                    isActive
                      ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30"
                      : "bg-slate-100 text-slate-500 group-hover:bg-sky-100 group-hover:text-sky-600"
                  }`}
                >
                  {item.icon}
                </span>

                <span className="font-semibold">
                  {item.title}
                </span>

              </button>

            );

          })}

        </nav>

        {/* AI Status */}

        <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50 p-5">

          <h3 className="mb-4 font-bold text-sky-700">
            AI Status
          </h3>

          <div className="space-y-3 text-sm">

            <div className="flex justify-between">

              <span className="text-slate-500">
                Resume Quality
              </span>

              <span className="font-bold text-emerald-600">
                Excellent
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-slate-500">
                ATS Ready
              </span>

              <span className="font-bold text-emerald-600">
                Yes
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-slate-500">
                Recruiter Match
              </span>

              <span className="font-bold text-sky-600">
                90%
              </span>

            </div>

          </div>

        </div>



      </div>

    </aside>
  );
}

export default AnalysisSidebar;