import { Routes, Route } from "react-router-dom";

// Landing
import Landing from "./pages/Landing/Landing";

// Authentication
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// Dashboard
import Dashboard from "./pages/Dashboard/Dashboard";

// Resume
import ResumeUpload from "./pages/ResumeUpload/ResumeUpload";
import ResumeBuilder from "./pages/ResumeBuilder/ResumeBuilder";

// Optional Pages (Uncomment when created)
// import ResumeAnalysis from "./pages/ResumeAnalysis/ResumeAnalysis";
// import SkillMatcher from "./pages/SkillMatcher/SkillMatcher";
// import JobRecommendation from "./pages/JobRecommendation/JobRecommendation";
// import Profile from "./pages/Profile/Profile";
// import Settings from "./pages/Settings/Settings";
// import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Routes>

      {/* Landing */}
      <Route path="/" element={<Landing />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Resume Module */}
      <Route path="/resume-upload" element={<ResumeUpload />} />
      <Route path="/resume-builder" element={<ResumeBuilder />} />

      {/* Future Modules */}

      {/* <Route
        path="/resume-analysis"
        element={<ResumeAnalysis />}
      />

      <Route
        path="/skill-gap"
        element={<SkillMatcher />}
      />

      <Route
        path="/jobs"
        element={<JobRecommendation />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />

      <Route
        path="/settings"
        element={<Settings />}
      /> */}

      {/* 404 Page */}

      {/* <Route
        path="*"
        element={<NotFound />}
      /> */}

    </Routes>
  );
}

export default App;