import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaChartLine, 
  FaBox, 
  FaHandHoldingHeart, 
  FaUsers, 
  FaBell,
  FaCalendarAlt,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown,
  FaPlus
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardStats from '../components/DashboardStats';
import RecentDonations from '../components/RecentDonations';
import UpcomingPickups from '../components/UpcomingPickups';
import LoadingSpinner from '../components/LoadingSpinner';

const DashboardPage = () => {
  const { user } = useAuthStore();
  const [selectedMenu, setSelectedMenu] = useState('overview');
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        business: {
          totalDonations: 156,
          monthlyDonations: 23,
          totalMealsSaved: 3420,
          avgRating: 4.8,
          trends: {
            donations: { value: 12, isUp: true },
            meals: { value: 8, isUp: true },
            rating: { value: 0.2, isUp: true }
          }
        },
        foodbank: {
          totalReceived: 89,
          monthlyReceived: 15,
          beneficiariesServed: 1250,
          storageCapacity: 75,
          trends: {
            received: { value: 5, isUp: true },
            beneficiaries: { value: 50, isUp: true },
            capacity: { value: 10, isUp: false }
          }
        },
        volunteer: {
          deliveriesCompleted: 34,
          hoursVolunteered: 128,
          impactScore: 92,
          upcomingTasks: 3,
          trends: {
            deliveries: { value: 3, isUp: true },
            hours: { value: 12, isUp: true },
            score: { value: 5, isUp: true }
          }
        }
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" text="대시보드 로딩중..." />
      </div>
    );
  }

  const renderBusinessDashboard = () => (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FaBox className="text-blue-600 text-xl" />
            </div>
            <div className="flex items-center text-sm text-green-600">
              <FaArrowUp className="mr-1" />
              {stats.business.trends.donations.value}%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.business.totalDonations}</h3>
          <p className="text-gray-600 text-sm mt-1">총 기부 횟수</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <FaHandHoldingHeart className="text-green-600 text-xl" />
            </div>
            <div className="flex items-center text-sm text-green-600">
              <FaArrowUp className="mr-1" />
              {stats.business.trends.meals.value}%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.business.totalMealsSaved.toLocaleString()}</h3>
          <p className="text-gray-600 text-sm mt-1">절약된 식사</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FaCalendarAlt className="text-purple-600 text-xl" />
            </div>
            <div className="flex items-center text-sm text-gray-600">
              이번 달
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.business.monthlyDonations}</h3>
          <p className="text-gray-600 text-sm mt-1">월간 기부</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <FaChartLine className="text-yellow-600 text-xl" />
            </div>
            <div className="flex items-center text-sm text-green-600">
              <FaArrowUp className="mr-1" />
              {stats.business.trends.rating.value}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.business.avgRating}</h3>
          <p className="text-gray-600 text-sm mt-1">평균 평점</p>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 mb-8 text-white">
        <h3 className="text-xl font-bold mb-4">빠른 작업</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/dashboard/donate"
            className="bg-white bg-opacity-20 backdrop-blur rounded-lg p-4 hover:bg-opacity-30 transition-all flex items-center space-x-3"
          >
            <FaPlus className="text-2xl" />
            <div>
              <p className="font-semibold">새 기부 등록</p>
              <p className="text-sm opacity-90">남은 음식 기부하기</p>
            </div>
          </Link>
          <Link
            to="/dashboard/donations"
            className="bg-white bg-opacity-20 backdrop-blur rounded-lg p-4 hover:bg-opacity-30 transition-all flex items-center space-x-3"
          >
            <FaBox className="text-2xl" />
            <div>
              <p className="font-semibold">기부 현황</p>
              <p className="text-sm opacity-90">진행중인 기부 확인</p>
            </div>
          </Link>
          <Link
            to="/dashboard/reports"
            className="bg-white bg-opacity-20 backdrop-blur rounded-lg p-4 hover:bg-opacity-30 transition-all flex items-center space-x-3"
          >
            <FaChartLine className="text-2xl" />
            <div>
              <p className="font-semibold">리포트</p>
              <p className="text-sm opacity-90">임팩트 리포트 확인</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentDonations userType="business" />
        <UpcomingPickups userType="business" />
      </div>
    </>
  );

  const renderFoodBankDashboard = () => (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <FaHandHoldingHeart className="text-green-600 text-xl" />
            </div>
            <div className="flex items-center text-sm text-green-600">
              <FaArrowUp className="mr-1" />
              {stats.foodbank.trends.received.value}%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.foodbank.totalReceived}</h3>
          <p className="text-gray-600 text-sm mt-1">총 수령 횟수</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FaUsers className="text-blue-600 text-xl" />
            </div>
            <div className="flex items-center text-sm text-green-600">
              <FaArrowUp className="mr-1" />
              {stats.foodbank.trends.beneficiaries.value}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.foodbank.beneficiariesServed.toLocaleString()}</h3>
          <p className="text-gray-600 text-sm mt-1">수혜자 수</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FaCalendarAlt className="text-purple-600 text-xl" />
            </div>
            <div className="flex items-center text-sm text-gray-600">
              이번 달
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.foodbank.monthlyReceived}</h3>
          <p className="text-gray-600 text-sm mt-1">월간 수령</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <FaBox className="text-yellow-600 text-xl" />
            </div>
            <div className="flex items-center text-sm text-red-600">
              <FaArrowDown className="mr-1" />
              {stats.foodbank.trends.capacity.value}%
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">{stats.foodbank.storageCapacity}%</h3>
            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-green-600 rounded-full"
                style={{ width: `${stats.foodbank.storageCapacity}%` }}
              />
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-1">저장 공간</p>
        </motion.div>
      </div>

      {/* Available Donations */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">매칭 가능한 기부</h3>
          <Link
            to="/donations"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            모두 보기 →
          </Link>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">김밥천국 강남점</h4>
                  <p className="text-gray-600 text-sm mt-1">김밥 20줄, 떡볶이 5인분</p>
                  <p className="text-gray-500 text-xs mt-2">픽업 시간: 오후 9:00 - 10:00</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    매칭 가능
                  </span>
                  <p className="text-gray-500 text-xs mt-2">2.3km</p>
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  수락
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  상세보기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentDonations userType="foodbank" />
        <UpcomingPickups userType="foodbank" />
      </div>
    </>
  );

  const renderVolunteerDashboard = () => (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FaTruck className="text-blue-600 text-xl" />
            </div>
            <div className="flex items-center text-sm text-green-600">
              <FaArrowUp className="mr-1" />
              {stats.volunteer.trends.deliveries.value}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.volunteer.deliveriesCompleted}</h3>
          <p className="text-gray-600 text-sm mt-1">완료된 배달</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <FaClock className="text-green-600 text-xl" />
            </div>
            <div className="flex items-center text-sm text-green-600">
              <FaArrowUp className="mr-1" />
              {stats.volunteer.trends.hours.value}h
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.volunteer.hoursVolunteered}</h3>
          <p className="text-gray-600 text-sm mt-1">봉사 시간</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FaChartLine className="text-purple-600 text-xl" />
            </div>
            <div className="flex items-center text-sm text-green-600">
              <FaArrowUp className="mr-1" />
              {stats.volunteer.trends.score.value}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.volunteer.impactScore}</h3>
          <p className="text-gray-600 text-sm mt-1">임팩트 점수</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <FaBell className="text-yellow-600 text-xl" />
            </div>
            <div className="flex items-center text-sm text-orange-600">
              대기중
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.volunteer.upcomingTasks}</h3>
          <p className="text-gray-600 text-sm mt-1">예정된 작업</p>
        </motion.div>
      </div>

      {/* Available Tasks */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">참여 가능한 봉사</h3>
          <Link
            to="/dashboard/tasks"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            모두 보기 →
          </Link>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">음식 배달 봉사</h4>
                  <p className="text-gray-600 text-sm mt-1">강남구 → 서초구</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>📍 3.5km</span>
                    <span>🕐 오후 2:00</span>
                    <span>⏱️ 예상 1시간</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    모집중
                  </span>
                  <p className="text-gray-900 font-semibold text-sm mt-2">+10 포인트</p>
                </div>
              </div>
              <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                참여하기
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">이번 달 업적</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 backdrop-blur rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <FaCheckCircle className="text-2xl" />
              <div>
                <p className="font-semibold">첫 10회 달성</p>
                <p className="text-sm opacity-90">배달 10회 완료</p>
              </div>
            </div>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <FaClock className="text-2xl" />
              <div>
                <p className="font-semibold">시간 기부자</p>
                <p className="text-sm opacity-90">월 20시간 봉사</p>
              </div>
            </div>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur rounded-lg p-4 opacity-50">
            <div className="flex items-center space-x-3">
              <FaExclamationTriangle className="text-2xl" />
              <div>
                <p className="font-semibold">긴급 구조대</p>
                <p className="text-sm opacity-90">5회 남음</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar 
          userType={user?.userType} 
          selectedMenu={selectedMenu}
          onMenuSelect={setSelectedMenu}
        />

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              안녕하세요, {user?.fullName}님! 👋
            </h1>
            <p className="text-gray-600">
              오늘도 FoodSave와 함께 의미있는 하루 보내세요
            </p>
          </div>

          {/* Notifications Bar */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 flex items-center justify-between">
            <div className="flex items-center">
              <FaBell className="text-yellow-600 mr-3" />
              <span className="text-gray-700">
                {user?.userType === 'business' && '오늘 오후 9시에 픽업 예정인 기부가 있습니다.'}
                {user?.userType === 'foodbank' && '새로운 매칭 요청이 3건 있습니다.'}
                {user?.userType === 'volunteer' && '내일 예정된 배달 봉사를 확인해주세요.'}
              </span>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              확인하기
            </button>
          </div>

          {/* Dashboard Content based on user type */}
          {user?.userType === 'business' && renderBusinessDashboard()}
          {user?.userType === 'foodbank' && renderFoodBankDashboard()}
          {user?.userType === 'volunteer' && renderVolunteerDashboard()}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
