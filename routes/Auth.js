const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const rateLimiter = require('../middleware/rateLimiter');

// Validation rules
const registerValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('유효한 이메일 주소를 입력하세요'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('비밀번호는 최소 8자 이상이어야 합니다')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('비밀번호는 대소문자, 숫자, 특수문자를 포함해야 합니다'),
  body('username')
    .isLength({ min: 3, max: 30 })
    .withMessage('사용자명은 3-30자 사이여야 합니다')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('사용자명은 영문, 숫자, 언더스코어만 사용 가능합니다'),
  body('fullName')
    .isLength({ min: 2, max: 100 })
    .withMessage('이름을 입력하세요'),
  body('phoneNumber')
    .matches(/^[0-9]{10,15}$/)
    .withMessage('유효한 전화번호를 입력하세요'),
  body('userType')
    .isIn(['business', 'foodbank', 'volunteer'])
    .withMessage('유효한 사용자 타입을 선택하세요')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('유효한 이메일 주소를 입력하세요'),
  body('password')
    .notEmpty()
    .withMessage('비밀번호를 입력하세요')
];

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array() 
    });
  }
  next();
};

// Routes

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post(
  '/register',
  rateLimiter.createAccountLimiter,
  registerValidation,
  handleValidationErrors,
  authController.register
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post(
  '/login',
  rateLimiter.loginLimiter,
  loginValidation,
  handleValidationErrors,
  authController.login
);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.post(
  '/logout',
  authMiddleware.authenticate,
  authController.logout
);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
router.post(
  '/refresh',
  authController.refreshToken
);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Send password reset email
 * @access  Public
 */
router.post(
  '/forgot-password',
  rateLimiter.passwordResetLimiter,
  [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('유효한 이메일 주소를 입력하세요')
  ],
  handleValidationErrors,
  authController.forgotPassword
);

/**
 * @route   POST /api/auth/reset-password/:token
 * @desc    Reset password with token
 * @access  Public
 */
router.post(
  '/reset-password/:token',
  [
    body('password')
      .isLength({ min: 8 })
      .withMessage('비밀번호는 최소 8자 이상이어야 합니다')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .withMessage('비밀번호는 대소문자, 숫자, 특수문자를 포함해야 합니다')
  ],
  handleValidationErrors,
  authController.resetPassword
);

/**
 * @route   POST /api/auth/verify-email/:token
 * @desc    Verify email address
 * @access  Public
 */
router.get(
  '/verify-email/:token',
  authController.verifyEmail
);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user info
 * @access  Private
 */
router.get(
  '/me',
  authMiddleware.authenticate,
  authController.getCurrentUser
);

/**
 * @route   PUT /api/auth/update-profile
 * @desc    Update user profile
 * @access  Private
 */
router.put(
  '/update-profile',
  authMiddleware.authenticate,
  [
    body('fullName')
      .optional()
      .isLength({ min: 2, max: 100 })
      .withMessage('이름을 입력하세요'),
    body('phoneNumber')
      .optional()
      .matches(/^[0-9]{10,15}$/)
      .withMessage('유효한 전화번호를 입력하세요')
  ],
  handleValidationErrors,
  authController.updateProfile
);

/**
 * @route   PUT /api/auth/change-password
 * @desc    Change user password
 * @access  Private
 */
router.put(
  '/change-password',
  authMiddleware.authenticate,
  [
    body('currentPassword')
      .notEmpty()
      .withMessage('현재 비밀번호를 입력하세요'),
    body('newPassword')
      .isLength({ min: 8 })
      .withMessage('비밀번호는 최소 8자 이상이어야 합니다')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .withMessage('비밀번호는 대소문자, 숫자, 특수문자를 포함해야 합니다')
  ],
  handleValidationErrors,
  authController.changePassword
);

/**
 * @route   DELETE /api/auth/delete-account
 * @desc    Delete user account
 * @access  Private
 */
router.delete(
  '/delete-account',
  authMiddleware.authenticate,
  authController.deleteAccount
);

module.exports = router;
