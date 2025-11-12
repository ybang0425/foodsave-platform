const rateLimit = require('express-rate-limit');

// Create different limiters for different endpoints
const rateLimiter = {
  // General API rate limiter
  apiLimiter: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
      success: false,
      message: '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.'
    },
    standardHeaders: true,
    legacyHeaders: false
  }),

  // Strict limiter for login attempts
  loginLimiter: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login requests per windowMs
    message: {
      success: false,
      message: '로그인 시도 횟수를 초과했습니다. 15분 후 다시 시도해주세요.'
    },
    skipSuccessfulRequests: true // Don't count successful requests
  }),

  // Limiter for account creation
  createAccountLimiter: rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // Limit each IP to 3 account creation requests per hour
    message: {
      success: false,
      message: '계정 생성 한도를 초과했습니다. 1시간 후 다시 시도해주세요.'
    }
  }),

  // Limiter for password reset requests
  passwordResetLimiter: rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // Limit each IP to 3 password reset requests per hour
    message: {
      success: false,
      message: '비밀번호 재설정 요청 한도를 초과했습니다. 1시간 후 다시 시도해주세요.'
    }
  }),

  // Limiter for donation creation
  donationLimiter: rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 30, // Limit each IP to 30 donation posts per hour
    message: {
      success: false,
      message: '기부 등록 한도를 초과했습니다. 잠시 후 다시 시도해주세요.'
    }
  }),

  // Limiter for file uploads
  uploadLimiter: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 upload requests per 15 minutes
    message: {
      success: false,
      message: '파일 업로드 한도를 초과했습니다. 잠시 후 다시 시도해주세요.'
    }
  }),

  // Limiter for search/filter requests
  searchLimiter: rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 30, // Limit each IP to 30 search requests per minute
    message: {
      success: false,
      message: '검색 요청이 너무 많습니다. 잠시 후 다시 시도해주세요.'
    }
  }),

  // Dynamic rate limiter based on user type
  createDynamicLimiter: (options = {}) => {
    return rateLimit({
      windowMs: options.windowMs || 15 * 60 * 1000,
      max: options.max || 100,
      message: options.message || {
        success: false,
        message: '요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.'
      },
      keyGenerator: (req) => {
        // Use user ID if authenticated, otherwise use IP
        return req.user ? `user_${req.user.id}` : req.ip;
      },
      skip: (req) => {
        // Skip rate limiting for admin users
        return req.user && req.user.userType === 'admin';
      }
    });
  }
};

module.exports = rateLimiter;
