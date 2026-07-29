import {
  FaCode,
  FaStar,
  FaCheckCircle,
  FaArrowUp,
} from "react-icons/fa";

function SkillsAnalysis({ skills = [] }) {
  const skillData = [
    { name: "React.js", level: 95, category: "Frontend" },
    { name: "JavaScript", level: 92, category: "Programming" },
    { name: "Python", level: 88, category: "Programming" },
    { name: "Tailwind CSS", level: 90, category: "Frontend" },
    { name: "MongoDB", level: 82, category: "Database" },
    { name: "Git & GitHub", level: 86, category: "Tools" },
  ];

  return (
    <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm p-6 md:p-8">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">

        <div>
          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center">
              <FaCode className="text-blue-600 text-lg" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-900">
                Skills Analysis
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                AI detected technical skills from your resume
              </p>
            </div>

          </div>
        </div>

        <div className="px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold">
          {skills.length || skillData.length} Skills Found
        </div>

      </div>

      {/* SKILLS GRID */}
      <div className="grid md:grid-cols-2 gap-4">

        {skillData.map((skill, index) => (

          <div
            key={index}
            className="group rounded-2xl border border-slate-200 p-5 hover:border-blue-300 hover:shadow-md transition-all duration-300"
          >

            <div className="flex justify-between items-start mb-4">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center transition">
                  <FaCode className="text-blue-600" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">
                    {skill.name}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1">
                    {skill.category}
                  </p>
                </div>

              </div>

              <span className="text-sm font-black text-blue-600">
                {skill.level}%
              </span>

            </div>

            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">

              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-sky-400 transition-all duration-700"
                style={{
                  width: `${skill.level}%`,
                }}
              />

            </div>

            <div className="flex justify-between items-center mt-3">

              <span className="text-xs text-slate-400">
                Proficiency
              </span>

              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <FaArrowUp />
                Strong
              </span>

            </div>

          </div>

        ))}

      </div>

      {/* AI INSIGHT */}
      <div className="mt-8 rounded-2xl bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-100 p-6">

        <div className="flex items-center gap-3 mb-3">

          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
            <FaStar className="text-yellow-500" />
          </div>

          <div>
            <h3 className="font-black text-slate-900">
              AI Insight
            </h3>

            <p className="text-xs text-slate-500">
              Personalized skill analysis
            </p>
          </div>

        </div>

        <p className="text-sm text-slate-600 leading-7">
          Your resume demonstrates strong frontend development skills,
          especially in React.js, JavaScript and Tailwind CSS. Adding
          cloud, backend and DevOps technologies can significantly
          improve your ATS performance and career opportunities.
        </p>

      </div>

      {/* RECOMMENDED SKILLS */}
      <div className="mt-8">

        <div className="flex items-center justify-between mb-4">

          <div>
            <h3 className="font-black text-slate-900">
              Recommended Skills
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Skills that can strengthen your profile
            </p>
          </div>

        </div>

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
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold hover:bg-emerald-100 transition"
            >
              <FaCheckCircle className="text-emerald-500" />
              {skill}
            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default SkillsAnalysis;