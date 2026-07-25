import { useState } from "react";
import { Routes, Route } from "react-router-dom";

/* ---------------- Landing ---------------- */
import Landing from "./pages/Landing/Landing";

/* ---------------- Authentication ---------------- */
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import VerifyOtp from "./pages/Auth/VerifyOtp";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import NewPassword from "./pages/Auth/NewPassword";

/* ---------------- Dashboard & Layouts ---------------- */
import DashboardHome from "./components/dashboard/DashboardHome";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

/* ---------------- Resume & Career Modules ---------------- */
import ResumeUpload from "./pages/ResumeUpload/ResumeUpload";
import ResumeBuilder from "./pages/ResumeBuilder/ResumeBuilder";
import ResumeAnalysis from "./pages/ResumeAnalysis/ResumeAnalysis";
import SkillMatcher from "./pages/SkillMatcher/SkillMatcher";
import JobRecommendation from "./pages/JobRecommendation/JobRecommendation";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import Roadmap from "./pages/Roadmap/Roadmap";
import NotFound from "./pages/NotFound/NotFound";

/* ---------------- Splash Screen ---------------- */
import SplashScreen from "./components/splash/SplashScreen";

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    // Show splash screen on initial tab start or refresh, but not on history back
    const navEntries = performance.getEntriesByType("navigation");
    const navType = navEntries.length > 0 ? navEntries[0].type : "navigate";
    
    if (navType === "reload") {
      return true;
    }
    if (navType === "back_forward") {
      return false;
    }
    
    // Check if shown in this session
    const alreadyShown = sessionStorage.getItem("skillora_splash_shown");
    return !alreadyShown;
  });

  const handleSplashComplete = () => {
    sessionStorage.setItem("skillora_splash_shown", "true");
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}
      
      <Routes>
        {/* Landing */}
        <Route
          path="/"
          element={<Landing />}
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/verify-otp"
          element={<VerifyOtp />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path="/reset-password"
          element={<NewPassword />}
        />
        
        {/* Dashboard & Career Modules (Protected under DashboardLayout) */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/resume-upload" element={<ResumeUpload />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/resume-analysis" element={<ResumeAnalysis />} />
          <Route path="/skill-matcher" element={<SkillMatcher />} />
          <Route path="/jobs" element={<JobRecommendation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/roadmap" element={<Roadmap />} />
        </Route>

        {/* 404 Page */}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </>
  );
}

export default App;