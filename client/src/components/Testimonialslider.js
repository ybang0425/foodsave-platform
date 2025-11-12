import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: '김민수',
      role: '카페 오너',
      company: '더 커피 플레이스',
      avatar: 'https://ui-avatars.com/api/?name=김민수&background=3B82F6&color=fff',
      content: 'FoodSave를 통해 매일 폐기하던 샌드위치와 케이크를 필요한 이웃에게 전달할 수 있게 되었습니다. 음식물 처리 비용도 절감되고, 사회적 가치도 창출할 수 있어 일석이조입니다.',
      rating: 5,
      date: '2024.10.15'
    },
    {
      id: 2,
      name: '이서연',
      role: '푸드뱅크 관리자',
      company: '서울 나눔 푸드뱅크',
      avatar: 'https://ui-avatars.com/api/?name=이서연&background=10B981&color=fff',
      content: 'AI 매칭 시스템 덕분에 실시간으로 신선한 음식을 받을 수 있게 되었습니다. 복잡했던 기부 절차가 간소화되어 운영 효율성이 크게 향상되었습니다.',
      rating: 5,
      date: '2024.11.02'
    },
    {
      id: 3,
      name: '박준혁',
      role: '베이커리 대표',
      company: '행복한 빵집',
      avatar: 'https://ui-avatars.com/api/?name=박준혁&background=8B5CF6&color=fff',
      content: '매일 남는 빵을 버리는 것이 항상 마음 아팠는데, FoodSave를 통해 의미있는 나눔을 실천할 수 있어 기쁩니다. 직원들도 자부심을 느끼고 있습니다.',
      rating: 5,
      date: '2024.09.28'
    },
    {
      id: 4,
      name: '정하은',
      role: '자원봉사자',
      company: '대학생 봉사단',
      avatar: 'https://ui-avatars.com/api/?name=정하은&background=F59E0B&color=fff',
      content: '음식 배달 봉사를 하면서 지역사회에 기여할 수 있어 보람을 느낍니다. 앱으로 간편하게 봉사 일정을 관리할 수 있어 참여가 쉬워졌습니다.',
      rating: 5,
      date: '2024.11.10'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <FaQuoteLeft className="absolute top-8 left-8 text-4xl text-blue-100" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="flex-shrink-0">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-20 h-20 rounded-full border-4 border-blue-100"
                />
              </div>
              
              <div className="flex-grow">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  "{testimonials[currentIndex].content}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {testimonials[currentIndex].role} · {testimonials[currentIndex].company}
                    </p>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {testimonials[currentIndex].date}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={prevTestimonial}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 -translate-x-16 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextTestimonial}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 translate-x-16 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-8 bg-gradient-to-r from-blue-600 to-green-600' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
