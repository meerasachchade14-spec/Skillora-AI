import {
  FaLanguage,
  FaPlus,
  FaTrash,
  FaGlobe,
} from "react-icons/fa";

function LanguagesForm({ resumeData, setResumeData }) {
  const languages = resumeData.languages || [];

  const addLanguage = () => {
    setResumeData({
      ...resumeData,
      languages: [
        ...languages,
        {
          language: "",
          proficiency: "Intermediate",
        },
      ],
    });
  };

  const handleChange = (index, field, value) => {
    const updatedLanguages = languages.map((item, i) =>
      i === index
        ? {
            ...item,
            [field]: value,
          }
        : item
    );

    setResumeData({
      ...resumeData,
      languages: updatedLanguages,
    });
  };

  const removeLanguage = (index) => {
    setResumeData({
      ...resumeData,
      languages: languages.filter((_, i) => i !== index),
    });
  };

  return (
    <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
              <FaLanguage className="text-xl" />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                Communication Skills
              </p>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Languages
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Add the languages you speak and your proficiency level.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={addLanguage}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-blue-600 transition-all duration-300 shadow-sm"
          >
            <FaPlus />
            Add Language
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        {/* Empty State */}
        {languages.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 px-6 py-12 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400">
              <FaGlobe className="text-2xl" />
            </div>

            <h3 className="mt-4 font-bold text-slate-700">
              No languages added yet
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Add languages that you can communicate in.
            </p>

            <button
              type="button"
              onClick={addLanguage}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
            >
              <FaPlus />
              Add Language
            </button>
          </div>
        )}

        {/* Language Cards */}
        <div className="space-y-6">
          {languages.map((item, index) => (
            <div
              key={index}
              className="relative rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800">
                      {item.language || "Language Entry"}
                    </h3>

                    <p className="text-xs text-slate-500">
                      Language #{index + 1}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeLanguage(index)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
                  title="Remove language"
                >
                  <FaTrash />
                </button>
              </div>

              {/* Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Language */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Language
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  <input
                    type="text"
                    value={item.language || ""}
                    onChange={(e) =>
                      handleChange(index, "language", e.target.value)
                    }
                    placeholder="English"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
                  />
                </div>

                {/* Proficiency */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Proficiency Level
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  <select
                    value={item.proficiency || "Intermediate"}
                    onChange={(e) =>
                      handleChange(index, "proficiency", e.target.value)
                    }
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition cursor-pointer"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Professional">Professional</option>
                    <option value="Native">Native</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LanguagesForm;