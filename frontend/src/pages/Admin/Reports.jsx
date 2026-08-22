import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { 
  Bug, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  PlayCircle,
  Clock,
  Mail,
  MessageSquare,
  AlertTriangle
} from "lucide-react";
import adminService from "../../services/adminService";

function Reports() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Custom confirmation modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmCallback, setConfirmCallback] = useState(null);

  const fetchBugs = async () => {
    try {
      setLoading(true);
      const data = await adminService.getBugs();
      setBugs(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load bug reports backlog.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  const handleUpdateStatus = (bugId, newStatus) => {
    if (newStatus === "Resolved") {
      setConfirmTitle("Resolve Bug Report");
      setConfirmMessage("Are you sure you want to mark this bug report as resolved?");
      setConfirmCallback(() => async () => {
        try {
          await adminService.updateBugStatus(bugId, newStatus);
          toast.success(`Bug ticket marked as ${newStatus}!`);
          fetchBugs();
        } catch (err) {
          toast.error("Failed to update bug status.");
        }
        setShowConfirmModal(false);
      });
      setShowConfirmModal(true);
    } else {
      performUpdateStatus(bugId, newStatus);
    }
  };

  const performUpdateStatus = async (bugId, newStatus) => {
    try {
      await adminService.updateBugStatus(bugId, newStatus);
      toast.success(`Bug ticket marked as ${newStatus}!`);
      fetchBugs();
    } catch (err) {
      toast.error("Failed to update bug status.");
    }
  };

  // Filter
  const filteredBugs = bugs.filter(b => {
    const term = search.toLowerCase();
    const matchesSearch = 
      b.subject.toLowerCase().includes(term) ||
      b.email.toLowerCase().includes(term) ||
      b.description.toLowerCase().includes(term);

    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Bug Reports Backlog</h2>
        <p className="text-sm text-slate-500 font-semibold mt-0.5">Track and resolve platform tickets reported by users</p>
      </div>

      {/* Filter and search */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search bug tickets by subject, description, reporter..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 outline-none text-slate-900 text-sm focus:border-blue-500 focus:bg-white transition"
          />
        </div>
        <div className="w-full md:w-56">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-700 text-sm focus:border-blue-500 focus:bg-white transition font-semibold"
          >
            <option value="all">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Kanban / Ticket List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          <span className="font-semibold text-slate-400 text-sm">Querying active reports...</span>
        </div>
      ) : filteredBugs.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-16 text-center text-slate-500">
          <Bug className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="font-bold text-lg">No Tickets Registered</p>
          <p className="text-sm mt-1">Excellent! No active issues have been logged by users.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBugs.map((bug) => (
            <div 
              key={bug.id} 
              className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              {/* Ticket details */}
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    bug.status === "Open" 
                      ? "bg-rose-50 text-rose-600 border border-rose-100" 
                      : bug.status === "In Progress"
                      ? "bg-amber-50 text-amber-600 border border-amber-100"
                      : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                  }`}>
                    {bug.status === "Open" && <AlertCircle className="w-3.5 h-3.5" />}
                    {bug.status === "In Progress" && <PlayCircle className="w-3.5 h-3.5 animate-spin" />}
                    {bug.status === "Resolved" && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {bug.status}
                  </span>
                  
                  <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(bug.created_at).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight leading-snug">
                    {bug.subject}
                  </h3>
                  <p className="text-xs text-slate-500 font-bold flex flex-wrap items-center gap-2 mt-1">
                    <span className="flex items-center gap-1 text-slate-400">
                      <Mail className="w-3.5 h-3.5" />
                      {bug.email}
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="text-slate-600">
                      User: <strong className="font-extrabold text-slate-800">{bug.user_name || 'Guest'}</strong>
                    </span>
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                      (bug.user_role || 'Visitor').toLowerCase() === 'admin' 
                        ? 'bg-purple-100 text-purple-700' 
                        : (bug.user_role || 'Visitor').toLowerCase() === 'student'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {bug.user_role || 'Visitor'}
                    </span>
                  </p>
                </div>

                <div className="bg-slate-50/50 rounded-2xl border border-slate-100/50 p-4 text-xs text-slate-600 leading-relaxed font-semibold flex items-start gap-2.5">
                  <MessageSquare className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <p className="whitespace-pre-wrap">{bug.description}</p>
                </div>
              </div>

              {/* Status Update Control */}
              <div className="flex flex-col gap-2 w-full md:w-auto flex-shrink-0">
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest md:text-right">Update Ticket Status</p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => handleUpdateStatus(bug.id, "Open")}
                    disabled={bug.status === "Open"}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition duration-200 cursor-pointer border ${
                      bug.status === "Open"
                        ? "bg-rose-50 text-rose-600 border-rose-100"
                        : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    Open
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(bug.id, "In Progress")}
                    disabled={bug.status === "In Progress"}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition duration-200 cursor-pointer border ${
                      bug.status === "In Progress"
                        ? "bg-amber-50 text-amber-600 border-amber-100"
                        : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    Investigate
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(bug.id, "Resolved")}
                    disabled={bug.status === "Resolved"}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition duration-200 cursor-pointer border ${
                      bug.status === "Resolved"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                        : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    Resolve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Custom Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-[28px] max-w-sm w-full border border-slate-100 p-6 sm:p-8 space-y-6 shadow-2xl relative text-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900">{confirmTitle}</h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">{confirmMessage}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold transition text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmCallback}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md shadow-blue-500/10 transition text-xs cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;
