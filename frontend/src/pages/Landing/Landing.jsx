import { useState } from "react";

import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import AIInsights from "../../components/landing/AIInsights";
import Features from "../../components/landing/Features";
import HowItWorks from "../../components/landing/HowItWorks";
import FAQ from "../../components/landing/FAQ";
import Footer from "../../components/landing/Footer";

import SplashScreen from "../../components/splash/SplashScreen";

function Landing() {
  const [darkMode, setDarkMode] = useState(false);

  const [showSplash, setShowSplash] = useState(
    performance.getEntriesByType("navigation")[0]?.type === "reload"
  );

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-white text-slate-900"
      }`}
    >

      {/* Splash Screen only on Refresh */}

      {showSplash && (
        <SplashScreen
          onComplete={() => setShowSplash(false)}
        />
      )}

      {/* Navbar */}

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
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