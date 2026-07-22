import { motion } from "framer-motion";
import {
FaCloudUploadAlt,
FaBrain,
FaChartLine,
FaRoute,
} from "react-icons/fa";

const steps = [
{
icon: <FaCloudUploadAlt />,
title: "Upload Your Resume",
description:
"Upload your resume and provide your career preferences or target role to begin your personalized analysis.",
},
{
icon: <FaBrain />,
title: "AI Understands Your Profile",
description:
"Our AI analyzes your resume to extract skills, experience, education, projects, keywords, and other important profile information.",
},
{
icon: <FaChartLine />,
title: "Analyze & Find Skill Gaps",
description:
"Compare your profile with target job requirements to understand your skill match, missing skills, ATS compatibility, and improvement areas.",
},
{
icon: <FaRoute />,
title: "Get Your Career Roadmap",
description:
"Receive personalized AI-powered suggestions, recommended skills, learning directions, and actionable steps to improve your career profile.",
},
];

function HowItWorks({ darkMode }) {
return (
<section
id="how-it-works"
className={`py-24 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800"
          : "bg-gradient-to-r from-sky-50 via-white to-sky-100"
      }`}
> <div className="max-w-7xl mx-auto px-6 lg:px-10">

```
    {/* Heading */}

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-20"
    >

      <span
        className={`inline-block px-5 py-2 rounded-full font-semibold ${
          darkMode
            ? "bg-blue-900/40 text-blue-300"
            : "bg-blue-100 text-blue-700"
        }`}
      >
        HOW IT WORKS
      </span>

      <h2
        className={`text-5xl font-black mt-6 ${
          darkMode ? "text-white" : "text-slate-900"
        }`}
      >
        From Resume to Career Direction
      </h2>

      <p
        className={`mt-6 text-lg max-w-3xl mx-auto ${
          darkMode ? "text-slate-300" : "text-gray-600"
        }`}
      >
        Skillora AI uses intelligent analysis to understand your profile,
        identify opportunities for improvement, and help you move toward
        your career goals.
      </p>

    </motion.div>

    {/* Steps */}

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

      {steps.map((step, index) => (

        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.15,
            duration: 0.5,
          }}
          viewport={{ once: true }}
          whileHover={{
            y: -10,
          }}
          className={`relative rounded-3xl p-8 text-center border shadow-xl hover:shadow-2xl transition-all duration-300 ${
            darkMode
              ? "bg-slate-800/80 border-slate-700"
              : "bg-white border-blue-100"
          }`}
        >

          {/* Step Number */}

          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg">
            {index + 1}
          </div>

          {/* Icon */}

          <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-sky-500 to-blue-700 flex items-center justify-center text-white text-3xl mx-auto mt-4 shadow-lg">
            {step.icon}
          </div>

          {/* Title */}

          <h3
            className={`text-2xl font-bold mt-8 ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            {step.title}
          </h3>

          {/* Description */}

          <p
            className={`mt-5 leading-7 ${
              darkMode ? "text-slate-300" : "text-gray-600"
            }`}
          >
            {step.description}
          </p>

        </motion.div>

      ))}

    </div>

  </div>
</section>


);
}

export default HowItWorks;
