import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import AIInsights from "../../components/landing/AIInsights";
import Features from "../../components/landing/Features";
import HowItWorks from "../../components/landing/HowItWorks";
import FAQ from "../../components/landing/FAQ";
import Footer from "../../components/landing/Footer";

function Landing() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const darkMode = theme === "dark";

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-white text-slate-900"
      }`}
    >
      {/* Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={toggleTheme}
      />

      <main>
        <Hero darkMode={darkMode} />

        <AIInsights darkMode={darkMode} />

        <Features darkMode={darkMode} />

        <HowItWorks darkMode={darkMode} />

        <FAQ darkMode={darkMode} />
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}

export default Landing;