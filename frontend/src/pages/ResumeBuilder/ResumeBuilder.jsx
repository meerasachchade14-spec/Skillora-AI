import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import resumeService from "../../services/resumeService";
import analysisService from "../../services/analysisService";
import { toast } from "react-hot-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaBolt, FaMagic } from "react-icons/fa";

import Stepper from "../../components/resumebuilder/Stepper";
import TemplateSelector from "../../components/resumebuilder/TemplateSelector";
import ThemeSelector from "../../components/resumebuilder/ThemeSelector";
import FontSelector from "../../components/resumebuilder/FontSelector";

import PersonalForm from "../../components/resumebuilder/PersonalForm";
import EducationForm from "../../components/resumebuilder/EducationForm";
import ExperienceForm from "../../components/resumebuilder/ExperienceForm";
import ProjectsForm from "../../components/resumebuilder/ProjectsForm";
import SkillsForm from "../../components/resumebuilder/SkillsForm";
import CertificationsForm from "../../components/resumebuilder/CertificationsForm";
import LanguagesForm from "../../components/resumebuilder/LanguagesForm";
import AchievementsForm from "../../components/resumebuilder/AchievementsForm";

import VolunteerForm from "../../components/resumebuilder/VolunteerForm";
import CustomSectionForm from "../../components/resumebuilder/CustomSectionForm";

import ResumePreview from "../../components/resumebuilder/ResumePreview";
import DownloadResume from "../../components/resumebuilder/DownloadResume";
import AIHintPanel from "../../components/resumebuilder/AIHintPanel";

const steps = [
  "Personal",
  "Education",
  "Experience",
  "Projects",
  "Skills",
  "Certificates",
  "Languages",
  "Achievements",
  "Volunteer",
  "Custom Sections",
];

export default function ResumeBuilder() {
  // Mobile preview toggle state
  const [showPreview, setShowPreview] = useState(true);

  // ── Router + auth hooks first (must precede any useState that reads location.state) ──
  const location = useLocation();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const [currentStep, setCurrentStep] = useState(() => {
    // Respect startStep from navigation state (e.g. from QualityAnalysis "Edit in Builder" button)
    const start = location.state?.startStep;
    return (typeof start === "number" && start >= 0 && start < steps.length) ? start : 0;
  });

  const [template, setTemplate] = useState("modern");
  const [theme, setTheme] = useState("blue");
  const [font, setFont] = useState("Poppins");

  const [showDownload, setShowDownload] = useState(false);
  // Track whether AI quality hints are available in sessionStorage
  const [hasQualityHints, setHasQualityHints] = useState(() => {
    return Boolean(sessionStorage.getItem("skillora_quality_hints"));
  });

  const [resumeId, setResumeId] = useState(location.state?.resumeId || null);
  const [isEditing, setIsEditing] = useState(Boolean(location.state?.isEditing || location.state?.resumeId));
  const [isSaving, setIsSaving] = useState(false);

  // Show a contextual toast when arriving from the QualityAnalysis page via "Edit in Builder"
  useEffect(() => {
    if (location.state?.fromQualityHint) {
      const pending = JSON.parse(sessionStorage.getItem("skillora_pending_rewrite") || "[]");
      if (pending.length > 0) {
        toast(
          `💡 Suggested rewrite ready — paste it into your experience description below.`,
          { duration: 6000, icon: "✏️" }
        );
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  const defaultResumeData = {
    personal: {},
    education: [],
    experience: [],
    projects: [],
    skills: [],
    certifications: [],
    languages: [],
    achievements: [],
    volunteer: [],
    customSections: [],
  };

  const [resumeData, setResumeData] = useState(() => {
    if (location.state?.resumeData) {
      // Merge with default to ensure all arrays exist even if parser missed them
      return { ...defaultResumeData, ...location.state.resumeData };
    }
    return defaultResumeData;
  });

  useEffect(() => {
    if (!location.state?.resumeData && !location.state?.newResume && user?.resume?.id) {
      resumeService.getResumeDetails(user.resume.id)
        .then((details) => {
          if (details && details.resumeData && Object.keys(details.resumeData).length > 0) {
            setResumeData((prev) => ({ ...defaultResumeData, ...details.resumeData }));
            setResumeId(user.resume.id);
            setIsEditing(true);
          }
        })
        .catch((err) => {
          console.log("Could not load user active resume into builder:", err.message);
        });
    }
  }, [user]);

  const handleSaveAndAnalyze = async () => {
    setIsSaving(true);
    toast.loading(isEditing ? "Updating resume..." : "Saving resume...", { id: "builder-save" });
    try {
      const resume = document.getElementById("resume-preview");
      if (!resume) {
        toast.error("Resume Preview Not Found", { id: "builder-save" });
        setIsSaving(false);
        return;
      }
      const canvas = await html2canvas(resume, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = (canvas.height * pageWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
      const pdfBlob = pdf.output("blob");

      const formData = new FormData();
      formData.append("file", pdfBlob, "resume.pdf");
      formData.append("resumeData", JSON.stringify(resumeData));

      let response;
      if (isEditing && resumeId) {
        formData.append("resume_id", resumeId);
        response = await resumeService.updateResume(resumeId, formData);
        toast.success("Resume updated successfully!", { id: "builder-save" });
      } else {
        response = await resumeService.uploadResume(formData);
        toast.success("Resume saved successfully!", { id: "builder-save" });
        if (response?.resume?.id) {
          setResumeId(response.resume.id);
          setIsEditing(true);
        }
      }

      if (response && response.user) {
        updateUser(response.user);
      }

      // Persist quality_analysis hints for the AI Hint Panel in the builder
      // (the full analysis is run server-side after save; hints returned in response if present)
      // We navigate to analysis page and hints will be loaded there.
      // Also clear any stale hints so the panel re-populates after next analysis.
      sessionStorage.removeItem("skillora_quality_hints");
      setHasQualityHints(false);

      navigate("/resume-analysis");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save and analyze resume.", { id: "builder-save" });
    } finally {
      setIsSaving(false);
    }
  };


  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const updateSection = (section, data) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalForm
            data={resumeData.personal}
            onChange={(data) => updateSection("personal", data)}
          />
        );

      case 1:
        return (
          <EducationForm
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        );

      case 2:
        return (
          <ExperienceForm
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        );

      case 3:
        return (
          <ProjectsForm
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        );

      case 4:
        return (
          <SkillsForm
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        );

      case 5:
        return (
          <CertificationsForm
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        );

      case 6:
        return (
          <LanguagesForm
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        );

      case 7:
        return (
          <AchievementsForm
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        );

      case 8:
        return (
          <VolunteerForm
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        );

      case 9:
        return (
          <CustomSectionForm
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* MAIN BUILDER CONTAINER */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

          {/* =====================================================
              LEFT SIDE - BUILDER
          ====================================================== */}

          <main className="min-w-0">

            <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm overflow-hidden">

              {/* HEADER */}
              <div className="px-6 py-5 border-b border-slate-100">

                <div className="flex items-center justify-between gap-4">

                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] font-black text-blue-600">
                      Resume Builder
                    </p>

                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                      Build Your Resume
                    </h1>

                    <p className="text-sm text-slate-500 mt-1">
                      Complete each section and watch your resume update live.
                    </p>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold">
                    Step {currentStep + 1} of {steps.length}
                  </div>

                </div>

              </div>


              {/* =====================================================
                  HORIZONTAL STEPPER
              ====================================================== */}

              <div className="px-6 pt-6">

                <Stepper
                  steps={steps}
                  currentStep={currentStep}
                  onStepClick={setCurrentStep}
                />

              </div>


              {/* =====================================================
                  DESIGN CONTROLS
              ====================================================== */}

              <div className="px-6 mt-6">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                  <TemplateSelector
                    value={template}
                    onChange={setTemplate}
                  />

                  <ThemeSelector
                    value={theme}
                    onChange={setTheme}
                  />

                  <FontSelector
                    value={font}
                    onChange={setFont}
                  />

                </div>

              </div>


              {/* =====================================================
                  ACTIVE FORM
              ====================================================== */}

              <div className="p-6">

                <div className="min-h-125">
                  {renderStep()}
                </div>


                {/* =====================================================
                    NAVIGATION BUTTONS
                ====================================================== */}

                <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-100">

                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      px-6
                      py-3
                      rounded-xl
                      bg-slate-100
                      text-slate-700
                      font-bold
                      text-sm
                      transition
                      hover:bg-slate-200
                      disabled:opacity-40
                      disabled:cursor-not-allowed
                    "
                  >
                    ← Previous
                  </button>


                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={currentStep === steps.length - 1}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      px-7
                      py-3
                      rounded-xl
                      bg-gradient-to-r
                      from-blue-600
                      to-indigo-600
                      text-white
                      font-bold
                      text-sm
                      shadow-lg
                      shadow-blue-200
                      transition
                      hover:-translate-y-0.5
                      hover:shadow-xl
                      disabled:opacity-40
                      disabled:cursor-not-allowed
                    "
                  >
                    Next
                    <span>→</span>
                  </button>

                </div>

              </div>

            </div>

          </main>


          {/* =====================================================
              RIGHT SIDE - LIVE RESUME
          ====================================================== */}

          <aside className={`min-w-0 xl:sticky xl:top-6 ${showPreview ? "block" : "hidden"} md:block`}>

            {/* LIVE PREVIEW */}

            <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm overflow-hidden">

              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">

                <div>
                  <p className="text-xs uppercase tracking-[0.16em] font-black text-blue-600">
                    Live Preview
                  </p>

                  <h2 className="text-lg font-black text-slate-900">
                    Your Resume
                  </h2>
                </div>

                <div className="flex items-center gap-2">

                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>

                  <span className="text-xs font-bold text-emerald-600">
                    Live
                  </span>

                </div>

              </div>


              <div className="p-4">

                <ResumePreview
                  resumeData={resumeData}
                  template={template}
                  theme={theme}
                  font={font}
                />

              </div>

            </div>


            {/* =====================================================
                QUICK ACTIONS
            ====================================================== */}

            <div className="mt-4 space-y-3">

              <button
                type="button"
                onClick={handleSaveAndAnalyze}
                disabled={isSaving}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  px-4
                  py-3.5
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-600
                  to-indigo-600
                  text-white
                  text-sm
                  font-bold
                  shadow-lg
                  shadow-blue-200
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-xl
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                <FaBolt className="text-amber-300" />
                {isSaving ? "Saving & Analyzing..." : (isEditing ? "Update & Analyze" : "Save & Analyze Resume")}
              </button>

              {/* Refresh AI Quality Hints — available when a resume is already saved */}
              {resumeId && (
                <button
                  type="button"
                  onClick={async () => {
                    toast.loading("Scanning resume for AI quality hints…", { id: "hint-scan" });
                    try {
                      const data = await analysisService.getAnalysis(resumeId);
                      if (data?.quality_analysis) {
                        sessionStorage.setItem("skillora_quality_hints", JSON.stringify(data.quality_analysis));
                        setHasQualityHints(true);
                        toast.success("AI quality hints updated!", { id: "hint-scan" });
                      } else {
                        toast("No quality hints found. Try saving first.", { id: "hint-scan", icon: "ℹ️" });
                      }
                    } catch {
                      toast.error("Could not fetch hints. Try saving first.", { id: "hint-scan" });
                    }
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    px-4
                    py-3
                    rounded-2xl
                    bg-indigo-50
                    text-indigo-700
                    text-sm
                    font-bold
                    border border-indigo-100
                    transition
                    hover:bg-indigo-100
                  "
                >
                  <FaMagic className="text-indigo-500" />
                  Refresh AI Quality Hints
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setShowDownload(true);
                }}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  px-4
                  py-3.5
                  rounded-2xl
                  bg-slate-900
                  text-white
                  text-sm
                  font-bold
                  shadow-lg
                  shadow-slate-200
                  transition
                  hover:-translate-y-0.5
                  hover:bg-slate-800
                "
              >
                <span className="text-lg">↓</span>
                Download / Export Options
              </button>

            </div>

          </aside>

        </div>

      </div>



      {/* =====================================================
          DOWNLOAD MODAL
      ====================================================== */}

      {showDownload && (

        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            p-4
            bg-slate-950/60
            backdrop-blur-sm
          "
          onClick={() => setShowDownload(false)}
        >

          <div
            className="
              relative
              w-full
              max-w-md
              rounded-[28px]
              bg-white
              shadow-2xl
              p-2
            "
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE BUTTON */}

            <button
              type="button"
              onClick={() => setShowDownload(false)}
              className="
                absolute
                top-4
                right-4
                z-10
                w-10
                h-10
                rounded-xl
                bg-slate-100
                text-slate-500
                flex
                items-center
                justify-center
                text-xl
                font-bold
                hover:bg-red-50
                hover:text-red-500
                transition
              "
              aria-label="Close Download Options"
            >
              ×
            </button>


            <DownloadResume
              resumeData={resumeData}
              isEditing={isEditing}
              resumeId={resumeId}
              onSaved={(newId) => {
                setResumeId(newId);
                setIsEditing(true);
              }}
            />

          </div>

        </div>

      )}

      {/* AI QUALITY HINT PANEL (floating, step-aware, auto-fetches when resumeId is available) */}
      <AIHintPanel currentStep={currentStep} resumeId={resumeId || null} />

    </div>
  );
}