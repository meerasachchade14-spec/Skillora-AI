import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import authService from "../../services/authService";
import { toast } from "react-hot-toast";
import { FaCode, FaPlus, FaSave, FaTimes, FaEdit } from "react-icons/fa";

const DEFAULT_SKILLS = [
  { name: "React.js", level: 95 },
  { name: "JavaScript", level: 90 },
  { name: "HTML5", level: 95 },
  { name: "CSS3", level: 92 },
  { name: "Tailwind CSS", level: 94 },
  { name: "Node.js", level: 80 },
  { name: "Express.js", level: 78 },
  { name: "MongoDB", level: 82 },
  { name: "Git", level: 90 },
  { name: "GitHub", level: 92 }
];

function Skills() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState([]);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState(80);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.skills && user.skills.length > 0) {
        setSkills(user.skills);
      } else {
        setSkills(DEFAULT_SKILLS);
      }
    }
  }, [user]);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) {
      toast.error("Skill name cannot be empty.");
      return;
    }
    // Check if skill already exists
    if (skills.some(s => s.name.toLowerCase() === newSkillName.trim().toLowerCase())) {
      toast.error("Skill already exists.");
      return;
    }
    const newSkill = {
      name: newSkillName.trim(),
      level: parseInt(newSkillLevel) || 80
    };
    setSkills([...skills, newSkill]);
    setNewSkillName("");
    setNewSkillLevel(80);
  };

  const handleRemoveSkill = (nameToRemove) => {
    setSkills(skills.filter(s => s.name !== nameToRemove));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updatedUser = await authService.updateProfile({ skills });
      updateUser(updatedUser);
      setIsEditing(false);
      toast.success("Skills updated successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save skills.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 transition-all duration-300 hover:shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg border border-blue-100">
            <FaCode />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Skills Tagging
            </h2>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              Technical and professional expertise levels
            </p>
          </div>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4.5 py-2 text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 rounded-xl hover:bg-blue-600 hover:text-white transition duration-300 shadow-sm cursor-pointer"
          >
            <FaEdit /> Edit Skills
          </button>
        ) : (
          <button
            onClick={() => {
              setIsEditing(false);
              // Reset to user context state
              setSkills(user?.skills && user.skills.length > 0 ? user.skills : DEFAULT_SKILLS);
            }}
            className="flex items-center gap-2 px-4.5 py-2 text-xs font-bold bg-slate-50 text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-100 transition duration-300 shadow-sm cursor-pointer"
          >
            <FaTimes /> Cancel
          </button>
        )}
      </div>

      {!isEditing ? (
        /* View Mode */
        <div className="space-y-5">
          {skills.length === 0 ? (
            <p className="text-slate-400 text-sm italic text-center py-4">
              No skills added yet. Click edit to add your expertise.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {skills.map((skill, index) => (
                <div key={index} className="bg-slate-50/50 rounded-2xl p-4 border border-slate-150 hover:bg-slate-50 transition">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-slate-700 text-xs">
                      {skill.name}
                    </span>
                    <span className="text-blue-600 font-extrabold text-xs">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-sky-500 transition-all duration-700"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Edit Mode */
        <div className="space-y-6">
          {/* Add Skill Form */}
          <form onSubmit={handleAddSkill} className="bg-slate-50 rounded-2xl p-5 border border-slate-200/60 flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Skill Name
              </label>
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="e.g. Docker, Python, Figma"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:border-blue-500 outline-none text-sm font-medium"
              />
            </div>
            <div className="w-full md:w-48 space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block flex justify-between">
                <span>Proficiency Level</span>
                <span className="text-sky-600 font-extrabold">{newSkillLevel}%</span>
              </label>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(e.target.value)}
                className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition flex items-center justify-center gap-2 cursor-pointer text-sm whitespace-nowrap"
            >
              <FaPlus /> Add Tag
            </button>
          </form>

          {/* Current Skills list with remove action */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Manage Skills Tags ({skills.length})
            </h3>
            {skills.length === 0 ? (
              <p className="text-slate-400 text-sm italic">No skill tags added. Add some tags above.</p>
            ) : (
              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 pl-3.5 pr-2 py-1.5 bg-blue-50/50 hover:bg-blue-50 border border-blue-100 rounded-full group transition"
                  >
                    <span className="text-slate-700 font-bold text-xs">
                      {skill.name}
                    </span>
                    <span className="bg-sky-100 text-sky-700 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                      {skill.level}%
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill.name)}
                      className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 hover:bg-red-500 hover:text-white flex items-center justify-center transition cursor-pointer"
                      title={`Delete ${skill.name}`}
                    >
                      <FaTimes size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-100">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-xl shadow-md hover:from-sky-600 hover:to-blue-700 transition cursor-pointer text-sm disabled:opacity-50"
            >
              <FaSave /> {saving ? "Saving..." : "Save Skills Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Skills;