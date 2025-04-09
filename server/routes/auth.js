const express = require('express');
const router = express.Router();
const { googleLogin, getCurrentUser } = require('../controllers/authController');
const auth = require('../middleware/auth');

// === 認證路由開始 ===

// @route   POST /api/auth/google
// @desc    使用 Google 登入
// @access  Public
router.post('/google', googleLogin);

// @route   GET /api/auth/me
// @desc    獲取當前用戶
// @access  Private
router.get('/me', auth, getCurrentUser);

// === 認證路由結束 ===

module.exports = router; 