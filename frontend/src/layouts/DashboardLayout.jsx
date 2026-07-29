import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import Sidebar from "../components/dashboard/Sidebar";
import useAuth from "../hooks/useAuth";
import authService from "../services/authService";

function DashboardLayout() {
  const { user, updateUser } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [savedUserData, setSavedUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    phone_number: "",
    linkedin: "",
    github: "",
    bio: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        dob: user.dob || "",
        phone_number: user.phone_number || "",
        linkedin: user.linkedin || "",
        github: user.github || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  // Mandatory fields checklist (only Name, DOB, and Phone Number are required)
  const isProfileIncomplete =
    user &&
    (!user.name ||
      !user.dob ||
      !user.phone_number);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.dob || !formData.phone_number) {
      setError("Full Name, Date of Birth, and Phone Number are required.");
      return;
    }

    setSubmitting(true);
    try {
      const updatedUser = await authService.updateProfile(formData);
      setSavedUserData(updatedUser);
      setShowSuccessPopup(true);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    if (savedUserData) {
      updateUser(savedUserData);
    }
    setShowSuccessPopup(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Toaster position="top-right" />
      <Sidebar />

      <div className="min-h-screen lg:ml-72 flex flex-col">
        <DashboardNavbar />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="max-w-[1700px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Complete Profile Blocking Modal or Success Modal */}
      {(isProfileIncomplete || showSuccessPopup) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xl p-4 overflow-y-auto">
          {showSuccessPopup ? (
            <div className="bg-white rounded-[32px] shadow-2xl border border-slate-100 max-w-md w-full p-8 text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-4xl shadow-inner animate-bounce">
                🎉
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  Success!
                </h2>
                <p className="text-slate-500 mt-2 text-base font-semibold leading-relaxed">
                  Profile completed successfully! Welcome to Skillora AI.
                </p>
              </div>
              <button
                onClick={handleSuccessClose}
                className="w-full py-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/25 transition duration-300 cursor-pointer text-center text-sm font-semibold"
              >
                Let's Go to Home
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-[32px] shadow-2xl border border-slate-100 max-w-xl w-full p-8 md:p-10 space-y-6 max-h-[95vh] overflow-y-auto">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-3xl shadow-lg shadow-blue-500/25 mb-4">
                  👋
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  Complete Your Profile
                </h2>
                <p className="text-slate-500 mt-2 text-sm">
                  To unlock the home page and access all Skillora AI career features, please complete your mandatory personal details.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-semibold border border-red-100">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-950 focus:border-blue-500 focus:bg-white outline-none font-medium transition"
                      placeholder="Full Name"
                    />
                  </div>

                  {/* Email (Read Only) */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Email (Read Only)
                    </label>
                    <input
                      type="email"
                      disabled
                      value={user?.email || ""}
                      className="w-full bg-slate-100 border border-slate-200 rounded-2xl px-4 py-3 text-slate-400 font-medium cursor-not-allowed outline-none"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.dob}
                      onChange={(e) =>
                        setFormData({ ...formData, dob: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-950 focus:border-blue-500 focus:bg-white outline-none font-medium transition"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone_number}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone_number: e.target.value,
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-950 focus:border-blue-500 focus:bg-white outline-none font-medium transition"
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>

                {/* LinkedIn URL */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    LinkedIn URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) =>
                      setFormData({ ...formData, linkedin: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-950 focus:border-blue-500 focus:bg-white outline-none font-medium transition"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                {/* GitHub URL */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    GitHub URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) =>
                      setFormData({ ...formData, github: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-950 focus:border-blue-500 focus:bg-white outline-none font-medium transition"
                    placeholder="https://github.com/username"
                  />
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Bio Summary (Optional)
                  </label>
                  <textarea
                    rows="3"
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-950 focus:border-blue-500 focus:bg-white outline-none font-medium transition resize-none"
                    placeholder="Brief summary of your professional background..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!formData.name || !formData.dob || !formData.phone_number || submitting}
                  className="w-full py-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/25 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-center text-sm"
                >
                  {submitting ? "Saving Profile..." : "Save & Continue to Home"}
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DashboardLayout;