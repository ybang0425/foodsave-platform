import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaTruck, FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa';

const UpcomingPickups = ({ userType }) => {
  const pickups = [
    {
      id: 1,
      date: '오늘',
      time: '오후 9:00',
      items: '김밥 20줄, 떡볶이 5인분',
      location: '강남구 테헤란로 123',
      contact: '010-1234-5678',
      partner: userType === 'business' ? '강남 푸드뱅크' : '김밥천국 강남점',
      status: 'today'
    },
    {
      id: 2,
      date: '내일',
      time: '오후 8:30',
      items: '샌드위치 15개',
      location: '서초구 서초대로 456',
      contact: '010-2345-6789',
      partner: userType === 'business' ? '서초 나눔터' : '스타벅스 서초점',
      status: 'tomorrow'
    },
    {
      id: 3,
      date: '11월 15일 (금)',
      time: '오후 7:00',
      items: '빵 30개, 케이크 5개',
      location: '송파구 올림픽로 789',
      contact: '010-3456-7890',
      partner: userType === 'business' ? '송파 복지관' : '파리바게뜨 송파점',
      status: 'upcoming'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'today':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'tomorrow':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'upcoming':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">예정된 픽업</h3>
        <Link
          to="/dashboard/pickups"
          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          전체보기 →
        </Link>
      </div>

      <div className="space-y-4">
        {pickups.map((pickup, index) => (
          <motion.div
            key={pickup.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`border rounded-lg p-4 ${getStatusColor(pickup.status)} hover:shadow-md transition-all`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <FaCalendarAlt className="text-gray-600" />
                  <span className="font-semibold text-gray-900">{pickup.date}</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-700">{pickup.time}</span>
                </div>
                <h4 className="font-medium text-gray-900">{pickup.partner}</h4>
              </div>
              {pickup.status === 'today' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500 text-white animate-pulse">
                  오늘
                </span>
              )}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-start">
                <FaTruck className="text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-700">{pickup.items}</span>
              </div>
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-700">{pickup.location}</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-gray-400 mr-2" />
                <span className="text-gray-700">{pickup.contact}</span>
              </div>
            </div>

            <div className="flex space-x-2 mt-4">
              <button className="flex-1 bg-white text-gray-700 py-2 px-3 rounded-lg border hover:bg-gray-50 transition-colors text-sm font-medium">
                상세보기
              </button>
              <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                확인완료
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <FaClock />
            <span>다음 픽업까지</span>
            <span className="font-bold text-gray-900">3시간 25분</span>
          </div>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            일정 관리 →
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingPickups;
