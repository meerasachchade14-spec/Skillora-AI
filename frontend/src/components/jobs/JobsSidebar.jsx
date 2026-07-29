import {
  FaFire,
  FaBuilding,
  FaBriefcase,
  FaChartLine,
  FaRobot,
} from "react-icons/fa";

function JobsSidebar() {

  return (

    <div className="sticky top-6 space-y-6">

      {/* AI Match */}

      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-[30px] p-7 text-white">

        <h3 className="text-xl font-black">

          AI Job Match

        </h3>

        <h1 className="text-6xl font-black mt-4">

          94%

        </h1>

        <p className="mt-4 text-sky-100">

          Excellent compatibility with Software Engineering roles.

        </p>

      </div>

      {/* Stats */}

      <div className="bg-white rounded-[30px] border border-slate-200 shadow-sm p-6">

        <h3 className="font-black text-xl mb-5">

          Job Statistics

        </h3>

        <div className="space-y-5">

          <div className="flex justify-between">

            <span className="text-slate-500">

              Matching Jobs

            </span>

            <span className="font-black text-blue-600">

              58

            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-slate-500">

              Saved Jobs

            </span>

            <span className="font-black">

              12

            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-slate-500">

              Applications

            </span>

            <span className="font-black">

              7

            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-slate-500">

              Interviews

            </span>

            <span className="font-black text-green-600">

              2

            </span>

          </div>

        </div>

      </div>

      {/* Trending */}

      <div className="bg-white rounded-[30px] border border-slate-200 shadow-sm p-6">

        <h3 className="font-black text-xl mb-5">

          Trending Roles

        </h3>

        <div className="space-y-4">

          {[
            "Frontend Developer",
            "React Developer",
            "Full Stack Engineer",
            "Software Engineer",
            "AI Engineer",
          ].map((role) => (

            <div
              key={role}
              className="flex items-center gap-3"
            >

              <FaFire className="text-orange-500"/>

              <span className="font-medium">

                {role}

              </span>

            </div>

          ))}

        </div>

      </div>

      {/* AI */}

      <div className="bg-blue-50 border border-blue-100 rounded-[30px] p-6">

        <div className="flex items-center gap-3 mb-3">

          <FaRobot className="text-blue-600 text-xl"/>

          <h3 className="font-black text-blue-700">

            AI Recruiter

          </h3>

        </div>

        <p className="text-slate-600 leading-7">

          Based on your profile, Skillora AI predicts a very high
          chance of getting shortlisted for Frontend and Full Stack
          Developer positions.

        </p>

      </div>

    </div>

  );

}

export default JobsSidebar;