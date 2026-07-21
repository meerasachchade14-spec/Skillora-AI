import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import Stats from "../../components/landing/Stats";
import Features from "../../components/landing/Features";
import HowItWorks from "../../components/landing/HowItWorks";
import FAQ from "../../components/landing/FAQ";
import Footer from "../../components/landing/Footer";

function Landing() {
  return (
    <div className="bg-white text-slate-900 overflow-x-hidden">
      <Navbar />

      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}

export default Landing;