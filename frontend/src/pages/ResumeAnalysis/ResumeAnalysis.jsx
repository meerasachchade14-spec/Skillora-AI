import { useState } from "react";

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

  const [activeSection, setActiveSection] =
    useState("overall-score");


  const analysis = {

    score: 87,

    summary: {
      name: "Jhanvi Ramani",
      email: "jhanvi@gmail.com",
      phone: "+91 9876543210",
      education: "B.E Computer Engineering",
      experience: "Frontend Developer Intern",
    },

    skills: [
      "React",
      "JavaScript",
      "Tailwind",
      "Python",
      "MongoDB",
      "Git",
    ],

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

    <div className="resume-analysis-page">

      {/* HEADER */}

      <AnalysisHeader />


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