import { useState, useEffect } from "react";
import roadmapService from "../../services/roadmapService";
import { toast } from "react-hot-toast";

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
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoadmap = async () => {
      setLoading(true);
      try {
        const data = await roadmapService.getRoadmap();
        setRoadmap(data);
      } catch (err) {
        console.error("Failed to load roadmap:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoadmap();
  }, [user]);

  const handleToggleStep = async (stepId) => {
    if (!roadmap) return;

    const updatedSteps = roadmap.steps.map(step => {
      if (step.id === stepId) {
        return {
          ...step,
          status: step.status === 'completed' ? 'todo' : 'completed'
        };
      }
      return step;
    });

    const completedCount = updatedSteps.filter(s => s.status === 'completed').length;
    const progress = Math.round((completedCount / updatedSteps.length) * 100);

    try {
      const data = await roadmapService.updateRoadmap({
        progress,
        steps: updatedSteps
      });
      setRoadmap(data);
      toast.success("Learning roadmap progress updated!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to update roadmap.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-4">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-bold text-lg animate-pulse">Loading your custom learning roadmap...</p>
      </div>
    );
  }

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
      <LearningStats roadmap={roadmap} />

      {/* Timeline */}
      <RoadmapTimeline roadmap={roadmap} />

      {/* Skill Flow */}
      <SkillDependency />

      {/* Learning Resources */}
      <LearningResources />

      {/* Checklist */}
      <LearningChecklist roadmap={roadmap} onToggleStep={handleToggleStep} />

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