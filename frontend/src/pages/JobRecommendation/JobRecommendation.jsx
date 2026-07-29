import useAuth from "../../hooks/useAuth";
import JobHeader from "../../components/jobs/JobHeader";
import JobFilters from "../../components/jobs/JobFilters";
import JobMatchScore from "../../components/jobs/JobMatchScore";
import JobRecommendations from "../../components/jobs/JobRecommendations";
import SalaryInsights from "../../components/jobs/SalaryInsights";
import CompanyCard from "../../components/jobs/CompanyCard";
import JobDetails from "../../components/jobs/JobDetails";
import JobInsights from "../../components/jobs/JobInsights";
import JobActions from "../../components/jobs/JobActions";
import JobsSidebar from "../../components/jobs/JobsSidebar";

function JobRecommendation() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <JobHeader />

      {/* ACTIVE RESUME BANNER */}
      {user?.resume?.filename ? (
        <div className="bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-100 rounded-2xl px-5 py-3.5 flex items-center justify-between shadow-sm fade-in">
          <div className="flex items-center gap-3">
            <span className="text-xl">📄</span>
            <div>
              <p className="text-sm font-bold text-slate-800">
                Active Resume: <span className="text-blue-600 font-extrabold">{user.resume.filename}</span>
              </p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Automatically matching your career profiles with {user.resume.atsScore}% ATS score.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
            Active
          </span>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="text-sm font-bold text-slate-800">
                No active resume found
              </p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Showing general demo data. Upload your resume in Profile or Resume Upload to see personalized insights.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-700 px-3 py-1 rounded-full border border-amber-200">
            Demo Mode
          </span>
        </div>
      )}

      <div className="grid grid-cols-12 gap-6">

        {/* Left Content */}
        <div className="col-span-8 space-y-6">

          <JobFilters />

          <JobMatchScore />

          <JobRecommendations />

          <SalaryInsights />

          <CompanyCard />

          <JobDetails />

          <JobInsights />

          <JobActions />

        </div>

        {/* Right Sidebar */}
        <div className="col-span-4">

          <JobsSidebar />

        </div>

      </div>

    </div>
  );
}

export default JobRecommendation;