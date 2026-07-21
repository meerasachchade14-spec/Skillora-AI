import { useState } from "react";
import { FaGraduationCap, FaCheckCircle, FaChevronRight, FaBookOpen } from "react-icons/fa";

const roadmapData = {
  frontend: [
    {
      phase: "Phase 1: Internet & HTML/CSS Basics",
      topics: ["How does the Internet work?", "HTML5 Semantic Tags & Forms", "CSS3 Flexbox, Grid, Responsive Layouts", "Modern CSS Frameworks (Tailwind CSS)"]
    },
    {
      phase: "Phase 2: Javascript & Build Tools",
      topics: ["ES6+ Javascript Core Syntax & APIs", "Asynchronous Programming (Promises, Async/Await)", "Package Managers (NPM/Yarn) & Vite", "Git Version Control & GitHub Workflow"]
    },
    {
      phase: "Phase 3: React & State Management",
      topics: ["React Fundamentals (JSX, Props, State)", "Hooks (useState, useEffect, useContext)", "Routing (React Router DOM v6/v7)", "Global State (Redux Toolkit or Zustand)"]
    },
    {
      phase: "Phase 4: Advanced Testing & Deployment",
      topics: ["Testing Frontend Apps (Jest/React Testing Library)", "Hosting Platforms (Vercel, Netlify, AWS)", "Performance Optimization (Lazy loading, caching)", "CI/CD Deployment Pipelines"]
    }
  ]
};

function Roadmap() {
  const [completedTopics, setCompletedTopics] = useState({});

  const toggleTopic = (topic) => {
    setCompletedTopics((prev) => ({
      ...prev,
      [topic]: !prev[topic]
    }));
  };

  const getProgress = () => {
    const total = roadmapData.frontend.reduce((acc, phase) => acc + phase.topics.length, 0);
    const completed = Object.values(completedTopics).filter(Boolean).length;
    return Math.round((completed / total) * 100);
  };

  const progress = getProgress();

  return (
    <div className="space-y-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">Learning Roadmap</h1>
            <p className="text-slate-500 mt-1">Acquire modern skills and track your roadmap progression.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md border px-5 py-3 text-right">
            <span className="text-xs text-slate-500 block font-semibold">Your Progress</span>
            <span className="text-2xl font-bold text-blue-600">{progress}%</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 mb-8">
          <div className="flex justify-between font-semibold text-slate-700 mb-2">
            <span>Overall Roadmap Completion</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Roadmap Path */}
        <div className="space-y-8">
          {roadmapData.frontend.map((phase, phaseIndex) => (
            <div key={phaseIndex} className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg font-bold">
                  {phaseIndex + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-800">{phase.phase}</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {phase.topics.map((topic, topicIndex) => {
                  const isCompleted = !!completedTopics[topic];
                  return (
                    <button
                      key={topicIndex}
                      onClick={() => toggleTopic(topic)}
                      className={`flex items-center justify-between p-5 rounded-2xl border text-left transition-all duration-300 ${
                        isCompleted
                          ? "border-green-300 bg-green-50/50 shadow-sm"
                          : "border-slate-200 hover:border-blue-400 hover:bg-slate-50/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <FaBookOpen className={isCompleted ? "text-green-500" : "text-slate-400"} />
                        <span className={`font-medium text-sm ${isCompleted ? "text-green-800 line-through" : "text-slate-700"}`}>
                          {topic}
                        </span>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isCompleted ? "bg-green-500 border-green-500 text-white" : "border-slate-300"
                      }`}>
                        {isCompleted && <FaCheckCircle className="text-sm" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}

export default Roadmap;
