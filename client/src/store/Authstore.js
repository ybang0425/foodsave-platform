import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import authService from '../services/auth.service';
import toast from 'react-hot-toast';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      // Login
      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const response = await authService.login(email, password);
          const { user, accessToken, refreshToken } = response.data;
          
          set({
            user,
            accessToken,
            refreshToken,
            isAuthenticated: true,
            isLoading: false
          });

          toast.success('로그인 성공!');
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          toast.error(error.response?.data?.message || '로그인 실패');
          return { 
            success: false, 
            error: error.response?.data?.message || '로그인 중 오류가 발생했습니다' 
          };
        }
      },

      // Register
      register: async (userData) => {
        set({ isLoading: true });
        try {
          const response = await authService.register(userData);
          const { user, accessToken, refreshToken } = response.data;
          
          set({
            user,
            accessToken,
            refreshToken,
            isAuthenticated: true,
            isLoading: false
          });

          toast.success('회원가입 성공! 이메일을 확인해주세요.');
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          toast.error(error.response?.data?.message || '회원가입 실패');
          return { 
            success: false, 
            error: error.response?.data?.message || '회원가입 중 오류가 발생했습니다' 
          };
        }
      },

      // Logout
      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false
        });
        toast.success('로그아웃되었습니다');
      },

      // Update user
      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData }
        }));
      },

      // Refresh token
      refreshAccessToken: async () => {
        const refreshToken = get().refreshToken;
        if (!refreshToken) return false;

        try {
          const response = await authService.refreshToken(refreshToken);
          const { accessToken } = response.data;
          
          set({ accessToken });
          return true;
        } catch (error) {
          // If refresh fails, logout
          get().logout();
          return false;
        }
      },

      // Check auth status
      checkAuth: async () => {
        const token = get().accessToken;
        if (!token) {
          set({ isAuthenticated: false });
          return;
        }

        try {
          const response = await authService.getCurrentUser();
          set({
            user: response.data.user,
            isAuthenticated: true
          });
        } catch (error) {
          // Token might be expired, try to refresh
          const refreshed = await get().refreshAccessToken();
          if (!refreshed) {
            set({ isAuthenticated: false });
          }
        }
      },

      // Clear auth
      clearAuth: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

export { useAuthStore };
