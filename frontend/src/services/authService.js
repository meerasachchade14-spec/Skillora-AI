import api from "./api";

const authService = {
  // Login
  login: async (data) => {
    const response = await api.post("/auth/login/", data);
    return response.data;
  },

  // Register
  register: async (data) => {
    const response = await api.post("/auth/register/", data);
    return response.data;
  },

  // Verify OTP (Registration & MFA)
  verifyOtp: async (data) => {
    const response = await api.post("/auth/verify-otp/", data);
    return response.data;
  },

  // Send/Resend OTP (Generic)
  sendOtp: async (data) => {
    const response = await api.post("/auth/send-otp/", data);
    return response.data;
  },

  // Request Password Reset
  forgotPassword: async (data) => {
    const response = await api.post("/auth/forgot-password/", data);
    return response.data;
  },

  // Verify Password Reset OTP
  verifyResetOtp: async (data) => {
    const response = await api.post("/auth/verify-reset-otp/", data);
    return response.data;
  },

  // Reset Password using token
  resetPassword: async (data) => {
    const response = await api.post("/auth/reset-password/", data);
    return response.data;
  },

  // Get User Profile
  getProfile: async () => {
    const response = await api.get("/auth/profile/");
    return response.data;
  },
};

export default authService;