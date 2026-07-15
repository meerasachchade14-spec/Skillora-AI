import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

function ExperienceForm({ resumeData, setResumeData }) {
  const [experience, setExperience] = useState({
    position: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleChange = (e) => {
    setExperience({
      ...experience,
      [e.target.name]: e.target.value,
    });
  };

  const addExperience = () => {
    if (
      experience.position === "" ||
      experience.company === ""
    )
      return;

    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, experience],
    });

    setExperience({
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  const deleteExperience = (index) => {
    const updated = resumeData.experience.filter(
      (_, i) => i !== index
    );

    setResumeData({
      ...resumeData,
      experience: updated,
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <h2 className="text-3xl font-bold mb-8">
        Work Experience
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <input
          type="text"
          name="position"
          placeholder="Job Title"
          value={experience.position}
          onChange={handleChange}
          className="border rounded-xl p-4"
        />

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={experience.company}
          onChange={handleChange}
          className="border rounded-xl p-4"
        />

        <input
          type="text"
          name="startDate"
          placeholder="Start Date"
          value={experience.startDate}
          onChange={handleChange}
          className="border rounded-xl p-4"
        />

        <input
          type="text"
          name="endDate"
          placeholder="End Date"
          value={experience.endDate}
          onChange={handleChange}
          className="border rounded-xl p-4"
        />

      </div>

      <textarea
        rows="5"
        name="description"
        placeholder="Describe your responsibilities..."
        value={experience.description}
        onChange={handleChange}
        className="w-full border rounded-xl p-4 mt-6"
      />

      <button
        onClick={addExperience}
        className="mt-6 flex items-center gap-3 px-8 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white"
      >
        <FaPlus />
        Add Experience
      </button>

      {resumeData.experience.length > 0 && (
        <div className="mt-10">

          <h3 className="text-xl font-bold mb-5">
            Added Experience
          </h3>

          <div className="space-y-5">

            {resumeData.experience.map((item, index) => (

              <div
                key={index}
                className="border rounded-2xl p-5 flex justify-between items-start"
              >

                <div>

                  <h3 className="font-bold text-lg">
                    {item.position}
                  </h3>

                  <p className="text-blue-600">
                    {item.company}
                  </p>

                  <p className="text-sm text-gray-500">
                    {item.startDate} - {item.endDate}
                  </p>

                  <p className="mt-3 text-gray-600">
                    {item.description}
                  </p>

                </div>

                <button
                  onClick={() => deleteExperience(index)}
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

export default ExperienceForm;