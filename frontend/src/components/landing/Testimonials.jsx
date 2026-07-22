import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Aarav Patel",
    role: "Computer Engineering Student",
    image: "https://i.pravatar.cc/150?img=11",
    review:
      "Skillora AI makes it easier to understand my resume, identify missing skills, and get a clear direction for improving my career profile.",
  },
  {
    name: "Priya Sharma",
    role: "Software Developer",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "The personalized career guidance and skill recommendations helped me understand which technologies and skills I should focus on next.",
  },
  {
    name: "Rahul Mehta",
    role: "Final Year Student",
    image: "https://i.pravatar.cc/150?img=15",
    review:
      "Skillora AI helped me analyze my profile, understand my skill gaps, and create a more focused plan for my career goals.",
  },
];

function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 bg-gradient-to-b from-white via-sky-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold">
            TESTIMONIALS
          </span>

          <h2 className="text-5xl font-black text-slate-900 mt-6">
            What Users Say About
            <span className="block text-blue-600">
              Skillora AI
            </span>
          </h2>

          <p className="text-gray-600 mt-6 text-lg max-w-3xl mx-auto">
            Discover how Skillora AI can help users understand their skills,
            identify career gaps, and plan their next career step.
          </p>
        </motion.div>

        {/* Testimonial Cards */}

        <div className="grid lg:grid-cols-3 gap-8 mt-20">

          {testimonials.map((user, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              className="relative bg-white rounded-3xl border border-blue-100 shadow-lg hover:shadow-2xl p-8 transition-all duration-300"
            >

              {/* Quote Icon */}

              <div className="absolute top-6 right-6 text-blue-100 text-5xl">
                <FaQuoteLeft />
              </div>

              {/* Stars */}

              <div className="flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* Review */}

              <p className="text-gray-600 leading-8 mt-6">
                "{user.review}"
              </p>

              {/* User */}

              <div className="flex items-center gap-4 mt-8">

                <img
                  src={user.image}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
                />

                <div>
                  <h4 className="text-lg font-bold text-slate-900">
                    {user.name}
                  </h4>

                  <p className="text-gray-500">
                    {user.role}
                  </p>
                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;