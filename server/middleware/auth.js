const jwt = require('jsonwebtoken');
const User = require('../models/User');

// === 認證中間件開始 ===
const auth = async (req, res, next) => {
  try {
    // 從 header 獲取 token
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: '沒有提供認證令牌，訪問被拒絕'
      });
    }
    
    // 驗證 token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 查找用戶
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: '無效的用戶，訪問被拒絕'
      });
    }
    
    // 將用戶信息添加到請求對象
    req.user = { id: user._id };
    next();
  } catch (err) {
    console.error('認證中間件錯誤:', err);
    res.status(401).json({
      success: false,
      message: '認證失敗，訪問被拒絕',
      error: err.message
    });
  }
};
// === 認證中間件結束 ===

module.exports = auth; 