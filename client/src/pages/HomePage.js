import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHandHoldingHeart, 
  FaStore, 
  FaUsers, 
  FaChartLine,
  FaShieldAlt,
  FaMobileAlt,
  FaRocket,
  FaLeaf,
  FaCheckCircle
} from 'react-icons/fa';
import { HiOutlineSparkles, HiArrowRight } from 'react-icons/hi';
import HeroSection from '../components/HeroSection';
import FeatureCard from '../components/FeatureCard';
import StatsSection from '../components/StatsSection';
import TestimonialSlider from '../components/TestimonialSlider';

const HomePage = () => {
  const features = [
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: '규제 자동 검증',
      description: 'AI 기반 시스템으로 복잡한 식품 안전 규제를 자동으로 검증하여 안전한 기부를 보장합니다.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <FaHandHoldingHeart className="w-8 h-8" />,
      title: '실시간 매칭',
      description: '소상공인과 푸드뱅크를 실시간으로 연결하여 음식물 낭비를 최소화합니다.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: '투명한 추적',
      description: '기부 과정 전체를 투명하게 추적하고 임팩트 리포트를 제공합니다.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <FaMobileAlt className="w-8 h-8" />,
      title: '간편한 사용',
      description: '모바일 친화적 인터페이스로 언제 어디서나 쉽게 기부하고 받을 수 있습니다.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const userTypes = [
    {
      title: '소상공인',
      icon: <FaStore className="w-12 h-12 text-blue-500" />,
      benefits: [
        '남은 음식물 처리 비용 절감',
        '사회적 가치 창출 및 브랜드 이미지 제고',
        '세제 혜택 및 ESG 경영 실천',
        '간편한 기부 프로세스'
      ],
      cta: '지금 시작하기',
      link: '/register?type=business'
    },
    {
      title: '푸드뱅크',
      icon: <FaUsers className="w-12 h-12 text-green-500" />,
      benefits: [
        '안정적인 식품 공급원 확보',
        '실시간 매칭으로 신선한 음식 수령',
        '투명한 기부 이력 관리',
        '운영 효율성 증대'
      ],
      cta: '파트너 되기',
      link: '/register?type=foodbank'
    },
    {
      title: '자원봉사자',
      icon: <FaHandHoldingHeart className="w-12 h-12 text-purple-500" />,
      benefits: [
        '의미있는 봉사 활동 참여',
        '지역 사회 기여',
        '봉사 시간 자동 기록',
        '임팩트 확인 가능'
      ],
      cta: '봉사 참여하기',
      link: '/register?type=volunteer'
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: '등록 & 인증',
      description: '간단한 회원가입 후 사업자 인증을 완료하세요.'
    },
    {
      step: 2,
      title: '음식 등록',
      description: '남은 음식 정보를 등록하고 픽업 시간을 설정하세요.'
    },
    {
      step: 3,
      title: 'AI 매칭',
      description: 'AI가 최적의 푸드뱅크와 자동으로 매칭해드립니다.'
    },
    {
      step: 4,
      title: '전달 & 완료',
      description: '음식을 전달하고 임팩트 리포트를 받아보세요.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              왜 FoodSave인가?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI 기술과 스마트 매칭 시스템으로 음식물 낭비를 줄이고 
              지속 가능한 미래를 만들어갑니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              모두를 위한 플랫폼
            </h2>
            <p className="text-xl text-gray-600">
              당신의 역할에 맞는 방식으로 FoodSave에 참여하세요
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {userTypes.map((userType, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-center mb-6">
                  {userType.icon}
                </div>
                <h3 className="text-2xl font-bold text-center mb-6">
                  {userType.title}
                </h3>
                <ul className="space-y-3 mb-8">
                  {userType.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={userType.link}
                  className="block w-full text-center bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-3 px-6 rounded-full hover:from-blue-700 hover:to-green-700 transition-colors duration-300"
                >
                  {userType.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              어떻게 작동하나요?
            </h2>
            <p className="text-xl text-gray-600">
              4단계로 간단하게 시작하세요
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <HiArrowRight className="hidden lg:block absolute top-8 -right-4 text-3xl text-gray-400" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              사용자들의 이야기
            </h2>
            <p className="text-xl text-gray-600">
              FoodSave와 함께 변화를 만들어가는 사람들
            </p>
          </motion.div>
          <TestimonialSlider />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <HiOutlineSparkles className="w-16 h-16 text-yellow-300 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">
              지금 바로 시작하세요
            </h2>
            <p className="text-xl text-white mb-8 opacity-90">
              매일 버려지는 음식을 필요한 이웃에게 전달하는 선한 영향력에 동참하세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center bg-white text-blue-600 font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300"
              >
                <FaRocket className="mr-2" />
                무료로 시작하기
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-blue-600 transition-colors duration-300"
              >
                <FaLeaf className="mr-2" />
                더 알아보기
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
