import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import resumeService from "../../services/resumeService";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import {
  FaFilePdf,
  FaCalendarAlt,
  FaChartLine,
  FaEye,
  FaDownload,
  FaTrash,
  FaEdit,
} from "react-icons/fa";


const mockResumes = [
  {
    name: "Resume_2025.pdf",
    date: "15 July 2025",
    score: 92,
    status: "Analyzed",
  },
  {
    name: "Resume_React.pdf",
    date: "28 June 2025",
    score: 88,
    status: "Analyzed",
  },
  {
    name: "Resume_Internship.pdf",
    date: "10 May 2025",
    score: 80,
    status: "Pending",
  },
];

function ResumeHistory() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [resumes, setResumes] = useState(mockResumes);
  const [loading, setLoading] = useState(false);

  const fetchResumes = async () => {
    setLoading(true);
    try {
      const data = await resumeService.getResumes();
      if (data && data.length > 0) {
        setResumes(data);
      } else {
        setResumes([]);
      }
    } catch (err) {
      console.log("Using fallback mock resumes:", err.message);
      setResumes(mockResumes);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, [user]);

  const handleDelete = async (resume) => {
    if (!resume.id) {
      // It's a mock resume
      setResumes(resumes.filter((r) => r !== resume));
      toast.success("Mock resume removed.");
      return;
    }
    
    try {
      await resumeService.deleteResume(resume.id);
      toast.success("Resume deleted successfully.");
      
      // If deleted active resume, refresh user context
      if (user?.resume?.id === resume.id) {
        updateUser({
          ...user,
          resume: {}
        });
      } else {
        fetchResumes();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete resume.");
    }
  };

  const handleOpen = (resume) => {
    if (resume.fileUrl) {
      window.open(resume.fileUrl, "_blank");
    } else {
      toast.error("File download link not available for demo resume.");
    }
  };

  const handleEdit = async (resume) => {
    if (!resume.id) {
      toast.error("Cannot edit a mock resume.");
      return;
    }
    try {
      toast.loading("Loading resume data...", { id: "load-edit" });
      const details = await resumeService.getResumeDetails(resume.id);
      toast.dismiss("load-edit");
      
      if (details && details.resumeData) {
        navigate('/resume-builder', {
          state: {
            resumeData: details.resumeData,
            isEditing: true,
            resumeId: resume.id
          }
        });
      } else {
        toast.error("Could not load resume data.");
      }
    } catch (err) {
      toast.dismiss("load-edit");
      console.error(err);
      toast.error("Failed to load resume for editing.");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">

      {/* Header */}

      <div className="flex items-center gap-3 mb-6">

        <FaFilePdf className="text-3xl text-red-500" />

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Resume History
          </h2>

          <p className="text-gray-500">
            Previously uploaded resumes.
          </p>

        </div>

      </div>

      {/* Resume Cards */}

      <div className="space-y-5">
        {loading && <p className="text-center text-slate-500 text-sm">Loading resumes...</p>}
        {!loading && resumes.length === 0 && (
          <p className="text-center text-slate-400 text-sm py-4">No uploaded resumes found.</p>
        )}
        {!loading && resumes.map((resume, index) => (

          <div
            key={resume.id || index}
            className="bg-slate-50 rounded-2xl p-5 hover:shadow-lg transition"
          >

            <div className="flex justify-between items-start">

              <div>

                <h3 className="font-bold text-slate-800">
                  {resume.name}
                </h3>

                <div className="flex items-center gap-2 mt-3 text-gray-500">

                  <FaCalendarAlt />

                  {resume.date}

                </div>

              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  resume.status === "Analyzed"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {resume.status}
              </span>

            </div>

            {/* ATS Score */}

            <div className="mt-5">

              <div className="flex justify-between mb-2">

                <div className="flex items-center gap-2">

                  <FaChartLine className="text-sky-600" />

                  <span className="font-medium">
                    ATS Score
                  </span>

                </div>

                <span className="font-bold text-sky-600">
                  {resume.score}%
                </span>

              </div>

              <div className="w-full h-3 bg-slate-200 rounded-full">

                <div
                  className="h-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600"
                  style={{
                    width: `${resume.score}%`,
                  }}
                />

              </div>

            </div>

            {/* Actions */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">

              <button 
                onClick={() => handleOpen(resume)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-100 text-sky-700 hover:bg-sky-200 transition cursor-pointer"
              >

                <FaEye />

                View

              </button>

              <button 
                onClick={() => handleEdit(resume)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition cursor-pointer"
              >

                <FaEdit />

                Edit

              </button>

              <button 
                onClick={() => handleOpen(resume)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-100 text-green-700 hover:bg-green-200 transition cursor-pointer"
              >

                <FaDownload />

                Download

              </button>

              <button 
                onClick={() => handleDelete(resume)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition cursor-pointer"
              >

                <FaTrash />

                Delete

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ResumeHistory;