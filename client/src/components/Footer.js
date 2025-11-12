import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaYoutube, 
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHandHoldingHeart
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: '기부하기', path: '/donate' },
      { label: '받기', path: '/receive' },
      { label: '푸드뱅크 찾기', path: '/food-banks' },
      { label: '자원봉사', path: '/volunteer' },
    ],
    company: [
      { label: '회사 소개', path: '/about' },
      { label: '미션 & 비전', path: '/mission' },
      { label: '팀 소개', path: '/team' },
      { label: '채용', path: '/careers' },
    ],
    resources: [
      { label: '블로그', path: '/blog' },
      { label: '도움말 센터', path: '/help' },
      { label: 'API 문서', path: '/api-docs' },
      { label: '파트너십', path: '/partnership' },
    ],
    legal: [
      { label: '이용약관', path: '/terms' },
      { label: '개인정보처리방침', path: '/privacy' },
      { label: '쿠키 정책', path: '/cookies' },
      { label: '라이선스', path: '/license' },
    ],
  };

  const socialLinks = [
    { icon: <FaFacebookF />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaInstagram />, url: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaYoutube />, url: 'https://youtube.com', label: 'YouTube' },
    { icon: <FaLinkedinIn />, url: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">뉴스레터 구독하기</h3>
              <p className="text-gray-400">
                FoodSave의 최신 소식과 임팩트 스토리를 받아보세요
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-green-700 transition-all duration-300">
                구독하기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                <FaHandHoldingHeart className="text-white text-xl" />
              </div>
              <span className="text-2xl font-bold">FoodSave</span>
            </Link>
            <p className="text-gray-400 mb-6">
              AI 기반 제약형 푸드 셰어링 플랫폼으로 음식물 낭비를 줄이고 
              지역사회에 따뜻한 나눔을 실천합니다.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:contact@foodsave.com" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
                <FaEnvelope />
                <span>contact@foodsave.com</span>
              </a>
              <a href="tel:02-1234-5678" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
                <FaPhone />
                <span>02-1234-5678</span>
              </a>
              <div className="flex items-start space-x-3 text-gray-400">
                <FaMapMarkerAlt className="mt-1" />
                <span>서울특별시 강남구 테헤란로 123<br />FoodSave 빌딩 5층</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">플랫폼</h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">회사</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">리소스</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">법적 고지</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-center md:text-left">
              <p>&copy; {currentYear} FoodSave. All rights reserved.</p>
              <p className="text-sm mt-1">Made with ❤️ by LogiSave Team</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-green-600 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
