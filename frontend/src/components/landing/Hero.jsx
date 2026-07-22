import { motion } from "framer-motion";
import {
FaCheckCircle,
FaUpload,
FaPenFancy,
} from "react-icons/fa";

function Hero({ darkMode }) {
return (
<section
id="home"
className={`relative overflow-hidden pt-36 pb-24 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800"
          : "bg-gradient-to-r from-white via-sky-50 to-blue-100"
      }`}
>

```
  {/* Background Blur */}

  <div
    className={`absolute -top-40 -left-40 w-[450px] h-[450px] rounded-full blur-3xl ${
      darkMode ? "bg-blue-900/30" : "bg-sky-300/30"
    }`}
  ></div>

  <div
    className={`absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl ${
      darkMode ? "bg-blue-900/30" : "bg-blue-200/40"
    }`}
  ></div>

  <div className="max-w-7xl mx-auto px-6 lg:px-10">

    <div className="grid lg:grid-cols-2 gap-16 items-center">

      {/* LEFT */}

      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >

        {/* Badge */}

        <div
          className={`inline-flex items-center gap-2 px-6 py-2 rounded-full font-semibold ${
            darkMode
              ? "bg-blue-900/40 text-blue-300"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          ✨ AI-Powered Resume Intelligence
        </div>

        {/* Heading */}

        <h1
          className={`mt-8 text-6xl lg:text-7xl font-black leading-tight ${
            darkMode ? "text-white" : "text-slate-900"
          }`}
        >
          Build Smarter

          <span className="block bg-gradient-to-r from-sky-500 to-blue-700 bg-clip-text text-transparent">
            Resumes.
          </span>

          Match Your

          <span className="text-blue-500">
            {" "}Potential.
          </span>
        </h1>

        {/* Description */}

        <p
          className={`text-xl leading-9 mt-8 max-w-xl ${
            darkMode ? "text-slate-300" : "text-slate-600"
          }`}
        >
          Build ATS-friendly resumes, analyze your skills with AI,
          discover skill gaps, and understand how well your profile
          matches your target job — all in one intelligent platform.
        </p>

        {/* Buttons */}

        <div className="flex flex-wrap gap-5 mt-10">

          <button className="bg-gradient-to-r from-sky-500 to-blue-700 text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-semibold shadow-xl hover:scale-105 transition">

            <FaPenFancy />

            Build Your Resume

          </button>

          <button
            className={`border-2 px-8 py-4 rounded-2xl flex items-center gap-3 font-semibold transition ${
              darkMode
                ? "border-blue-500 text-blue-300 hover:bg-blue-900/30"
                : "border-blue-200 text-blue-700 hover:bg-blue-50"
            }`}
          >

            <FaUpload />

            Analyze Your Resume

          </button>

        </div>

        {/* Highlights */}

        <div className="flex flex-wrap gap-8 mt-10">

          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-green-500" />

            <span
              className={`font-medium ${
                darkMode ? "text-slate-300" : "text-slate-700"
              }`}
            >
              AI Resume Analysis
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-green-500" />

            <span
              className={`font-medium ${
                darkMode ? "text-slate-300" : "text-slate-700"
              }`}
            >
              Skill Gap Detection
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-green-500" />

            <span
              className={`font-medium ${
                darkMode ? "text-slate-300" : "text-slate-700"
              }`}
            >
              Resume–Job Matching
            </span>
          </div>

        </div>

      </motion.div>

      {/* RIGHT */}

      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-[650px]"
      >

        {/* Resume Card */}

        <div
          className={`absolute top-16 left-12 w-80 rounded-3xl shadow-2xl p-8 transition-colors duration-500 ${
            darkMode ? "bg-slate-800" : "bg-white"
          }`}
        >

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-sky-500 to-blue-700"></div>

            <div className="space-y-2 flex-1">

              <div
                className={`h-3 rounded-full ${
                  darkMode ? "bg-slate-600" : "bg-gray-200"
                }`}
              ></div>

              <div
                className={`h-3 rounded-full w-2/3 ${
                  darkMode ? "bg-slate-600" : "bg-gray-200"
                }`}
              ></div>

            </div>

          </div>

          <div className="space-y-4 mt-8">

            <div
              className={`h-3 rounded-full ${
                darkMode ? "bg-slate-600" : "bg-gray-200"
              }`}
            ></div>

            <div
              className={`h-3 rounded-full ${
                darkMode ? "bg-slate-600" : "bg-gray-200"
              }`}
            ></div>

            <div className="h-3 bg-blue-500 rounded-full w-4/5"></div>

            <div className="h-3 bg-blue-300 rounded-full w-3/4"></div>

          </div>

          <div className="flex gap-2 mt-8">

            <span
              className={`px-3 py-1 rounded-full text-sm ${
                darkMode
                  ? "bg-blue-900/50 text-blue-300"
                  : "bg-blue-100 text-slate-700"
              }`}
            >
              React
            </span>

            <span
              className={`px-3 py-1 rounded-full text-sm ${
                darkMode
                  ? "bg-blue-900/50 text-blue-300"
                  : "bg-blue-100 text-slate-700"
              }`}
            >
              TS
            </span>

            <span
              className={`px-3 py-1 rounded-full text-sm ${
                darkMode
                  ? "bg-blue-900/50 text-blue-300"
                  : "bg-blue-100 text-slate-700"
              }`}
            >
              Node
            </span>

          </div>

        </div>

        {/* Resume Score */}

        <div
          className={`absolute top-8 right-0 rounded-2xl shadow-xl px-6 py-5 ${
            darkMode ? "bg-slate-800" : "bg-white"
          }`}
        >

          <h2 className="text-4xl font-black text-blue-500">
            94%
          </h2>

          <p
            className={`font-semibold ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Resume Score
          </p>

          <p
            className={`text-sm ${
              darkMode ? "text-slate-400" : "text-gray-500"
            }`}
          >
            AI Analysis
          </p>

        </div>

        {/* Job Matches */}

        <div
          className={`absolute left-0 top-[400px] rounded-full shadow-lg px-6 py-3 ${
            darkMode
              ? "bg-slate-800 text-slate-200"
              : "bg-white text-slate-800"
          }`}
        >
          🎯 87% Profile Match
        </div>

        {/* Improvements */}

        <div className="absolute left-28 bottom-24 bg-green-100 text-green-700 rounded-full px-6 py-3 font-medium">
          ✔ 3 AI Suggestions
        </div>

        {/* Skill Match */}

        <div
          className={`absolute right-0 bottom-10 rounded-3xl shadow-xl p-6 w-64 ${
            darkMode ? "bg-slate-800" : "bg-white"
          }`}
        >

          <h3
            className={`font-bold text-xl ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Skill Match
          </h3>

          <div className="mt-5 space-y-4">

            <div>

              <p
                className={`text-sm mb-1 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                React
              </p>

              <div
                className={`h-2 rounded-full ${
                  darkMode ? "bg-slate-600" : "bg-gray-200"
                }`}
              >
                <div className="h-2 bg-blue-600 rounded-full w-[90%]"></div>
              </div>

            </div>

            <div>

              <p
                className={`text-sm mb-1 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                TypeScript
              </p>

              <div
                className={`h-2 rounded-full ${
                  darkMode ? "bg-slate-600" : "bg-gray-200"
                }`}
              >
                <div className="h-2 bg-blue-500 rounded-full w-[82%]"></div>
              </div>

            </div>

            <div>

              <p
                className={`text-sm mb-1 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Python
              </p>

              <div
                className={`h-2 rounded-full ${
                  darkMode ? "bg-slate-600" : "bg-gray-200"
                }`}
              >
                <div className="h-2 bg-blue-400 rounded-full w-[65%]"></div>
              </div>

            </div>

          </div>

        </div>

      </motion.div>

    </div>

  </div>

</section>


);
}

export default Hero;
