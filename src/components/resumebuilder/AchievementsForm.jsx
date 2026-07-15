import { useState } from "react";
import { FaPlus, FaTrash, FaTrophy } from "react-icons/fa";

function AchievementsForm({ resumeData, setResumeData }) {
  const [achievement, setAchievement] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setAchievement({
      ...achievement,
      [e.target.name]: e.target.value,
    });
  };

  const addAchievement = () => {
    if (achievement.title.trim() === "") return;

    setResumeData({
      ...resumeData,
      achievements: [
        ...resumeData.achievements,
        achievement,
      ],
    });

    setAchievement({
      title: "",
      description: "",
    });
  };

  const deleteAchievement = (index) => {
    const updated = resumeData.achievements.filter(
      (_, i) => i !== index
    );

    setResumeData({
      ...resumeData,
      achievements: updated,
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <h2 className="text-3xl font-bold text-slate-800 mb-8">
        Achievements
      </h2>

      <div className="space-y-6">

        <input
          type="text"
          name="title"
          placeholder="Achievement Title"
          value={achievement.title}
          onChange={handleChange}
          className="w-full border rounded-xl p-4 outline-none focus:border-sky-500"
        />

        <textarea
          rows="4"
          name="description"
          placeholder="Achievement Description"
          value={achievement.description}
          onChange={handleChange}
          className="w-full border rounded-xl p-4 outline-none focus:border-sky-500 resize-none"
        />

      </div>

      <button
        onClick={addAchievement}
        className="mt-8 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-8 py-3 rounded-xl flex items-center gap-3"
      >
        <FaPlus />
        Add Achievement
      </button>

      {resumeData.achievements.length > 0 && (

        <div className="mt-10">

          <h3 className="font-bold text-xl mb-5">
            Added Achievements
          </h3>

          <div className="space-y-5">

            {resumeData.achievements.map((item, index) => (

              <div
                key={index}
                className="border rounded-2xl p-5 flex justify-between"
              >

                <div className="flex gap-4">

                  <FaTrophy className="text-yellow-500 text-2xl mt-1" />

                  <div>

                    <h3 className="font-bold text-lg">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 mt-2">
                      {item.description}
                    </p>

                  </div>

                </div>

                <button
                  onClick={() => deleteAchievement(index)}
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

export default AchievementsForm;