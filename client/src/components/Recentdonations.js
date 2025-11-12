import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaCheckCircle, FaExclamationCircle, FaMapMarkerAlt } from 'react-icons/fa';

const RecentDonations = ({ userType }) => {
  const donations = [
    {
      id: 1,
      title: '김밥 세트',
      quantity: '20인분',
      status: 'completed',
      time: '2시간 전',
      location: '강남구',
      partner: userType === 'business' ? '강남 푸드뱅크' : '김밥천국 강남점'
    },
    {
      id: 2,
      title: '샌드위치 & 샐러드',
      quantity: '15인분',
      status: 'in_progress',
      time: '5시간 전',
      location: '서초구',
      partner: userType === 'business' ? '서초 나눔터' : '스타벅스 서초점'
    },
    {
      id: 3,
      title: '베이커리 세트',
      quantity: '30개',
      status: 'pending',
      time: '오늘 오후 3시',
      location: '송파구',
      partner: userType === 'business' ? '대기중' : '파리바게뜨 송파점'
    },
    {
      id: 4,
      title: '도시락',
      quantity: '25인분',
      status: 'completed',
      time: '어제',
      location: '강동구',
      partner: userType === 'business' ? '강동 복지센터' : '한솥도시락 강동점'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="text-green-500" />;
      case 'in_progress':
        return <FaClock className="text-yellow-500" />;
      case 'pending':
        return <FaExclamationCircle className="text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return '완료';
      case 'in_progress':
        return '진행중';
      case 'pending':
        return '대기중';
      default:
        return '';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-700';
      case 'pending':
        return 'bg-gray-100 text-gray-700';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          {userType === 'business' ? '최근 기부' : '최근 수령'}
        </h3>
        <Link
          to="/dashboard/history"
          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          전체보기 →
        </Link>
      </div>

      <div className="space-y-4">
        {donations.map((donation, index) => (
          <motion.div
            key={donation.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl">
                {getStatusIcon(donation.status)}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{donation.title}</h4>
                <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500">
                  <span>{donation.quantity}</span>
                  <span>•</span>
                  <span className="flex items-center">
                    <FaMapMarkerAlt className="mr-1 text-xs" />
                    {donation.location}
                  </span>
                  <span>•</span>
                  <span>{donation.partner}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(donation.status)}`}>
                {getStatusText(donation.status)}
              </span>
              <p className="text-xs text-gray-500 mt-1">{donation.time}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              <span className="text-gray-600">완료 <span className="font-semibold text-gray-900">12</span></span>
            </div>
            <div className="flex items-center">
              <FaClock className="text-yellow-500 mr-2" />
              <span className="text-gray-600">진행중 <span className="font-semibold text-gray-900">3</span></span>
            </div>
            <div className="flex items-center">
              <FaExclamationCircle className="text-gray-400 mr-2" />
              <span className="text-gray-600">대기중 <span className="font-semibold text-gray-900">2</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentDonations;
