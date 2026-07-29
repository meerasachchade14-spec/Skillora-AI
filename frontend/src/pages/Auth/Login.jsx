import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaRobot } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import authService from "../../services/authService";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authService.login({
        email: email,
        password: password,
      });

      console.log("Login successful:", response);

      // Save token in localStorage
      localStorage.setItem("skillora_token", response.token);

      // Save user session in context & localstorage
      login(response.user);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      const errorStatus = error.response?.status;
      const errorData = error.response?.data;

      // Handle unverified account redirection
      if (errorStatus === 403 && errorData?.is_verified === false) {
        navigate("/verify-otp", {
          state: {
            email: email,
            otpType: "registration",
            message: errorData.message || "Your account is not verified. A new verification OTP has been sent."
          },
        });
      } else {
        setError(
          errorData?.error ||
          errorData?.detail ||
          "Invalid email or password."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500">

      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-sky-500 to-blue-700 text-white items-center justify-center p-12 relative overflow-hidden">
        {/* Background glow effects */}
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
            Welcome Back
          </h2>
          <p className="mt-6 text-lg text-blue-100/90 leading-relaxed">
            Login to continue building your AI-powered career journey and accessing tailored roadmaps.
          </p>
        </div>
      </div>

     {/* Right Side */}
<div className="flex-1 flex items-center justify-center px-6 py-10 bg-gradient-to-br from-white via-sky-50 to-blue-50">
  <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10 border border-slate-100">

    <h2 className="text-4xl font-black text-center tracking-tight text-slate-900">
      Login
    </h2>

    <p className="text-slate-500 text-center mt-2 font-medium">
      Sign in to your account
    </p>

    {/* Error Message */}
    {error && (
      <div className="mt-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
        {error}
      </div>
    )}

    <form onSubmit={handleLogin} className="mt-8 space-y-5">

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

      <div>
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none bg-white text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] hover:scale-[1.01] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

    </form>

    {/* Forgot Password & Registration Links */}
    <div className="mt-8 flex flex-col items-center gap-3 text-sm font-medium">

      <Link
        to="/forgot-password"
        className="text-blue-600 hover:text-blue-700 hover:underline font-bold"
      >
        Forgot Password?
      </Link>

      <p className="text-slate-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 hover:text-blue-700 hover:underline font-bold"
        >
          Register
        </Link>
      </p>

    </div>

  </div>
</div>
    </div>
  );
}

export default Login;