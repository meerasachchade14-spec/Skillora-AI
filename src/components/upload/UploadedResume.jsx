import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFilePdf, FaRegFileWord, FaArrowRight } from "react-icons/fa";

function UploadedResume({ resumes, loading }) {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (resumes.length > 0 && !selectedId) {
      setSelectedId(resumes[0].id);
    }
  }, [resumes]);

  const handleAnalyze = () => {
    if (selectedId) {
      navigate(`/resume-analysis?id=${selectedId}`);
    } else {
      alert("Please select or upload a resume first!");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-8 flex items-center justify-center min-h-[300px]">
        <p className="text-gray-500 font-semibold">Loading your resumes...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between h-full min-h-[350px]">
      <div>
        <h2 className="text-2xl font-bold mb-6">
          Your Resumes
        </h2>

        {resumes.length === 0 ? (
          <div className="border border-dashed rounded-2xl p-8 text-center text-gray-400">
            No resumes uploaded yet. Upload your resume to start.
          </div>
        ) : (
          <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
            {resumes.map((resume) => {
              const isSelected = selectedId === resume.id;
              const isPdf = resume.filename.toLowerCase().endsWith('.pdf');
              return (
                <div
                  key={resume.id}
                  onClick={() => setSelectedId(resume.id)}
                  className={`border rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition ${
                    isSelected
                      ? "border-blue-500 bg-blue-50/50 ring-2 ring-blue-100"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {isPdf ? (
                    <FaFilePdf className="text-4xl text-red-500 shrink-0" />
                  ) : (
                    <FaRegFileWord className="text-4xl text-blue-500 shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold truncate text-sm text-slate-800">
                      {resume.filename}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Uploaded {new Date(resume.uploaded_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <button
        onClick={handleAnalyze}
        disabled={resumes.length === 0}
        className="w-full mt-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:bg-slate-200 disabled:text-slate-400 flex items-center justify-center gap-2"
      >
        Analyze Selected Resume <FaArrowRight />
      </button>
    </div>
  );
}

export default UploadedResume;