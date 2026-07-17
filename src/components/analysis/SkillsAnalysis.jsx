import {
  FaCode,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";

function SkillsAnalysis({ skills }) {

  const skillData = [
    { name: "React.js", level: 95 },
    { name: "JavaScript", level: 92 },
    { name: "Python", level: 88 },
    { name: "Tailwind CSS", level: 90 },
    { name: "MongoDB", level: 82 },
    { name: "Git & GitHub", level: 86 },
  ];

  return (

    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">

            Skills Analysis

          </h2>

          <p className="text-gray-500 mt-2">

            AI detected technical skills from your resume.

          </p>

        </div>

        <div className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full font-semibold">

          {skills.length} Skills Found

        </div>

      </div>

      {/* Skills */}

      <div className="space-y-6">

        {skillData.map((skill, index) => (

          <div key={index}>

            <div className="flex justify-between items-center mb-2">

              <div className="flex items-center gap-3">

                <FaCode className="text-sky-500" />

                <span className="font-semibold text-slate-700">

                  {skill.name}

                </span>

              </div>

              <span className="font-bold text-sky-600">

                {skill.level}%

              </span>

            </div>

            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">

              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-700"
                style={{
                  width: `${skill.level}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

      {/* AI Insight */}

      <div className="mt-10 bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-6 border border-sky-100">

        <div className="flex items-center gap-3 mb-4">

          <FaStar className="text-yellow-500 text-2xl" />

          <h3 className="text-xl font-bold text-slate-800">

            AI Insight

          </h3>

        </div>

        <p className="text-gray-600 leading-7">

          Your resume demonstrates strong frontend development
          skills with React.js, JavaScript and Tailwind CSS.
          Adding technologies like Docker, AWS, TypeScript,
          Node.js and CI/CD will significantly improve your
          ATS score and increase your chances of getting
          shortlisted.

        </p>

      </div>

      {/* Recommended Skills */}

      <div className="mt-8">

        <h3 className="text-lg font-bold text-slate-800 mb-5">

          Recommended Skills

        </h3>

        <div className="flex flex-wrap gap-3">

          {[
            "Docker",
            "AWS",
            "Node.js",
            "TypeScript",
            "CI/CD",
            "REST API",
            "Express.js",
            "Redux",
          ].map((skill, index) => (

            <div
              key={index}
              className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full font-medium"
            >

              <FaCheckCircle />

              {skill}

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default SkillsAnalysis;