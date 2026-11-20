import api from "./api";

const authService = {
  // Login
  login: async (data) => {
    const response = await api.post("/auth/login/", data);
    const { access_token, refresh_token, token } = response.data;
    const access = access_token || token;
    if (access) {
      localStorage.setItem('skillora_access_token', access);
    }
    if (refresh_token) {
      localStorage.setItem('skillora_refresh_token', refresh_token);
    }
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
    const { access_token, refresh_token, token } = response.data;
    const access = access_token || token;
    if (access) {
      localStorage.setItem('skillora_access_token', access);
    }
    if (refresh_token) {
      localStorage.setItem('skillora_refresh_token', refresh_token);
    }
    return response.data;
  },

  // Refresh Access Token
  refreshToken: async () => {
    const refresh = localStorage.getItem('skillora_refresh_token');
    if (!refresh) {
      throw new Error('No refresh token available');
    }
    const response = await api.post("/auth/refresh-token/", { refresh });
    const { access_token, refresh_token } = response.data;
    if (access_token) {
      localStorage.setItem('skillora_access_token', access_token);
    }
    if (refresh_token) {
      localStorage.setItem('skillora_refresh_token', refresh_token);
    }
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

  // Update User Profile
  updateProfile: async (data) => {
    const response = await api.put("/auth/profile/", data);
    return response.data;
  },

  // Delete User Account
  deleteAccount: async () => {
    const response = await api.delete("/auth/delete-account/");
    return response.data;
  },

  // Report a Bug
  reportBug: async (data) => {
    const response = await api.post("/auth/report-bug/", data);
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('skillora_access_token');
    localStorage.removeItem('skillora_refresh_token');
    localStorage.removeItem('skillora_token');
    return true;
  },
};

export default authService;
