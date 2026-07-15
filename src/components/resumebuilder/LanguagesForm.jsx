import { useState } from "react";
import { FaPlus, FaTrash, FaLanguage } from "react-icons/fa";

function LanguagesForm({ resumeData, setResumeData }) {
  const [language, setLanguage] = useState({
    name: "",
    level: "",
  });

  const handleChange = (e) => {
    setLanguage({
      ...language,
      [e.target.name]: e.target.value,
    });
  };

  const addLanguage = () => {
    if (language.name.trim() === "") return;

    setResumeData({
      ...resumeData,
      languages: [...resumeData.languages, language],
    });

    setLanguage({
      name: "",
      level: "",
    });
  };

  const deleteLanguage = (index) => {
    const updated = resumeData.languages.filter(
      (_, i) => i !== index
    );

    setResumeData({
      ...resumeData,
      languages: updated,
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <h2 className="text-3xl font-bold text-slate-800 mb-8">
        Languages
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          type="text"
          name="name"
          placeholder="Language"
          value={language.name}
          onChange={handleChange}
          className="border rounded-xl p-4 outline-none focus:border-sky-500"
        />

        <select
          name="level"
          value={language.level}
          onChange={handleChange}
          className="border rounded-xl p-4 outline-none focus:border-sky-500"
        >
          <option value="">Select Proficiency</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
          <option>Fluent</option>
          <option>Native</option>
        </select>

      </div>

      <button
        onClick={addLanguage}
        className="mt-8 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-8 py-3 rounded-xl flex items-center gap-3"
      >
        <FaPlus />
        Add Language
      </button>

      {resumeData.languages.length > 0 && (

        <div className="mt-10">

          <h3 className="font-bold text-xl mb-5">
            Added Languages
          </h3>

          <div className="space-y-4">

            {resumeData.languages.map((item, index) => (

              <div
                key={index}
                className="border rounded-2xl p-5 flex justify-between items-center"
              >

                <div className="flex items-center gap-4">

                  <FaLanguage className="text-sky-600 text-2xl" />

                  <div>

                    <h3 className="font-bold">
                      {item.name}
                    </h3>

                    <p className="text-gray-600">
                      {item.level}
                    </p>

                  </div>

                </div>

                <button
                  onClick={() => deleteLanguage(index)}
                  className="text-red-500 text-xl"
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

export default LanguagesForm;