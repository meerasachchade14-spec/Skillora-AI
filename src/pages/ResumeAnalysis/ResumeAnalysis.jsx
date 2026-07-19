import AnalysisHeader from "../../components/analysis/AnalysisHeader";
import ResumeScore from "../../components/analysis/ResumeScore";
import ATSBreakdown from "../../components/analysis/ATSBreakdown";
import ResumeSummary from "../../components/analysis/ResumeSummary";
import SkillsAnalysis from "../../components/analysis/SkillsAnalysis";
import ExperienceAnalysis from "../../components/analysis/ExperienceAnalysis";
import EducationAnalysis from "../../components/analysis/EducationAnalysis";
import ProjectsAnalysis from "../../components/analysis/ProjectsAnalysis";
import KeywordAnalysis from "../../components/analysis/KeywordAnalysis";
import MissingSkills from "../../components/analysis/MissingSkills";
import StrengthWeakness from "../../components/analysis/StrengthWeakness";
import ImprovementTips from "../../components/analysis/ImprovementTips";
import AIRecommendations from "../../components/analysis/AIRecommendations";
import AnalysisCharts from "../../components/analysis/AnalysisCharts";
import AnalysisSidebar from "../../components/analysis/AnalysisSidebar";

function ResumeAnalysis() {

  // Dummy data (Later Backend API se replace hoga)

  const analysis = {

    score: 87,

    summary: {
      name: "Jhanvi Ramani",
      email: "jhanvi@gmail.com",
      phone: "+91 9876543210",
      education: "B.E Computer Engineering",
      experience: "Frontend Developer Intern"
    },

    skills: [
      "React",
      "JavaScript",
      "Tailwind",
      "Python",
      "MongoDB",
      "Git"
    ],

    missingSkills: [
      "Docker",
      "AWS",
      "TypeScript",
      "CI/CD"
    ],

    strengths: [
      "Good Projects",
      "Strong React Skills",
      "Clean Resume",
      "ATS Friendly"
    ],

    weaknesses: [
      "No Certifications",
      "Weak Summary",
      "Missing Keywords"
    ]

  };

  return (
    <div className="space-y-8">
      <AnalysisHeader />

      <div className="grid grid-cols-12 gap-6">

          {/* LEFT */}

          <div className="col-span-8 space-y-6">

            <ResumeScore score={analysis.score} />

            <ATSBreakdown />

            <ResumeSummary summary={analysis.summary} />

            <SkillsAnalysis skills={analysis.skills} />

            <ExperienceAnalysis />

            <EducationAnalysis />

            <ProjectsAnalysis />

            <KeywordAnalysis />

            <MissingSkills skills={analysis.missingSkills} />

            <StrengthWeakness
              strengths={analysis.strengths}
              weaknesses={analysis.weaknesses}
            />

            <ImprovementTips />

            <AIRecommendations />

            <AnalysisCharts />

          </div>

          {/* RIGHT */}

          <div className="col-span-4">

            <AnalysisSidebar score={analysis.score} />

          </div>

      </div>
    </div>
  );

}

export default ResumeAnalysis;