import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  FaFileAlt,
  FaCheckCircle,
  FaClock,
  FaRobot,
  FaTimesCircle,
} from "react-icons/fa";

function ResumeStatus() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const hasResume = !!user?.resume?.filename;

  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex gap-5 items-center">
          <div className={`w-16 h-16 rounded-3xl flex items-center justify-center ${hasResume ? 'bg-sky-100' : 'bg-slate-100'}`}>
            <FaFileAlt className={`${hasResume ? 'text-sky-600' : 'text-slate-400'} text-3xl`}/>
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-800">
              {hasResume ? "Resume Loaded Successfully" : "No Resume Uploaded"}
            </h2>

            <p className="text-slate-500 mt-1 font-semibold text-sm">
              {hasResume ? user.resume.filename : "Upload your resume to calculate skill match scores"}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {hasResume ? (
                <>
                  <span className="px-3.5 py-1.5 rounded-full bg-green-50 text-green-600 font-semibold text-xs flex items-center gap-1.5 border border-green-100">
                    <FaCheckCircle/>
                    ATS Ready ({user.resume.atsScore}%)
                  </span>

                  <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 font-semibold text-xs flex items-center gap-1.5 border border-blue-100">
                    <FaRobot/>
                    AI Analyzed
                  </span>

                  <span className="px-3.5 py-1.5 rounded-full bg-orange-50 text-orange-600 font-semibold text-xs flex items-center gap-1.5 border border-orange-100">
                    <FaClock/>
                    {user.resume.uploadDate || "Uploaded Today"}
                  </span>
                </>
              ) : (
                <span className="px-3.5 py-1.5 rounded-full bg-red-50 text-red-600 font-semibold text-xs flex items-center gap-1.5 border border-red-100">
                  <FaTimesCircle/>
                  Demo Insights Only
                </span>
              )}
            </div>
          </div>
        </div>

        <button 
          onClick={() => navigate("/resume-upload")}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold hover:scale-[1.02] shadow-md transition cursor-pointer text-sm"
        >
          {hasResume ? "Analyze Again" : "Upload Resume"}
        </button>
      </div>
    </div>
  );
}

export default ResumeStatus;