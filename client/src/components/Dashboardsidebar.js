import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHome,
  FaBox,
  FaHandHoldingHeart,
  FaChartLine,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaTruck,
  FaCalendarAlt,
  FaBell,
  FaHistory,
  FaFileAlt,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { useAuthStore } from '../store/authStore';

const DashboardSidebar = ({ userType, selectedMenu, onMenuSelect }) => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const businessMenuItems = [
    { id: 'overview', label: '대시보드', icon: <FaHome />, path: '/dashboard' },
    { id: 'donations', label: '기부 관리', icon: <FaBox />, path: '/dashboard/donations' },
    { id: 'history', label: '기부 내역', icon: <FaHistory />, path: '/dashboard/history' },
    { id: 'reports', label: '리포트', icon: <FaChartLine />, path: '/dashboard/reports' },
    { id: 'notifications', label: '알림', icon: <FaBell />, path: '/dashboard/notifications' },
    { id: 'settings', label: '설정', icon: <FaCog />, path: '/dashboard/settings' }
  ];

  const foodbankMenuItems = [
    { id: 'overview', label: '대시보드', icon: <FaHome />, path: '/dashboard' },
    { id: 'matching', label: '매칭 관리', icon: <FaHandHoldingHeart />, path: '/dashboard/matching' },
    { id: 'pickups', label: '픽업 일정', icon: <FaCalendarAlt />, path: '/dashboard/pickups' },
    { id: 'inventory', label: '재고 관리', icon: <FaBox />, path: '/dashboard/inventory' },
    { id: 'beneficiaries', label: '수혜자 관리', icon: <FaUsers />, path: '/dashboard/beneficiaries' },
    { id: 'reports', label: '리포트', icon: <FaFileAlt />, path: '/dashboard/reports' },
    { id: 'settings', label: '설정', icon: <FaCog />, path: '/dashboard/settings' }
  ];

  const volunteerMenuItems = [
    { id: 'overview', label: '대시보드', icon: <FaHome />, path: '/dashboard' },
    { id: 'tasks', label: '봉사 활동', icon: <FaTruck />, path: '/dashboard/tasks' },
    { id: 'schedule', label: '일정 관리', icon: <FaCalendarAlt />, path: '/dashboard/schedule' },
    { id: 'history', label: '활동 내역', icon: <FaHistory />, path: '/dashboard/history' },
    { id: 'map', label: '지도', icon: <FaMapMarkerAlt />, path: '/dashboard/map' },
    { id: 'achievements', label: '업적', icon: <FaChartLine />, path: '/dashboard/achievements' },
    { id: 'settings', label: '설정', icon: <FaCog />, path: '/dashboard/settings' }
  ];

  const menuItems = 
    userType === 'business' ? businessMenuItems :
    userType === 'foodbank' ? foodbankMenuItems :
    volunteerMenuItems;

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg">
      {/* Logo */}
      <div className="p-6 border-b">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xl">🍽️</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            FoodSave
          </span>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
            {userType === 'business' ? 'B' : userType === 'foodbank' ? 'F' : 'V'}
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              {userType === 'business' && '사업체'}
              {userType === 'foodbank' && '푸드뱅크'}
              {userType === 'volunteer' && '자원봉사자'}
            </p>
            <p className="text-sm text-gray-500">
              {userType === 'business' && '프리미엄 플랜'}
              {userType === 'foodbank' && '인증된 기관'}
              {userType === 'volunteer' && '레벨 5'}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <motion.li
              key={item.id}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={item.path}
                onClick={() => onMenuSelect(item.id)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  selectedMenu === item.id
                    ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-0 w-full p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <FaSignOutAlt className="text-xl" />
          <span className="font-medium">로그아웃</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
