import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Lock, Mail, Eye, EyeOff } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import authService from "../../services/authService";

function AdminLogin() {
  const navigate = useNavigate();
  const { login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

      // Assert Admin privileges
      const userRole = response.user?.role || "";
      const userEmail = response.user?.email || "";
      if (userRole.toLowerCase() !== "admin" || userEmail !== "meera.ldrp.7@gmail.com") {
        logout(); // Clear session
        setError("Access Denied: You do not have administrator permissions.");
        setLoading(false);
        return;
      }

      // Save token in localStorage
      localStorage.setItem("skillora_token", response.token);

      // Save user session in context & localstorage
      login(response.user);

      // Navigate to admin overview
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Admin login error:", err);
      const errorData = err.response?.data;
      setError(
        errorData?.error ||
        errorData?.detail ||
        "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1329] relative overflow-hidden px-4 sm:px-6">
      {/* Premium glowing background lights */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />

      <div className="max-w-md w-full relative z-10 bg-slate-900/40 backdrop-blur-2xl rounded-[32px] p-8 sm:p-10 border border-slate-800/80 shadow-2xl shadow-black/40">
        
        {/* Shield Icon & Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-white shadow-xl shadow-blue-500/25 mb-4 border border-blue-400/20">
            <ShieldCheck className="w-8 h-8 animate-pulse" />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Skillora AI
          </h2>
          <p className="text-slate-400 font-semibold text-sm mt-1.5 uppercase tracking-widest">
            Admin Console Login
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-950/60 border border-red-800 text-red-400 text-sm font-semibold flex items-center gap-2">
            <span className="text-base">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-widest">
              Admin Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                placeholder="admin@skillora.ai"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 outline-none transition font-medium"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-widest">
              Console Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl pl-12 pr-12 py-4 text-white placeholder-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 outline-none transition font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/10 active:scale-[0.98] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm tracking-wide"
          >
            {loading ? "Verifying Credentials..." : "Authenticate Admin"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-xs font-bold text-slate-500 hover:text-slate-400 transition"
          >
            ← Return to Skillora Homepage
          </a>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
