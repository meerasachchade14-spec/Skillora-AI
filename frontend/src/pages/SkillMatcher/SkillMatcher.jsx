import useAuth from "../../hooks/useAuth";
import ResumeStatus from "../../components/matcher/ResumeStatus";
import SkillMatchScore from "../../components/matcher/SkillMatchScore";
import SkillOverview from "../../components/matcher/SkillOverview";
import MissingSkills from "../../components/matcher/MissingSkills";
import SkillDistribution from "../../components/matcher/SkillDistribution";
import IndustryBenchmark from "../../components/matcher/IndustryBenchmark";
import AIRecommendations from "../../components/matcher/AIRecommendations";
import SkillHistory from "../../components/matcher/SkillHistory";
import MatchSidebar from "../../components/matcher/MatchSidebar";

function SkillMatcher() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          AI Skill Matcher
        </h1>

        <p className="text-slate-500 mt-2 text-lg">
          Analyze your uploaded resume to discover your strengths, skill gaps,
          industry readiness, and personalized AI recommendations.
        </p>
      </div>

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

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 space-y-8">
          <ResumeStatus />

          <SkillMatchScore />

          <SkillOverview />

          <MissingSkills />

          <SkillDistribution />

          <IndustryBenchmark />

          <AIRecommendations />

          <SkillHistory />

        </div>

        <div className="col-span-4">

          <MatchSidebar />

        </div>

      </div>

    </div>
  );
}

export default SkillMatcher;