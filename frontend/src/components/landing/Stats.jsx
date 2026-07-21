import { motion } from "framer-motion";
import {
  FaUsers,
  FaFileAlt,
  FaBriefcase,
  FaAward,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaUsers />,
    number: "50K+",
    title: "Active Students",
    description: "Learning with Skillora AI every month.",
  },
  {
    icon: <FaFileAlt />,
    number: "250K+",
    title: "Resumes Analyzed",
    description: "AI-powered ATS resume analysis completed.",
  },
  {
    icon: <FaBriefcase />,
    number: "10K+",
    title: "Jobs Recommended",
    description: "Career opportunities matched successfully.",
  },
  {
    icon: <FaAward />,
    number: "95%",
    title: "Success Rate",
    description: "Users improved their interview performance.",
  },
];

function Stats() {
  return (
    <section className="py-24 bg-linear-to-r from-sky-50 via-white to-sky-100">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold">
            OUR IMPACT
          </span>

          <h2 className="text-5xl font-extrabold text-slate-900 mt-6">
            Trusted By Thousands
          </h2>

          <p className="text-gray-600 text-lg mt-6 max-w-3xl mx-auto">
            Skillora AI is helping students and professionals build
            stronger resumes, learn faster, and achieve their dream careers.
          </p>
        </motion.div>

        {/* Stats Grid */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="bg-white rounded-3xl border border-blue-100 shadow-lg hover:shadow-2xl p-8 text-center transition-all duration-300"
            >
              {/* Icon */}

              <div className="w-20 h-20 mx-auto rounded-2xl 'bg-gradient-to-r' from-sky-500 to-blue-600 flex items-center justify-center text-white text-3xl shadow-lg">

                {item.icon}

              </div>

              {/* Number */}

              <h3 className="text-5xl font-black text-blue-700 mt-8">
                {item.number}
              </h3>

              {/* Title */}

              <h4 className="text-2xl font-bold text-slate-900 mt-4">
                {item.title}
              </h4>

              {/* Description */}

              <p className="text-gray-600 leading-7 mt-4">
                {item.description}
              </p>
            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Stats;