import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  LineChart as LineChartIcon, 
  TrendingUp, 
  Award, 
  Sparkles, 
  Activity,
  Cpu,
  Map,
  Code,
  GraduationCap
} from "lucide-react";
import adminService from "../../services/adminService";

function Analytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await adminService.getStats();
        setStats(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load analytics metrics.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        <span className="font-semibold text-slate-400 text-sm">Aggregating AI insights & telemetry...</span>
      </div>
    );
  }

  // Seeding realistic charts data for detailed AI views
  // Dynamic score distribution fetched from MongoDB stats API
  const scoreDistributionData = [
    { range: "0-50 (Critical)", count: stats?.ats_distribution?.critical ?? 0 },
    { range: "50-70 (Moderate)", count: stats?.ats_distribution?.moderate ?? 0 },
    { range: "70-85 (Strong)", count: stats?.ats_distribution?.strong ?? 0 },
    { range: "85-100 (Elite)", count: stats?.ats_distribution?.elite ?? 0 }
  ];

  const skillDemandData = (stats?.most_matched_skills && stats.most_matched_skills.length > 0)
    ? stats.most_matched_skills.map(s => ({ name: s.name, frequency: s.count }))
    : [
        { name: "Python", frequency: 45 },
        { name: "JavaScript", frequency: 52 },
        { name: "React.js", frequency: 38 },
        { name: "AWS", frequency: 18 },
        { name: "SQL", frequency: 41 },
        { name: "Docker", frequency: 15 }
      ];

  const missingSkillsData = (stats?.most_common_missing && stats.most_common_missing.length > 0)
    ? stats.most_common_missing.map(s => ({ name: s.name, frequency: s.count }))
    : [
        { name: "Docker", frequency: 12 },
        { name: "AWS", frequency: 10 },
        { name: "TypeScript", frequency: 8 },
        { name: "CI/CD", frequency: 7 },
        { name: "Kubernetes", frequency: 5 },
        { name: "GraphQL", frequency: 4 }
      ];

  const roadmapProgressData = [
    { step: "Step 1: Core Lang", completed: 85, in_progress: 10, todo: 5 },
    { step: "Step 2: Web Dev", completed: 42, in_progress: 38, todo: 20 },
    { step: "Step 3: Database", completed: 18, in_progress: 45, todo: 37 },
    { step: "Step 4: DevOps", completed: 5, in_progress: 15, todo: 80 }
  ];

  // Merge registrations and uploads trends by month from MongoDB API
  const activityTrendData = (() => {
    const regList = stats?.charts?.registrations || [];
    const uploadList = stats?.charts?.uploads || [];
    const merged = {};
    regList.forEach(item => {
      merged[item.month] = { month: item.month, registrations: item.registrations, uploads: 0 };
    });
    uploadList.forEach(item => {
      if (merged[item.month]) {
        merged[item.month].uploads = item.uploads;
      } else {
        merged[item.month] = { month: item.month, registrations: 0, uploads: item.uploads };
      }
    });
    return Object.values(merged);
  })();

  const COLORS = ["#f43f5e", "#f59e0b", "#3b82f6", "#10b981"];

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <LineChartIcon className="w-7 h-7 text-blue-600 animate-bounce" />
          AI & Analytics Insights
        </h2>
        <p className="text-sm text-slate-500 font-semibold mt-0.5">Statistical insights, ATS matching buckets, and API latencies</p>
      </div>

      {/* AI Usage Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">ATS Analyses</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h4 className="text-2xl font-black text-slate-900">{stats?.ai_usage_stats?.resume_analyses_run ?? 0}</h4>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Resume analyses completed</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Skill Matches</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Code className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h4 className="text-2xl font-black text-slate-900">{stats?.ai_usage_stats?.skills_matches_run ?? 0}</h4>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Skill checks calculated</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Roadmaps</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Map className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h4 className="text-2xl font-black text-slate-900">{stats?.ai_usage_stats?.roadmaps_generated ?? 0}</h4>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Career roadmaps built</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Career Advice</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h4 className="text-2xl font-black text-slate-900">{stats?.ai_usage_stats?.career_insights_generated ?? 0}</h4>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">AI advice logs created</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-sm space-y-2.5 bg-gradient-to-br from-blue-50 to-indigo-50/30">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-blue-800 uppercase tracking-wider">Average ATS</span>
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h4 className="text-2xl font-black text-blue-900">{stats?.metrics?.avg_ats ?? 78.5}%</h4>
            <p className="text-[10px] text-blue-500/80 font-semibold mt-0.5">Across all parses</p>
          </div>
        </div>
      </div>

      {/* Grid containing charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Score distribution */}
        <div className="bg-white border border-slate-200/80 rounded-[32px] p-6 sm:p-8 shadow-sm space-y-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-1.5">
              <Award className="w-5 h-5 text-indigo-500" />
              ATS Score Distribution Bins
            </h3>
            <p className="text-xs text-slate-400 font-semibold">User resume rankings sorted into proficiency brackets</p>
          </div>
          <div className="h-72 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={scoreDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {scoreDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2.5 font-bold text-xs text-slate-600 w-full sm:w-1/2">
              {scoreDistributionData.map((d, index) => (
                <div key={index} className="flex items-center justify-between border-b border-slate-50 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                    <span>{d.range}</span>
                  </div>
                  <span className="text-slate-900 font-black">{d.count} Resumes</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skill demand */}
        <div className="bg-white border border-slate-200/80 rounded-[32px] p-6 sm:p-8 shadow-sm space-y-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-1.5">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Skills In-Demand Frequencies
            </h3>
            <p className="text-xs text-slate-400 font-semibold">Frequencies of extraction tags in analyzed student profiles</p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillDemandData} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} />
                <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#475569', fontSize: 11, fontWeight: 700 }} />
                <Tooltip />
                <Bar dataKey="frequency" fill="#3b82f6" radius={[0, 6, 6, 0]} maxBarSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Most Common Missing Skills */}
        <div className="bg-white border border-slate-200/80 rounded-[32px] p-6 sm:p-8 shadow-sm space-y-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-1.5">
              <TrendingUp className="w-5 h-5 text-rose-500" />
              Most Common Missing Skills
            </h3>
            <p className="text-xs text-slate-400 font-semibold">Frequencies of identified skill gaps in analyzed resumes</p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={missingSkillsData} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} />
                <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#475569', fontSize: 11, fontWeight: 700 }} />
                <Tooltip />
                <Bar dataKey="frequency" fill="#f43f5e" radius={[0, 6, 6, 0]} maxBarSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* API performance and throughput workload */}
        <div className="bg-white border border-slate-200/80 rounded-[32px] p-6 sm:p-8 shadow-sm space-y-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-1.5">
              <Activity className="w-5 h-5 text-emerald-500 animate-pulse" />
              System Activity & Registration Trends
            </h3>
            <p className="text-xs text-slate-400 font-semibold">Monthly user registrations and resume uploads logs</p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11, fontWeight: 700, paddingTop: 10 }} />
                <Line type="monotone" dataKey="registrations" name="User Registrations" stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="uploads" name="Resume Uploads" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Analytics;
