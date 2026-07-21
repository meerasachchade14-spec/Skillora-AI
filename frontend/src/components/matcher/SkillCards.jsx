import {
  FaReact,
  FaPython,
  FaNodeJs,
  FaDatabase,
  FaAws,
  FaGitAlt,
} from "react-icons/fa";

const skills = [
  {
    name: "React.js",
    icon: <FaReact />,
    level: "Advanced",
    score: 95,
    color: "text-sky-500",
    bg: "bg-sky-50",
  },
  {
    name: "Python",
    icon: <FaPython />,
    level: "Advanced",
    score: 90,
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
  {
    name: "Node.js",
    icon: <FaNodeJs />,
    level: "Intermediate",
    score: 78,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    name: "MongoDB",
    icon: <FaDatabase />,
    level: "Intermediate",
    score: 82,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    name: "AWS",
    icon: <FaAws />,
    level: "Beginner",
    score: 58,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    name: "Git",
    icon: <FaGitAlt />,
    level: "Advanced",
    score: 91,
    color: "text-red-500",
    bg: "bg-red-50",
  },
];

function SkillCards() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-slate-800">
          Your Skills
        </h2>

        <p className="text-gray-500 mt-2">
          AI detected skills from your resume.
        </p>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {skills.map((skill, index) => (

          <div
            key={index}
            className="rounded-3xl border border-slate-200 hover:border-sky-400 hover:shadow-2xl transition-all duration-300 p-6"
          >

            <div
              className={`w-16 h-16 rounded-2xl ${skill.bg} flex items-center justify-center text-3xl ${skill.color}`}
            >
              {skill.icon}
            </div>

            <h3 className="text-xl font-bold text-slate-800 mt-5">
              {skill.name}
            </h3>

            <span className="inline-block mt-2 px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-semibold">
              {skill.level}
            </span>

            <div className="mt-6">

              <div className="flex justify-between mb-2">

                <span className="text-gray-500">
                  AI Confidence
                </span>

                <span className="font-bold text-sky-600">
                  {skill.score}%
                </span>

              </div>

              <div className="w-full bg-slate-200 rounded-full h-3">

                <div
                  className="bg-gradient-to-r from-sky-500 to-blue-600 h-3 rounded-full"
                  style={{
                    width: `${skill.score}%`,
                  }}
                ></div>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}

      <div className="mt-10 bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl text-white p-6">

        <h3 className="text-2xl font-bold">
          AI Recommendation
        </h3>

        <p className="mt-3 leading-7 text-sky-100">
          Your strongest skills are React, Git, and Python.
          Learning Docker, AWS, Kubernetes, and CI/CD will
          significantly improve your profile and increase your
          job match score.
        </p>

      </div>

    </div>
  );
}

export default SkillCards;