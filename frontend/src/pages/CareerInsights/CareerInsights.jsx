import { useState, useEffect } from "react";
import careerService from "../../services/careerService";
import useAuth from "../../hooks/useAuth";
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
  const { user } = useAuth();
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      try {
        const data = await careerService.getCareerInsights();
        setInsights(data);
      } catch (err) {
        console.error("Failed to load career insights:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, [user]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-4">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-bold text-lg animate-pulse">Loading career insights...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CareerOverview />

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

      <div className="grid lg:grid-cols-2 gap-6">

        <CareerReadinessScore score={insights?.readinessScore} />
        <SalaryPrediction salaryPrediction={insights?.salaryPrediction} />

      </div>


      <CareerTimeline timeline={insights?.timeline} />

      <RecommendedCareerPaths />

      <IndustryDemand demandTrend={insights?.demandTrend} />

      <SkillsImpact />

      <TopCompanies />

      <RecommendedCertifications />

      <InterviewReadiness />

      <AICareerAdvisor />

    </div>
  );
}

export default CareerInsights;