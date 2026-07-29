import {
  FaRobot,
  FaLightbulb,
  FaArrowUp,
  FaCheckCircle,
} from "react-icons/fa";

function JobInsights() {
  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">

      <div className="flex items-center gap-4 mb-8">

        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">

          <FaRobot className="text-blue-600 text-2xl"/>

        </div>

        <div>

          <h2 className="text-2xl font-black">

            AI Job Insights

          </h2>

          <p className="text-slate-500 mt-1">

            Personalized recommendations from Skillora AI

          </p>

        </div>

      </div>

      <div className="space-y-5">

        <div className="flex gap-4">

          <FaCheckCircle className="text-green-500 text-xl mt-1"/>

          <div>

            <h4 className="font-bold">

              Excellent Frontend Profile

            </h4>

            <p className="text-slate-500 leading-7">

              Your React and Tailwind projects make you highly suitable
              for modern frontend development roles.

            </p>

          </div>

        </div>

        <div className="flex gap-4">

          <FaArrowUp className="text-blue-600 text-xl mt-1"/>

          <div>

            <h4 className="font-bold">

              Increase Match Score

            </h4>

            <p className="text-slate-500 leading-7">

              Learning Docker, AWS and TypeScript can improve your
              recruiter match from 94% to nearly 98%.

            </p>

          </div>

        </div>

        <div className="flex gap-4">

          <FaLightbulb className="text-yellow-500 text-xl mt-1"/>

          <div>

            <h4 className="font-bold">

              Resume Recommendation

            </h4>

            <p className="text-slate-500 leading-7">

              Highlight measurable achievements and quantify project
              impact to increase recruiter attention.

            </p>

          </div>

        </div>

      </div>

      <div className="mt-8 rounded-3xl bg-gradient-to-r from-sky-500 to-blue-600 text-white p-7">

        <h3 className="text-xl font-black mb-3">

          AI Career Advice

        </h3>

        <p className="text-sky-100 leading-8">

          Apply for Product-Based Companies first, continue building
          full-stack projects and maintain GitHub consistency for
          stronger placement opportunities.

        </p>

      </div>

    </div>
  );
}

export default JobInsights;