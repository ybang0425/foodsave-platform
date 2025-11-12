import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description, color }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
           style={{
             backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
           }}>
      </div>
      
      <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 h-full">
        <div className={`w-16 h-16 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center text-white mb-6 transform group-hover:rotate-6 transition-transform duration-300`}>
          {icon}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
        
        <div className="mt-6">
          <button className="text-blue-600 font-medium flex items-center group-hover:text-blue-700 transition-colors">
            자세히 보기
            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
