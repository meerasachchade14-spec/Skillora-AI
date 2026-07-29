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
  return (
    <div className="space-y-8">

      {/* Header */}
      <RoadmapHeader />

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