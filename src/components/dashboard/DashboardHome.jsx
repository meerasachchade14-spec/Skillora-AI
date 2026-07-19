import StatsCards from "./StatsCards";
import QuickActions from "./QuickActions";
import RecentActivity from "./RecentActivity";
import ProfileCard from "./ProfileCard";

function DashboardHome() {
  return (
    <div className="space-y-8">

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">
          Welcome Back 👋
        </h1>

        <p className="text-slate-500 mt-2">
          Here's an overview of your AI career dashboard.
        </p>
      </div>

      <StatsCards />

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        <div>
          <QuickActions />
        </div>

      </div>

      <div>
        <ProfileCard />
      </div>

    </div>
  );
}

export default DashboardHome;