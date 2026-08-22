import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import AIInsights from "../../components/landing/AIInsights";
import Features from "../../components/landing/Features";
import HowItWorks from "../../components/landing/HowItWorks";
import FAQ from "../../components/landing/FAQ";
import AdminLogin from "../../components/landing/AdminLogin";
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

        {/* Home */}
        <div id="home" className="scroll-mt-20">
          <Hero darkMode={darkMode} />
        </div>

        {/* AI Analysis */}
        <div id="ai-analysis" className="scroll-mt-20">
          <AIInsights darkMode={darkMode} />
        </div>

        {/* Features */}
        <div id="features" className="scroll-mt-20">
          <Features darkMode={darkMode} />
        </div>

        {/* How It Works */}
        <div id="how-it-works" className="scroll-mt-20">
          <HowItWorks darkMode={darkMode} />
        </div>

        {/* FAQ */}
        <div id="faq" className="scroll-mt-20">
          <FAQ darkMode={darkMode} />
        </div>

        {/* Admin Login */}
        <div id="admin" className="scroll-mt-20">
          <AdminLogin darkMode={darkMode} />
        </div>

      </main>

      {/* Contact / Footer */}
      <div id="contact" className="scroll-mt-20">
        <Footer darkMode={darkMode} />
      </div>

    </div>
  );
}

export default Landing;