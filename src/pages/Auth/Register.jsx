import { Link, useNavigate } from "react-router-dom";
import { FaRobot, FaGoogle, FaGithub } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Later this will connect to backend
    navigate("/dashboard");
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

            <h1 className="text-4xl font-bold">
              Skillora AI
            </h1>

          </div>

          <h2 className="text-5xl font-bold leading-tight">
            Start Your Career Journey
          </h2>

          <p className="mt-6 text-lg text-blue-100">
            Create your account and unlock AI-powered career guidance.
          </p>

        </div>

      </div>

      {/* Right Side */}

      <div className="flex-1 flex items-center justify-center bg-slate-50 px-6 py-10">

        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">

          <h2 className="text-4xl font-bold text-center">
            Create Account
          </h2>

          <p className="text-gray-500 text-center mt-2">
            Join Skillora AI today
          </p>

          <form onSubmit={handleRegister} className="mt-8 space-y-5">

            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />

            <input
              type="email"
              placeholder="Email"
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />

            <input
              type="password"
              placeholder="Password"
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-500 to-blue-700 text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              Create Account
            </button>

          </form>

          <div className="my-6 text-center text-gray-400">
            OR
          </div>

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

          <p className="mt-8 text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold"
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