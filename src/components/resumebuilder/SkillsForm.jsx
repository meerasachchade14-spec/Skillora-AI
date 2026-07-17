import { useState } from "react";
import { FaTools, FaPlus, FaTimes } from "react-icons/fa";

function SkillsForm({ resumeData, setResumeData }) {

  const [skill, setSkill] = useState("");

  const skills = resumeData.skills || [];

  const addSkill = () => {

    if (!skill.trim()) return;

    setResumeData({

      ...resumeData,

      skills: [...skills, skill],

    });

    setSkill("");

  };

  const removeSkill = (index) => {

    setResumeData({

      ...resumeData,

      skills: skills.filter((_, i) => i !== index),

    });

  };

  return (

    <div className="bg-white rounded-3xl shadow-xl p-8">

      <div className="flex items-center gap-3 mb-8">

        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white flex items-center justify-center">

          <FaTools />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-slate-800">

            Technical Skills

          </h2>

          <p className="text-slate-500">

            Add your technical skills.

          </p>

        </div>

      </div>

      <div className="flex gap-3">

        <input
          type="text"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          placeholder="React JS"
          className="flex-1 p-4 rounded-xl border"
        />

        <button
          onClick={addSkill}
          className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 rounded-xl flex items-center gap-2"
        >

          <FaPlus />

          Add

        </button>

      </div>

      <div className="mt-8 flex flex-wrap gap-3">

        {skills.length === 0 ? (

          <p className="text-slate-400">
            No Skills Added
          </p>

        ) : (

          skills.map((item, index) => (

            <div
              key={index}
              className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full flex items-center gap-3 font-medium"
            >

              {item}

              <button
                onClick={() => removeSkill(index)}
              >
                <FaTimes />
              </button>

            </div>

          ))

        )}

      </div>

    </div>

  );
}

export default SkillsForm;