import {
  FaExclamationTriangle,
  FaPlusCircle,
  FaArrowUp,
} from "react-icons/fa";

const missingSkills = [
  {
    name: "Docker",
    priority: "High",
    color: "bg-red-100 text-red-600",
  },
  {
    name: "AWS",
    priority: "High",
    color: "bg-red-100 text-red-600",
  },
  {
    name: "Node.js",
    priority: "Medium",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    name: "GitHub Actions",
    priority: "Medium",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    name: "CI/CD",
    priority: "Low",
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Kubernetes",
    priority: "Low",
    color: "bg-green-100 text-green-600",
  },
];

function MissingSkills() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-7">

      {/* Header */}

      <div className="flex items-center gap-3 mb-6">

        <FaExclamationTriangle className="text-red-500 text-2xl" />

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Missing Skills
          </h2>

          <p className="text-gray-500">
            Skills required for this job but missing in your resume.
          </p>

        </div>

      </div>

      {/* Skill List */}

      <div className="space-y-4">

        {missingSkills.map((skill, index) => (

          <div
            key={index}
            className="flex justify-between items-center p-4 rounded-2xl border hover:border-sky-400 hover:shadow-md transition"
          >

            <div className="flex items-center gap-3">

              <FaPlusCircle className="text-sky-500" />

              <span className="font-semibold text-slate-700">
                {skill.name}
              </span>

            </div>

            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold ${skill.color}`}
            >
              {skill.priority}
            </span>

          </div>

        ))}

      </div>

      {/* AI Recommendation */}

      <div className="mt-8 bg-sky-50 rounded-2xl p-5">

        <div className="flex items-center gap-3 mb-3">

          <FaArrowUp className="text-sky-600 text-xl" />

          <h3 className="font-bold text-slate-800">
            AI Recommendation
          </h3>

        </div>

        <p className="text-gray-600 leading-7">
          Adding <b>Docker</b>, <b>AWS</b>, and <b>Node.js</b> to your
          resume can improve your overall skill match score from
          <span className="font-bold text-sky-600"> 87% </span>
          to approximately
          <span className="font-bold text-green-600"> 95%.</span>
        </p>

      </div>

    </div>
  );
}

export default MissingSkills;