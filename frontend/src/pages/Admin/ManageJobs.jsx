import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { 
  Briefcase, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  X,
  MapPin,
  CircleDollarSign,
  Tag,
  Building,
  ShieldAlert
} from "lucide-react";
import adminService from "../../services/adminService";

function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  
  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Custom Confirm Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "",
    cancelText: "",
    onConfirm: () => {}
  });

  // Form fields
  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "Full-time",
    description: "",
    skills: "" 
  });

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await adminService.getJobs();
      setJobs(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
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

  const handleAddJob = async (e) => {
    e.preventDefault();
    if (!jobForm.title || !jobForm.company || !jobForm.location) {
      toast.error("Title, company, and location are required.");
      return;
    }
    try {
      const skillsArray = jobForm.skills
        .split(",")
        .map(s => s.trim())
        .filter(s => s.length > 0);

      await adminService.createJob({
        ...jobForm,
        skills: skillsArray
      });
      toast.success("Job posted successfully!");
      setShowAddModal(false);
      resetForm();
      fetchJobs();
    } catch (err) {
      toast.error("Failed to create job.");
    }
  };

  const handleOpenEdit = (job) => {
    setSelectedJob(job);
    setJobForm({
      title: job.title || "",
      company: job.company || "",
      location: job.location || "",
      salary: job.salary || "",
      type: job.type || "Full-time",
      description: job.description || "",
      skills: (job.skills || []).join(", ")
    });
    setShowEditModal(true);
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    try {
      const skillsArray = jobForm.skills
        .split(",")
        .map(s => s.trim())
        .filter(s => s.length > 0);

      await adminService.updateJob({
        id: selectedJob.id,
        ...jobForm,
        skills: skillsArray
      });
      toast.success("Job updated successfully!");
      setShowEditModal(false);
      resetForm();
      fetchJobs();
    } catch (err) {
      toast.error("Failed to update job.");
    }
  };

  const handleDeleteJob = (job) => {
    openConfirm(
      "Delete Job Listing?",
      `Are you sure you want to permanently delete the job listing for "${job.title}" at "${job.company}"? This deletes matching index references!`,
      "Delete permanently",
      async () => {
        try {
          await adminService.deleteJob(job.id);
          toast.success("Job listing removed.");
          fetchJobs();
        } catch (err) {
          toast.error("Failed to delete job.");
        }
      }
    );
  };

  const resetForm = () => {
    setJobForm({
      title: "",
      company: "",
      location: "",
      salary: "",
      type: "Full-time",
      description: "",
      skills: ""
    });
    setSelectedJob(null);
  };

  // Filter
  const filteredJobs = jobs.filter(j => {
    const term = search.toLowerCase();
    const matchesSearch = 
      (j.title || "").toLowerCase().includes(term) ||
      (j.company || "").toLowerCase().includes(term) ||
      (j.skills || []).some(s => s.toLowerCase().includes(term));
    const matchesType = typeFilter === "all" || j.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Job Recommendations Management</h2>
          <p className="text-sm text-slate-500 font-semibold mt-0.5">Post and update active careers for Skillora matched indexing</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowAddModal(true); }}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-blue-500/10 cursor-pointer text-sm self-start sm:self-center"
        >
          <Plus className="w-4.5 h-4.5" />
          Create Job Posting
        </button>
      </div>

      {/* Filters and search */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by job title, company name, required skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 outline-none text-slate-900 text-sm focus:border-blue-500 focus:bg-white transition"
          />
        </div>
        <div className="w-full md:w-56">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-700 text-sm focus:border-blue-500 focus:bg-white transition font-semibold"
          >
            <option value="all">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
      </div>

      {/* Listing Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          <span className="font-semibold text-slate-400 text-sm">Querying active openings...</span>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-16 text-center text-slate-500">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="font-bold text-lg">No Jobs Found</p>
          <p className="text-sm mt-1">Seeded job listings are empty. Create a new job to start matching profiles.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between space-y-5"
            >
              {/* Job Info Header */}
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight leading-snug">{job.title}</h3>
                    <p className="text-sm text-slate-500 font-semibold flex items-center gap-1.5 mt-1">
                      <Building className="w-4 h-4 text-slate-400" />
                      {job.company}
                    </p>
                  </div>
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider flex-shrink-0">
                    {job.type}
                  </span>
                </div>

                {/* Sub info */}
                <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CircleDollarSign className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    {job.salary}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-medium bg-slate-50/50 p-3 rounded-xl border border-slate-100/50">
                  {job.description || "No description provided."}
                </p>

                {/* Skills tags */}
                <div className="space-y-1.5">
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> Required Core Skills
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(job.skills || []).map((skill, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 text-xs px-2.5 py-0.5 rounded-lg font-bold">
                        {skill}
                      </span>
                    ))}
                    {(!job.skills || job.skills.length === 0) && (
                      <span className="text-xs text-slate-400 italic">No skills tagged</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons & Match count */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                <div className="text-xs text-slate-400 font-bold">
                  Matches: <span className="text-slate-800 font-black">{job.matches_count} Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(job)}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition cursor-pointer"
                    title="Edit Job"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
                    title="Delete Job"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Job Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-white rounded-[28px] max-w-lg w-full border border-slate-100 p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[95vh] overflow-y-auto">
            <button 
              onClick={() => { setShowAddModal(false); resetForm(); }}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-655 p-1 bg-slate-50 hover:bg-slate-100 rounded-full cursor-pointer transition"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-center">
              <h3 className="text-2xl font-black text-slate-900">Post Career Opening</h3>
              <p className="text-xs text-slate-400 font-semibold mt-1">Register a new target job for user matcher algorithms</p>
            </div>
            <form onSubmit={handleAddJob} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Job Title</label>
                  <input
                    type="text"
                    required
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    placeholder="e.g. Senior Backend Engineer"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Company</label>
                  <input
                    type="text"
                    required
                    value={jobForm.company}
                    onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
                    placeholder="e.g. Google"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Location</label>
                  <input
                    type="text"
                    required
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    placeholder="Mumbai, IN or Remote"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Annual Compensation</label>
                  <input
                    type="text"
                    value={jobForm.salary}
                    onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                    placeholder="e.g. ₹12,00,000 - ₹16,00,000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Job Type</label>
                  <select
                    value={jobForm.type}
                    onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-700 font-semibold focus:border-blue-500 focus:bg-white transition"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Required Skills (Comma separated)</label>
                  <input
                    type="text"
                    value={jobForm.skills}
                    onChange={(e) => setJobForm({ ...jobForm, skills: e.target.value })}
                    placeholder="Python, Django, AWS"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Job Description</label>
                <textarea
                  rows="4"
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  placeholder="Outline the responsibilities, expectations, and role description..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition duration-200 text-sm cursor-pointer"
              >
                Publish Job Listing
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Job Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-white rounded-[28px] max-w-lg w-full border border-slate-100 p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[95vh] overflow-y-auto">
            <button 
              onClick={() => { setShowEditModal(false); resetForm(); }}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-655 p-1 bg-slate-50 hover:bg-slate-100 rounded-full cursor-pointer transition"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-center">
              <h3 className="text-2xl font-black text-slate-900">Update Job Details</h3>
              <p className="text-xs text-slate-400 font-semibold mt-1">Modify fields for {selectedJob?.title} at {selectedJob?.company}</p>
            </div>
            <form onSubmit={handleUpdateJob} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Job Title</label>
                  <input
                    type="text"
                    required
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Company</label>
                  <input
                    type="text"
                    required
                    value={jobForm.company}
                    onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Location</label>
                  <input
                    type="text"
                    required
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Annual Compensation</label>
                  <input
                    type="text"
                    value={jobForm.salary}
                    onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Job Type</label>
                  <select
                    value={jobForm.type}
                    onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-700 font-semibold focus:border-blue-500 focus:bg-white transition"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Required Skills (Comma separated)</label>
                  <input
                    type="text"
                    value={jobForm.skills}
                    onChange={(e) => setJobForm({ ...jobForm, skills: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Job Description</label>
                <textarea
                  rows="4"
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold shadow-md hover:bg-blue-700 transition duration-200 text-sm cursor-pointer"
              >
                Apply Changes
              </button>
            </form>
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
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-655 p-1 bg-slate-50 hover:bg-slate-100 rounded-full transition cursor-pointer"
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
          <p className="text-sm font-semibold text-slate-500 max-w-sm leading-relaxed text-center">
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

export default ManageJobs;
