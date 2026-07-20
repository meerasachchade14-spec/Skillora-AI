import api from './api';

const authService = {
  // Registers a new user account
  register: async ({ name, email, password }) => {
    const response = await api.post('/auth/register/', { full_name: name, email, password });
    return response.data;
  },

  // Initiates OTP email delivery
  requestOtp: async (email) => {
    const response = await api.post('/auth/login/request-otp', { email });
    return response.data;
  },

  // Verifies OTP code and returns authentication tokens
  verifyOtp: async (email, otp) => {
    const response = await api.post('/auth/login/verify-otp', { email, otp });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

export default authService;