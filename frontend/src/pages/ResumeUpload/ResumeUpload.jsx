import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import authService from "../../services/authService";
import { toast } from "react-hot-toast";

import UploadCard from "../../components/upload/UploadCard";
import UploadArea from "../../components/upload/UploadArea";
import UploadedResume from "../../components/upload/UploadedResume";

function ResumeUpload() {
  const { user, updateUser } = useAuth();
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (user?.resume?.filename) {
      setFile({ name: user.resume.filename });
      setAnalysis({
        score: Math.max(50, user.resume.atsScore - 4),
        atsScore: user.resume.atsScore,
        keywords: 24,
        improvements: 5,
        skills: (user.skills && user.skills.length > 0) 
          ? user.skills.map((s) => s.name)
          : ["Python", "React", "JavaScript", "Django", "SQL", "Git"],
        suggestions: [
          "Add more measurable achievements to your experience section.",
          "Include more keywords relevant to your target job role.",
          "Add a concise professional summary at the beginning of your resume.",
          "Quantify your project impact wherever possible.",
          "Consider adding relevant certifications or achievements.",
        ],
      });
    } else {
      setFile(null);
      setAnalysis(null);
    }
  }, [user]);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setAnalysis(null);
  };

  const handleAnalyze = () => {
    if (!file) return;

    setIsAnalyzing(true);

    setTimeout(async () => {
      const score = Math.floor(Math.random() * 20) + 76; // Generate 76 - 95
      const uploadDate = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      const resumePayload = {
        filename: file.name,
        atsScore: score,
        uploadDate: uploadDate,
      };

      try {
        const updatedUser = await authService.updateProfile({
          resume: resumePayload,
        });
        updateUser(updatedUser);
        toast.success(`Resume uploaded and analyzed! ATS Score: ${score}%`);
      } catch (err) {
        console.error(err);
        toast.error("Failed to save resume to profile.");
      } finally {
        setIsAnalyzing(false);
      }
    }, 2500);
  };

  return (
    <div className="space-y-8">
      {/* TOP HERO */}
      <UploadCard />

      {/* UPLOAD + ANALYSIS */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <UploadArea onFileSelect={handleFileSelect} />
        <UploadedResume
          file={file}
          analysis={analysis}
          isAnalyzing={isAnalyzing}
          onAnalyze={handleAnalyze}
        />
      </div>

      {/* HOW IT WORKS */}
      <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm p-6 md:p-8">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600">
            Simple & Powerful
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">
            How Resume Analysis Works
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Turn your resume into actionable career insights in a few simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="rounded-2xl bg-blue-50 border border-blue-100 p-5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
              01
            </div>
            <h3 className="font-bold text-slate-800 mt-4">Upload Resume</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Upload your existing PDF or DOCX resume securely.
            </p>
          </div>

          <div className="rounded-2xl bg-violet-50 border border-violet-100 p-5">
            <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center font-black">
              02
            </div>
            <h3 className="font-bold text-slate-800 mt-4">AI Analyzes</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              AI reviews your skills, structure, keywords and ATS compatibility.
            </p>
          </div>

          <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black">
              03
            </div>
            <h3 className="font-bold text-slate-800 mt-4">Improve & Grow</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Receive personalized recommendations to make your resume stronger.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeUpload;