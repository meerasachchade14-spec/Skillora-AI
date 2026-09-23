import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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
  const [currentStep, setCurrentStep] = useState(0);

  const [template, setTemplate] = useState("modern");
  const [theme, setTheme] = useState("blue");
  const [font, setFont] = useState("Poppins");

  const [showDownload, setShowDownload] = useState(false);

  const location = useLocation();

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

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.45fr)_minmax(420px,0.85fr)] gap-6 items-start">

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

          <aside className="min-w-0 xl:sticky xl:top-6">

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

            <div className="mt-4">

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
                Download
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
              isEditing={location.state?.isEditing}
              resumeId={location.state?.resumeId}
            />

          </div>

        </div>

      )}

    </div>
  );
}