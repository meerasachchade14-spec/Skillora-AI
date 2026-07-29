import {
  FaBullseye,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowUp,
} from "react-icons/fa";

function JobMatchScore() {
  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">

      <div className="flex items-center gap-4 mb-8">

        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">

          <FaBullseye className="text-blue-600 text-2xl"/>

        </div>

        <div>

          <h2 className="text-2xl font-black text-slate-900">

            AI Job Match Analysis

          </h2>

          <p className="text-slate-500 mt-1">

            Why these jobs are recommended for you

          </p>

        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="rounded-3xl bg-gradient-to-r from-sky-500 to-blue-600 text-white p-7">

          <p className="text-sky-100">

            Overall Compatibility

          </p>

          <h1 className="text-6xl font-black mt-2">

            94%

          </h1>

          <p className="mt-4 text-sky-100 leading-7">

            Excellent compatibility based on your resume,
            skills and projects.

          </p>

        </div>

        <div className="space-y-5">

          <div className="flex items-center gap-4">

            <FaCheckCircle className="text-green-500 text-xl"/>

            <div>

              <h4 className="font-bold">

                Strong React Skills

              </h4>

              <p className="text-sm text-slate-500">

                Matches 92% of Frontend jobs.

              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <FaCheckCircle className="text-green-500 text-xl"/>

            <div>

              <h4 className="font-bold">

                Modern Projects

              </h4>

              <p className="text-sm text-slate-500">

                Recruiters prefer project-based profiles.

              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <FaTimesCircle className="text-red-500 text-xl"/>

            <div>

              <h4 className="font-bold">

                Missing Cloud Skills

              </h4>

              <p className="text-sm text-slate-500">

                Docker & AWS can improve your score.

              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <FaArrowUp className="text-blue-600 text-xl"/>

            <div>

              <h4 className="font-bold">

                Potential Increase

              </h4>

              <p className="text-sm text-slate-500">

                Learn TypeScript to reach 98% match.

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default JobMatchScore;