import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaRobot, FaGoogle, FaGithub, FaEnvelope, FaKey, FaArrowLeft, FaSpinner } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import authService from "../../services/authService";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMsg("");
    setInfoMsg("");

    try {
      const res = await authService.requestOtp(email);
      if (res.success) {
        setOtpSent(true);
        if (res.data?.fallback) {
          setInfoMsg("OTP generated! (Since SMTP is in fallback, check your Django console logs for the OTP).");
        } else {
          setInfoMsg("OTP verification code has been sent to your email!");
        }
      } else {
        setErrorMsg(res.message || "Failed to send verification code.");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Error occurred while requesting OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!email || !otp) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await authService.verifyOtp(email, otp);
      if (res.success && res.data) {
        localStorage.setItem('skillora_token', res.data.token);
        login(res.data.user);
        navigate("/dashboard");
      } else {
        setErrorMsg(res.message || "Invalid OTP code.");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Invalid code or connection error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-sky-500 to-blue-700 text-white items-center justify-center p-12">
        <div className="max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-white text-blue-600 flex items-center justify-center text-2xl">
              <FaRobot />
            </div>
            <h1 className="text-4xl font-bold">Skillora AI</h1>
          </div>
          <h2 className="text-5xl font-bold leading-tight">Welcome Back</h2>
          <p className="mt-6 text-lg text-blue-100">
            Sign in securely using email OTP verification to continue your career development.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 px-6 py-10">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">
          <h2 className="text-4xl font-bold text-center">Login / Sign In</h2>
          <p className="text-gray-500 text-center mt-2">
            {otpSent ? "Verify your email address" : "Sign in passwordlessly with email"}
          </p>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm text-center mt-6">
              {errorMsg}
            </div>
          )}

          {infoMsg && (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm text-center mt-6 font-medium">
              {infoMsg}
            </div>
          )}

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="mt-8 space-y-5">
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-sky-500 to-blue-700 text-white py-3 rounded-xl font-semibold hover:scale-105 transition flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:pointer-events-none"
              >
                {loading ? <FaSpinner className="animate-spin" /> : null}
                {loading ? "Sending..." : "Send Verification OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="mt-8 space-y-5">
              <div className="bg-slate-50 rounded-xl p-3 border text-center relative">
                <span className="text-sm text-slate-500 block">Logging in as:</span>
                <span className="font-bold text-slate-800 break-all">{email}</span>
                <button
                  type="button"
                  onClick={() => { setOtpSent(false); setOtp(""); }}
                  className="mt-1 text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 mx-auto justify-center"
                >
                  <FaArrowLeft size={10} /> Change Email
                </button>
              </div>

              <div className="relative">
                <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter 6-Digit OTP Code"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:border-blue-500 text-center tracking-widest font-bold text-lg"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-sky-500 to-blue-700 text-white py-3 rounded-xl font-semibold hover:scale-105 transition flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:pointer-events-none"
              >
                {loading ? <FaSpinner className="animate-spin" /> : null}
                {loading ? "Verifying..." : "Verify & Login"}
              </button>
            </form>
          )}

          <div className="my-6 text-center text-gray-400">OR</div>

          <div className="space-y-3">
            <button className="w-full border rounded-xl py-3 flex items-center justify-center gap-3 hover:bg-gray-50">
              <FaGoogle />
              Continue with Google
            </button>
            <button className="w-full border rounded-xl py-3 flex items-center justify-center gap-3 hover:bg-gray-50">
              <FaGithub />
              Continue with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;