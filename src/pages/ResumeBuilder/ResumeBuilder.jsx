import { useState } from "react";

import Stepper from "../../components/resumebuilder/Stepper";
import ProgressTracker from "../../components/resumebuilder/ProgressTracker";
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

import ResumePreview from "../../components/resumebuilder/ResumePreview";
import AISuggestions from "../../components/resumebuilder/AISuggestions";
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
];

export default function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState(0);

  const [template, setTemplate] = useState("modern");
  const [theme, setTheme] = useState("blue");
  const [font, setFont] = useState("Poppins");

  const [resumeData, setResumeData] = useState({
    personal: {},
    education: [],
    experience: [],
    projects: [],
    skills: [],
    certifications: [],
    languages: [],
    achievements: [],
  });

  const nextStep = () => {
    if (currentStep < steps.length - 1)
      setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0)
      setCurrentStep(currentStep - 1);
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
            onChange={(d) => updateSection("personal", d)}
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

      default:
        return null;
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">

        {/* Left Panel */}

        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">

          <Stepper
            steps={steps}
            currentStep={currentStep}
          />

          <ProgressTracker
            current={currentStep + 1}
            total={steps.length}
          />

          <div className="grid md:grid-cols-3 gap-4 mt-6">

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

          <div className="mt-8">
            {renderStep()}
          </div>

          <div className="flex justify-between mt-8">

            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-6 py-2 rounded bg-gray-300"
            >
              Previous
            </button>

            <button
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className="px-6 py-2 rounded bg-blue-600 text-white"
            >
              Next
            </button>

          </div>

        </div>

        {/* Right Panel */}

        <div className="space-y-6 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto pr-2">

          <ResumePreview
            resumeData={resumeData}
            template={template}
            theme={theme}
            font={font}
          />

          <AISuggestions
            resumeData={resumeData}
          />

          <DownloadResume
            resumeData={resumeData}
          />

        </div>

    </div>
  );
}