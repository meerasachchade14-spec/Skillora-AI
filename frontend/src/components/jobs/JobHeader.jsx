import { FaBriefcase, FaRobot } from "react-icons/fa";

function JobHeader() {
  return (
    <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-[32px] p-10 text-white shadow-xl">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-black">

            Job Recommendations

          </h1>

          <p className="text-sky-100 mt-3 leading-7">

            AI-powered recommendations based on your resume,
            skills, projects and career goals.

          </p>

        </div>

        <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center">

          <FaBriefcase className="text-4xl"/>

        </div>

      </div>

      <div className="mt-8 flex items-center gap-3 bg-white/10 rounded-2xl p-5">

        <FaRobot className="text-2xl"/>

        <p>

          Our AI analyzed your profile and found
          <span className="font-bold"> 58 matching jobs </span>
          across top companies.

        </p>

      </div>

    </div>
  );
}

export default JobHeader;