import UploadJobDescription from "../../components/matcher/UploadJobDescription";
import SkillMatchScore from "../../components/matcher/SkillMatchScore";
import SkillChart from "../../components/matcher/SkillChart";
import MissingSkills from "../../components/matcher/MissingSkills";
import SkillProgress from "../../components/matcher/SkillProgress";
import SkillCards from "../../components/matcher/SkillCards";
import AIInsights from "../../components/matcher/AIInsights";
import LearningRoadmap from "../../components/matcher/LearningRoadmap";
import RecommendedCourses from "../../components/matcher/RecommendedCourses";
import MatchActions from "../../components/matcher/MatchActions";
import MatchSidebar from "../../components/matcher/MatchSidebar";

function SkillMatcher() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          AI Skill Matcher
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          Compare your resume with the job description and
          discover missing skills using AI.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8">

          {/* LEFT */}

          <div className="col-span-8 space-y-8">

            <UploadJobDescription />

            <SkillMatchScore />

            <div className="grid md:grid-cols-2 gap-8">

              <SkillChart />

              <MissingSkills />

            </div>

            <SkillProgress />

            <SkillCards />

            <AIInsights />

            <LearningRoadmap />

            <RecommendedCourses />

            <MatchActions />

          </div>

          {/* RIGHT */}

          <div className="col-span-4">

            <MatchSidebar />

          </div>

      </div>
    </div>
  );
}

export default SkillMatcher;