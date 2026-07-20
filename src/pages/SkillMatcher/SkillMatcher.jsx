import { useState } from "react";
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
import matcherService from "../../services/matcherService";

function SkillMatcher() {
  const [matchResult, setMatchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAnalyze = async (jobDescription) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await matcherService.matchSkills({ jobDescription });
      if (res.success && res.data) {
        setMatchResult(res.data);
      } else {
        setErrorMsg(res.message || "Failed to calculate skill match.");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to analyze skills. Ensure you have uploaded a resume first.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          AI Skill Matcher
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Compare your resume with the job description and discover missing skills using AI.
        </p>
      </div>

      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-5 font-semibold text-center">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-12 gap-8">
        {/* LEFT */}
        <div className="col-span-8 space-y-8">
          <UploadJobDescription onAnalyze={handleAnalyze} loading={loading} />

          {matchResult && (
            <>
              <SkillMatchScore score={matchResult.match_percentage} />

              <div className="grid md:grid-cols-2 gap-8">
                <SkillChart />
                <MissingSkills skills={matchResult.missing_skills} />
              </div>

              <SkillProgress />
              <SkillCards />
              <AIInsights />
              <LearningRoadmap roadmap={matchResult.learning_recommendations} />
              <RecommendedCourses courses={matchResult.learning_recommendations} />
              <MatchActions />
            </>
          )}
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