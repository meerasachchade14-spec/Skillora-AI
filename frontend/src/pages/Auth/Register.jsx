import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";
import authService from "../../services/authService";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      const response = await authService.register({
        name,
        email,
        password,
        confirm_password: confirmPassword,
      });

      console.log("Registration response:", response);

      navigate("/verify-otp", {
        state: {
          email,
          otpType: "registration",
        },
      });

    } catch (error) {
      console.error("Registration error:", error);

      const errorData = error.response?.data;

      if (errorData) {
        setError(
          errorData.error ||
            errorData.detail ||
            errorData.confirm_password?.[0] ||
            errorData.email?.[0] ||
            errorData.password?.[0] ||
            errorData.name?.[0] ||
            "Registration failed."
        );
      } else {
        setError(
          "Cannot connect to the backend server. Make sure it is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white text-slate-900">

      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-sky-500 to-blue-700 text-white items-center justify-center p-12 relative overflow-hidden">

        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-sky-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl" />

        <div className="max-w-md relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-white text-blue-600 flex items-center justify-center text-2xl shadow-xl">
              <FaRobot />
            </div>

            <h1 className="text-4xl font-bold">
              Skillora AI
            </h1>
          </div>

          <h2 className="text-5xl font-extrabold leading-tight">
            Start Your Career Journey
          </h2>

          <p className="mt-6 text-lg text-blue-100 leading-relaxed">
            Create your account and unlock AI-powered resume building,
            deep skill matching and tailored career roadmap guidance.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 bg-white">

        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-blue-100 p-10">

          <h2 className="text-4xl font-black text-center text-slate-900">
            Create Account
          </h2>

          <p className="text-slate-500 text-center mt-2 font-medium">
            Join Skillora AI today
          </p>

          {error && (
            <div className="mt-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          <form
            onSubmit={handleRegister}
            className="mt-8 space-y-5"
          >
            <input
              type="text"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/20 transition"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-600 font-medium">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-bold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;