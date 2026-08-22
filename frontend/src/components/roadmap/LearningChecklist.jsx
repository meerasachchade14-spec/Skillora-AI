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

function LearningChecklist({ roadmap, onToggleStep }) {
  const steps = roadmap && roadmap.steps && roadmap.steps.length > 0
    ? roadmap.steps
    : [
        { id: "step-1", name: "Complete HTML & CSS", status: "completed" },
        { id: "step-2", name: "Master JavaScript ES6+", status: "completed" },
        { id: "step-3", name: "Build 5 React Projects", status: "todo" },
        { id: "step-4", name: "Learn Node.js / Django", status: "todo" },
        { id: "step-5", name: "Practice DSA Daily", status: "todo" },
        { id: "step-6", name: "Deploy Full Stack Project", status: "todo" },
        { id: "step-7", name: "Learn Docker", status: "todo" },
        { id: "step-8", name: "Learn AWS Basics", status: "todo" }
      ];

  return (

    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">

      <h2 className="text-3xl font-black mb-8">
        Learning Checklist
      </h2>

      <div className="space-y-4">

        {steps.map((step) => {
          const isCompleted = step.status === "completed";
          return (
            <button
              key={step.id || step.name}
              onClick={() => onToggleStep && onToggleStep(step.id || step.name)}
              className={`w-full flex items-center justify-between rounded-2xl border p-5 transition
                ${isCompleted ? "bg-green-50 border-green-300" : "hover:border-blue-400"}
              `}
            >
              <div className="flex items-center gap-4">
                {isCompleted ? (
                  <FaCheckCircle className="text-green-500 text-xl" />
                ) : (
                  <FaCircle className="text-slate-300" />
                )}
                <span className={`font-semibold ${isCompleted ? "line-through text-green-700" : ""}`}>
                  {step.name}
                </span>
              </div>
            </button>
          );
        })}

      </div>

    </div>

  );

}


export default LearningChecklist;