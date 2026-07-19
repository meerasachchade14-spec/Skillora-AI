import {
  FaFileAlt,
  FaBriefcase,
  FaChartLine,
  FaCertificate,
  FaProjectDiagram,
  FaEye,
  FaBullseye,
} from "react-icons/fa";

const stats = [
  {
    title: "Total Resumes",
    value: "08",
    icon: <FaFileAlt />,
    color: "from-sky-500 to-blue-600",
  },
  {
    title: "Job Applications",
    value: "42",
    icon: <FaBriefcase />,
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Average ATS Score",
    value: "91%",
    icon: <FaChartLine />,
    color: "from-purple-500 to-indigo-600",
  },
  {
    title: "Certifications",
    value: "12",
    icon: <FaCertificate />,
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Projects",
    value: "18",
    icon: <FaProjectDiagram />,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Profile Views",
    value: "1.8K",
    icon: <FaEye />,
    color: "from-cyan-500 to-sky-600",
  },
  {
    title: "Skill Match",
    value: "94%",
    icon: <FaBullseye />,
    color: "from-teal-500 to-green-600",
  },
];

function ProfileStats() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-slate-800">
          Profile Statistics
        </h2>

        <p className="text-gray-500 mt-2">
          Your career progress at a glance.
        </p>

      </div>

      {/* Stats Grid */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {stats.map((item, index) => (

          <div
            key={index}
            className="bg-slate-50 rounded-2xl p-6 hover:shadow-xl transition duration-300"
          >

            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-3xl`}
            >
              {item.icon}
            </div>

            <h3 className="mt-5 text-gray-500 font-medium">
              {item.title}
            </h3>

            <h2 className="text-4xl font-bold text-slate-800 mt-2">
              {item.value}
            </h2>

            {/* Progress */}

            <div className="mt-5">

              <div className="w-full bg-gray-200 rounded-full h-2">

                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${item.color}`}
                  style={{
                    width: `${70 + index * 4}%`,
                  }}
                />

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Summary */}

      <div className="mt-10 bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl p-8 text-white">

        <h3 className="text-2xl font-bold">
          Overall Performance
        </h3>

        <p className="mt-4 leading-8">

          Your profile is performing exceptionally well. Resume quality,
          ATS compatibility, and project portfolio are above average.
          Continue adding certifications and applying to relevant jobs
          to further improve your career opportunities.

        </p>

      </div>

    </div>
  );
}

export default ProfileStats;