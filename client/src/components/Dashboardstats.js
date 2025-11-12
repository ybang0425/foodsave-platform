import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const DashboardStats = ({ stats, userType }) => {
  const renderStatCard = (title, value, change, isUp, icon, color, delay) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 bg-${color}-100 rounded-lg`}>
          <div className={`text-${color}-600 text-xl`}>{icon}</div>
        </div>
        {change && (
          <div className={`flex items-center text-sm ${isUp ? 'text-green-600' : 'text-red-600'}`}>
            {isUp ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
            {change}%
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </h3>
      <p className="text-gray-600 text-sm mt-1">{title}</p>
    </motion.div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index}>
          {renderStatCard(
            stat.title,
            stat.value,
            stat.change,
            stat.isUp,
            stat.icon,
            stat.color,
            index * 0.1
          )}
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
