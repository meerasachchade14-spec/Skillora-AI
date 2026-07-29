import {
  FaCloudUploadAlt,
  FaFileAlt,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";

function UploadCard() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 rounded-[32px] p-8 md:p-10 text-white shadow-xl shadow-blue-500/20">

      {/* Decorative Glow */}
      <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

        <div className="flex items-center gap-5">

          <div className="w-20 h-20 shrink-0 rounded-3xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-5xl shadow-lg">
            <FaCloudUploadAlt />
          </div>

          <div>

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-100">
              AI Resume Analyzer
            </p>

            <h1 className="text-3xl md:text-4xl font-black mt-2">
              Upload Your Resume
            </h1>

            <p className="mt-3 text-blue-100 max-w-2xl leading-relaxed">
              Upload your resume and let our AI analyze your ATS compatibility,
              skills, keywords and improvement opportunities.
            </p>

          </div>

        </div>

        <div className="hidden lg:flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4">

          <FaShieldAlt className="text-2xl text-cyan-200" />

          <div>
            <p className="font-bold text-sm">
              Secure Analysis
            </p>

            <p className="text-xs text-blue-100 mt-1">
              Your resume stays protected
            </p>
          </div>

        </div>

      </div>

      <div className="relative mt-8 flex flex-wrap gap-3">

        <div className="flex items-center gap-2 text-sm bg-white/10 rounded-xl px-4 py-2">
          <FaCheckCircle className="text-cyan-200" />
          ATS Score
        </div>

        <div className="flex items-center gap-2 text-sm bg-white/10 rounded-xl px-4 py-2">
          <FaCheckCircle className="text-cyan-200" />
          Skill Analysis
        </div>

        <div className="flex items-center gap-2 text-sm bg-white/10 rounded-xl px-4 py-2">
          <FaCheckCircle className="text-cyan-200" />
          Smart Suggestions
        </div>

      </div>

    </div>
  );
}

export default UploadCard;