import StatsCards from "./StatsCards";
import QuickActions from "./QuickActions";
import AnalyticsChart from "./AnalyticsChart";
import SkillRadar from "./SkillRadar";
import ProfileCard from "./ProfileCard";

function DashboardHome() {
  return (
    <div className="max-w-[1500px] mx-auto space-y-8">

      {/* Welcome Section */}
      <section className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

        <div>
          <p className="text-[11px] font-bold tracking-[0.18em] text-blue-600 uppercase mb-2">
            Your Career Command Center
          </p>

          <h1 className="text-4xl font-extrabold text-slate-950 tracking-tight">
            Welcome back, Jhanvi 👋
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Track your resume, skills, learning progress, and career opportunities.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm">
          <p className="text-[10px] text-slate-400 font-medium">
            Dashboard Status
          </p>

          <p className="text-xs font-bold text-slate-800 mt-1">
            Last updated today
          </p>
        </div>

      </section>


      {/* Stats */}
      <StatsCards />


      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">

        {/* Left: Performance */}
        <section className="xl:col-span-2">

          <div className="flex items-end justify-between mb-4">

            <div>
              <p className="text-[11px] font-bold tracking-[0.15em] text-blue-600 uppercase">
                Performance
              </p>

              <h2 className="text-xl font-bold text-slate-900 mt-1">
                Your Career Insights
              </h2>
            </div>

            <span className="text-xs text-slate-400">
              Based on your latest activity
            </span>

          </div>


          {/* Analytics + Skill Profile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <AnalyticsChart />

            <SkillRadar />

          </div>

        </section>


        {/* Right: Quick Actions Only */}
        <aside>

          <QuickActions />

        </aside>

      </div>


      {/* Full Width Profile Section */}
      <section className="w-full">

        <ProfileCard />

      </section>


    </div>
  );
}

export default DashboardHome;