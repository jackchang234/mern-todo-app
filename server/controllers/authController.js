const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// === 認證控制器開始 ===

// 處理 Google 登入
exports.googleLogin = async (req, res) => {
  try {
    console.log('📥 [POST /auth/google-login] 收到請求');
    
    const { tokenId } = req.body;
    
    // 驗證 Google token
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    
    const { sub: googleId, email, name, picture } = ticket.getPayload();
    
    // 檢查用戶是否已存在
    let user = await User.findOne({ googleId });
    
    // 如果用戶不存在，創建新用戶
    if (!user) {
      user = await User.create({
        googleId,
        email,
        name,
        picture
      });
    }
    
    // 生成 JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture
      }
    });
  } catch (err) {
    console.error('[POST /auth/google-login] 錯誤:', err);
    res.status(500).json({
      success: false,
      message: '登入失敗',
      error: err.message
    });
  }
};

// 獲取當前用戶
exports.getCurrentUser = async (req, res) => {
  try {
    console.log('📥 [GET /auth/me] 收到請求');
    
    const user = await User.findById(req.user.id).select('-__v');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: '用戶不存在'
      });
    }
    
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture
      }
    });
  } catch (err) {
    console.error('[GET /auth/me] 錯誤:', err);
    res.status(500).json({
      success: false,
      message: '獲取用戶信息失敗',
      error: err.message
    });
  }
};

// === 認證控制器結束 === 