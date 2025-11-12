import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaPhone, 
  FaStore, 
  FaHandHoldingHeart,
  FaUserFriends,
  FaBuilding,
  FaIdCard,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { useAuthStore } from '../store/authStore';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { register, isLoading } = useAuthStore();
  
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState(searchParams.get('type') || '');
  const [formData, setFormData] = useState({
    // Basic info
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    fullName: '',
    phoneNumber: '',
    
    // Business specific
    businessName: '',
    businessType: '',
    businessRegistrationNumber: '',
    businessAddress: '',
    
    // FoodBank specific
    organizationName: '',
    organizationType: '',
    registrationNumber: '',
    organizationAddress: '',
    capacity: '',
    
    // Common
    description: '',
    agree: false
  });
  const [errors, setErrors] = useState({});

  const userTypeOptions = [
    {
      type: 'business',
      icon: <FaStore className="text-4xl" />,
      title: '소상공인',
      description: '남은 음식을 기부하고 싶은 사업체',
      color: 'from-blue-500 to-blue-600'
    },
    {
      type: 'foodbank',
      icon: <FaHandHoldingHeart className="text-4xl" />,
      title: '푸드뱅크',
      description: '음식을 받아 배분하는 기관',
      color: 'from-green-500 to-green-600'
    },
    {
      type: 'volunteer',
      icon: <FaUserFriends className="text-4xl" />,
      title: '자원봉사자',
      description: '배달 및 운영을 돕는 개인',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const businessTypes = [
    { value: 'restaurant', label: '음식점' },
    { value: 'bakery', label: '베이커리' },
    { value: 'cafe', label: '카페' },
    { value: 'mart', label: '마트/편의점' },
    { value: 'franchise', label: '프랜차이즈' },
    { value: 'other', label: '기타' }
  ];

  const organizationTypes = [
    { value: 'nonprofit', label: '비영리단체' },
    { value: 'government', label: '정부기관' },
    { value: 'religious', label: '종교단체' },
    { value: 'community', label: '지역사회단체' },
    { value: 'school', label: '학교/교육기관' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요';
    }
    
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)) {
      newErrors.password = '대소문자, 숫자, 특수문자를 포함해야 합니다';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
    }
    
    if (!formData.username) {
      newErrors.username = '사용자명을 입력해주세요';
    } else if (formData.username.length < 3) {
      newErrors.username = '사용자명은 3자 이상이어야 합니다';
    }
    
    if (!formData.fullName) {
      newErrors.fullName = '이름을 입력해주세요';
    }
    
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = '전화번호를 입력해주세요';
    } else if (!/^[0-9]{10,11}$/.test(formData.phoneNumber.replace(/-/g, ''))) {
      newErrors.phoneNumber = '유효한 전화번호를 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    
    if (userType === 'business') {
      if (!formData.businessName) newErrors.businessName = '사업체명을 입력해주세요';
      if (!formData.businessType) newErrors.businessType = '사업체 유형을 선택해주세요';
      if (!formData.businessRegistrationNumber) {
        newErrors.businessRegistrationNumber = '사업자등록번호를 입력해주세요';
      }
      if (!formData.businessAddress) newErrors.businessAddress = '주소를 입력해주세요';
    } else if (userType === 'foodbank') {
      if (!formData.organizationName) newErrors.organizationName = '기관명을 입력해주세요';
      if (!formData.organizationType) newErrors.organizationType = '기관 유형을 선택해주세요';
      if (!formData.registrationNumber) newErrors.registrationNumber = '등록번호를 입력해주세요';
      if (!formData.organizationAddress) newErrors.organizationAddress = '주소를 입력해주세요';
      if (!formData.capacity) newErrors.capacity = '일일 처리 가능 식수를 입력해주세요';
    }
    
    if (!formData.agree) {
      newErrors.agree = '약관에 동의해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    } else if (step === 2) {
      if (!userType) {
        toast.error('사용자 유형을 선택해주세요');
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep3()) return;

    const userData = {
      email: formData.email,
      password: formData.password,
      username: formData.username,
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      userType: userType
    };

    if (userType === 'business') {
      userData.businessData = {
        businessName: formData.businessName,
        businessType: formData.businessType,
        businessRegistrationNumber: formData.businessRegistrationNumber,
        address: formData.businessAddress,
        description: formData.description
      };
    } else if (userType === 'foodbank') {
      userData.foodBankData = {
        organizationName: formData.organizationName,
        organizationType: formData.organizationType,
        registrationNumber: formData.registrationNumber,
        address: formData.organizationAddress,
        capacity: parseInt(formData.capacity),
        description: formData.description
      };
    }

    const result = await register(userData);
    
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white text-2xl">🍽️</span>
              </div>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">회원가입</h2>
            <p className="text-gray-600">FoodSave와 함께 나눔을 시작하세요</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                1
              </div>
              <div className={`w-20 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                2
              </div>
              <div className={`w-20 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} />
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                3
              </div>
            </div>
          </div>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold mb-4">기본 정보</h3>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  이메일 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
                    placeholder="example@email.com"
                  />
                </div>
                {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    비밀번호 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
                      placeholder="8자 이상"
                    />
                  </div>
                  {errors.password && <p className="mt-1 text-red-500 text-sm">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    비밀번호 확인 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
                      placeholder="비밀번호 재입력"
                    />
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-red-500 text-sm">{errors.confirmPassword}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    사용자명 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-3 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
                      placeholder="username"
                    />
                  </div>
                  {errors.username && <p className="mt-1 text-red-500 text-sm">{errors.username}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaIdCard className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-3 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
                      placeholder="홍길동"
                    />
                  </div>
                  {errors.fullName && <p className="mt-1 text-red-500 text-sm">{errors.fullName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  전화번호 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-3 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
                    placeholder="01012345678"
                  />
                </div>
                {errors.phoneNumber && <p className="mt-1 text-red-500 text-sm">{errors.phoneNumber}</p>}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all"
              >
                다음
              </button>
            </motion.div>
          )}

          {/* Step 2: User Type Selection */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="text-xl font-semibold mb-6">사용자 유형 선택</h3>
              
              <div className="space-y-4">
                {userTypeOptions.map((option) => (
                  <motion.div
                    key={option.type}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setUserType(option.type)}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      userType === option.type
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${option.color} text-white`}>
                        {option.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">{option.title}</h4>
                        <p className="text-gray-600 mt-1">{option.description}</p>
                      </div>
                      {userType === option.type && (
                        <div className="text-blue-500">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition-all"
                >
                  이전
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all"
                >
                  다음
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Additional Info based on user type */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="text-xl font-semibold mb-4">
                {userType === 'business' && '사업체 정보'}
                {userType === 'foodbank' && '기관 정보'}
                {userType === 'volunteer' && '추가 정보'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {userType === 'business' && (
                  <>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        사업체명 <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaStore className="absolute left-3 top-3.5 text-gray-400" />
                        <input
                          type="text"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-3 py-3 border ${errors.businessName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
                          placeholder="사업체명"
                        />
                      </div>
                      {errors.businessName && <p className="mt-1 text-red-500 text-sm">{errors.businessName}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        사업체 유형 <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        className={`w-full px-3 py-3 border ${errors.businessType ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
                      >
                        <option value="">선택하세요</option>
                        {businessTypes.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                      {errors.businessType && <p className="mt-1 text-red-500 text-sm">{errors.businessType}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        사업자등록번호 <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaIdCard className="absolute left-3 top-3.5 text-gray-400" />
                        <input
                          type="text"
                          name="businessRegistrationNumber"
                          value={formData.businessRegistrationNumber}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-3 py-3 border ${errors.businessRegistrationNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
                          placeholder="123-45-67890"
                        />
                      </div>
                      {errors.businessRegistrationNumber && <p className="mt-1 text-red-500 text-sm">{errors.businessRegistrationNumber}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        사업장 주소 <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-3 top-3.5 text-gray-400" />
                        <input
                          type="text"
                          name="businessAddress"
                          value={formData.businessAddress}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-3 py-3 border ${errors.businessAddress ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
                          placeholder="서울시 강남구..."
                        />
                      </div>
                      {errors.businessAddress && <p className="mt-1 text-red-500 text-sm">{errors.businessAddress}</p>}
                    </div>
                  </>
                )}

                {userType === 'foodbank' && (
                  <>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        기관명 <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaBuilding className="absolute left-3 top-3.5 text-gray-400" />
                        <input
                          type="text"
                          name="organizationName"
                          value={formData.organizationName}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-3 py-3 border ${errors.organizationName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
                          placeholder="기관명"
                        />
                      </div>
                      {errors.organizationName && <p className="mt-1 text-red-500 text-sm">{errors.organizationName}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        기관 유형 <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="organizationType"
                        value={formData.organizationType}
                        onChange={handleChange}
                        className={`w-full px-3 py-3 border ${errors.organizationType ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
                      >
                        <option value="">선택하세요</option>
                        {organizationTypes.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                      {errors.organizationType && <p className="mt-1 text-red-500 text-sm">{errors.organizationType}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        등록번호 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleChange}
                        className={`w-full px-3 py-3 border ${errors.registrationNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
                        placeholder="비영리단체 등록번호"
                      />
                      {errors.registrationNumber && <p className="mt-1 text-red-500 text-sm">{errors.registrationNumber}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        기관 주소 <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-3 top-3.5 text-gray-400" />
                        <input
                          type="text"
                          name="organizationAddress"
                          value={formData.organizationAddress}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-3 py-3 border ${errors.organizationAddress ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
                          placeholder="서울시 강남구..."
                        />
                      </div>
                      {errors.organizationAddress && <p className="mt-1 text-red-500 text-sm">{errors.organizationAddress}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        일일 처리 가능 식수 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        className={`w-full px-3 py-3 border ${errors.capacity ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
                        placeholder="100"
                      />
                      {errors.capacity && <p className="mt-1 text-red-500 text-sm">{errors.capacity}</p>}
                    </div>
                  </>
                )}

                {/* Common description field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    소개 (선택사항)
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="간단한 소개를 입력해주세요..."
                  />
                </div>

                {/* Terms Agreement */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="agree"
                      checked={formData.agree}
                      onChange={handleChange}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <span className="text-gray-700">
                        <Link to="/terms" className="text-blue-600 hover:underline">이용약관</Link> 및{' '}
                        <Link to="/privacy" className="text-blue-600 hover:underline">개인정보처리방침</Link>에 동의합니다.
                      </span>
                    </div>
                  </label>
                  {errors.agree && <p className="mt-1 text-red-500 text-sm">{errors.agree}</p>}
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition-all"
                  >
                    이전
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all flex items-center justify-center"
                  >
                    {isLoading ? (
                      <LoadingSpinner size="small" color="white" />
                    ) : (
                      '가입 완료'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              이미 계정이 있으신가요?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                로그인
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
