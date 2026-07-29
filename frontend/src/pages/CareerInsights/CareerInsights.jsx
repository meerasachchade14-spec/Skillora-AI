import CareerOverview from "../../components/career-insights/CareerOverview";
import CareerReadinessScore from "../../components/career-insights/CareerReadinessScore";
import CareerTimeline from "../../components/career-insights/CareerTimeline";
import RecommendedCareerPaths from "../../components/career-insights/RecommendedCareerPaths";
import SalaryPrediction from "../../components/career-insights/SalaryPrediction";
import IndustryDemand from "../../components/career-insights/IndustryDemand";
import SkillsImpact from "../../components/career-insights/SkillsImpact";
import TopCompanies from "../../components/career-insights/TopCompanies";
import RecommendedCertifications from "../../components/career-insights/RecommendedCertifications";
import InterviewReadiness from "../../components/career-insights/InterviewReadiness";
import AICareerAdvisor from "../../components/career-insights/AICareerAdvisor";

function CareerInsights() {
  return (
    <div className="space-y-6">

      <CareerOverview />

      <div className="grid lg:grid-cols-2 gap-6">

        <CareerReadinessScore />
        <SalaryPrediction />

      </div>

      <CareerTimeline />

      <RecommendedCareerPaths />

      <IndustryDemand />

      <SkillsImpact />

      <TopCompanies />

      <RecommendedCertifications />

      <InterviewReadiness />

      <AICareerAdvisor />

    </div>
  );
}

export default CareerInsights;