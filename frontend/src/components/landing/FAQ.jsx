import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "What is Skillora AI?",
    answer:
      "Skillora AI is an AI-powered career platform that analyzes your resume, skills, experience, and career goals to provide personalized insights, skill-gap analysis, learning roadmaps, job recommendations, and career guidance.",
  },
  {
    question: "How does Skillora AI analyze my resume?",
    answer:
      "When you upload your resume, our AI extracts and analyzes important information such as skills, technologies, education, experience, projects, and keywords. It then evaluates your profile to provide an ATS score, identify strengths, detect skill gaps, and suggest improvements.",
  },
  {
    question: "What is an ATS score?",
    answer:
      "An ATS score represents how well your resume matches the requirements commonly used by Applicant Tracking Systems. Skillora AI analyzes factors such as relevant keywords, skills, resume structure, and job requirements to help you improve your resume's compatibility.",
  },
  {
    question: "How does Skillora AI detect my skill gaps?",
    answer:
      "The AI compares your current skills and experience with the skills required for your selected career role or job profile. It identifies missing or underdeveloped skills and helps you understand what you should learn next.",
  },
  {
    question: "Can Skillora AI recommend jobs for me?",
    answer:
      "Yes. Skillora AI analyzes your skills, experience, career interests, and profile information to identify job opportunities that are relevant to your background and career goals.",
  },
  {
    question: "How does the personalized learning roadmap work?",
    answer:
      "Based on your target career role and detected skill gaps, Skillora AI creates a personalized learning roadmap. It can suggest important technologies, concepts, projects, and learning areas that can help you progress toward your career goal.",
  },
  {
    question: "Can I create and improve my resume using Skillora AI?",
    answer:
      "Yes. You can create a professional resume using the AI Resume Builder and receive AI-powered suggestions to improve your content, skills, keywords, and overall resume quality.",
  },
  {
    question: "Does Skillora AI provide interview preparation?",
    answer:
      "Yes. Skillora AI can help users prepare for interviews by providing role-based interview questions, technical and HR preparation guidance, and personalized suggestions based on their target career path.",
  },
  {
    question: "Is my resume and personal data secure?",
    answer:
      "Skillora AI is designed to handle user information securely. Your resume and profile data are used to provide personalized analysis and recommendations according to the platform's privacy and security practices.",
  },
];

function FAQ({ darkMode }) {
  const [active, setActive] = useState(0);

  return (
    <section
      id="faq"
      className={`py-24 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-r from-slate-950 to-slate-900"
          : "bg-gradient-to-r from-white to-sky-50"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span
            className={`inline-block px-5 py-2 rounded-full font-semibold ${
              darkMode
                ? "bg-blue-900/40 text-blue-300"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            FREQUENTLY ASKED QUESTIONS
          </span>

          <h2
            className={`text-5xl font-extrabold mt-6 ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Got Questions?
          </h2>

          <p
            className={`mt-5 text-lg max-w-2xl mx-auto ${
              darkMode ? "text-slate-300" : "text-gray-600"
            }`}
          >
            Learn how Skillora AI analyzes your profile and helps you make
            smarter career decisions.
          </p>
        </motion.div>

        {/* FAQ Items */}

        <div className="space-y-5">

          {faqs.map((faq, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.08,
                duration: 0.5,
              }}
              viewport={{ once: true }}
              className={`rounded-2xl shadow-md overflow-hidden border transition-colors duration-500 ${
                darkMode
                  ? "bg-slate-900 border-slate-700"
                  : "bg-white border-sky-100"
              }`}
            >

              <button
                onClick={() =>
                  setActive(active === index ? -1 : index)
                }
                className="w-full flex justify-between items-center gap-6 p-6 text-left"
              >

                <h3
                  className={`text-lg md:text-xl font-semibold ${
                    darkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  {faq.question}
                </h3>

                <FaChevronDown
                  className={`flex-shrink-0 transition-transform duration-300 ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  } ${
                    active === index ? "rotate-180" : ""
                  }`}
                />

              </button>

              {active === index && (

                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6"
                >

                  <p
                    className={`leading-8 ${
                      darkMode ? "text-slate-300" : "text-gray-600"
                    }`}
                  >
                    {faq.answer}
                  </p>

                </motion.div>

              )}

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default FAQ;