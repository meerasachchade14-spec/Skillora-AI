import {
  FaCode,
  FaUsers,
  FaLightbulb,
  FaComments,
  FaDatabase,
  FaCloud,
} from "react-icons/fa";

const skills = [
  {
    name: "JavaScript",
    level: 92,
    icon: <FaCode />,
    color: "from-sky-500 to-blue-600",
  },
  {
    name: "React.js",
    level: 90,
    icon: <FaCode />,
    color: "from-cyan-500 to-sky-500",
  },
  {
    name: "Python",
    level: 88,
    icon: <FaCode />,
    color: "from-indigo-500 to-blue-600",
  },
  {
    name: "MongoDB",
    level: 78,
    icon: <FaDatabase />,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "AWS",
    level: 52,
    icon: <FaCloud />,
    color: "from-orange-500 to-yellow-500",
  },
  {
    name: "Communication",
    level: 85,
    icon: <FaComments />,
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "Problem Solving",
    level: 91,
    icon: <FaLightbulb />,
    color: "from-violet-500 to-purple-600",
  },
  {
    name: "Team Work",
    level: 87,
    icon: <FaUsers />,
    color: "from-blue-500 to-indigo-500",
  },
];

function SkillProgress() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-slate-800">
          Skill Proficiency
        </h2>

        <p className="text-gray-500 mt-2">
          AI evaluated your current skill level for every important technology.
        </p>

      </div>

      {/* Skills */}

      <div className="space-y-6">

        {skills.map((skill, index) => (

          <div key={index}>

            <div className="flex justify-between items-center mb-2">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-sky-600">

                  {skill.icon}

                </div>

                <span className="font-semibold text-slate-700">
                  {skill.name}
                </span>

              </div>

              <span className="font-bold text-sky-600">
                {skill.level}%
              </span>

            </div>

            <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">

              <div
                className={`h-4 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-700`}
                style={{
                  width: `${skill.level}%`,
                }}
              ></div>

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="bg-sky-50 rounded-2xl p-6 text-center">

          <h3 className="text-4xl font-bold text-sky-600">
            8
          </h3>

          <p className="text-gray-500 mt-2">
            Strong Skills
          </p>

        </div>

        <div className="bg-yellow-50 rounded-2xl p-6 text-center">

          <h3 className="text-4xl font-bold text-yellow-600">
            3
          </h3>

          <p className="text-gray-500 mt-2">
            Need Improvement
          </p>

        </div>

        <div className="bg-green-50 rounded-2xl p-6 text-center">

          <h3 className="text-4xl font-bold text-green-600">
            87%
          </h3>

          <p className="text-gray-500 mt-2">
            Overall Readiness
          </p>

        </div>

      </div>

    </div>
  );
}

export default SkillProgress;