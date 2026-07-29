import {
  FaGraduationCap,
  FaPlus,
  FaTrash,
  FaCalendarAlt,
  FaUniversity,
  FaSchool,
  FaBookOpen,
} from "react-icons/fa";

function EducationForm({ resumeData, setResumeData }) {
  const education = resumeData.education || [];

  const addEducation = () => {
    setResumeData({
      ...resumeData,

      education: [
        ...education,

        {
          type: "College / University",
          degree: "",
          college: "",
          fieldOfStudy: "",
          startYear: "",
          year: "",
          cgpa: "",
          description: "",
        },
      ],
    });
  };

  const handleChange = (index, field, value) => {
    const updatedEducation = [...education];

    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };

    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  const removeEducation = (index) => {
    setResumeData({
      ...resumeData,

      education: education.filter((_, i) => i !== index),
    });
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-slate-300";

  const labelClass =
    "block text-sm font-semibold text-slate-700 mb-2";

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

      {/* Header */}
      <div className="px-7 py-6 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
              <FaGraduationCap className="text-xl" />
            </div>

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                Academic Background
              </p>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Education
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Add your school, college, university, and academic qualifications.
              </p>

            </div>

          </div>


          <button
            type="button"
            onClick={addEducation}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-blue-600 transition-all duration-300 shadow-sm"
          >
            <FaPlus />
            Add Education
          </button>

        </div>

      </div>


      {/* Form Content */}
      <div className="p-7">


        {/* Empty State */}
        {education.length === 0 && (

          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 px-6 py-12 text-center">

            <div className="w-14 h-14 mx-auto rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400">
              <FaUniversity className="text-2xl" />
            </div>

            <h3 className="mt-4 font-bold text-slate-700">
              No education added yet
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Add your school, diploma, degree, or other academic qualification.
            </p>

            <button
              type="button"
              onClick={addEducation}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
            >
              <FaPlus />
              Add Education
            </button>

          </div>

        )}


        {/* Education Cards */}
        <div className="space-y-6">

          {education.map((edu, index) => (

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
                      Education Entry
                    </h3>

                    <p className="text-xs text-slate-500">
                      Academic qualification #{index + 1}
                    </p>

                  </div>

                </div>


                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
                  title="Remove education"
                >
                  <FaTrash />
                </button>

              </div>


              {/* Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                {/* Education Type */}
                <div>

                  <label className={labelClass}>
                    Education Type
                  </label>

                  <div className="relative">

                    <FaUniversity className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />

                    <select
                      value={edu.type || "College / University"}
                      onChange={(e) =>
                        handleChange(index, "type", e.target.value)
                      }
                      className={`${inputClass} pl-11 appearance-none`}
                    >
                      <option>School</option>
                      <option>College / University</option>
                      <option>Diploma</option>
                      <option>Certification</option>
                      <option>Other</option>
                    </select>

                  </div>

                </div>


                {/* Degree / Qualification */}
                <div>

                  <label className={labelClass}>
                    Degree / Qualification
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  <div className="relative">

                    <FaGraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      type="text"
                      value={edu.degree || ""}
                      onChange={(e) =>
                        handleChange(index, "degree", e.target.value)
                      }
                      placeholder="B.E. Computer Engineering / 12th / Diploma"
                      className={`${inputClass} pl-11`}
                    />

                  </div>

                </div>


                {/* Institution */}
                <div className="md:col-span-2">

                  <label className={labelClass}>
                    School / College / University
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  <div className="relative">

                    <FaSchool className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      type="text"
                      value={edu.college || ""}
                      onChange={(e) =>
                        handleChange(index, "college", e.target.value)
                      }
                      placeholder="LDRP Institute of Technology and Research"
                      className={`${inputClass} pl-11`}
                    />

                  </div>

                </div>


                {/* Field of Study */}
                <div className="md:col-span-2">

                  <label className={labelClass}>
                    Field of Study / Stream
                  </label>

                  <div className="relative">

                    <FaBookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      type="text"
                      value={edu.fieldOfStudy || ""}
                      onChange={(e) =>
                        handleChange(index, "fieldOfStudy", e.target.value)
                      }
                      placeholder="Computer Engineering / Science / Commerce"
                      className={`${inputClass} pl-11`}
                    />

                  </div>

                </div>


                {/* Start Year */}
                <div>

                  <label className={labelClass}>

                    <span className="flex items-center gap-2">

                      <FaCalendarAlt className="text-blue-500 text-xs" />

                      Start Year

                    </span>

                  </label>

                  <input
                    type="text"
                    value={edu.startYear || ""}
                    onChange={(e) =>
                      handleChange(index, "startYear", e.target.value)
                    }
                    placeholder="2023"
                    className={inputClass}
                  />

                </div>


                {/* Graduation Year */}
                <div>

                  <label className={labelClass}>

                    <span className="flex items-center gap-2">

                      <FaCalendarAlt className="text-blue-500 text-xs" />

                      Graduation/Passing Year

                    </span>

                  </label>

                  <input
                    type="text"
                    value={edu.year || ""}
                    onChange={(e) =>
                      handleChange(index, "year", e.target.value)
                    }
                    placeholder="2027 / Present"
                    className={inputClass}
                  />

                </div>


                {/* CGPA / Percentage */}
                <div>

                  <label className={labelClass}>
                    CGPA / Percentage
                  </label>

                  <input
                    type="text"
                    value={edu.cgpa || ""}
                    onChange={(e) =>
                      handleChange(index, "cgpa", e.target.value)
                    }
                    placeholder="8.75 CGPA or 85%"
                    className={inputClass}
                  />

                </div>


                {/* Description */}
                <div>

                  <label className={labelClass}>
                    Academic Highlights
                  </label>

                  <input
                    type="text"
                    value={edu.description || ""}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                    placeholder="Relevant coursework, achievements..."
                    className={inputClass}
                  />

                </div>

              </div>


              {/* Tip */}
              <div className="mt-6 rounded-xl bg-blue-50 border border-blue-100 px-4 py-3">

                <p className="text-xs text-blue-700">

                  💡 <strong>Tip:</strong> Add your highest or most relevant education first. You can add school, diploma, and degree entries separately.

                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default EducationForm;