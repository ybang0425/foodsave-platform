import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, isLoading, isAuthenticated } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.userType !== requiredRole && user?.userType !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">접근 권한이 없습니다</h2>
          <p className="text-gray-600 mb-6">이 페이지에 접근할 권한이 없습니다.</p>
          <Navigate to="/dashboard" replace />
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
