import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import useAuth from "../../hooks/useAuth";
import { FaRobot } from "react-icons/fa";

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const email = location.state?.email || "";
  const otpType = location.state?.otpType || "registration";
  const initialMessage = location.state?.message || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(initialMessage);
  
  // Resend OTP countdown timer
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      if (otpType === "forgot_password") {
        // Verification for forgot password
        const response = await authService.verifyResetOtp({
          email,
          otp_code: otp,
        });

        console.log("Password reset OTP verified:", response);
        
        // Navigate to New Password page with temporary reset token
        navigate("/reset-password", {
          state: {
            email: email,
            resetToken: response.reset_token,
          },
        });
      } else {
        // Verification for registration
        const response = await authService.verifyOtp({
          email,
          otp_code: otp,
          otp_type: otpType,
        });

        console.log("Registration OTP verified:", response);

        // Save token in localStorage
        localStorage.setItem("skillora_token", response.token);

        // Save user session in context & localstorage
        login(response.user);

        navigate("/dashboard");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setError(
        error.response?.data?.error ||
        error.response?.data?.detail ||
        "Invalid or expired OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    
    setError("");
    setSuccessMessage("");
    setResending(true);

    try {
      const response = await authService.sendOtp({
        email: email,
        otp_type: otpType,
      });

      setSuccessMessage(response.message || "A new OTP has been sent successfully.");
      setResendCooldown(60); // Start 60s rate limit countdown
    } catch (error) {
      console.error("Resend OTP error:", error);
      setError(
        error.response?.data?.error ||
        error.response?.data?.detail ||
        "Failed to resend OTP. Please try again."
      );
    } finally {
      setResending(false);
    }
  };

  const displayType = otpType === "forgot_password" ? "Password Reset" : "Account Verification";

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
            Verify Security Code
          </h2>
          <p className="mt-6 text-lg text-blue-100/90 leading-relaxed">
            Please check your inbox. We sent a 6-digit verification code to your email to keep your account secure.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl p-10 border border-slate-100 dark:border-slate-800 transition-colors duration-500">
          <h2 className="text-4xl font-black text-center tracking-tight text-slate-900 dark:text-white">
            Verify OTP
          </h2>
          
          <div className="mt-3 flex justify-center">
            <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1.5 rounded-full border border-blue-100 dark:border-blue-900/50">
              {displayType}
            </span>
          </div>

          <p className="text-slate-500 dark:text-slate-400 text-center mt-4 font-medium">
            Enter the 6-digit security code sent to
          </p>
          <p className="text-blue-600 dark:text-blue-400 font-bold text-center mt-1">
            {email}
          </p>

          {/* Success Message */}
          {successMessage && (
            <div className="mt-5 p-3 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-600 dark:text-green-400 text-sm font-medium">
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-5 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleVerify} className="mt-8 space-y-5">
            <div>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-center text-2xl tracking-widest outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-bold"
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] hover:scale-[1.01] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          {/* Resend & Cancel Options */}
          <div className="mt-8 flex flex-col items-center gap-4 text-sm font-medium">
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendCooldown > 0 || resending}
              className="text-blue-600 dark:text-blue-400 hover:underline font-bold disabled:opacity-50 disabled:no-underline cursor-pointer"
            >
              {resending 
                ? "Sending..." 
                : resendCooldown > 0 
                  ? `Resend OTP in ${resendCooldown}s` 
                  : "Resend security code"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;