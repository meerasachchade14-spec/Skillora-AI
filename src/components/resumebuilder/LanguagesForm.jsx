import { FaLanguage, FaPlus, FaTrash } from "react-icons/fa";

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

    const updated = [...languages];

    updated[index][field] = value;

    setResumeData({

      ...resumeData,

      languages: updated,

    });

  };

  const removeLanguage = (index) => {

    setResumeData({

      ...resumeData,

      languages: languages.filter((_, i) => i !== index),

    });

  };

  return (

    <div className="bg-white rounded-3xl shadow-xl p-8">

      <div className="flex justify-between items-center mb-8">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white flex items-center justify-center">

            <FaLanguage />

          </div>

          <div>

            <h2 className="text-3xl font-bold text-slate-800">

              Languages

            </h2>

            <p className="text-slate-500">

              Add languages you know.

            </p>

          </div>

        </div>

        <button

          onClick={addLanguage}

          className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"

        >

          <FaPlus />

          Add Language

        </button>

      </div>

      {languages.length === 0 && (

        <div className="border-2 border-dashed rounded-2xl py-10 text-center text-slate-400">

          No Languages Added

        </div>

      )}

      {languages.map((item, index) => (

        <div

          key={index}

          className="bg-slate-50 border rounded-2xl p-6 mb-6"

        >

          <div className="flex justify-between items-center mb-5">

            <h3 className="font-bold text-lg">

              Language #{index + 1}

            </h3>

            <button

              onClick={() => removeLanguage(index)}

              className="text-red-500"

            >

              <FaTrash />

            </button>

          </div>

          <div className="grid grid-cols-2 gap-5">

            <div>

              <label className="font-semibold">

                Language

              </label>

              <input

                type="text"

                value={item.language}

                onChange={(e) =>

                  handleChange(index, "language", e.target.value)

                }

                placeholder="English"

                className="w-full mt-2 p-4 rounded-xl border focus:ring-2 focus:ring-sky-500 outline-none"

              />

            </div>

            <div>

              <label className="font-semibold">

                Proficiency

              </label>

              <select

                value={item.proficiency}

                onChange={(e) =>

                  handleChange(index, "proficiency", e.target.value)

                }

                className="w-full mt-2 p-4 rounded-xl border focus:ring-2 focus:ring-sky-500 outline-none"

              >

                <option>Beginner</option>

                <option>Intermediate</option>

                <option>Advanced</option>

                <option>Professional</option>

                <option>Native</option>

              </select>

            </div>

          </div>

        </div>

      ))}

    </div>

  );

}

export default LanguagesForm;