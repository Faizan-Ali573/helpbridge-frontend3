import axios from 'axios';
import toast from 'react-hot-toast';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

if (import.meta.env.PROD) {
  console.log('API Base URL:', baseURL);
}

const api = axios.create({
  baseURL,
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
    const status = error?.response?.status;
    const data = error?.response?.data;
    const message = data?.message || 'Something went wrong';

    // Log full error details for debugging
    console.error(`API Error [${status}]:`, {
      url: error?.config?.url,
      method: error?.config?.method,
      data: data,
      message: message
    });

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


