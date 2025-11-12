import api from './api';

const authService = {
  // Login
  login: (email, password) => {
    return api.post('/auth/login', { email, password });
  },

  // Register
  register: (userData) => {
    return api.post('/auth/register', userData);
  },

  // Logout
  logout: () => {
    return api.post('/auth/logout');
  },

  // Get current user
  getCurrentUser: () => {
    return api.get('/auth/me');
  },

  // Refresh token
  refreshToken: (refreshToken) => {
    return api.post('/auth/refresh', { refreshToken });
  },

  // Forgot password
  forgotPassword: (email) => {
    return api.post('/auth/forgot-password', { email });
  },

  // Reset password
  resetPassword: (token, password) => {
    return api.post(`/auth/reset-password/${token}`, { password });
  },

  // Verify email
  verifyEmail: (token) => {
    return api.get(`/auth/verify-email/${token}`);
  },

  // Update profile
  updateProfile: (userData) => {
    return api.put('/auth/update-profile', userData);
  },

  // Change password
  changePassword: (currentPassword, newPassword) => {
    return api.put('/auth/change-password', { currentPassword, newPassword });
  },

  // Delete account
  deleteAccount: () => {
    return api.delete('/auth/delete-account');
  }
};

export default authService;
