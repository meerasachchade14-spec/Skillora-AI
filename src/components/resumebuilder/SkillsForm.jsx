import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

function SkillsForm({ resumeData, setResumeData }) {
  const [skill, setSkill] = useState("");

  const addSkill = () => {
    if (skill.trim() === "") return;

    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, skill],
    });

    setSkill("");
  };

  const deleteSkill = (index) => {
    const updatedSkills = resumeData.skills.filter(
      (_, i) => i !== index
    );

    setResumeData({
      ...resumeData,
      skills: updatedSkills,
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <h2 className="text-3xl font-bold text-slate-800 mb-8">
        Skills
      </h2>

      <div className="flex gap-4">

        <input
          type="text"
          placeholder="Enter a Skill (React, Python, AI...)"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className="flex-1 border rounded-xl p-4 outline-none focus:border-sky-500"
        />

        <button
          onClick={addSkill}
          className="px-8 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white flex items-center gap-2"
        >
          <FaPlus />
          Add
        </button>

      </div>

      {resumeData.skills.length > 0 && (

        <div className="mt-8">

          <h3 className="font-bold text-xl mb-5">
            Added Skills
          </h3>

          <div className="flex flex-wrap gap-3">

            {resumeData.skills.map((item, index) => (

              <div
                key={index}
                className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full flex items-center gap-3"
              >

                {item}

                <button
                  onClick={() => deleteSkill(index)}
                  className="text-red-500"
                >
                  <FaTrash />
                </button>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>
  );
}

export default SkillsForm;