import { useRef, useState } from "react";
import {
  FaCloudUploadAlt,
  FaFilePdf,
  FaFileWord,
  FaCheckCircle,
  FaBolt,
} from "react-icons/fa";

function UploadAnotherResume() {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl">

      {/* Top Gradient Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-sky-900 px-8 py-14 text-center text-white">

        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative">

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-xl">

            <FaCloudUploadAlt className="text-4xl text-sky-300" />

          </div>

          <h2 className="text-3xl font-black">
            Analyze Another Resume
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Upload a new resume and get instant AI-powered insights,
            ATS scoring, skill analysis and career recommendations.
          </p>

        </div>

      </div>

      <div className="p-8">

        {/* Upload Area */}
        <div
          onClick={() => inputRef.current.click()}
          className="group cursor-pointer rounded-3xl border-2 border-dashed border-sky-200 bg-sky-50/50 p-12 text-center transition-all duration-300 hover:border-sky-500 hover:bg-sky-50"
        >

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-lg transition group-hover:scale-110">

            <FaCloudUploadAlt className="text-4xl text-sky-500" />

          </div>

          <h3 className="mt-6 text-xl font-bold text-slate-800">
            Drop your resume here
          </h3>

          <p className="mt-2 text-slate-500">
            PDF, DOC or DOCX files supported
          </p>

          <button
            type="button"
            className="mt-6 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-8 py-3 font-bold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-1"
          >
            Browse Files
          </button>

          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFile}
          />

        </div>

        {/* Selected File */}
        {fileName && (
          <div className="mt-6 flex items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
              <FaCheckCircle className="text-2xl text-emerald-500" />
            </div>

            <div>
              <p className="font-bold text-emerald-700">
                Resume Ready
              </p>

              <p className="text-sm text-slate-600">
                {fileName}
              </p>
            </div>

          </div>
        )}

        {/* Supported Formats */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">

          <div className="flex items-center gap-4 rounded-2xl border border-red-100 bg-red-50 p-5">

            <FaFilePdf className="text-3xl text-red-500" />

            <div>
              <p className="font-bold text-slate-800">
                PDF
              </p>

              <p className="text-sm text-slate-500">
                Best for ATS analysis
              </p>
            </div>

          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-5">

            <FaFileWord className="text-3xl text-blue-600" />

            <div>
              <p className="font-bold text-slate-800">
                DOC / DOCX
              </p>

              <p className="text-sm text-slate-500">
                Microsoft Word format
              </p>
            </div>

          </div>

        </div>

        {/* Feature Strip */}
        <div className="mt-8 flex items-center gap-4 rounded-2xl bg-slate-950 p-6 text-white">

          <FaBolt className="text-2xl text-sky-400" />

          <div>
            <h3 className="font-bold">
              Instant AI Analysis
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Get your ATS score, missing skills, keyword analysis
              and personalized career recommendations.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default UploadAnotherResume;