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
  return (
    <div className="space-y-8">

      <JobHeader />

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