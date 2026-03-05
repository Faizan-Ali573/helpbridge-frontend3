import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('hb_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

export const clearAuthToken = () => {
  delete api.defaults.headers.common.Authorization;
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message || 'Something went wrong';

    // Global error message for all but specific cases if needed
    if (error.response && error.response.status !== 401) {
      toast.error(message);
    }

    if (error.response && error.response.status === 401) {
      localStorage.removeItem('hb_token');
      clearAuthToken();
      // Only show error if it's not a background check (like getMe on reload)
      if (window.location.pathname !== '/login') {
        toast.error('Session expired. Please login again.');
      }
    }

    return Promise.reject(error);
  },
);

export const getApiClient = () => api;

export default api;


