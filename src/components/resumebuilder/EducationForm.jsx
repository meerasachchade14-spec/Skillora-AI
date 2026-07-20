import { FaGraduationCap, FaPlus, FaTrash } from "react-icons/fa";

function EducationForm({ resumeData, setResumeData }) {

  const education = resumeData.education || [];

  const addEducation = () => {

    setResumeData({

      ...resumeData,

      education: [

        ...education,

        {

          degree: "",

          college: "",

          year: "",

          cgpa: "",

        },

      ],

    });

  };

  const handleChange = (index, field, value) => {

    const updatedEducation = [...education];

    updatedEducation[index][field] = value;

    setResumeData({

      ...resumeData,

      education: updatedEducation,

    });

  };

  const removeEducation = (index) => {

    const updatedEducation = education.filter(

      (_, i) => i !== index

    );

    setResumeData({

      ...resumeData,

      education: updatedEducation,

    });

  };

  return (

    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white flex items-center justify-center">

            <FaGraduationCap />

          </div>

          <div>

            <h2 className="text-3xl font-bold text-slate-800">

              Education

            </h2>

            <p className="text-slate-500">

              Add your educational qualifications.

            </p>

          </div>

        </div>

        <button

          onClick={addEducation}

          className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-5 py-3 rounded-xl hover:scale-105 transition"

        >

          <FaPlus />

          Add Education

        </button>

      </div>

      {education.length === 0 && (

        <div className="text-center text-slate-400 py-10 border-2 border-dashed rounded-2xl">

          No Education Added

        </div>

      )}

      {education.map((edu, index) => (

        <div

          key={index}

          className="border rounded-2xl p-6 mb-6 bg-slate-50"

        >

          <div className="flex justify-between items-center mb-5">

            <h3 className="font-bold text-xl text-slate-700">

              Education #{index + 1}

            </h3>

            <button

              onClick={() => removeEducation(index)}

              className="text-red-500 hover:text-red-700"

            >

              <FaTrash />

            </button>

          </div>

          <div className="grid grid-cols-2 gap-5">

            <div>

              <label className="font-semibold">

                Degree

              </label>

              <input

                type="text"

                value={edu.degree}

                onChange={(e) =>

                  handleChange(

                    index,

                    "degree",

                    e.target.value

                  )

                }

                placeholder="B.E Computer Engineering"

                className="w-full mt-2 p-4 rounded-xl border focus:ring-2 focus:ring-sky-500 outline-none"

              />

            </div>

            <div>

              <label className="font-semibold">

                College

              </label>

              <input

                type="text"

                value={edu.college}

                onChange={(e) =>

                  handleChange(

                    index,

                    "college",

                    e.target.value

                  )

                }

                placeholder="LDRP Institute"

                className="w-full mt-2 p-4 rounded-xl border focus:ring-2 focus:ring-sky-500 outline-none"

              />

            </div>

            <div>

              <label className="font-semibold">

                Passing Year

              </label>

              <input

                type="text"

                value={edu.year}

                onChange={(e) =>

                  handleChange(

                    index,

                    "year",

                    e.target.value

                  )

                }

                placeholder="2027"

                className="w-full mt-2 p-4 rounded-xl border focus:ring-2 focus:ring-sky-500 outline-none"

              />

            </div>

            <div>

              <label className="font-semibold">

                CGPA / Percentage

              </label>

              <input

                type="text"

                value={edu.cgpa}

                onChange={(e) =>

                  handleChange(

                    index,

                    "cgpa",

                    e.target.value

                  )

                }

                placeholder="8.75 CGPA"

                className="w-full mt-2 p-4 rounded-xl border focus:ring-2 focus:ring-sky-500 outline-none"

              />

            </div>

          </div>

        </div>

      ))}

    </div>

  );

}

export default EducationForm;