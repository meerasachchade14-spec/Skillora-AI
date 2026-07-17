import ModernTemplate from "./templates/ModernTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";

function ResumePreview({ resumeData, template, theme, font }) {
  return (
    <div className="w-full">

      {/* Header */}

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-2xl font-bold text-slate-800">
          Live Resume Preview
        </h2>

        <span className="px-4 py-2 rounded-full bg-sky-100 text-sky-700 font-semibold text-sm">
          ATS Friendly
        </span>

      </div>

      {/* Preview Container */}

      <div
       id="resume-preview"
       className="
       bg-slate-200
        rounded-2xl
        shadow-xl
         p-6
         overflow-auto
          h-[900px]
           "
          >

        <div className="scale-[0.82] origin-top">

          {template === "modern" && (
            <ModernTemplate resumeData={resumeData} theme={theme} font={font} />
          )}

          {template === "professional" && (
            <ProfessionalTemplate resumeData={resumeData} theme={theme} font={font} />
          )}

          {template === "creative" && (
            <CreativeTemplate resumeData={resumeData} theme={theme} font={font} />
          )}

        </div>

      </div>

    </div>
  );
}

export default ResumePreview;