import { useRef, useState } from "react";
import {
  FaCloudUploadAlt,
  FaFileAlt,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";

function UploadArea({ onFileSelect }) {
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    const validExtensions = [".pdf", ".doc", ".docx"];

    const fileName = selectedFile.name.toLowerCase();

    const isValidFile = validExtensions.some((extension) =>
      fileName.endsWith(extension)
    );

    const maxSize = 5 * 1024 * 1024;

    if (!isValidFile) {
      alert("Please upload a PDF, DOC, or DOCX file.");
      return;
    }

    if (selectedFile.size > maxSize) {
      alert("File size must be less than 5MB.");
      return;
    }

    setFile(selectedFile);
    onFileSelect(selectedFile);
  };

  const handleInputChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];

    handleFile(droppedFile);
  };

  const removeFile = () => {
    setFile(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    onFileSelect(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm p-6 md:p-8">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600">
            Step 01
          </p>

          <h2 className="text-2xl font-black text-slate-900 mt-1">
            Choose Your Resume
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Upload your latest resume for AI-powered analysis.
          </p>

        </div>

        <FaFileAlt className="text-3xl text-blue-100" />

      </div>

      {/* EMPTY UPLOAD STATE */}

      {!file && (

        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`
            group
            border-2
            border-dashed
            rounded-[24px]
            p-10
            md:p-14
            text-center
            cursor-pointer
            transition-all
            duration-300
            ${
              isDragging
                ? "border-blue-500 bg-blue-50 scale-[1.01]"
                : "border-slate-200 hover:border-blue-400 hover:bg-blue-50/40"
            }
          `}
        >

          <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
            <FaCloudUploadAlt />
          </div>

          <h3 className="text-xl font-black text-slate-800 mt-6">
            Drag & Drop Your Resume
          </h3>

          <p className="text-sm text-slate-500 mt-2">
            or browse files from your computer
          </p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
            className="mt-7 px-7 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20"
          >
            Browse Resume
          </button>

          <p className="text-xs text-slate-400 mt-5">
            Supported formats: PDF, DOC, DOCX • Maximum size: 5MB
          </p>

          <input
            ref={inputRef}
            type="file"
            hidden
            accept=".pdf,.doc,.docx"
            onChange={handleInputChange}
          />

        </div>

      )}

      {/* SELECTED FILE STATE */}

      {file && (

        <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 p-5">

          <div className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-4 min-w-0">

              <div className="w-14 h-14 shrink-0 rounded-2xl bg-white text-emerald-500 flex items-center justify-center text-2xl shadow-sm">
                <FaFileAlt />
              </div>

              <div className="min-w-0">

                <h3 className="font-bold text-slate-800 truncate">
                  {file.name}
                </h3>

                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">

                  <span>
                    {formatFileSize(file.size)}
                  </span>

                  <span>•</span>

                  <span className="text-emerald-600 font-semibold">
                    Ready to analyze
                  </span>

                </div>

              </div>

            </div>

            <button
              type="button"
              onClick={removeFile}
              className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-white transition"
              title="Remove file"
            >
              <FaTimes />
            </button>

          </div>

          <div className="mt-5 flex items-center gap-2 text-sm text-emerald-700 font-semibold">

            <FaCheckCircle />

            Resume uploaded successfully

          </div>

        </div>

      )}

    </div>
  );
}

export default UploadArea;