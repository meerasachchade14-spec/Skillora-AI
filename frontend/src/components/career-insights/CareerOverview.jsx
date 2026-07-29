import {
  FaUserTie,
  FaBullseye,
  FaChartLine,
  FaCheckCircle,
  FaBrain,
  FaStar,
} from "react-icons/fa";

function CareerOverview() {
  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">

      {/* Hero */}

      <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 p-8 text-white">

        <div className="flex items-center gap-5">

          <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center backdrop-blur">

            <FaUserTie className="text-4xl" />

          </div>

          <div>

            <h2 className="text-4xl font-black">

              Career Overview

            </h2>

            <p className="text-sky-100 mt-2 text-lg">

              AI generated overview of your professional profile.

            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-8 space-y-8">

        {/* Summary */}

        <div>

          <div className="flex items-center gap-3 mb-4">

            <FaBrain className="text-blue-600 text-xl" />

            <h3 className="text-2xl font-bold text-slate-900">

              AI Summary

            </h3>

          </div>

          <p className="text-slate-600 leading-8">

            Based on your resume, projects and technical skills,
            you have a strong foundation in modern web development.
            Your profile is highly suitable for software engineering,
            frontend development and full stack development roles.
            Improving cloud technologies and backend architecture
            knowledge will further strengthen your employability.

          </p>

        </div>

        {/* Highlights */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

          <div className="rounded-3xl bg-blue-50 border border-blue-100 p-6">

            <FaBullseye className="text-blue-600 text-2xl mb-4" />

            <p className="text-slate-500 text-sm">

              Best Career Match

            </p>

            <h3 className="text-xl font-black mt-2">

              Full Stack Developer

            </h3>

          </div>

          <div className="rounded-3xl bg-green-50 border border-green-100 p-6">

            <FaChartLine className="text-green-600 text-2xl mb-4" />

            <p className="text-slate-500 text-sm">

              Growth Potential

            </p>

            <h3 className="text-xl font-black mt-2">

              Very High

            </h3>

          </div>

          <div className="rounded-3xl bg-yellow-50 border border-yellow-100 p-6">

            <FaStar className="text-yellow-500 text-2xl mb-4" />

            <p className="text-slate-500 text-sm">

              Industry Fit

            </p>

            <h3 className="text-xl font-black mt-2">

              91%

            </h3>

          </div>

          <div className="rounded-3xl bg-indigo-50 border border-indigo-100 p-6">

            <FaCheckCircle className="text-indigo-600 text-2xl mb-4" />

            <p className="text-slate-500 text-sm">

              Career Readiness

            </p>

            <h3 className="text-xl font-black mt-2">

              Excellent

            </h3>

          </div>

        </div>

        {/* Strength */}

        <div className="rounded-3xl bg-slate-50 p-8">

          <h3 className="text-2xl font-black text-slate-900 mb-5">

            Professional Strength

          </h3>

          <ul className="space-y-4">

            <li className="flex gap-3">

              <FaCheckCircle className="text-green-500 mt-1" />

              Strong React & Frontend Development skills.

            </li>

            <li className="flex gap-3">

              <FaCheckCircle className="text-green-500 mt-1" />

              Good project portfolio with practical implementations.

            </li>

            <li className="flex gap-3">

              <FaCheckCircle className="text-green-500 mt-1" />

              ATS optimized resume structure.

            </li>

            <li className="flex gap-3">

              <FaCheckCircle className="text-green-500 mt-1" />

              Excellent learning capability and adaptability.

            </li>

          </ul>

        </div>

      </div>

      {/* Bottom */}

      <div className="mx-8 mb-8 rounded-[28px] bg-gradient-to-r from-sky-600 to-blue-700 text-white p-8">

        <h3 className="text-2xl font-black mb-3">

          AI Career Insight

        </h3>

        <p className="text-sky-100 leading-8">

          Your profile demonstrates excellent potential for software
          engineering careers. Continue building advanced projects,
          strengthen backend technologies and improve interview
          preparation to maximize placement opportunities.

        </p>

      </div>

    </div>
  );
}

export default CareerOverview;