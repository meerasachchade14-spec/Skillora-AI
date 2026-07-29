import ModernTemplate from "./templates/ModernTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";

function ResumePreview({
  resumeData,
  template,
  theme,
  font,
}) {
  return (
    <section className="bg-white rounded-[28px] border border-slate-200 shadow-xl overflow-hidden">

      {/* Header */}

      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">

        <div>
          <p className="text-xs uppercase tracking-widest font-black text-blue-600">
            Live Preview
          </p>

          <h2 className="text-lg font-black text-slate-900 mt-1">
            Your Resume
          </h2>
        </div>

        <div className="flex items-center gap-2">

          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />

          <span className="text-xs font-bold text-slate-500">
            Live
          </span>

        </div>

      </div>


      {/* Preview */}

      <div
        id="resume-preview"
        className="bg-slate-200 p-5 h-[850px] overflow-y-auto overflow-x-hidden"
      >

        <div className="origin-top scale-[0.82]">

          {template === "modern" && (
            <ModernTemplate
              resumeData={resumeData}
              theme={theme}
              font={font}
            />
          )}

          {template === "professional" && (
            <ProfessionalTemplate
              resumeData={resumeData}
              theme={theme}
              font={font}
            />
          )}

          {template === "creative" && (
            <CreativeTemplate
              resumeData={resumeData}
              theme={theme}
              font={font}
            />
          )}

        </div>

      </div>

    </section>
  );
}

export default ResumePreview;