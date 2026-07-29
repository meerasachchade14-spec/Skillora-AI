import { useState } from "react";
import {
  FaTools,
  FaPlus,
  FaTimes,
  FaCode,
} from "react-icons/fa";

function SkillsForm({ resumeData, setResumeData }) {
  const [skill, setSkill] = useState("");

  const skills = resumeData.skills || [];

  const addSkill = () => {
    const trimmedSkill = skill.trim();

    if (!trimmedSkill) return;

    // Prevent duplicate skills
    const alreadyExists = skills.some(
      (item) => item.toLowerCase() === trimmedSkill.toLowerCase()
    );

    if (alreadyExists) {
      setSkill("");
      return;
    }

    setResumeData({
      ...resumeData,
      skills: [...skills, trimmedSkill],
    });

    setSkill("");
  };

  const removeSkill = (index) => {
    setResumeData({
      ...resumeData,
      skills: skills.filter((_, i) => i !== index),
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <section className="bg-white rounded-[28px] border border-slate-200 shadow-sm overflow-hidden">

      {/* Header */}
      <div className="p-6 md:p-8 border-b border-slate-100">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200">
            <FaTools className="text-xl" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
              Technical Expertise
            </p>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Skills
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Add the technical skills and tools you are comfortable working with.
            </p>
          </div>

        </div>

      </div>

      {/* Content */}
      <div className="p-6 md:p-8">

        {/* Add Skill */}
        <div className="flex flex-col sm:flex-row gap-3">

          <div className="relative flex-1">

            <FaCode className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 text-sm" />

            <input
              type="text"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. React, Python, Django, MongoDB"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
            />

          </div>

          <button
            type="button"
            onClick={addSkill}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-blue-600 transition-all duration-300"
          >
            <FaPlus />
            Add Skill
          </button>

        </div>

        <p className="text-xs text-slate-400 mt-2">
          Press Enter or click Add Skill to add a skill.
        </p>

        {/* Skills List */}
        <div className="mt-8">

          <div className="flex items-center justify-between mb-4">

            <h3 className="text-sm font-bold text-slate-700">
              Added Skills
            </h3>

            {skills.length > 0 && (
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {skills.length} {skills.length === 1 ? "Skill" : "Skills"}
              </span>
            )}

          </div>

          {skills.length === 0 ? (

            <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 px-6 py-10 text-center">

              <div className="w-14 h-14 mx-auto rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                <FaTools className="text-2xl" />
              </div>

              <h3 className="mt-4 font-bold text-slate-700">
                No skills added yet
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Start adding your technical skills above.
              </p>

            </div>

          ) : (

            <div className="flex flex-wrap gap-3">

              {skills.map((item, index) => (

                <div
                  key={`${item}-${index}`}
                  className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 font-semibold text-sm group"
                >

                  <FaCode className="text-blue-500 text-xs" />

                  <span>{item}</span>

                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="w-5 h-5 rounded-full flex items-center justify-center text-blue-400 hover:text-red-500 hover:bg-red-50 transition"
                    title={`Remove ${item}`}
                  >
                    <FaTimes className="text-xs" />
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </section>
  );
}

export default SkillsForm;