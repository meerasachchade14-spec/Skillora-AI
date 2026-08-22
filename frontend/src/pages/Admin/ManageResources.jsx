import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { 
  BookOpen, 
  Search, 
  Plus, 
  Trash2, 
  Link2, 
  Award, 
  Star,
  X,
  Tag,
  MonitorPlay,
  FileSpreadsheet,
  Pencil,
  AlertTriangle
} from "lucide-react";
import adminService from "../../services/adminService";

function ManageResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [skillFilter, setSkillFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  // Form states
  const [showAddModal, setShowAddModal] = useState(false);
  const [resForm, setResForm] = useState({
    title: "",
    type: "Course",
    provider: "",
    linked_skills: "",
    url: "",
    cost: "Free",
    rating: 4.5
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    id: "",
    title: "",
    type: "Course",
    provider: "",
    linked_skills: "",
    url: "",
    cost: "Free",
    rating: 4.5
  });

  // Custom confirmation modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmCallback, setConfirmCallback] = useState(null);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const data = await adminService.getResources();
      setResources(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load learning resources.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleAddResource = async (e) => {
    e.preventDefault();
    if (!resForm.title || !resForm.provider) {
      toast.error("Title and provider are required.");
      return;
    }
    try {
      const skillsArray = resForm.linked_skills
        .split(",")
        .map(s => s.trim())
        .filter(s => s.length > 0);

      await adminService.addResource({
        ...resForm,
        linked_skills: skillsArray
      });
      toast.success("Learning resource registered!");
      setShowAddModal(false);
      resetForm();
      fetchResources();
    } catch (err) {
      toast.error("Failed to add resource.");
    }
  };

  const startEditResource = (res) => {
    setEditForm({
      id: res.id,
      title: res.title,
      type: res.type || "Course",
      provider: res.provider,
      linked_skills: (res.linked_skills || []).join(", "),
      url: res.url || "",
      cost: res.cost || "Free",
      rating: res.rating || 4.5
    });
    setShowEditModal(true);
  };

  const handleEditResource = async (e) => {
    e.preventDefault();
    if (!editForm.title || !editForm.provider) {
      toast.error("Title and provider are required.");
      return;
    }
    try {
      const skillsArray = typeof editForm.linked_skills === 'string'
        ? editForm.linked_skills.split(",").map(s => s.trim()).filter(s => s.length > 0)
        : editForm.linked_skills;

      await adminService.updateResource({
        ...editForm,
        linked_skills: skillsArray
      });
      toast.success("Learning resource updated!");
      setShowEditModal(false);
      fetchResources();
    } catch (err) {
      toast.error("Failed to update resource.");
    }
  };

  const handleDeleteResource = (res) => {
    setConfirmTitle("Delete Resource");
    setConfirmMessage(`Are you sure you want to delete "${res.title}"? This action cannot be undone.`);
    setConfirmCallback(() => async () => {
      try {
        await adminService.deleteResource(res.id);
        toast.success("Resource deleted successfully.");
        fetchResources();
      } catch (err) {
        toast.error("Failed to delete resource.");
      }
      setShowConfirmModal(false);
    });
    setShowConfirmModal(true);
  };

  const resetForm = () => {
    setResForm({
      title: "",
      type: "Course",
      provider: "",
      linked_skills: "",
      url: "",
      cost: "Free",
      rating: 4.5
    });
  };

  // Get all unique skills from resources
  const uniqueSkills = Array.from(
    new Set(resources.flatMap(r => r.linked_skills || []))
  ).sort();

  // Filter
  const filteredResources = resources.filter(r => {
    const matchesSearch = 
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.provider.toLowerCase().includes(search.toLowerCase()) ||
      (r.linked_skills || []).some(s => s.toLowerCase().includes(search.toLowerCase()));
    
    const matchesType = typeFilter === "all" || r.type === typeFilter;
    const matchesSkill = skillFilter === "all" || (r.linked_skills || []).some(s => s.toLowerCase() === skillFilter.toLowerCase());
    return matchesSearch && matchesType && matchesSkill;
  });

  const groupResourcesBySkill = () => {
    const grouped = {};
    filteredResources.forEach(res => {
      if (!res.linked_skills || res.linked_skills.length === 0) {
        if (!grouped["General / Uncategorized"]) grouped["General / Uncategorized"] = [];
        grouped["General / Uncategorized"].push(res);
      } else {
        res.linked_skills.forEach(skill => {
          if (skillFilter === "all" || skill.toLowerCase() === skillFilter.toLowerCase()) {
            if (!grouped[skill]) grouped[skill] = [];
            if (!grouped[skill].some(r => r.id === res.id)) {
              grouped[skill].push(res);
            }
          }
        });
      }
    });
    return grouped;
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Learning Resources</h2>
          <p className="text-sm text-slate-500 font-semibold mt-0.5">Manage study items linked to student career roadmaps</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowAddModal(true); }}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-blue-500/10 cursor-pointer text-sm self-start sm:self-center"
        >
          <Plus className="w-4.5 h-4.5" />
          Add Resource
        </button>
      </div>

      {/* Filter and search */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col lg:flex-row gap-4 items-center">
        <div className="flex-1 w-full relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, provider, skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 outline-none text-slate-900 text-sm focus:border-blue-500 focus:bg-white transition"
          />
        </div>
        <div className="w-full lg:w-48">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-700 text-sm focus:border-blue-500 focus:bg-white transition font-semibold"
          >
            <option value="all">All Types</option>
            <option value="Course">Course</option>
            <option value="Tutorial">Tutorial</option>
            <option value="Certification">Certification</option>
            <option value="Book">Book</option>
          </select>
        </div>
        <div className="w-full lg:w-48">
          <select
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-700 text-sm focus:border-blue-500 focus:bg-white transition font-semibold"
          >
            <option value="all">All Skills</option>
            {uniqueSkills.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-xl self-stretch lg:self-auto gap-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              viewMode === "grid" 
                ? "bg-white text-blue-600 shadow-sm" 
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Grid View
          </button>
          <button
            onClick={() => setViewMode("grouped")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              viewMode === "grouped" 
                ? "bg-white text-blue-600 shadow-sm" 
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Grouped
          </button>
        </div>
      </div>

      {/* Listing Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          <span className="font-semibold text-slate-400 text-sm">Querying learning catalog...</span>
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-16 text-center text-slate-500">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="font-bold text-lg">No Resources Registered</p>
          <p className="text-sm mt-1">Seeded catalogs are empty. Add resources for user skill map linking.</p>
        </div>
      ) : (
        (() => {
          const renderResourceCard = (res, cardKey) => (
            <div 
              key={cardKey} 
              className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between space-y-5"
            >
              {/* Info Header */}
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-black text-slate-900 tracking-tight text-base leading-snug line-clamp-2" title={res.title}>
                    {res.title}
                  </h3>
                  <span className={`inline-flex px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                    res.type === "Certification" 
                      ? "bg-purple-50 text-purple-700 border border-purple-100" 
                      : res.type === "Course"
                      ? "bg-blue-50 text-blue-700 border border-blue-100"
                      : res.type === "Tutorial"
                      ? "bg-rose-50 text-rose-700 border border-rose-100"
                      : "bg-slate-50 text-slate-700 border border-slate-100"
                  }`}>
                    {res.type}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-500">
                  <span className="flex items-center gap-1">
                    <MonitorPlay className="w-4 h-4 text-slate-400" />
                    {res.provider}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    {res.rating} / 5.0
                  </span>
                </div>

                {/* Linked skills */}
                <div className="space-y-1.5">
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> Linked Skills
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {(res.linked_skills || []).map((skill, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 text-xs px-2.5 py-0.5 rounded-lg font-bold">
                        {skill}
                      </span>
                    ))}
                    {(!res.linked_skills || res.linked_skills.length === 0) && (
                      <span className="text-xs text-slate-400 italic">No skills linked</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-black uppercase tracking-wider ${
                    res.cost === "Free" ? "text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded" : "text-slate-500 bg-slate-50 px-2 py-0.5 rounded"
                  }`}>
                    {res.cost}
                  </span>
                  {res.url && res.url !== "#" && (
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 hover:underline flex items-center gap-1 text-xs font-bold"
                    >
                      <Link2 className="w-3.5 h-3.5" /> Launch link
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => startEditResource(res)}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition cursor-pointer"
                    title="Edit Resource"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteResource(res)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
                    title="Delete Resource"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );

          if (viewMode === "grouped") {
            const grouped = groupResourcesBySkill();
            return (
              <div className="space-y-10">
                {Object.entries(grouped).map(([skillName, skillResources]) => (
                  skillResources.length > 0 && (
                    <div key={skillName} className="bg-slate-50/50 border border-slate-100 rounded-3xl p-6 space-y-4">
                      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                        <Tag className="w-5 h-5 text-blue-600" />
                        <h3 className="font-black text-slate-900 tracking-tight text-lg">
                          {skillName}
                          <span className="text-xs bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full font-extrabold ml-2">
                            {skillResources.length} {skillResources.length === 1 ? 'item' : 'items'}
                          </span>
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skillResources.map((res) => renderResourceCard(res, `${skillName}-${res.id}`))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            );
          }

          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((res) => renderResourceCard(res, res.id))}
            </div>
          );
        })()
      )}

      {/* Add Resource Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-white rounded-[28px] max-w-md w-full border border-slate-100 p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[95vh] overflow-y-auto">
            <button 
              onClick={() => { setShowAddModal(false); resetForm(); }}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 p-1 bg-slate-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-center">
              <h3 className="text-2xl font-black text-slate-900">Register Resource</h3>
              <p className="text-xs text-slate-400 font-semibold mt-1">Connect new educational material to system learning maps</p>
            </div>
            <form onSubmit={handleAddResource} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Resource Title</label>
                <input
                  type="text"
                  required
                  value={resForm.title}
                  onChange={(e) => setResForm({ ...resForm, title: e.target.value })}
                  placeholder="e.g. AWS Certified Solutions Architect"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Resource Type</label>
                  <select
                    value={resForm.type}
                    onChange={(e) => setResForm({ ...resForm, type: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-700 font-semibold focus:border-blue-500 focus:bg-white transition"
                  >
                    <option value="Course">Course</option>
                    <option value="Tutorial">Tutorial</option>
                    <option value="Certification">Certification</option>
                    <option value="Book">Book</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Cost Type</label>
                  <select
                    value={resForm.cost}
                    onChange={(e) => setResForm({ ...resForm, cost: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-700 font-semibold focus:border-blue-500 focus:bg-white transition"
                  >
                    <option value="Free">Free</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Provider</label>
                  <input
                    type="text"
                    required
                    value={resForm.provider}
                    onChange={(e) => setResForm({ ...resForm, provider: e.target.value })}
                    placeholder="e.g. Coursera, Udemy"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Rating (1.0 - 5.0)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={resForm.rating}
                    onChange={(e) => setResForm({ ...resForm, rating: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Target Skills (Comma separated)</label>
                <input
                  type="text"
                  value={resForm.linked_skills}
                  onChange={(e) => setResForm({ ...resForm, linked_skills: e.target.value })}
                  placeholder="AWS, Cloud, Security"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Resource URL</label>
                <div className="relative">
                  <Link2 className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={resForm.url}
                    onChange={(e) => setResForm({ ...resForm, url: e.target.value })}
                    placeholder="https://example.com/course"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 outline-none text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition duration-200 text-sm"
              >
                Register Resource
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Resource Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-white rounded-[28px] max-w-md w-full border border-slate-100 p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[95vh] overflow-y-auto">
            <button 
              onClick={() => { setShowEditModal(false); }}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 p-1 bg-slate-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-center">
              <h3 className="text-2xl font-black text-slate-900">Edit Resource</h3>
              <p className="text-xs text-slate-400 font-semibold mt-1">Update learning details for active roadmaps</p>
            </div>
            <form onSubmit={handleEditResource} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Resource Title</label>
                <input
                  type="text"
                  required
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  placeholder="e.g. AWS Certified Solutions Architect"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-955 font-medium focus:border-blue-500 focus:bg-white transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Resource Type</label>
                  <select
                    value={editForm.type}
                    onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-700 font-semibold focus:border-blue-500 focus:bg-white transition"
                  >
                    <option value="Course">Course</option>
                    <option value="Tutorial">Tutorial</option>
                    <option value="Certification">Certification</option>
                    <option value="Book">Book</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Cost Type</label>
                  <select
                    value={editForm.cost}
                    onChange={(e) => setEditForm({ ...editForm, cost: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-700 font-semibold focus:border-blue-500 focus:bg-white transition"
                  >
                    <option value="Free">Free</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Provider</label>
                  <input
                    type="text"
                    required
                    value={editForm.provider}
                    onChange={(e) => setEditForm({ ...editForm, provider: e.target.value })}
                    placeholder="e.g. Coursera, Udemy"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-955 font-medium focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Rating (1.0 - 5.0)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={editForm.rating}
                    onChange={(e) => setEditForm({ ...editForm, rating: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Target Skills (Comma separated)</label>
                <input
                  type="text"
                  value={editForm.linked_skills}
                  onChange={(e) => setEditForm({ ...editForm, linked_skills: e.target.value })}
                  placeholder="AWS, Cloud, Security"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-955 font-medium focus:border-blue-500 focus:bg-white transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Resource URL</label>
                <div className="relative">
                  <Link2 className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={editForm.url}
                    onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                    placeholder="https://example.com/course"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 outline-none text-slate-955 font-medium focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition duration-200 text-sm cursor-pointer"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Custom Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-[28px] max-w-sm w-full border border-slate-100 p-6 sm:p-8 space-y-6 shadow-2xl relative text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
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
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-md shadow-red-500/10 transition text-xs cursor-pointer"
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

export default ManageResources;
