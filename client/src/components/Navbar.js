import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBars, 
  FaTimes, 
  FaUser, 
  FaHandHoldingHeart,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaSignInAlt,
  FaUserPlus,
  FaTachometerAlt
} from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null); // This would come from auth context
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: '홈', icon: <FaHome /> },
    { path: '/donations', label: '기부 현황', icon: <FaHandHoldingHeart /> },
    { path: '/food-banks', label: '푸드뱅크', icon: <FaHandHoldingHeart /> },
    { path: '/about', label: '소개', icon: <FaInfoCircle /> },
    { path: '/contact', label: '문의', icon: <FaEnvelope /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white shadow-lg backdrop-blur-lg bg-opacity-95' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center"
            >
              <FaHandHoldingHeart className="text-white text-xl" />
            </motion.div>
            <span className={`text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent ${
              !scrolled && location.pathname === '/' ? 'text-white' : ''
            }`}>
              FoodSave
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium transition-colors duration-300 ${
                  scrolled || location.pathname !== '/'
                    ? isActive(link.path) 
                      ? 'text-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                    : isActive(link.path)
                      ? 'text-yellow-300'
                      : 'text-white hover:text-yellow-300'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-600"
                    initial={false}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-colors duration-300 ${
                    scrolled || location.pathname !== '/'
                      ? 'text-gray-700 hover:text-blue-600'
                      : 'text-white hover:text-yellow-300'
                  }`}
                >
                  <FaTachometerAlt />
                  <span>대시보드</span>
                </Link>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full font-medium hover:from-blue-700 hover:to-green-700 transition-all duration-300">
                  <FaUser />
                  <span>프로필</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-colors duration-300 ${
                    scrolled || location.pathname !== '/'
                      ? 'text-gray-700 hover:text-blue-600'
                      : 'text-white hover:text-yellow-300'
                  }`}
                >
                  <FaSignInAlt />
                  <span>로그인</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full font-medium hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
                >
                  <FaUserPlus />
                  <span>회원가입</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg ${
              scrolled || location.pathname !== '/'
                ? 'text-gray-700 hover:text-blue-600'
                : 'text-white hover:text-yellow-300'
            }`}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-300 ${
                    isActive(link.path)
                      ? 'bg-gradient-to-r from-blue-50 to-green-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
              
              <div className="border-t pt-4 mt-4">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      <FaTachometerAlt className="text-xl" />
                      <span className="font-medium">대시보드</span>
                    </Link>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
                      <FaUser className="text-xl" />
                      <span className="font-medium">프로필</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      <FaSignInAlt className="text-xl" />
                      <span className="font-medium">로그인</span>
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 mt-2 rounded-lg bg-gradient-to-r from-blue-600 to-green-600 text-white"
                    >
                      <FaUserPlus className="text-xl" />
                      <span className="font-medium">회원가입</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
