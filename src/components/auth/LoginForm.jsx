import { Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

function LoginForm() {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">

      <h2 className="text-4xl font-bold text-slate-900">
        Login
      </h2>

      <p className="text-gray-500 mt-2">
        Welcome back! Please login.
      </p>

      <form className="mt-8 space-y-6">

        <div>
          <label className="font-medium">
            Email
          </label>

          <div className="flex items-center border rounded-xl px-4 mt-2">
            <FaEnvelope className="text-gray-400" />

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-4 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="font-medium">
            Password
          </label>

          <div className="flex items-center border rounded-xl px-4 mt-2">
            <FaLock className="text-gray-400" />

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-4 outline-none"
            />
          </div>
        </div>

        <div className="flex justify-between text-sm">
          <label className="flex gap-2">
            <input type="checkbox" />
            Remember me
          </label>

          <a href="#" className="text-blue-600">
            Forgot Password?
          </a>
        </div>

        <button className="w-full bg-gradient-to-r from-sky-500 to-blue-700 text-white py-4 rounded-xl font-semibold hover:scale-105 transition">
          Login
        </button>

      </form>

      <p className="text-center mt-8 text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 font-semibold"
        >
          Register
        </Link>
      </p>

    </div>
  );
}

export default LoginForm;