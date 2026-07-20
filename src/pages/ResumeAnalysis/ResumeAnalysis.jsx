import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FaSpinner, FaCloudUploadAlt } from "react-icons/fa";

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

import analysisService from "../../services/analysisService";
import resumeService from "../../services/resumeService";

function ResumeAnalysis() {
  const [searchParams] = useSearchParams();
  const resumeIdParam = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const loadAnalysis = async (id) => {
    setLoading(true);
    setError("");
    try {
      const res = await analysisService.analyzeResume(id);
      if (res.success && res.data) {
        setAnalysis(res.data);
      } else {
        setError(res.message || "Failed to analyze resume");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during resume analysis");
    } finally {
      setLoading(false);
    }
  };

  const findLatestResumeAndAnalyze = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await resumeService.getResumes();
      if (res.success && res.data && res.data.length > 0) {
        const latestId = res.data[0].id;
        loadAnalysis(latestId);
      } else {
        setError("No resumes found. Please upload a resume first!");
        setLoading(false);
      }
    } catch (err) {
      setError("Failed to fetch resumes list");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resumeIdParam) {
      loadAnalysis(resumeIdParam);
    } else {
      findLatestResumeAndAnalyze();
    }
  }, [resumeIdParam]);

  if (loading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center gap-4 bg-white rounded-3xl shadow p-12">
        <FaSpinner className="text-6xl text-blue-600 animate-spin" />
        <h2 className="text-2xl font-bold text-slate-800 mt-4">Running AI Analysis</h2>
        <p className="text-slate-500 text-center max-w-sm">
          Gemini is analyzing your resume structure, keyword densities, missing skills, and scoring optimization...
        </p>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4 bg-white rounded-3xl shadow p-12 text-center">
        <FaCloudUploadAlt className="text-7xl text-slate-300" />
        <h2 className="text-2xl font-bold text-slate-800">{error || "Something went wrong"}</h2>
        <p className="text-slate-500 max-w-md mt-1">
          To perform an AI analysis, please upload your resume file.
        </p>
        <Link
          to="/resume-upload"
          className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Go to Upload
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AnalysisHeader />

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT */}
        <div className="col-span-8 space-y-6">
          <ResumeScore score={analysis.ats_score} />
          <ATSBreakdown />
          <ResumeSummary summary={analysis.recommendations?.[0] || ""} />
          <SkillsAnalysis skills={analysis.missing_keywords || []} />
          <ExperienceAnalysis />
          <EducationAnalysis />
          <ProjectsAnalysis />
          <KeywordAnalysis />
          <MissingSkills skills={analysis.missing_keywords} />
          <StrengthWeakness
            strengths={analysis.strengths}
            weaknesses={analysis.weaknesses}
          />
          <ImprovementTips />
          <AIRecommendations />
        </div>

        {/* RIGHT */}
        <div className="col-span-4 space-y-6">
          <AnalysisCharts />
          <AnalysisSidebar />
        </div>
      </div>
    </div>
  );
}

export default ResumeAnalysis;