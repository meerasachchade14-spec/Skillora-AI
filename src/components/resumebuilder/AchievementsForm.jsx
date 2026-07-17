import { FaTrophy, FaPlus, FaTrash } from "react-icons/fa";

function AchievementsForm({ resumeData, setResumeData }) {

  const achievements = resumeData.achievements || [];

  const addAchievement = () => {

    setResumeData({

      ...resumeData,

      achievements: [

        ...achievements,

        {

          title: "",

          organization: "",

          year: "",

          description: "",

        },

      ],

    });

  };

  const handleChange = (index, field, value) => {

    const updated = [...achievements];

    updated[index][field] = value;

    setResumeData({

      ...resumeData,

      achievements: updated,

    });

  };

  const removeAchievement = (index) => {

    setResumeData({

      ...resumeData,

      achievements: achievements.filter((_, i) => i !== index),

    });

  };

  return (

    <div className="bg-white rounded-3xl shadow-xl p-8">

      <div className="flex justify-between items-center mb-8">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white flex items-center justify-center">

            <FaTrophy />

          </div>

          <div>

            <h2 className="text-3xl font-bold text-slate-800">

              Achievements

            </h2>

            <p className="text-slate-500">

              Add awards, achievements and recognitions.

            </p>

          </div>

        </div>

        <button

          onClick={addAchievement}

          className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"

        >

          <FaPlus />

          Add Achievement

        </button>

      </div>

      {achievements.length === 0 && (

        <div className="border-2 border-dashed rounded-2xl py-10 text-center text-slate-400">

          No Achievements Added

        </div>

      )}

      {achievements.map((item, index) => (

        <div

          key={index}

          className="bg-slate-50 border rounded-2xl p-6 mb-6"

        >

          <div className="flex justify-between items-center mb-5">

            <h3 className="font-bold text-lg">

              Achievement #{index + 1}

            </h3>

            <button

              onClick={() => removeAchievement(index)}

              className="text-red-500"

            >

              <FaTrash />

            </button>

          </div>

          <div className="grid grid-cols-2 gap-5">

            <div>

              <label className="font-semibold">

                Achievement Title

              </label>

              <input

                type="text"

                value={item.title}

                onChange={(e) =>

                  handleChange(index, "title", e.target.value)

                }

                placeholder="Winner - Smart India Hackathon"

                className="w-full mt-2 p-4 rounded-xl border focus:ring-2 focus:ring-sky-500 outline-none"

              />

            </div>

            <div>

              <label className="font-semibold">

                Organization

              </label>

              <input

                type="text"

                value={item.organization}

                onChange={(e) =>

                  handleChange(index, "organization", e.target.value)

                }

                placeholder="Government of India"

                className="w-full mt-2 p-4 rounded-xl border focus:ring-2 focus:ring-sky-500 outline-none"

              />

            </div>

            <div>

              <label className="font-semibold">

                Year

              </label>

              <input

                type="text"

                value={item.year}

                onChange={(e) =>

                  handleChange(index, "year", e.target.value)

                }

                placeholder="2026"

                className="w-full mt-2 p-4 rounded-xl border focus:ring-2 focus:ring-sky-500 outline-none"

              />

            </div>

          </div>

          <div className="mt-5">

            <label className="font-semibold">

              Description

            </label>

            <textarea

              rows="4"

              value={item.description}

              onChange={(e) =>

                handleChange(index, "description", e.target.value)

              }

              placeholder="Describe your achievement..."

              className="w-full mt-2 p-4 rounded-xl border resize-none focus:ring-2 focus:ring-sky-500 outline-none"

            />

          </div>

        </div>

      ))}

    </div>

  );

}

export default AchievementsForm;