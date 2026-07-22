import { motion } from "framer-motion";
import { FaRobot, FaBrain, FaChartLine } from "react-icons/fa";

function SplashScreen({ onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[9999] min-h-screen overflow-hidden bg-gradient-to-br from-white via-sky-50 to-blue-100 flex items-center justify-center"
    >
      {/* Background Glow */}

      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-sky-300/30 rounded-full blur-3xl" />

      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-blue-300/30 rounded-full blur-3xl" />

      {/* Main Content */}

      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* Animated Logo */}

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 120,
          }}
          className="relative"
        >

          {/* Glow */}

          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute inset-0 rounded-[2rem] bg-blue-400 blur-2xl"
          />

          {/* Logo */}

          <div className="relative w-28 h-28 rounded-[2rem] bg-gradient-to-br from-sky-400 to-blue-700 flex items-center justify-center text-white text-5xl shadow-2xl">
            <FaRobot />
          </div>

        </motion.div>


        {/* Brand Name */}

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-8 text-5xl md:text-6xl font-black tracking-tight text-slate-900"
        >
          Skillora{" "}
          <span className="bg-gradient-to-r from-sky-500 to-blue-700 bg-clip-text text-transparent">
            AI
          </span>
        </motion.h1>


        {/* Tagline */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-4 text-lg md:text-xl text-slate-600"
        >
          Learn Smarter. Grow Faster.
        </motion.p>


        {/* AI Feature Floating Icons */}

        <div className="relative w-[320px] h-24 mt-10">

          {/* Brain */}

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="absolute left-0 top-2 w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-blue-600 text-xl"
          >
            <FaBrain />
          </motion.div>


          {/* Chart */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="absolute left-1/2 -translate-x-1/2 top-8 w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-sky-600 text-xl"
          >
            <FaChartLine />
          </motion.div>


          {/* AI */}

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="absolute right-0 top-2 w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-blue-700 text-xl"
          >
            <FaRobot />
          </motion.div>

        </div>


        {/* Loading Text */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-8 text-sm font-semibold text-slate-500 tracking-wide"
        >
          POWERING YOUR CAREER WITH AI
        </motion.p>


        {/* Progress Bar */}

        <div className="mt-5 w-64 h-2 bg-white rounded-full overflow-hidden shadow-inner">

          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 5,
              ease: "easeInOut",
            }}
            onAnimationComplete={onComplete}
            className="h-full bg-gradient-to-r from-sky-400 to-blue-700 rounded-full"
          />

        </div>


        {/* Loading Dots */}

        <div className="flex gap-2 mt-5">

          {[0, 1, 2].map((dot) => (

            <motion.div
              key={dot}
              animate={{
                y: [0, -6, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: dot * 0.2,
              }}
              className="w-2 h-2 rounded-full bg-blue-600"
            />

          ))}

        </div>

      </div>

    </motion.div>
  );
}

export default SplashScreen;