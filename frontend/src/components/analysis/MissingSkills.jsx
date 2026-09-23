import {
  FaArrowUp,
  FaBookOpen,
  FaBrain,
  FaCloud,
  FaDocker,
  FaCheckCircle,
} from "react-icons/fa";


function MissingSkills({ skills = [], skillGapAnalysis = {}, learningRoadmap = {} }) {

  const missingSkillsData = skillGapAnalysis?.missing_skills || [];
  
  const displayedSkills = missingSkillsData.length
    ? missingSkillsData.map((item) => ({
        name: item.skill,
        demand: item.category || "High",
        priority: item.priority === "high" ? 95 : item.priority === "medium" ? 75 : 50,
        color: item.priority === "high" ? "bg-red-500" : item.priority === "medium" ? "bg-orange-500" : "bg-blue-500",
      }))
    : [];



  return (

    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-6 md:p-8">


      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">

        <div>

          <div className="flex items-center gap-3 mb-3">

            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">

              <FaBrain className="text-red-500 text-xl" />

            </div>


            <div>

              <h2 className="text-2xl md:text-3xl font-black text-slate-900">

                Missing Skills

              </h2>


              <p className="text-slate-500 mt-1">

                Skills that could improve your career opportunities.

              </p>

            </div>

          </div>

        </div>


        <div className="px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 text-sm font-bold">

          Priority Analysis

        </div>

      </div>


      <div className="space-y-5">

        {displayedSkills.map((skill, index) => (

          <div

            key={index}

            className="rounded-3xl border border-slate-200 p-6 hover:shadow-lg transition"

          >

            <div className="flex justify-between items-center">

              <div>

                <h3 className="text-lg font-black text-slate-800">

                  {skill.name}

                </h3>

                <p className="text-slate-500 mt-1">

                  Market Demand: {skill.demand}

                </p>

              </div>


              <div className="text-right">

                <div className="text-2xl font-black text-blue-600">

                  {skill.priority}%

                </div>

                <p className="text-xs text-slate-500">

                  Priority

                </p>

              </div>

            </div>


            <div className="mt-5 h-3 bg-slate-100 rounded-full overflow-hidden">

              <div

                className={`h-full ${skill.color} rounded-full`}

                style={{

                  width: `${skill.priority}%`,

                }}

              />

            </div>

          </div>

        ))}

      </div>


      <div className="mt-10 rounded-3xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 p-7">

        <div className="flex items-center gap-3 mb-4">

          <FaBrain className="text-blue-600 text-xl" />

          <h3 className="text-xl font-black text-slate-900">

            AI Skill Gap Insight

          </h3>

        </div>


        <p className="text-slate-600 leading-8">

          Your current profile has a strong frontend foundation.

          The highest-impact improvements would be cloud computing,

          backend development, containerization and deployment.

        </p>

      </div>


      <div className="mt-10">

        <div className="flex items-center gap-3 mb-5">

          <FaBookOpen className="text-blue-600 text-xl" />

          <h3 className="text-xl font-black text-slate-900">

            Recommended Learning Path

          </h3>

        </div>


        <div className="grid md:grid-cols-2 gap-5">
          {(learningRoadmap?.roadmap || []).slice(0, 4).map((item, index) => (
            <div key={index} className="rounded-3xl bg-slate-50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <FaBookOpen className="text-blue-500 text-2xl" />
                <h4 className="font-black capitalize">{item.skill}</h4>
              </div>
              <p className="text-slate-600 text-sm mb-2">Duration: {item.estimated_duration}</p>
              <ul className="text-slate-500 text-xs list-disc list-inside">
                {(item.topics || []).slice(0, 3).map((topic, i) => (
                  <li key={i}>{topic}</li>
                ))}
              </ul>
            </div>
          ))}
          {!(learningRoadmap?.roadmap?.length > 0) && (
            <p className="text-slate-500">No learning roadmap available.</p>
          )}
        </div>
      </div>


      <div className="mt-10 rounded-3xl bg-emerald-50 border border-emerald-100 p-7">

        <h3 className="text-xl font-black text-emerald-800 mb-5">

          Quick Wins

        </h3>


        <div className="space-y-4">

          {[

            "Learn Docker fundamentals",

            "Deploy one project to the cloud",

            "Add TypeScript to a React project",

            "Learn GitHub Actions",

          ].map((tip, index) => (

            <div

              key={index}

              className="flex items-center gap-3 text-emerald-700"

            >

              <FaCheckCircle />

              <span className="font-medium">

                {tip}

              </span>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}


export default MissingSkills;