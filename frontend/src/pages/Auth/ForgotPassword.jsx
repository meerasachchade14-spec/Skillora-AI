import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";
import authService from "../../services/authService";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authService.forgotPassword({ email });
      console.log("Forgot password response:", response);

      // Navigate to OTP page, specifying forgot_password type
      navigate("/verify-otp", {
        state: {
          email: email,
          otpType: "forgot_password",
          message: response.message || "A password reset OTP has been sent to your email."
        },
      });
    } catch (error) {
      console.error("Forgot password error:", error);
      setError(
        error.response?.data?.error ||
        error.response?.data?.detail ||
        "Failed to send reset code. Make sure the email is registered."
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
            Reset Password
          </h2>
          <p className="mt-6 text-lg text-blue-100/90 leading-relaxed">
            Don't worry! Enter your email address below, and we'll send you a security code to verify your identity and reset your password.
          </p>
        </div>
      </div>

      {/* Right Side */}
<div className="flex-1 flex items-center justify-center px-6 py-10 bg-white">

  <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10 border border-slate-100">

    <h2 className="text-4xl font-black text-center tracking-tight text-slate-900">
      Forgot Password
    </h2>

    <p className="text-slate-500 text-center mt-2 font-medium">
      Enter your email to receive an OTP
    </p>

    {/* Error Message */}
    {error && (
      <div className="mt-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit} className="mt-8 space-y-5">

      <div>
        <input
          type="email"
          placeholder="Email Address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none bg-white text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] hover:scale-[1.01] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? "Sending OTP..." : "Send OTP"}
      </button>

    </form>

    {/* Back to Login Link */}
    <div className="mt-8 text-center text-sm font-medium">

      <Link
        to="/login"
        className="text-blue-600 hover:text-blue-700 hover:underline font-bold"
      >
        Back to Login
      </Link>

    </div>

  </div>

</div>
    </div>
  );
}

export default ForgotPassword;
