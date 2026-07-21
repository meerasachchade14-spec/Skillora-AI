import { useRef, useState } from "react";
import {
  FaCloudUploadAlt,
  FaFileAlt,
  FaRobot,
  FaBriefcase,
} from "react-icons/fa";

function UploadJobDescription() {
  const fileInput = useRef(null);

  const [jobDescription, setJobDescription] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center">

          <FaBriefcase className="text-2xl text-sky-600" />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Job Description
          </h2>

          <p className="text-gray-500">
            Paste or upload the job description to compare with your resume.
          </p>

        </div>

      </div>

      {/* Textarea */}

      <textarea
        rows={10}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste the complete job description here..."
        className="w-full rounded-2xl border border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none p-5 resize-none"
      />

      {/* OR */}

      <div className="flex items-center gap-5 my-8">

        <div className="flex-1 border-t"></div>

        <span className="text-gray-400 font-semibold">
          OR
        </span>

        <div className="flex-1 border-t"></div>

      </div>

      {/* Upload */}

      <div
        onClick={() => fileInput.current.click()}
        className="border-2 border-dashed border-sky-300 rounded-3xl p-10 text-center cursor-pointer hover:bg-sky-50 hover:border-sky-500 transition"
      >

        <FaCloudUploadAlt className="text-5xl text-sky-500 mx-auto mb-4" />

        <h3 className="text-xl font-bold text-slate-700">
          Upload Job Description
        </h3>

        <p className="text-gray-500 mt-2">
          PDF • DOCX • TXT
        </p>

        <button
          className="mt-6 px-7 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold hover:scale-105 transition"
        >
          Browse File
        </button>

        <input
          ref={fileInput}
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          className="hidden"
          onChange={handleFile}
        />

      </div>

      {/* Selected */}

      {fileName && (

        <div className="mt-6 rounded-2xl bg-green-50 border border-green-200 p-5">

          <div className="flex items-center gap-3">

            <FaFileAlt className="text-green-600 text-2xl" />

            <div>

              <p className="font-bold text-green-700">
                Uploaded Successfully
              </p>

              <p className="text-gray-600">
                {fileName}
              </p>

            </div>

          </div>

        </div>

      )}

      {/* Analyze */}

      <button
        className="mt-8 w-full flex items-center justify-center gap-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] transition"
      >

        <FaRobot />

        Analyze Skill Match

      </button>

    </div>
  );
}

export default UploadJobDescription;