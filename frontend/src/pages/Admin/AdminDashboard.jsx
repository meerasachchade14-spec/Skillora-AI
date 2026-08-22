import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Users,
  FileText,
  Briefcase,
  Bug,
  Server,
  Database,
  Cpu,
  Clock,
  ArrowUpRight,
  Plus,
  Settings,
  ShieldCheck,
  BarChart3,
  Activity,
  UserPlus,
  RefreshCw
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import adminService from "../../services/adminService";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      const data = await adminService.getStats();
      setStats(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard metrics.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const getRelativeTime = (isoString) => {
    try {
      const now = new Date();
      const date = new Date(isoString);
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMs < 0 || diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) return `${diffDays}d ago`;
      
      return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    } catch (e) {
      return "Recently";
    }
  };

  const getActivityConfig = (type) => {
    switch (type) {
      case "user_registration":
        return {
          icon: <UserPlus className="w-3.5 h-3.5 text-blue-600" />,
          bg: "bg-blue-50 border-blue-100",
          label: "User Sign Up"
        };
      case "resume_upload":
        return {
          icon: <FileText className="w-3.5 h-3.5 text-indigo-600" />,
          bg: "bg-indigo-50 border-indigo-100",
          label: "Resume Upload"
        };
      case "resume_analysis":
        return {
          icon: <BarChart3 className="w-3.5 h-3.5 text-purple-600" />,
          bg: "bg-purple-50 border-purple-100",
          label: "ATS Analysis"
        };
      case "skill_match":
        return {
          icon: <Cpu className="w-3.5 h-3.5 text-emerald-600" />,
          bg: "bg-emerald-50 border-emerald-100",
          label: "Skill Match"
        };
      case "job_recommendation":
        return {
          icon: <Briefcase className="w-3.5 h-3.5 text-amber-600" />,
          bg: "bg-amber-50 border-amber-100",
          label: "Recommendations"
        };
      case "bug_report":
        return {
          icon: <Bug className="w-3.5 h-3.5 text-rose-600" />,
          bg: "bg-rose-50 border-rose-100",
          label: "Bug Report"
        };
      default:
        return {
          icon: <Activity className="w-3.5 h-3.5 text-slate-600" />,
          bg: "bg-slate-50 border-slate-100",
          label: "System Event"
        };
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        <span className="font-semibold text-slate-500 text-sm">Aggregating system statistics...</span>
      </div>
    );
  }

  const { metrics, system_health, charts, recent_activity } = stats || {
    metrics: { 
      total_users: 0, 
      total_resumes: 0, 
      total_analyses: 0, 
      total_skill_matches: 0, 
      total_job_recommendations: 0, 
      total_jobs: 0, 
      open_bugs: 0, 
      avg_ats: 78 
    },
    system_health: { api_status: "Offline", db_connection: "Disconnected", ai_service: "Offline", uptime: "0%" },
    charts: { registrations: [], uploads: [] },
    recent_activity: []
  };

  const statCards = [
    {
      title: "Total Users",
      value: metrics.total_users,
      icon: <Users className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-50/80 border-blue-100",
      description: "User profiles in database"
    },
    {
      title: "Total Resumes",
      value: metrics.total_resumes,
      icon: <FileText className="w-5 h-5 text-indigo-600" />,
      bg: "bg-indigo-50/80 border-indigo-100",
      description: "Uploaded document files"
    },
    {
      title: "Total Analyses",
      value: metrics.total_analyses || 0,
      icon: <BarChart3 className="w-5 h-5 text-purple-600" />,
      bg: "bg-purple-50/80 border-purple-100",
      description: "ATS feedback reports"
    },
    {
      title: "Skill Matches",
      value: metrics.total_skill_matches || 0,
      icon: <Cpu className="w-5 h-5 text-emerald-600" />,
      bg: "bg-emerald-50/80 border-emerald-100",
      description: "Compatibility runs"
    },
    {
      title: "Recommendations",
      value: metrics.total_job_recommendations || 0,
      icon: <Briefcase className="w-5 h-5 text-amber-600" />,
      bg: "bg-amber-50/80 border-amber-100",
      description: "Job suggestions mapped"
    }
  ];

  return (
    <div className="space-y-8 fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-500/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="bg-blue-500/30 text-blue-100 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">Control Panel</span>
          <h2 className="text-3xl font-black mt-2 tracking-tight">System Status Overview</h2>
          <p className="text-blue-100/80 mt-1.5 text-sm font-semibold max-w-xl">
            Real-time insights into user registrations, ATS matching stats, system logs, database integration, and active background threads.
          </p>
        </div>
        <div className="flex items-center gap-3 self-start md:self-center">
          <button
            onClick={() => fetchStats(true)}
            disabled={refreshing}
            className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/10 transition flex items-center justify-center cursor-pointer"
            title="Refresh statistics"
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`} />
          </button>
          <Link
            to="/admin/settings"
            className="px-5 py-3 bg-white hover:bg-slate-50 text-blue-600 rounded-2xl font-bold flex items-center gap-2 transition text-sm shadow-sm"
          >
            <Settings className="w-4 h-4" />
            Config settings
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid - Clean Premium 5 Column Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {statCards.map((card, idx) => (
          <div key={idx} className="p-5 rounded-2xl border border-slate-200/60 bg-white shadow-sm flex flex-col justify-between space-y-3 hover:shadow-md transition duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{card.title}</p>
                <h3 className="text-2xl font-black text-slate-900 mt-1">{card.value}</h3>
              </div>
              <div className={`p-2.5 rounded-xl ${card.bg.split(' ')[0]} border ${card.bg.split(' ')[1]}`}>
                {card.icon}
              </div>
            </div>
            <div className="text-slate-400 text-[10px] font-bold">
              {card.description}
            </div>
          </div>
        ))}
      </div>

      {/* Main Section Grid with Timeline Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Charts and Infrastructure Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Registrations Chart */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-md font-black text-slate-800">User Registrations Trend</h3>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Growth progression in total sign-ups</p>
              </div>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={charts.registrations} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorReg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} />
                    <Tooltip contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                    <Area type="monotone" dataKey="registrations" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorReg)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Uploads Chart */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-md font-black text-slate-800">Resume Upload Activity</h3>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Document parses run through the ATS Analyzer</p>
              </div>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={charts.uploads} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} />
                    <Tooltip contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                    <Bar dataKey="uploads" fill="#6366f1" radius={[6, 6, 0, 0]} maxBarSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Infrastructure Health */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
            <h3 className="text-md font-black text-slate-800 mb-5 flex items-center gap-2">
              <Server className="w-5 h-5 text-blue-600" />
              Infrastructure & Service Health
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                  <Server className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">API GATEWAY</p>
                  <p className="text-xs font-black text-slate-700 mt-0.5">{system_health.api_status}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                  <Database className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">MONGO CONNECTION</p>
                  <p className="text-xs font-black text-slate-700 mt-0.5">{system_health.db_connection}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                  <Cpu className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">AI LLM SERVICE</p>
                  <p className="text-xs font-black text-slate-700 mt-0.5">{system_health.ai_service}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                  <Clock className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">SYSTEM UPTIME</p>
                  <p className="text-xs font-black text-slate-700 mt-0.5">{system_health.uptime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Unified Recent Activity Feed */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col h-full min-h-[500px]">
          <div className="mb-5 flex justify-between items-center">
            <h3 className="text-md font-black text-slate-800 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Recent Activity Feed
            </h3>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              Live Logs
            </span>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 space-y-4 max-h-[460px] custom-scrollbar">
            {recent_activity && recent_activity.length > 0 ? (
              <div className="relative border-l border-slate-100 pl-4 ml-3 space-y-6">
                {recent_activity.map((act) => {
                  const cfg = getActivityConfig(act.type);
                  return (
                    <div key={act.id} className="relative group">
                      {/* Timeline dot */}
                      <span className={`absolute -left-[29px] top-0.5 p-1 rounded-full border border-white ${cfg.bg} flex items-center justify-center transition group-hover:scale-110 shadow-sm`}>
                        {cfg.icon}
                      </span>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                            {cfg.label}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {getRelativeTime(act.timestamp)}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-slate-700 leading-relaxed">
                          {act.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-20 text-slate-400 text-center">
                <Activity className="w-8 h-8 text-slate-300 mb-2 animate-pulse" />
                <p className="font-bold text-xs">No Recent Activities</p>
                <p className="text-[10px] mt-0.5 max-w-[200px]">Perform actions like uploading a resume or doing a skill match to see real logs.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions Footer */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
        <h3 className="text-md font-black text-slate-800 mb-5">Administrator Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/admin/users"
            className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/10 transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-4.5 h-4.5" />
              </div>
              <span className="text-sm font-bold text-slate-800">Add User Account</span>
            </div>
            <Plus className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
          </Link>

          <Link
            to="/admin/jobs"
            className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/10 transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Briefcase className="w-4.5 h-4.5" />
              </div>
              <span className="text-sm font-bold text-slate-800">Post New Job</span>
            </div>
            <Plus className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition" />
          </Link>

          <Link
            to="/admin/bugs"
            className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-rose-500 hover:bg-rose-50/10 transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Bug className="w-4.5 h-4.5" />
              </div>
              <span className="text-sm font-bold text-slate-800">Bug Backlog</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-0.5 transition" />
          </Link>

          <Link
            to="/admin/settings"
            className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-slate-800 hover:bg-slate-50 transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center">
                <Settings className="w-4.5 h-4.5" />
              </div>
              <span className="text-sm font-bold text-slate-800">System Config</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
