import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage (managed by zustand persist)
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      try {
        const { state } = JSON.parse(authStorage);
        if (state?.accessToken) {
          config.headers.Authorization = `Bearer ${state.accessToken}`;
        }
      } catch (error) {
        console.error('Error parsing auth storage:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
          const { state } = JSON.parse(authStorage);
          if (state?.refreshToken) {
            const response = await axios.post(
              `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/auth/refresh`,
              { refreshToken: state.refreshToken }
            );

            if (response.data.success) {
              // Update token in storage
              const newAuthStorage = JSON.parse(localStorage.getItem('auth-storage'));
              newAuthStorage.state.accessToken = response.data.data.accessToken;
              localStorage.setItem('auth-storage', JSON.stringify(newAuthStorage));

              // Retry original request
              originalRequest.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
              return api(originalRequest);
            }
          }
        }
      } catch (refreshError) {
        // Refresh failed, clear auth and redirect to login
        localStorage.removeItem('auth-storage');
        window.location.href = '/login';
        toast.error('세션이 만료되었습니다. 다시 로그인해주세요.');
      }
    }

    // Handle other errors
    if (error.response) {
      // Server responded with error
      const message = error.response.data?.message || '요청 처리 중 오류가 발생했습니다.';
      
      // Don't show toast for validation errors (they're handled by forms)
      if (error.response.status !== 400) {
        toast.error(message);
      }
    } else if (error.request) {
      // Request made but no response
      toast.error('서버에 연결할 수 없습니다. 네트워크를 확인해주세요.');
    } else {
      // Something else happened
      toast.error('요청 처리 중 오류가 발생했습니다.');
    }

    return Promise.reject(error);
  }
);

export default api;
