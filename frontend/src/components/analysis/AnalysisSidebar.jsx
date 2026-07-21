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
} from "react-icons/fa";

const menuItems = [
  {
    icon: <FaChartPie />,
    title: "Overall Score",
    color: "bg-sky-100 text-sky-600",
  },
  {
    icon: <FaFileAlt />,
    title: "Resume Summary",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: <FaSearch />,
    title: "ATS Analysis",
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    icon: <FaCode />,
    title: "Skills",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    icon: <FaBriefcase />,
    title: "Experience",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: <FaGraduationCap />,
    title: "Education",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: <FaProjectDiagram />,
    title: "Projects",
    color: "bg-pink-100 text-pink-600",
  },
  {
    icon: <FaLightbulb />,
    title: "Keyword Match",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: <FaArrowCircleUp />,
    title: "Improvement Tips",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: <FaRobot />,
    title: "AI Recommendation",
    color: "bg-slate-200 text-slate-700",
  },
];

function AnalysisSidebar() {
  return (
    <div className="sticky top-6">

      <div className="bg-white rounded-3xl shadow-xl p-6">

        {/* Heading */}

        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Analysis
        </h2>

        <p className="text-gray-500 mb-6">
          Navigate through all resume reports.
        </p>

        {/* Score Card */}

        <div className="rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white p-5 mb-8">

          <p className="text-sm opacity-90">
            Overall ATS Score
          </p>

          <h1 className="text-5xl font-bold mt-2">
            88%
          </h1>

          <div className="mt-4 h-2 bg-white/30 rounded-full overflow-hidden">

            <div
              className="h-full bg-white rounded-full"
              style={{ width: "88%" }}
            />

          </div>

        </div>

        {/* Navigation */}

        <div className="space-y-3">

          {menuItems.map((item, index) => (

            <button
              key={index}
              className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all duration-300 text-left"
            >

              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg ${item.color}`}
              >
                {item.icon}
              </div>

              <span className="font-medium text-slate-700">
                {item.title}
              </span>

            </button>

          ))}

        </div>

        {/* AI Status */}

        <div className="mt-8 rounded-2xl bg-sky-50 border border-sky-100 p-5">

          <h3 className="font-bold text-sky-700 mb-3">
            AI Status
          </h3>

          <div className="flex justify-between mb-2">

            <span className="text-gray-600">
              Resume Quality
            </span>

            <span className="font-bold text-sky-600">
              Excellent
            </span>

          </div>

          <div className="flex justify-between mb-2">

            <span className="text-gray-600">
              ATS Ready
            </span>

            <span className="font-bold text-green-600">
              Yes
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-600">
              Recruiter Match
            </span>

            <span className="font-bold text-sky-600">
              90%
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AnalysisSidebar;