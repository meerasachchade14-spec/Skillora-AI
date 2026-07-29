import {
  FaRobot,
  FaRocket,
  FaLightbulb,
  FaArrowRight,
} from "react-icons/fa";

const suggestions = [

  "Focus on Full Stack Development",

  "Practice DSA for Product Companies",

  "Deploy 3 Real World Projects",

  "Learn Docker & AWS",

  "Prepare for Technical Interviews",

];

function AIMentor() {

  return (

    <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 p-8">

      <div className="rounded-3xl bg-gradient-to-r from-sky-500 to-blue-700 text-white p-8">

        <div className="flex items-center gap-4 mb-6">

          <FaRobot className="text-5xl" />

          <div>

            <h2 className="text-3xl font-black">

              AI Learning Mentor

            </h2>

            <p className="text-blue-100">

              Personalized roadmap guidance

            </p>

          </div>

        </div>

        <p className="leading-8 text-blue-100">

          Based on your current progress, your strongest career path is Full Stack Development. Continue mastering React, Backend Development, Cloud and DSA to maximize placement opportunities.

        </p>

      </div>

      <div className="grid md:grid-cols-2 gap-5 mt-8">

        {suggestions.map((item, index) => (

          <div

            key={index}

            className="rounded-2xl border border-slate-200 p-5 hover:border-blue-500 hover:shadow-lg transition"

          >

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-3">

                <FaLightbulb className="text-yellow-500" />

                <span className="font-semibold">

                  {item}

                </span>

              </div>

              <FaArrowRight className="text-blue-600" />

            </div>

          </div>

        ))}

      </div>

      <div className="mt-10 rounded-3xl bg-blue-50 border border-blue-100 p-8">

        <div className="flex items-center gap-4">

          <FaRocket className="text-blue-600 text-4xl" />

          <div>

            <h3 className="text-2xl font-black text-slate-900">

              Final AI Advice

            </h3>

            <p className="mt-3 text-slate-600 leading-8">

              Stay consistent, build real-world projects, contribute to GitHub, strengthen DSA, and prepare for interviews alongside roadmap completion. These habits will make your profile highly competitive for software engineering internships and placements.

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AIMentor;