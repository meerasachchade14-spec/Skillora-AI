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