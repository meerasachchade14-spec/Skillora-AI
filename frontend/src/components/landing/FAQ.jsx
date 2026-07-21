import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "What is Skillora AI?",
    answer:
      "Skillora AI is an AI-powered career development platform that helps students and professionals analyze resumes, identify skill gaps, prepare for interviews, and receive personalized learning roadmaps.",
  },
  {
    question: "Is Skillora AI free to use?",
    answer:
      "Yes! Skillora AI offers a free plan with essential AI tools. Premium plans unlock advanced resume analysis, unlimited AI career coaching, mock interviews, and more.",
  },
  {
    question: "How does the Resume Analyzer work?",
    answer:
      "Simply upload your resume, and our AI analyzes it for ATS compatibility, keyword optimization, formatting, and provides suggestions to improve your chances of getting shortlisted.",
  },
  {
    question: "Can Skillora AI recommend learning resources?",
    answer:
      "Absolutely! Based on your career goals and skill gaps, Skillora AI creates personalized learning roadmaps with recommended technologies, projects, and learning resources.",
  },
  {
    question: "Does Skillora AI help with interview preparation?",
    answer:
      "Yes. Our AI generates HR and technical interview questions, provides feedback, and helps you practice with realistic interview simulations.",
  },
  {
    question: "Is my personal data secure?",
    answer:
      "Yes. Your resumes, documents, and personal information are encrypted and securely stored. We never share your data with third parties without your permission.",
  },
];

function FAQ() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="faq"
      className="py-24 bg-linear-to-r from-white to-sky-50"
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
          <span className="inline-block px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold">
            Frequently Asked Questions
          </span>

          <h2 className="text-5xl font-extrabold text-slate-900 mt-6">
            Got Questions?
          </h2>

          <p className="text-gray-600 mt-5 text-lg max-w-2xl mx-auto">
            Everything you need to know about Skillora AI and how it can
            accelerate your career journey.
          </p>
        </motion.div>

        {/* FAQ Items */}

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md border border-sky-100 overflow-hidden"
            >
              <button
                onClick={() =>
                  setActive(active === index ? -1 : index)
                }
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <h3 className="text-lg md:text-xl font-semibold text-slate-800">
                  {faq.question}
                </h3>

                <FaChevronDown
                  className={`text-blue-600 transition-transform duration-300 ${
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
                  <p className="text-gray-600 leading-8">
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