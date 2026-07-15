import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaUpload,
  FaPenFancy,
  FaBriefcase,
} from "react-icons/fa";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-r from-white via-sky-50 to-blue-100 pt-36 pb-24">

      {/* Background Blur */}

      <div className="absolute -top-40 -left-40 w-[450px] h-[450px] bg-sky-300/30 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-6 py-2 rounded-full font-semibold">

              ✨ AI-Powered Career Platform

            </div>

            <h1 className="mt-8 text-6xl lg:text-7xl font-black leading-tight text-slate-900">

              Build Smarter

              <span className="block bg-linear-to-r from-sky-500 to-blue-700 bg-clip-text text-transparent">

                Resumes.

              </span>

              Match Better

              <span className="text-blue-600">

                {" "}Jobs.

              </span>

            </h1>

            <p className="text-xl text-slate-600 leading-9 mt-8 max-w-xl">

              Create ATS-friendly resumes, analyze your skills using AI,
              optimize your resume score, and get personalized career
              recommendations — all in one platform.

            </p>

            {/* Buttons */}

            <div className="flex flex-wrap gap-5 mt-10">

              <button className="bg-linear-to-r from-sky-500 to-blue-700 text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-semibold shadow-xl hover:scale-105 transition">

                <FaPenFancy />

                Create Resume

              </button>

              <button className="border-2 border-blue-200 text-blue-700 px-8 py-4 rounded-2xl flex items-center gap-3 font-semibold hover:bg-blue-50 transition">

                <FaUpload />

                Upload Resume

              </button>

            </div>

            {/* Bottom Stats */}

            <div className="flex flex-wrap gap-8 mt-10">

              <div className="flex items-center gap-2">

                <FaCheckCircle className="text-green-500"/>

                <span className="font-medium text-slate-700">

                  100K+ Resumes Created

                </span>

              </div>

              <div className="flex items-center gap-2">

                <FaCheckCircle className="text-green-500"/>

                <span className="font-medium text-slate-700">

                  95% ATS Accuracy

                </span>

              </div>

              <div className="flex items-center gap-2">

                <FaCheckCircle className="text-green-500"/>

                <span className="font-medium text-slate-700">

                  500+ Job Roles

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

            <div className="absolute top-16 left-12 w-80 bg-white rounded-3xl shadow-2xl p-8">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-full bg-linear-to-r from-sky-500 to-blue-700"></div>

                <div className="space-y-2 flex-1">

                  <div className="h-3 bg-gray-200 rounded-full"></div>

                  <div className="h-3 bg-gray-200 rounded-full w-2/3"></div>

                </div>

              </div>

              <div className="space-y-4 mt-8">

                <div className="h-3 bg-gray-200 rounded-full"></div>

                <div className="h-3 bg-gray-200 rounded-full"></div>

                <div className="h-3 bg-blue-500 rounded-full w-4/5"></div>

                <div className="h-3 bg-blue-300 rounded-full w-3/4"></div>

              </div>

              <div className="flex gap-2 mt-8">

                <span className="bg-blue-100 px-3 py-1 rounded-full text-sm">

                  React

                </span>

                <span className="bg-blue-100 px-3 py-1 rounded-full text-sm">

                  TS

                </span>

                <span className="bg-blue-100 px-3 py-1 rounded-full text-sm">

                  Node

                </span>

              </div>

            </div>

            {/* ATS Score */}

            <div className="absolute top-8 right-0 bg-white rounded-2xl shadow-xl px-6 py-5">

              <h2 className="text-4xl font-black text-blue-600">

                94%

              </h2>

              <p className="font-semibold">

                ATS Score

              </p>

              <p className="text-sm text-gray-500">

                Excellent

              </p>

            </div>

            {/* Job Matches */}

            <div className="absolute left-0 top-[340px] bg-white rounded-full shadow-lg px-6 py-3">

              💼 24 Job Matches

            </div>

            {/* Improvements */}

            <div className="absolute left-28 bottom-24 bg-green-100 text-green-700 rounded-full px-6 py-3 font-medium">

              ✔ 3 Improvements Suggested

            </div>

            {/* Skill Match */}

            <div className="absolute right-0 bottom-10 bg-white rounded-3xl shadow-xl p-6 w-64">

              <h3 className="font-bold text-xl">

                Skill Match

              </h3>

              <div className="mt-5 space-y-4">

                <div>

                  <p className="text-sm mb-1">

                    React

                  </p>

                  <div className="h-2 bg-gray-200 rounded-full">

                    <div className="h-2 bg-blue-600 rounded-full w-[90%]"></div>

                  </div>

                </div>

                <div>

                  <p className="text-sm mb-1">

                    TypeScript

                  </p>

                  <div className="h-2 bg-gray-200 rounded-full">

                    <div className="h-2 bg-blue-500 rounded-full w-[82%]"></div>

                  </div>

                </div>

                <div>

                  <p className="text-sm mb-1">

                    AWS

                  </p>

                  <div className="h-2 bg-gray-200 rounded-full">

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