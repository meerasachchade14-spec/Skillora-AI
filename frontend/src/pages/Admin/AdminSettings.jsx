import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { 
  Settings, 
  Cpu, 
  Sliders, 
  Mail, 
  ShieldAlert, 
  Save, 
  RotateCcw,
  Terminal,
  Database,
  User,
  ShieldCheck,
  LogOut
} from "lucide-react";
import adminService from "../../services/adminService";
import authService from "../../services/authService";
import useAuth from "../../hooks/useAuth";

function AdminSettings() {
  const navigate = useNavigate();
  const { user, updateUser, logout } = useAuth();

  const [settingsForm, setSettingsForm] = useState({
    active_model: "gpt-4o",
    ats_threshold: 75,
    smtp_host: "smtp.gmail.com",
    smtp_port: 587,
    debug_mode: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profileForm, setProfileForm] = useState({
    name: "",
    phone_number: "",
    bio: "",
    email: "",
    role: ""
  });
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || "",
        phone_number: user.phone_number || "",
        bio: user.bio || "",
        email: user.email || "",
        role: user.role || "Admin"
      });
    }
  }, [user]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      setSavingProfile(true);
      const updatedUser = await authService.updateProfile({
        name: profileForm.name,
        phone_number: profileForm.phone_number,
        bio: profileForm.bio
      });
      updateUser(updatedUser);
      toast.success("Admin profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update admin profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const data = await adminService.getSettings();
        setSettingsForm(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await adminService.saveSettings(settingsForm);
      toast.success("System configurations updated successfully!");
    } catch (err) {
      toast.error("Failed to update configurations.");
    } finally {
      setSaving(false);
    }
  };

  const handleSystemReset = () => {
    if (!window.confirm("WARNING: Are you sure you want to restore default system parameters? This does not wipe databases but resets thresholds and active AI models.")) {
      return;
    }
    setSettingsForm({
      active_model: "gpt-4o",
      ats_threshold: 75,
      smtp_host: "smtp.gmail.com",
      smtp_port: 587,
      debug_mode: true
    });
    toast.success("Defaults loaded. Click save to apply changes.");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        <span className="font-semibold text-slate-400 text-sm">Querying active configs...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8 fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Admin & System Settings</h2>
        <p className="text-sm text-slate-500 font-semibold mt-0.5">Manage administrator credentials, active LLM engines, and SMTP settings</p>
      </div>

      {/* Admin Profile Details */}
      <form onSubmit={handleProfileSubmit} className="space-y-6 bg-white border border-slate-200/80 rounded-[28px] p-6 sm:p-8 shadow-sm">
        <h3 className="text-base font-black text-slate-950 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-500" />
          Administrator Profile Details
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Full Name</label>
            <input
              type="text"
              required
              value={profileForm.name}
              onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-955 font-medium focus:border-blue-500 focus:bg-white transition"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Phone Number</label>
            <input
              type="text"
              value={profileForm.phone_number}
              onChange={(e) => setProfileForm({ ...profileForm, phone_number: e.target.value })}
              placeholder="e.g. +91 9999999999"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-955 font-medium focus:border-blue-500 focus:bg-white transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Email Address (Read-only)</label>
            <input
              type="email"
              disabled
              value={profileForm.email}
              className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-500 font-medium cursor-not-allowed"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">System Role</label>
            <div className="relative">
              <input
                type="text"
                disabled
                value={profileForm.role}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-500 font-medium cursor-not-allowed uppercase tracking-wider"
              />
              <ShieldCheck className="w-5 h-5 text-blue-600 absolute right-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Admin Biography</label>
          <textarea
            rows="3"
            value={profileForm.bio}
            onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
            placeholder="Write a short biography..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-955 font-medium focus:border-blue-500 focus:bg-white transition"
          />
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <button
            type="submit"
            disabled={savingProfile}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-blue-500/10 cursor-pointer text-sm"
          >
            <Save className="w-4.5 h-4.5" />
            {savingProfile ? "Saving Profile..." : "Update Profile"}
          </button>
          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/admin/login");
              toast.success("Administrator logged out successfully.");
            }}
            className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3.5 px-6 rounded-2xl cursor-pointer text-sm transition duration-200"
          >
            <LogOut className="w-4.5 h-4.5" />
            Log Out Console
          </button>
        </div>
      </form>

      {/* Divider */}
      <hr className="border-slate-200/80" />

      {/* System Settings Header */}
      <div>
        <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-blue-600" />
          Global System Configurations
        </h3>
        <p className="text-sm text-slate-500 font-semibold mt-0.5">Control global models, SMTP parameters, and backend configurations</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* LLM Config */}
        <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 sm:p-8 shadow-sm space-y-5">
          <h3 className="text-base font-black text-slate-950 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-500" />
            AI LLM Model Engine Selection
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Active Model Partner</label>
              <select
                value={settingsForm.active_model}
                onChange={(e) => setSettingsForm({ ...settingsForm, active_model: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-700 font-semibold focus:border-blue-500 focus:bg-white transition"
              >
                <option value="gpt-4o">OpenAI GPT-4o (Recommended)</option>
                <option value="gpt-3.5-turbo">OpenAI GPT-3.5-Turbo (Lighter)</option>
                <option value="claude-3-5-sonnet">Anthropic Claude 3.5 Sonnet</option>
                <option value="gemini-1.5-pro">Google Gemini 1.5 Pro</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">ATS Threshold Target (%)</label>
              <input
                type="number"
                min="10"
                max="100"
                required
                value={settingsForm.ats_threshold}
                onChange={(e) => setSettingsForm({ ...settingsForm, ats_threshold: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition"
              />
            </div>
          </div>
        </div>

        {/* Mail Config */}
        <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 sm:p-8 shadow-sm space-y-5">
          <h3 className="text-base font-black text-slate-950 flex items-center gap-2">
            <Mail className="w-5 h-5 text-indigo-500" />
            SMTP Mail Gateway Parameters
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">SMTP Outgoing Host</label>
              <input
                type="text"
                required
                value={settingsForm.smtp_host}
                onChange={(e) => setSettingsForm({ ...settingsForm, smtp_host: e.target.value })}
                placeholder="smtp.gmail.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">SMTP Port</label>
              <input
                type="number"
                required
                value={settingsForm.smtp_port}
                onChange={(e) => setSettingsForm({ ...settingsForm, smtp_port: e.target.value })}
                placeholder="587"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition"
              />
            </div>
          </div>
        </div>

        {/* Environment Settings */}
        <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 sm:p-8 shadow-sm space-y-5">
          <h3 className="text-base font-black text-slate-950 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-500" />
            Environment & Diagnostics Configs
          </h3>
          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div>
              <p className="text-sm font-bold text-slate-900">Developer Debug Mode</p>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Prints detailed django stack traces and unlocks mock payloads</p>
            </div>
            <button
              type="button"
              onClick={() => setSettingsForm({ ...settingsForm, debug_mode: !settingsForm.debug_mode })}
              className={`w-14 h-8 rounded-full transition duration-300 relative cursor-pointer ${
                settingsForm.debug_mode ? "bg-emerald-500" : "bg-slate-300"
              }`}
            >
              <span className={`w-6 h-6 rounded-full bg-white absolute top-1 transition-all duration-300 shadow-sm ${
                settingsForm.debug_mode ? "left-7" : "left-1"
              }`} />
            </button>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-blue-500/10 cursor-pointer text-sm"
          >
            <Save className="w-4.5 h-4.5" />
            {saving ? "Saving Changes..." : "Save Settings"}
          </button>
          <button
            type="button"
            onClick={handleSystemReset}
            className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3.5 px-6 rounded-2xl cursor-pointer text-sm"
          >
            <RotateCcw className="w-4.5 h-4.5" />
            Restore Defaults
          </button>
        </div>
      </form>

      {/* Audit Logs Block */}
      <div className="bg-[#0b1329] rounded-[28px] border border-slate-800 p-6 sm:p-8 shadow-sm space-y-4 text-white">
        <h3 className="text-base font-black flex items-center gap-2 text-blue-400">
          <Terminal className="w-5 h-5 text-blue-400" />
          Active Web Server Audit Logs (Stdout)
        </h3>
        <div className="bg-black/45 rounded-2xl p-4 font-mono text-[10px] text-slate-300 space-y-1.5 h-44 overflow-y-auto border border-slate-800">
          <p className="text-slate-500">[2026-08-18 18:51:20] django.server: "GET /api/auth/profile/ HTTP/1.1" 200 OK</p>
          <p className="text-emerald-500">[2026-08-18 18:52:12] PyMongo: Connected to local replica set at localhost:27017</p>
          <p className="text-slate-500">[2026-08-18 18:54:02] django.server: "POST /api/auth/report-bug/ HTTP/1.1" 200 OK</p>
          <p className="text-slate-500">[2026-08-18 18:55:40] django.server: "GET /api/admin/stats HTTP/1.1" 200 OK</p>
          <p className="text-amber-500">[2026-08-18 18:56:02] Warning: SMTP connection throttled. Falling back to local storage logs.</p>
          <p className="text-slate-500">[2026-08-18 18:57:15] django.server: "GET /api/admin/settings HTTP/1.1" 200 OK</p>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
