import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { 
  Brain, 
  Search, 
  Plus, 
  Trash2, 
  Edit2,
  Tag, 
  Folder, 
  TrendingUp, 
  Users,
  X,
  ShieldAlert
} from "lucide-react";
import adminService from "../../services/adminService";

function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Form states
  const [skillForm, setSkillForm] = useState({ name: "", category: "Backend", demand: "High" });

  // Custom Confirm Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "",
    cancelText: "",
    onConfirm: () => {}
  });

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const data = await adminService.getSkills();
      setSkills(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load skills taxonomy.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
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

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!skillForm.name.trim()) {
      toast.error("Skill name is required.");
      return;
    }
    try {
      await adminService.addSkill(skillForm);
      toast.success("Skill added to global taxonomy!");
      setShowAddModal(false);
      setSkillForm({ name: "", category: "Backend", demand: "High" });
      fetchSkills();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to add skill.");
    }
  };

  const handleOpenEdit = (skill) => {
    setSelectedSkill(skill);
    setSkillForm({
      name: skill.name || "",
      category: skill.category || "Backend",
      demand: skill.demand || "High"
    });
    setShowEditModal(true);
  };

  const handleUpdateSkill = async (e) => {
    e.preventDefault();
    if (!skillForm.name.trim()) {
      toast.error("Skill name is required.");
      return;
    }
    try {
      await adminService.updateSkill({
        id: selectedSkill.id,
        ...skillForm
      });
      toast.success("Skill updated successfully!");
      setShowEditModal(false);
      setSelectedSkill(null);
      setSkillForm({ name: "", category: "Backend", demand: "High" });
      fetchSkills();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update skill.");
    }
  };

  const handleDeleteSkill = (skill) => {
    openConfirm(
      "Delete Skill taxonomy?",
      `Are you sure you want to permanently remove "${skill.name}" from the global skills taxonomy? This affects matches calculations!`,
      "Delete permanently",
      async () => {
        try {
          await adminService.deleteSkill(skill.id);
          toast.success("Skill deleted successfully.");
          fetchSkills();
        } catch (err) {
          toast.error("Failed to delete skill.");
        }
      }
    );
  };

  const resetForm = () => {
    setSkillForm({ name: "", category: "Backend", demand: "High" });
    setSelectedSkill(null);
  };

  // Categories list derived dynamically
  const categories = ["all", ...new Set(skills.map(s => s.category))];

  // Filter
  const filteredSkills = skills.filter(s => {
    const matchesSearch = s.name ? s.name.toLowerCase().includes(search.toLowerCase()) : false;
    const matchesCategory = categoryFilter === "all" || s.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Skills Taxonomy</h2>
          <p className="text-sm text-slate-500 font-semibold mt-0.5">Control the central dictionary for ATS parsing and roadmap matchers</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowAddModal(true); }}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-blue-500/10 cursor-pointer text-sm self-start sm:self-center"
        >
          <Plus className="w-4.5 h-4.5" />
          Add Taxonomy Skill
        </button>
      </div>

      {/* Filter and search */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search skill name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 outline-none text-slate-900 text-sm focus:border-blue-500 focus:bg-white transition"
          />
        </div>
        <div className="w-full md:w-56">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-700 text-sm focus:border-blue-500 focus:bg-white transition font-semibold"
          >
            <option value="all">All Categories</option>
            {categories.filter(c => c !== "all").map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Listing Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          <span className="font-semibold text-slate-400 text-sm">Loading skills mapping...</span>
        </div>
      ) : filteredSkills.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-16 text-center text-slate-500">
          <Brain className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="font-bold text-lg">No Skills Found</p>
          <p className="text-sm mt-1">Add a new taxonomy keyword to populate user skill profiles.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => (
            <div 
              key={skill.id} 
              className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:border-blue-300 hover:shadow-sm transition duration-300 flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-black text-slate-900 tracking-tight text-base flex items-center gap-1.5">
                    <Brain className="w-4.5 h-4.5 text-blue-500 flex-shrink-0" />
                    {skill.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                    <Folder className="w-3.5 h-3.5" />
                    <span>{skill.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  <button
                    onClick={() => handleOpenEdit(skill)}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition cursor-pointer"
                    title="Edit Skill"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteSkill(skill)}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer"
                    title="Delete Skill"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  {skill.users_count} Users
                </span>
                <span className={`inline-flex px-2 py-0.5 rounded text-[10px] uppercase font-black tracking-wider ${
                  skill.demand === "High" 
                    ? "bg-rose-50 text-rose-600 border border-rose-100" 
                    : skill.demand === "Medium"
                    ? "bg-amber-50 text-amber-600 border border-amber-100"
                    : "bg-slate-50 text-slate-500 border border-slate-100"
                }`}>
                  {skill.demand} Demand
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Skill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-[28px] max-w-sm w-full border border-slate-100 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button 
              onClick={() => { setShowAddModal(false); resetForm(); }}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-655 p-1 bg-slate-50 hover:bg-slate-100 rounded-full cursor-pointer transition"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-center">
              <h3 className="text-2xl font-black text-slate-900">Add Taxonomy Skill</h3>
              <p className="text-xs text-slate-400 font-semibold mt-1">Inject a new indexing keyword into the database</p>
            </div>
            <form onSubmit={handleAddSkill} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Skill Name</label>
                <input
                  type="text"
                  required
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  placeholder="e.g. Next.js"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Category</label>
                <div className="relative">
                  <Folder className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={skillForm.category}
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                    placeholder="e.g. Frontend, DevOps, QA"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 outline-none text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Industry Demand</label>
                <div className="relative">
                  <TrendingUp className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <select
                    value={skillForm.demand}
                    onChange={(e) => setSkillForm({ ...skillForm, demand: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 outline-none text-slate-700 font-semibold focus:border-blue-500 focus:bg-white transition"
                  >
                    <option value="High">High Demand</option>
                    <option value="Medium">Medium Demand</option>
                    <option value="Low">Low Demand</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition duration-200 text-sm cursor-pointer"
              >
                Register Skill
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Skill Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-[28px] max-w-sm w-full border border-slate-100 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button 
              onClick={() => { setShowEditModal(false); resetForm(); }}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-655 p-1 bg-slate-50 hover:bg-slate-100 rounded-full cursor-pointer transition"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-center">
              <h3 className="text-2xl font-black text-slate-900">Edit Taxonomy Skill</h3>
              <p className="text-xs text-slate-400 font-semibold mt-1">Update fields for {selectedSkill?.name}</p>
            </div>
            <form onSubmit={handleUpdateSkill} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Skill Name</label>
                <input
                  type="text"
                  required
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-955 text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Category</label>
                <div className="relative">
                  <Folder className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={skillForm.category}
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 outline-none text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Industry Demand</label>
                <div className="relative">
                  <TrendingUp className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <select
                    value={skillForm.demand}
                    onChange={(e) => setSkillForm({ ...skillForm, demand: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 outline-none text-slate-700 font-semibold focus:border-blue-500 focus:bg-white transition"
                  >
                    <option value="High">High Demand</option>
                    <option value="Medium">Medium Demand</option>
                    <option value="Low">Low Demand</option>
                  </select>
                </div>
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

export default ManageSkills;
