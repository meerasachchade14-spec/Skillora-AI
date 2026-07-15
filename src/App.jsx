import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import Dashboard from "./pages/Dashboard/Dashboard";
import ResumeUpload from "./pages/ResumeUpload/ResumeUpload";
import ResumeBuilder from "./pages/ResumeBuilder/ResumeBuilder";

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

      {/* Resume Builder */}
      <Route
        path="/resume-builder"
        element={<ResumeBuilder />}
      />

      {/* Resume Upload */}
      <Route
        path="/resume-upload"
        element={<ResumeUpload />}
      />

    </Routes>
  );
}

export default App;