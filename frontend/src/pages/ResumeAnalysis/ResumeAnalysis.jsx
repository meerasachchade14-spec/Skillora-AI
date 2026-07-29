import { useState } from "react";
import useAuth from "../../hooks/useAuth";

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
import ProfileInsights from "../../components/analysis/ProfileInsights";
import ImprovementTips from "../../components/analysis/ImprovementTips";

import AnalysisNavigation from "../../components/analysis/AnalysisNavigation";

import "./ResumeAnalysis.css";

function ResumeAnalysis() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("overall-score");

  const latestExp = user?.experience?.[0];
  const graduation = user?.education?.graduation;

  const analysis = {
    score: user?.resume?.atsScore || 87,
    summary: {
      name: user?.name || "Jhanvi Ramani",
      email: user?.email || "jhanvi@gmail.com",
      phone: user?.phone_number || "+91 9876543210",
      education: graduation?.degree 
        ? `${graduation.degree} (${graduation.branch || ""})`
        : "B.E Computer Engineering",
      experience: latestExp
        ? `${latestExp.role} at ${latestExp.company}`
        : "Frontend Developer Intern",
    },
    skills: (user?.skills && user.skills.length > 0)
      ? user.skills.map((s) => s.name)
      : ["React", "JavaScript", "Tailwind", "Python", "MongoDB", "Git"],
    missingSkills: [
      "Docker",
      "AWS",
      "TypeScript",
      "CI/CD",
    ],
    strengths: [
      "Good Projects",
      "Strong React Skills",
      "Clean Resume",
      "ATS Friendly",
    ],
    weaknesses: [
      "No Certifications",
      "Weak Summary",
      "Missing Keywords",
    ],
  };


  const sections = {

    "overall-score": (

      <ResumeScore
        score={analysis.score}
      />

    ),


    "resume-summary": (

      <ResumeSummary
        summary={analysis.summary}
      />

    ),


    "ats-analysis": (

      <ATSBreakdown />

    ),


    "skills": (

      <SkillsAnalysis
        skills={analysis.skills}
      />

    ),


    "experience": (

      <ExperienceAnalysis />

    ),


    "education": (

      <EducationAnalysis />

    ),


    "projects": (

      <ProjectsAnalysis />

    ),


    "keyword-match": (

      <KeywordAnalysis />

    ),


    "missing-skills": (

      <MissingSkills
        skills={analysis.missingSkills}
      />

    ),


    "profile-insights": (

      <ProfileInsights
        strengths={analysis.strengths}
        weaknesses={analysis.weaknesses}
      />

    ),


    "improvement-tips": (

      <ImprovementTips />

    ),

  };


  return (
    <div className="resume-analysis-page space-y-6 p-6">
      {/* HEADER */}
      <AnalysisHeader />

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

      {/* HORIZONTAL NAVIGATION */}
      <AnalysisNavigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* ACTIVE SECTION */}
      <main className="analysis-content">
        {sections[activeSection]}
      </main>
    </div>
  );

}


export default ResumeAnalysis;