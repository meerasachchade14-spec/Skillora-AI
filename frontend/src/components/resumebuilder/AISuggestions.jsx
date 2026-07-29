import { useEffect, useMemo, useState } from "react";

import {
  FaRobot,
  FaTimes,
  FaCheckCircle,
  FaLightbulb,
  FaChartLine,
  FaArrowUp,
  FaRocket,
  FaShieldAlt,
  FaUser,
  FaBriefcase,
  FaCode,
  FaGraduationCap,
  FaExclamationTriangle,
} from "react-icons/fa";

function AISuggestions({ resumeData = {} }) {
  const [isOpen, setIsOpen] = useState(false);

  const personal = resumeData.personal || {};
  const education = resumeData.education || [];
  const experience = resumeData.experience || [];
  const projects = resumeData.projects || [];
  const skills = resumeData.skills || [];
  const certifications = resumeData.certifications || [];
  const languages = resumeData.languages || [];
  const achievements = resumeData.achievements || [];
  const volunteer = resumeData.volunteer || [];
  const customSections = resumeData.customSections || [];

  /*
  =========================
  AI SUGGESTIONS
  =========================
  */

  const suggestions = useMemo(() => {
    const list = [];

    // PERSONAL DETAILS
    if (!personal.fullName) {
      list.push({
        type: "high",
        icon: <FaUser />,
        text: "Add your full name to create a complete professional identity.",
      });
    }

    if (!personal.email) {
      list.push({
        type: "high",
        icon: <FaUser />,
        text: "Add a professional email address so recruiters can contact you.",
      });
    }

    if (!personal.phone) {
      list.push({
        type: "medium",
        icon: <FaUser />,
        text: "Add your phone number to make your resume more recruiter-friendly.",
      });
    }

    if (!personal.summary) {
      list.push({
        type: "medium",
        icon: <FaLightbulb />,
        text: "Add a concise professional summary highlighting your strengths and career goals.",
      });
    }

    if (!personal.linkedin && !personal.github) {
      list.push({
        type: "medium",
        icon: <FaCode />,
        text: "Add at least one professional profile such as LinkedIn or GitHub.",
      });
    }

    // EDUCATION
    if (education.length === 0) {
      list.push({
        type: "high",
        icon: <FaGraduationCap />,
        text: "Add your educational background to complete your academic profile.",
      });
    }

    // PROJECTS
    if (projects.length === 0) {
      list.push({
        type: "high",
        icon: <FaCode />,
        text: "Add projects to demonstrate your practical skills and technical experience.",
      });
    } else if (projects.length < 2) {
      list.push({
        type: "medium",
        icon: <FaCode />,
        text: "Consider adding another relevant project to strengthen your portfolio.",
      });
    }

    // SKILLS
    if (skills.length < 5) {
      list.push({
        type: "medium",
        icon: <FaCode />,
        text: "Add more relevant technical skills to improve your profile and keyword coverage.",
      });
    }

    // EXPERIENCE
    if (experience.length === 0) {
      list.push({
        type: "optional",
        icon: <FaBriefcase />,
        text: "Internships, freelance work, or professional experience can strengthen your resume.",
      });
    }

    // VOLUNTEER
    if (volunteer.length === 0) {
      list.push({
        type: "optional",
        icon: <FaUser />,
        text: "Volunteer work can demonstrate leadership, teamwork, and community involvement.",
      });
    }

    // CERTIFICATIONS
    if (certifications.length === 0) {
      list.push({
        type: "optional",
        icon: <FaShieldAlt />,
        text: "Add relevant certifications if you have completed any.",
      });
    }

    // ACHIEVEMENTS
    if (achievements.length === 0) {
      list.push({
        type: "optional",
        icon: <FaRocket />,
        text: "Add achievements, awards, hackathons, or recognitions to stand out.",
      });
    }

    // LANGUAGES
    if (languages.length === 0) {
      list.push({
        type: "optional",
        icon: <FaUser />,
        text: "Add the languages you know if they are relevant to your target role.",
      });
    }

    return list;
  }, [
    personal,
    education,
    experience,
    projects,
    skills,
    certifications,
    languages,
    achievements,
    volunteer,
    customSections,
  ]);

  /*
  =========================
  SCORE CALCULATION
  =========================
  */

  const scoreChecks = [
    Boolean(personal.fullName),
    Boolean(personal.email),
    Boolean(personal.phone),
    Boolean(personal.summary),
    Boolean(personal.linkedin || personal.github),
    education.length > 0,
    projects.length >= 1,
    projects.length >= 2,
    skills.length >= 5,
    experience.length > 0,
  ];

  const completedChecks = scoreChecks.filter(Boolean).length;

  const score = Math.round(
    (completedChecks / scoreChecks.length) * 100
  );

  /*
  =========================
  SCORE MESSAGE
  =========================
  */

  const getScoreMessage = () => {
    if (score >= 90) {
      return {
        title: "Excellent Resume!",
        text: "Your resume is highly complete and ready for opportunities.",
      };
    }

    if (score >= 70) {
      return {
        title: "Strong Progress!",
        text: "Your resume is looking good. A few improvements can make it even stronger.",
      };
    }

    if (score >= 50) {
      return {
        title: "Good Start!",
        text: "Your resume has a solid foundation. Keep adding relevant details.",
      };
    }

    return {
      title: "Let's Build Your Resume!",
      text: "Complete the important sections to create a stronger professional profile.",
    };
  };

  const scoreMessage = getScoreMessage();

  /*
  =========================
  ESCAPE KEY SUPPORT
  =========================
  */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  /*
  =========================
  SUGGESTION STYLE
  =========================
  */

  const getSuggestionStyles = (type) => {
    if (type === "high") {
      return {
        wrapper: "bg-red-50 border-red-100",
        icon: "bg-red-100 text-red-500",
        label: "text-red-600",
        labelText: "High Priority",
      };
    }

    if (type === "medium") {
      return {
        wrapper: "bg-amber-50 border-amber-100",
        icon: "bg-amber-100 text-amber-500",
        label: "text-amber-600",
        labelText: "Recommended",
      };
    }

    return {
      wrapper: "bg-slate-50 border-slate-200",
      icon: "bg-slate-200 text-slate-500",
      label: "text-slate-500",
      labelText: "Optional",
    };
  };

  return (
    <>
      {/* =====================================================
          COMPACT AI INSIGHTS CARD
      ====================================================== */}

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full text-left bg-white rounded-[24px] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
      >
        {/* CARD HEADER */}

        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="relative">

              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-200">
                <FaRobot />
              </div>

              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" />

            </div>

            <div>

              <h2 className="font-black text-slate-900">
                AI Resume Insights
              </h2>

              <p className="text-xs text-slate-500 mt-0.5">
                Smart suggestions to improve your resume
              </p>

            </div>

          </div>

          <div className="flex items-center gap-2">

            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-50 text-violet-700 text-[10px] font-black">
              <FaRobot />
              AI POWERED
            </span>

            <span className="text-slate-300 group-hover:text-violet-500 transition">
              <FaArrowUp className="rotate-45" />
            </span>

          </div>

        </div>

        {/* COMPACT SCORE AREA */}

        <div className="p-5">

          <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-5 text-white relative overflow-hidden">

            <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-blue-500/20 blur-2xl" />

            <div className="relative flex items-center justify-between gap-4">

              <div className="min-w-0">

                <p className="text-[10px] uppercase tracking-widest text-blue-300 font-bold">
                  Resume Readiness
                </p>

                <h3 className="text-lg font-black mt-1 truncate">
                  {scoreMessage.title}
                </h3>

                <p className="text-xs text-blue-100/70 mt-1 line-clamp-2">
                  {scoreMessage.text}
                </p>

              </div>

              {/* SCORE */}

              <div className="relative w-16 h-16 shrink-0">

                <svg
                  className="w-16 h-16 -rotate-90"
                  viewBox="0 0 100 100"
                >

                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="8"
                  />

                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="url(#scoreGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="264"
                    strokeDashoffset={
                      264 - (264 * score) / 100
                    }
                  />

                  <defs>

                    <linearGradient
                      id="scoreGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >

                      <stop
                        offset="0%"
                        stopColor="#38bdf8"
                      />

                      <stop
                        offset="100%"
                        stopColor="#818cf8"
                      />

                    </linearGradient>

                  </defs>

                </svg>

                <div className="absolute inset-0 flex items-center justify-center">

                  <span className="text-lg font-black">
                    {score}
                  </span>

                </div>

              </div>

            </div>

            {/* PROGRESS */}

            <div className="mt-4">

              <div className="flex justify-between text-[10px] text-blue-200 mb-1.5">

                <span>Profile Strength</span>

                <span>{score}% Complete</span>

              </div>

              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-400 transition-all duration-700"
                  style={{
                    width: `${score}%`,
                  }}
                />

              </div>

            </div>

          </div>

          {/* QUICK SUMMARY */}

          <div className="mt-4 flex items-center justify-between">

            <div className="flex items-center gap-2">

              {suggestions.length === 0 ? (
                <>
                  <FaCheckCircle className="text-emerald-500" />

                  <span className="text-sm font-semibold text-emerald-700">
                    Resume looks great
                  </span>
                </>
              ) : (
                <>
                  <FaLightbulb className="text-amber-500" />

                  <span className="text-sm font-semibold text-slate-700">
                    {suggestions.length} improvement
                    {suggestions.length !== 1 ? "s" : ""}
                  </span>
                </>
              )}

            </div>

            <span className="text-xs font-bold text-violet-600">
              View Details →
            </span>

          </div>

        </div>

      </button>

      {/* =====================================================
          AI INSIGHTS MODAL
      ====================================================== */}

      {isOpen && (

        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >

          <div
            className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-[28px] shadow-2xl overflow-hidden flex flex-col"
            onClick={(event) => event.stopPropagation()}
          >

            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="shrink-0 bg-white border-b border-slate-200 px-6 py-5 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-200">
                  <FaRobot />
                </div>

                <div>

                  <h2 className="text-xl font-black text-slate-900">
                    AI Resume Insights
                  </h2>

                  <p className="text-xs text-slate-500 mt-0.5">
                    Personalized recommendations for your resume
                  </p>

                </div>

              </div>

              {/* CLOSE BUTTON */}

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close AI Resume Insights"
                className="relative z-[100] w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-red-100 hover:text-red-600 transition-all duration-200 cursor-pointer"
              >

                <FaTimes className="text-lg" />

              </button>

            </div>

            {/* =================================================
                MODAL CONTENT
            ================================================= */}

            <div className="overflow-y-auto p-6 space-y-6">

              {/* SCORE CARD */}

              <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-6 text-white relative overflow-hidden">

                <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl" />

                <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl" />

                <div className="relative flex items-center justify-between gap-6">

                  <div>

                    <p className="text-xs uppercase tracking-widest text-blue-300 font-bold">
                      Resume Readiness
                    </p>

                    <h3 className="text-3xl font-black mt-2">
                      {scoreMessage.title}
                    </h3>

                    <p className="text-sm text-blue-100/80 mt-2 max-w-md">
                      {scoreMessage.text}
                    </p>

                  </div>

                  <div className="relative w-28 h-28 shrink-0">

                    <svg
                      className="w-28 h-28 -rotate-90"
                      viewBox="0 0 100 100"
                    >

                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth="8"
                      />

                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="url(#modalScoreGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="264"
                        strokeDashoffset={
                          264 - (264 * score) / 100
                        }
                      />

                      <defs>

                        <linearGradient
                          id="modalScoreGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >

                          <stop
                            offset="0%"
                            stopColor="#38bdf8"
                          />

                          <stop
                            offset="100%"
                            stopColor="#818cf8"
                          />

                        </linearGradient>

                      </defs>

                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center">

                      <span className="text-3xl font-black">
                        {score}
                      </span>

                    </div>

                  </div>

                </div>

                <div className="mt-6">

                  <div className="flex justify-between text-xs text-blue-200 mb-2">

                    <span>Profile Strength</span>

                    <span>{score}% Complete</span>

                  </div>

                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-400 transition-all duration-700"
                      style={{
                        width: `${score}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

              {/* SUGGESTIONS */}

              {suggestions.length === 0 ? (

                <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-6">

                  <div className="flex items-start gap-4">

                    <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-500 flex items-center justify-center shrink-0">

                      <FaCheckCircle />

                    </div>

                    <div>

                      <h3 className="font-bold text-emerald-800">
                        Your resume looks great!
                      </h3>

                      <p className="text-sm text-emerald-700 mt-1">
                        You have covered the important areas of your resume.
                      </p>

                    </div>

                  </div>

                </div>

              ) : (

                <div>

                  <div className="flex items-center justify-between mb-4">

                    <h3 className="font-black text-slate-900 flex items-center gap-2">

                      <FaLightbulb className="text-amber-500" />

                      Recommended Improvements

                    </h3>

                    <span className="text-xs font-bold text-slate-400">

                      {suggestions.length} suggestions

                    </span>

                  </div>

                  <div className="grid gap-3">

                    {suggestions.map((item, index) => {

                      const styles =
                        getSuggestionStyles(item.type);

                      return (

                        <div
                          key={index}
                          className={`group flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 ${styles.wrapper}`}
                        >

                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${styles.icon}`}
                          >
                            {item.icon}
                          </div>

                          <div className="flex-1">

                            <div className="flex items-center gap-2 mb-1">

                              <span
                                className={`text-[10px] uppercase tracking-wider font-black ${styles.label}`}
                              >
                                {styles.labelText}
                              </span>

                            </div>

                            <p className="text-sm text-slate-700 leading-relaxed">
                              {item.text}
                            </p>

                          </div>

                          <FaArrowUp className="text-slate-300 group-hover:text-blue-500 transition mt-1 rotate-45 shrink-0" />

                        </div>

                      );

                    })}

                  </div>

                </div>

              )}

              {/* BEST PRACTICES */}

              <div className="pt-6 border-t border-slate-100">

                <h3 className="font-black text-slate-900 flex items-center gap-2 mb-4">

                  <FaChartLine className="text-blue-500" />

                  Resume Best Practices

                </h3>

                <div className="grid sm:grid-cols-2 gap-3">

                  <div className="flex items-center gap-3 text-sm text-slate-600">

                    <FaCheckCircle className="text-emerald-500 shrink-0" />

                    Use strong action verbs.

                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600">

                    <FaCheckCircle className="text-emerald-500 shrink-0" />

                    Quantify achievements whenever possible.

                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600">

                    <FaCheckCircle className="text-emerald-500 shrink-0" />

                    Keep content relevant to the target role.

                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600">

                    <FaCheckCircle className="text-emerald-500 shrink-0" />

                    Use keywords from job descriptions.

                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600">

                    <FaCheckCircle className="text-emerald-500 shrink-0" />

                    Keep formatting clean and ATS-friendly.

                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600">

                    <FaCheckCircle className="text-emerald-500 shrink-0" />

                    Focus on measurable impact.

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                MODAL FOOTER
            ================================================= */}

            <div className="shrink-0 px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end">

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-blue-600 transition"
              >
                Close Insights
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default AISuggestions;