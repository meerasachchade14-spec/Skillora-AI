import { useRef, useState } from "react";
import {
  FaCloudUploadAlt,
  FaFilePdf,
  FaFileWord,
  FaCheckCircle,
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
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Heading */}

      <div className="text-center mb-8">

        <div className="w-20 h-20 rounded-full bg-sky-100 flex items-center justify-center mx-auto mb-5">

          <FaCloudUploadAlt className="text-4xl text-sky-600" />

        </div>

        <h2 className="text-3xl font-bold text-slate-800">

          Upload Another Resume

        </h2>

        <p className="text-gray-500 mt-3">

          Upload a new resume to generate another AI analysis.

        </p>

      </div>

      {/* Upload Box */}

      <div
        onClick={() => inputRef.current.click()}
        className="border-2 border-dashed border-sky-300 rounded-3xl p-12 cursor-pointer hover:border-sky-500 hover:bg-sky-50 transition-all duration-300"
      >

        <div className="text-center">

          <FaCloudUploadAlt className="text-6xl text-sky-500 mx-auto mb-5" />

          <h3 className="text-xl font-bold text-slate-700">

            Drag & Drop Resume Here

          </h3>

          <p className="text-gray-500 mt-3">

            or click to browse your computer

          </p>

          <button
            className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold hover:scale-105 transition"
          >
            Browse Resume
          </button>

        </div>

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

        <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center gap-4">

          <FaCheckCircle className="text-3xl text-green-500" />

          <div>

            <h3 className="font-bold text-green-700">

              Resume Selected

            </h3>

            <p className="text-gray-600">

              {fileName}

            </p>

          </div>

        </div>

      )}

      {/* Supported Files */}

      <div className="grid md:grid-cols-2 gap-5 mt-10">

        <div className="rounded-2xl bg-red-50 p-5 flex items-center gap-4">

          <FaFilePdf className="text-4xl text-red-500" />

          <div>

            <h3 className="font-bold">

              PDF Resume

            </h3>

            <p className="text-gray-500 text-sm">

              Preferred format for ATS analysis

            </p>

          </div>

        </div>

        <div className="rounded-2xl bg-blue-50 p-5 flex items-center gap-4">

          <FaFileWord className="text-4xl text-blue-600" />

          <div>

            <h3 className="font-bold">

              DOC / DOCX

            </h3>

            <p className="text-gray-500 text-sm">

              Microsoft Word documents supported

            </p>

          </div>

        </div>

      </div>

      {/* Bottom Card */}

      <div className="mt-10 rounded-3xl bg-gradient-to-r from-sky-500 to-blue-600 text-white p-8">

        <h3 className="text-2xl font-bold mb-4">

          AI Resume Analysis

        </h3>

        <p className="leading-8 text-sky-100">

          Upload your latest resume to receive a complete ATS score,
          keyword matching, recruiter insights, missing skills,
          AI recommendations, and personalized improvement tips.

        </p>

      </div>

    </div>
  );
}

export default UploadAnotherResume;