import {
  FaCode,
  FaDatabase,
  FaReact,
  FaPython,
  FaBrain,
} from "react-icons/fa";

const skills = [
  {
    name: "React.js",
    score: 95,
    icon: <FaReact className="text-sky-500" />,
  },
  {
    name: "Python",
    score: 90,
    icon: <FaPython className="text-yellow-500" />,
  },
  {
    name: "SQL / MongoDB",
    score: 82,
    icon: <FaDatabase className="text-green-500" />,
  },
  {
    name: "Machine Learning",
    score: 76,
    icon: <FaBrain className="text-purple-500" />,
  },
  {
    name: "JavaScript",
    score: 92,
    icon: <FaCode className="text-blue-500" />,
  },
];

function SkillChart() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-7">

      {/* Header */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-slate-800">
          Skill Match Analysis
        </h2>

        <p className="text-gray-500 mt-2">
          AI compared your resume skills with the job requirements.
        </p>

      </div>

      {/* Skills */}

      <div className="space-y-7">

        {skills.map((skill, index) => (

          <div key={index}>

            <div className="flex justify-between items-center mb-3">

              <div className="flex items-center gap-3">

                <div className="text-2xl">
                  {skill.icon}
                </div>

                <span className="font-semibold text-slate-700">
                  {skill.name}
                </span>

              </div>

              <span className="font-bold text-sky-600">
                {skill.score}%
              </span>

            </div>

            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">

              <div
                className="h-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-700"
                style={{
                  width: `${skill.score}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}

      <div className="mt-10 bg-sky-50 rounded-2xl p-5">

        <h3 className="font-bold text-slate-800 mb-2">
          AI Insight
        </h3>

        <p className="text-gray-600 leading-7">
          Your strongest skills are <b>React</b>, <b>JavaScript</b>, and
          <b> Python</b>. Improving your <b>Machine Learning</b> and
          <b> Database</b> expertise can significantly increase your job
          matching score.
        </p>

      </div>

    </div>
  );
}

export default SkillChart;