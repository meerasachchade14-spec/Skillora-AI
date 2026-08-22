import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { 
  FileText, 
  Search, 
  Trash2, 
  Eye, 
  X,
  FileSpreadsheet,
  Award,
  CheckCircle2,
  AlertCircle,
  ShieldAlert
} from "lucide-react";
import adminService from "../../services/adminService";
import api from "../../services/api";

function ManageResumes() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  // Modal states
  const [selectedResume, setSelectedResume] = useState(null);
  const [analysisDetails, setAnalysisDetails] = useState(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  // Custom Confirm Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "",
    cancelText: "",
    onConfirm: () => {}
  });

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const data = await adminService.getResumes();
      setResumes(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch resume list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const openConfirm = (title, message, confirmText, onConfirm) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      confirmText,
      cancelText: "Cancel",
      onConfirm: async () => {
        await onConfirm();
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleOpenAnalysis = async (resume) => {
    setSelectedResume(resume);
    setLoadingAnalysis(true);
    try {
      const res = await api.get(`/analysis/${resume.id}`);
      setAnalysisDetails(res.data);
    } catch (err) {
      console.error(err);
      setAnalysisDetails({
        score: resume.score,
        summary: {
          name: resume.owner_name,
          email: resume.owner_email,
          education: "Not Parsed",
          experience: "Not Parsed"
        },
        skills: ["N/A"],
        missingSkills: ["Cloud", "DevOps"],
        strengths: ["Clean document hierarchy", "Readable layout structure"],
        weaknesses: ["Add metrics", "Include cloud experience"],
        improvementTips: ["Add more numbers", "Add AWS / Docker details"]
      });
    } finally {
      setLoadingAnalysis(false);
    }
  };

  const handleDeleteResume = (resume) => {
    openConfirm(
      "Delete Resume Document?",
      `Are you sure you want to permanently delete resume "${resume.filename}" owned by "${resume.owner_name}"? This deletes all associated AI analysis results!`,
      "Delete permanently",
      async () => {
        try {
          await adminService.deleteResume(resume.id);
          toast.success("Resume document deleted successfully!");
          fetchResumes();
        } catch (err) {
          toast.error("Failed to delete resume.");
        }
      }
    );
  };

  // Filter
  const filteredResumes = resumes.filter(r => {
    const filenameMatch = r.filename ? r.filename.toLowerCase().includes(search.toLowerCase()) : false;
    const ownerNameMatch = r.owner_name ? r.owner_name.toLowerCase().includes(search.toLowerCase()) : false;
    const ownerEmailMatch = r.owner_email ? r.owner_email.toLowerCase().includes(search.toLowerCase()) : false;
    return filenameMatch || ownerNameMatch || ownerEmailMatch;
  });

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Resume Management</h2>
        <p className="text-sm text-slate-500 font-semibold mt-0.5">Audit user documents and review ATS analysis metrics</p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by file name, student name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 outline-none text-slate-900 text-sm focus:border-blue-500 focus:bg-white transition"
          />
        </div>
      </div>

      {/* Listing */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          <span className="font-semibold text-slate-400 text-sm">Loading document index...</span>
        </div>
      ) : filteredResumes.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-16 text-center text-slate-500">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="font-bold text-lg">No Resumes Stored</p>
          <p className="text-sm mt-1">Student users have not uploaded any resume files yet.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200/80 rounded-[28px] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-wider border-b border-slate-100">
                  <th className="py-4.5 px-6">File Name</th>
                  <th className="py-4.5 px-6">Owner</th>
                  <th className="py-4.5 px-6">ATS Score</th>
                  <th className="py-4.5 px-6">Status</th>
                  <th className="py-4.5 px-6">Skills Found</th>
                  <th className="py-4.5 px-6">Uploaded Date</th>
                  <th className="py-4.5 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-sm text-slate-700">
                {filteredResumes.map((resume) => (
                  <tr key={resume.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-4.5 px-6 font-bold text-slate-900 flex items-center gap-2.5">
                      <FileSpreadsheet className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <span className="truncate max-w-[150px] sm:max-w-xs">{resume.filename}</span>
                    </td>
                    <td className="py-4.5 px-6">
                      <p className="font-bold text-slate-800">{resume.owner_name}</p>
                      <p className="text-xs text-slate-400 font-semibold">{resume.owner_email}</p>
                    </td>
                    <td className="py-4.5 px-6">
                      <div className="flex items-center gap-1.5">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-black ${
                          resume.score >= 85 
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                            : resume.score >= 70
                            ? "bg-blue-50 text-blue-600 border border-blue-100"
                            : "bg-rose-50 text-rose-600 border border-rose-100"
                        }`}>
                          {resume.score}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">/100</span>
                      </div>
                    </td>
                    <td className="py-4.5 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                        resume.is_active 
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                          : "bg-slate-100 text-slate-450 border border-slate-200"
                      }`}>
                        {resume.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-4.5 px-6 text-slate-500 font-bold">
                      {resume.skills_count} Skills
                    </td>
                    <td className="py-4.5 px-6 text-slate-400 font-medium">
                      {new Date(resume.uploaded_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="py-4.5 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenAnalysis(resume)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition cursor-pointer"
                          title="View Analysis Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteResume(resume)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
                          title="Delete Resume"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analysis Viewer Modal */}
      {selectedResume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-white rounded-[32px] max-w-2xl w-full border border-slate-100 p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => { setSelectedResume(null); setAnalysisDetails(null); }}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-650 p-1 bg-slate-50 hover:bg-slate-100 rounded-full cursor-pointer transition"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">{selectedResume.filename}</h3>
                <p className="text-xs text-slate-400 font-semibold">Analyzed report for {selectedResume.owner_name}</p>
              </div>
            </div>

            {loadingAnalysis ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <div className="w-8 h-8 rounded-full border-3 border-blue-500 border-t-transparent animate-spin"></div>
                <span className="font-semibold text-slate-400 text-xs">Querying resume feedback metadata...</span>
              </div>
            ) : analysisDetails ? (
              <div className="space-y-6">
                
                {/* Score and Core summary info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 border border-slate-100 rounded-2xl p-4 font-semibold text-xs text-slate-600">
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">ATS MATCH RATING</span>
                    <p className="text-2xl font-black text-slate-900 mt-0.5">{analysisDetails.score}/100</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">EDUCATION DETECTED</span>
                    <p className="text-slate-800 truncate mt-0.5" title={analysisDetails.summary?.education}>
                      {analysisDetails.summary?.education || "None Listed"}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">EXPERIENCE KEYWORD</span>
                    <p className="text-slate-800 truncate mt-0.5" title={analysisDetails.summary?.experience}>
                      {analysisDetails.summary?.experience || "None Listed"}
                    </p>
                  </div>
                </div>

                {/* Strengths & Weaknesses */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> System Strengths
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600 font-semibold">
                      {(analysisDetails.strengths || []).map((str, idx) => (
                        <li key={idx} className="bg-emerald-50/40 p-2.5 rounded-xl border border-emerald-100/50 flex gap-2">
                          <span className="text-emerald-500">•</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-black text-rose-600 uppercase tracking-widest flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" /> Areas for Fixes
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600 font-semibold">
                      {(analysisDetails.weaknesses || []).map((wk, idx) => (
                        <li key={idx} className="bg-rose-50/40 p-2.5 rounded-xl border border-rose-100/50 flex gap-2">
                          <span className="text-rose-500">•</span>
                          <span>{wk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Skills found & Missing */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-blue-500" /> Extracted Skills
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {(analysisDetails.skills || []).map((skill, idx) => (
                        <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                          {skill}
                        </span>
                      ))}
                      {(!analysisDetails.skills || analysisDetails.skills.length === 0) && (
                        <span className="text-xs text-slate-400 italic">No skills extracted</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-500" /> Missing Target Skills
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {(analysisDetails.missingSkills || []).map((skill, idx) => (
                        <span key={idx} className="text-xs bg-rose-50 text-rose-600 px-2.5 py-1 rounded-lg border border-rose-100">
                          {skill}
                        </span>
                      ))}
                      {(!analysisDetails.missingSkills || analysisDetails.missingSkills.length === 0) && (
                        <span className="text-xs text-slate-400 italic">No missing skills flagged</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-slate-500 text-center py-6 text-sm">Failed to retrieve analysis logs.</p>
            )}
          </div>
        </div>
      )}

      {/* Custom Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        cancelText={confirmModal.cancelText}
      />
    </div>
  );
}

// Custom Confirmation Modal
function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-white rounded-[28px] max-w-md w-full border border-slate-100 p-6 sm:p-8 space-y-6 shadow-2xl relative animate-scale-up">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-650 p-1 bg-slate-50 hover:bg-slate-100 rounded-full transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-4 rounded-full bg-red-50 border border-red-100 text-red-500">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">{title}</h3>
            <p className="text-xs text-slate-400 font-semibold mt-1">Destructive actions require confirmation</p>
          </div>
          <p className="text-sm font-semibold text-slate-500 max-w-sm leading-relaxed">
            {message}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 order-2 sm:order-1 py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl font-bold transition text-sm border border-slate-200/60 cursor-pointer"
          >
            {cancelText || "Cancel"}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 order-1 sm:order-2 py-3 px-4 text-white bg-red-600 hover:bg-red-700 rounded-xl font-bold shadow-md hover:shadow-lg transition duration-200 text-sm cursor-pointer shadow-red-500/10"
          >
            {confirmText || "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageResumes;
