import { useState } from "react";
import {
  FaCheckCircle,
  FaCircle,
} from "react-icons/fa";

const checklist = [
  "Complete HTML & CSS",
  "Master JavaScript ES6+",
  "Build 5 React Projects",
  "Learn Node.js / Django",
  "Practice DSA Daily",
  "Deploy Full Stack Project",
  "Learn Docker",
  "Learn AWS Basics",
];

function LearningChecklist() {

  const [completed, setCompleted] = useState({});

  const toggleItem = (item) => {
    setCompleted((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  return (

    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">

      <h2 className="text-3xl font-black mb-8">
        Learning Checklist
      </h2>

      <div className="space-y-4">

        {checklist.map((item) => (

          <button

            key={item}

            onClick={() => toggleItem(item)}

            className={`w-full flex items-center justify-between rounded-2xl border p-5 transition

            ${
              completed[item]
                ? "bg-green-50 border-green-300"
                : "hover:border-blue-400"
            }

            `}

          >

            <div className="flex items-center gap-4">

              {completed[item] ? (
                <FaCheckCircle className="text-green-500 text-xl" />
              ) : (
                <FaCircle className="text-slate-300" />
              )}

              <span
                className={`font-semibold ${
                  completed[item]
                    ? "line-through text-green-700"
                    : ""
                }`}
              >
                {item}
              </span>

            </div>

          </button>

        ))}

      </div>

    </div>

  );

}

export default LearningChecklist;