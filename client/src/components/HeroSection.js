import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlay, FaArrowRight } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-green-500">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute -top-10 -right-10 w-96 h-96 bg-green-400 rounded-full opacity-20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute -bottom-10 -left-10 w-96 h-96 bg-blue-400 rounded-full opacity-20 blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
              <span className="text-white text-sm font-medium ml-3">
                AI 기반 스마트 푸드 셰어링 플랫폼
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              음식을 <span className="text-yellow-300">나누고</span>
              <br />
              가치를 <span className="text-yellow-300">더하다</span>
            </h1>

            <p className="text-xl text-white opacity-90 mb-8">
              FoodSave는 AI 기술로 소상공인과 푸드뱅크를 연결하여
              음식물 낭비를 줄이고 지역사회에 온기를 전달합니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                to="/register"
                className="inline-flex items-center justify-center bg-white text-blue-600 font-bold py-4 px-8 rounded-full hover:bg-yellow-300 hover:text-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                지금 시작하기
                <FaArrowRight className="ml-2" />
              </Link>
              <button className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300">
                <FaPlay className="mr-2" />
                소개 영상 보기
              </button>
            </div>

            <div className="flex items-center gap-8">
              <div>
                <p className="text-3xl font-bold text-white">10,000+</p>
                <p className="text-white opacity-75">등록된 사업체</p>
              </div>
              <div className="w-px h-12 bg-white opacity-30"></div>
              <div>
                <p className="text-3xl font-bold text-white">50,000+</p>
                <p className="text-white opacity-75">절약된 식사</p>
              </div>
              <div className="w-px h-12 bg-white opacity-30"></div>
              <div>
                <p className="text-3xl font-bold text-white">100+</p>
                <p className="text-white opacity-75">파트너 푸드뱅크</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              {/* Phone mockup with app screenshot */}
              <div className="relative mx-auto w-72 h-[600px] bg-gray-900 rounded-[3rem] shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-green-500 rounded-[3rem] opacity-50"></div>
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-black rounded-full"></div>
                <div className="absolute inset-4 bg-white rounded-[2.5rem] overflow-hidden">
                  {/* App screenshot placeholder */}
                  <div className="p-4">
                    <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-6 mb-4">
                      <p className="text-white text-sm mb-2">오늘의 매칭</p>
                      <p className="text-white text-3xl font-bold">15건</p>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-gray-100 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">김밥천국 강남점</p>
                            <p className="text-sm text-gray-600">김밥 20줄</p>
                          </div>
                          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                            매칭 완료
                          </span>
                        </div>
                      </div>
                      <div className="bg-gray-100 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">파리바게뜨 역삼점</p>
                            <p className="text-sm text-gray-600">빵 30개</p>
                          </div>
                          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                            대기 중
                          </span>
                        </div>
                      </div>
                      <div className="bg-gray-100 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">스타벅스 선릉점</p>
                            <p className="text-sm text-gray-600">샌드위치 15개</p>
                          </div>
                          <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
                            진행 중
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xl">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">매칭 성공!</p>
                    <p className="text-xs text-gray-600">방금 전</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [10, -10, 10],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1
                }}
                className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xl">📦</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">새로운 기부</p>
                    <p className="text-xs text-gray-600">2분 전</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
