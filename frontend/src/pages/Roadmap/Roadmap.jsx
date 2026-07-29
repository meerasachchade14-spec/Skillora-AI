import useAuth from "../../hooks/useAuth";
import RoadmapHeader from "../../components/roadmap/RoadmapHeader";
import AIRecommendation from "../../components/roadmap/AIRecommendation";
import LearningStats from "../../components/roadmap/LearningStats";
import RoadmapTimeline from "../../components/roadmap/RoadmapTimeline";
import SkillDependency from "../../components/roadmap/SkillDependency";
import LearningResources from "../../components/roadmap/LearningResources";
import LearningChecklist from "../../components/roadmap/LearningChecklist";
import WeeklyGoals from "../../components/roadmap/WeeklyGoals";
import CareerUnlock from "../../components/roadmap/CareerUnlock";
import RecommendedCertificates from "../../components/roadmap/RecommendedCertificates";
import LearningAnalytics from "../../components/roadmap/LearningAnalytics";
import AIMentor from "../../components/roadmap/AIMentor";

function Roadmap() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Header */}
      <RoadmapHeader />

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

      {/* AI Recommendation */}
      <AIRecommendation />

      {/* Stats */}
      <LearningStats />

      {/* Timeline */}
      <RoadmapTimeline />

      {/* Skill Flow */}
      <SkillDependency />

      {/* Learning Resources */}
      <LearningResources />

      {/* Checklist */}
      <LearningChecklist />

      {/* Weekly Goals */}
      <WeeklyGoals />

      {/* Career Unlock */}
      <CareerUnlock />

      {/* Certificates */}
      <RecommendedCertificates />

      {/* Analytics */}
      <LearningAnalytics />

      {/* AI Mentor */}
      <AIMentor />

    </div>
  );
}

export default Roadmap;