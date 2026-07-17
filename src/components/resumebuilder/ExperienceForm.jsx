import { FaBriefcase, FaPlus, FaTrash } from "react-icons/fa";

function ExperienceForm({ resumeData, setResumeData }) {

  const experience = resumeData.experience || [];

  const addExperience = () => {

    setResumeData({

      ...resumeData,

      experience: [

        ...experience,

        {

          company: "",

          position: "",

          startDate: "",

          endDate: "",

          description: "",

        },

      ],

    });

  };

  const handleChange = (index, field, value) => {

    const updatedExperience = [...experience];

    updatedExperience[index][field] = value;

    setResumeData({

      ...resumeData,

      experience: updatedExperience,

    });

  };

  const removeExperience = (index) => {

    const updatedExperience = experience.filter(

      (_, i) => i !== index

    );

    setResumeData({

      ...resumeData,

      experience: updatedExperience,

    });

  };

  return (

    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white flex items-center justify-center">

            <FaBriefcase />

          </div>

          <div>

            <h2 className="text-3xl font-bold text-slate-800">

              Experience

            </h2>

            <p className="text-slate-500">

              Add your internships and work experience.

            </p>

          </div>

        </div>

        <button

          onClick={addExperience}

          className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-5 py-3 rounded-xl hover:scale-105 transition"

        >

          <FaPlus />

          Add Experience

        </button>

      </div>

      {experience.length === 0 && (

        <div className="border-2 border-dashed rounded-2xl py-10 text-center text-slate-400">

          No Experience Added

        </div>

      )}

      {experience.map((item, index) => (

        <div

          key={index}

          className="bg-slate-50 rounded-2xl border p-6 mb-6"

        >

          <div className="flex justify-between items-center mb-5">

            <h3 className="font-bold text-xl">

              Experience #{index + 1}

            </h3>

            <button

              onClick={() => removeExperience(index)}

              className="text-red-500 hover:text-red-700"

            >

              <FaTrash />

            </button>

          </div>

          <div className="grid grid-cols-2 gap-5">

            <div>

              <label className="font-semibold">

                Company Name

              </label>

              <input

                type="text"

                value={item.company}

                onChange={(e) =>

                  handleChange(

                    index,

                    "company",

                    e.target.value

                  )

                }

                placeholder="Google"

                className="w-full mt-2 p-4 rounded-xl border focus:ring-2 focus:ring-sky-500 outline-none"

              />

            </div>

            <div>

              <label className="font-semibold">

                Position

              </label>

              <input

                type="text"

                value={item.position}

                onChange={(e) =>

                  handleChange(

                    index,

                    "position",

                    e.target.value

                  )

                }

                placeholder="Frontend Developer Intern"

                className="w-full mt-2 p-4 rounded-xl border focus:ring-2 focus:ring-sky-500 outline-none"

              />

            </div>

            <div>

              <label className="font-semibold">

                Start Date

              </label>

              <input

                type="month"

                value={item.startDate}

                onChange={(e) =>

                  handleChange(

                    index,

                    "startDate",

                    e.target.value

                  )

                }

                className="w-full mt-2 p-4 rounded-xl border focus:ring-2 focus:ring-sky-500 outline-none"

              />

            </div>

            <div>

              <label className="font-semibold">

                End Date

              </label>

              <input

                type="month"

                value={item.endDate}

                onChange={(e) =>

                  handleChange(

                    index,

                    "endDate",

                    e.target.value

                  )

                }

                className="w-full mt-2 p-4 rounded-xl border focus:ring-2 focus:ring-sky-500 outline-none"

              />

            </div>

          </div>

          <div className="mt-6">

            <label className="font-semibold">

              Description

            </label>

            <textarea

              rows="5"

              value={item.description}

              onChange={(e) =>

                handleChange(

                  index,

                  "description",

                  e.target.value

                )

              }

              placeholder="Describe your responsibilities, technologies used, and achievements."

              className="w-full mt-2 p-4 rounded-xl border focus:ring-2 focus:ring-sky-500 outline-none resize-none"

            />

          </div>

        </div>

      ))}

    </div>

  );

}

export default ExperienceForm;