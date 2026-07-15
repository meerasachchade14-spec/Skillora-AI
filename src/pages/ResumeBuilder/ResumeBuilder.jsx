import { useState } from "react";

import Stepper from "../../components/resumebuilder/Stepper";

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

function ResumeBuilder() {

  const [step, setStep] = useState(1);

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

    if (step < 8) {

      setStep(step + 1);

    }

  };

  const prevStep = () => {

    if (step > 1) {

      setStep(step - 1);

    }

  };

  return (

    <div className="min-h-screen bg-slate-100">

      <div className="max-w-[1800px] mx-auto p-8">

        <Stepper currentStep={step} />

        <div className="grid grid-cols-12 gap-8 mt-8">

          {/* LEFT */}

          <div className="col-span-7">

            {step === 1 && (

              <PersonalForm
                resumeData={resumeData}
                setResumeData={setResumeData}
              />

            )}

            {step === 2 && (

              <EducationForm
                resumeData={resumeData}
                setResumeData={setResumeData}
              />

            )}

            {step === 3 && (

              <ExperienceForm
                resumeData={resumeData}
                setResumeData={setResumeData}
              />

            )}

            {step === 4 && (

              <ProjectsForm
                resumeData={resumeData}
                setResumeData={setResumeData}
              />

            )}

            {step === 5 && (

              <SkillsForm
                resumeData={resumeData}
                setResumeData={setResumeData}
              />

            )}

            {step === 6 && (

              <CertificationsForm
                resumeData={resumeData}
                setResumeData={setResumeData}
              />

            )}

            {step === 7 && (

              <LanguagesForm
                resumeData={resumeData}
                setResumeData={setResumeData}
              />

            )}

            {step === 8 && (

              <AchievementsForm
                resumeData={resumeData}
                setResumeData={setResumeData}
              />

            )}

            <div className="flex justify-between mt-8">

              <button

                onClick={prevStep}

                disabled={step === 1}

                className="px-8 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 disabled:opacity-40"

              >

                Previous

              </button>

              <button

                onClick={nextStep}

                disabled={step === 8}

                className="px-8 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:scale-105 transition"

              >

                Next

              </button>

            </div>

          </div>

          {/* RIGHT */}

          <div className="col-span-5 space-y-6">

            <ResumePreview resumeData={resumeData} />

            <AISuggestions resumeData={resumeData} />

          </div>

        </div>

      </div>

    </div>

  );

}

export default ResumeBuilder;