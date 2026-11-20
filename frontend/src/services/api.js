import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('skillora_access_token') || localStorage.getItem('skillora_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle 401 and attempt token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refresh = localStorage.getItem('skillora_refresh_token');
        if (refresh) {
          const resp = await axios.post('http://127.0.0.1:8000/api/auth/refresh-token/', { refresh });
          const { access_token, refresh_token } = resp.data;
          if (access_token) {
            localStorage.setItem('skillora_access_token', access_token);
          }
          if (refresh_token) {
            localStorage.setItem('skillora_refresh_token', refresh_token);
          }
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return axios(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login page
        localStorage.removeItem('skillora_access_token');
        localStorage.removeItem('skillora_refresh_token');
        localStorage.removeItem('skillora_token');
        // Optionally, you could trigger a UI redirect here
      }
    }
    return Promise.reject(error);
  }
);

export default api;