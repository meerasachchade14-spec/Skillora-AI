import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";
import authService from "../../services/authService";

function NewPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";
  const resetToken = location.state?.resetToken || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!resetToken) {
      navigate("/login");
    }
  }, [resetToken, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await authService.resetPassword({
        reset_token: resetToken,
        password: password,
        confirm_password: confirmPassword,
      });

      console.log("Password reset success:", response);
      setSuccess(true);
      
      // Auto navigate to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      
    } catch (error) {
      console.error("Password reset error:", error);
      setError(
        error.response?.data?.error ||
        error.response?.data?.detail ||
        "Failed to reset password. The link or session may have expired."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500">

      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-sky-500 to-blue-700 text-white items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-sky-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl" />

        <div className="max-w-md relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-white text-blue-600 flex items-center justify-center text-2xl shadow-xl">
              <FaRobot />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              Skillora AI
            </h1>
          </div>
          <h2 className="text-5xl font-extrabold leading-tight tracking-tight">
            Create New Password
          </h2>
          <p className="mt-6 text-lg text-blue-100/90 leading-relaxed">
            Choose a strong, secure password containing numbers, letters, and symbols to protect your account details and profile.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl p-10 border border-slate-100 dark:border-slate-800 transition-colors duration-500">
          <h2 className="text-4xl font-black text-center tracking-tight text-slate-900 dark:text-white">
            New Password
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-center mt-2 font-medium">
            Resetting password for <span className="text-blue-600 dark:text-blue-400 font-bold">{email}</span>
          </p>

          {/* Success Message */}
          {success && (
            <div className="mt-5 p-3 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-600 dark:text-green-400 text-sm font-medium">
              Password changed successfully! Redirecting you to the login page...
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-5 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm font-medium">
              {error}
            </div>
          )}

          {!success && (
            <form onSubmit={handleResetPassword} className="mt-8 space-y-5">
              <div>
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] hover:scale-[1.01] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? "Changing Password..." : "Change Password"}
              </button>
            </form>
          )}

          {/* Back to Login Link */}
          <div className="mt-8 text-center text-sm font-medium">
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
