import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

function EducationForm({ resumeData, setResumeData }) {
  const [education, setEducation] = useState({
    degree: "",
    college: "",
    year: "",
    cgpa: "",
  });

  const handleChange = (e) => {
    setEducation({
      ...education,
      [e.target.name]: e.target.value,
    });
  };

  const addEducation = () => {
    if (
      education.degree === "" ||
      education.college === "" ||
      education.year === ""
    )
      return;

    setResumeData({
      ...resumeData,
      education: [...resumeData.education, education],
    });

    setEducation({
      degree: "",
      college: "",
      year: "",
      cgpa: "",
    });
  };

  const deleteEducation = (index) => {
    const updated = resumeData.education.filter(
      (_, i) => i !== index
    );

    setResumeData({
      ...resumeData,
      education: updated,
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <h2 className="text-3xl font-bold mb-8">
        Education
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <input
          type="text"
          name="degree"
          placeholder="Degree"
          value={education.degree}
          onChange={handleChange}
          className="border rounded-xl p-4"
        />

        <input
          type="text"
          name="college"
          placeholder="College"
          value={education.college}
          onChange={handleChange}
          className="border rounded-xl p-4"
        />

        <input
          type="text"
          name="year"
          placeholder="Passing Year"
          value={education.year}
          onChange={handleChange}
          className="border rounded-xl p-4"
        />

        <input
          type="text"
          name="cgpa"
          placeholder="CGPA"
          value={education.cgpa}
          onChange={handleChange}
          className="border rounded-xl p-4"
        />

      </div>

      <button
        onClick={addEducation}
        className="mt-8 flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl"
      >
        <FaPlus />
        Add Education
      </button>

      {resumeData.education.length > 0 && (

        <div className="mt-10">

          <h3 className="font-bold text-xl mb-5">
            Added Education
          </h3>

          <div className="space-y-4">

            {resumeData.education.map((item, index) => (

              <div
                key={index}
                className="border rounded-2xl p-5 flex justify-between items-center"
              >

                <div>

                  <h4 className="font-bold">
                    {item.degree}
                  </h4>

                  <p>{item.college}</p>

                  <p className="text-gray-500">
                    {item.year} | CGPA : {item.cgpa}
                  </p>

                </div>

                <button
                  onClick={() => deleteEducation(index)}
                  className="text-red-600 text-xl"
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

export default EducationForm;