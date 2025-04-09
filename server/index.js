require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// === 應用初始化開始 ===
const app = express();

// 中間件
app.use(express.json());
app.use(cors());

// 連接資料庫
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB 連接成功'))
  .catch(err => console.error('❌ MongoDB 連接失敗:', err));

// 路由
app.use('/api/auth', require('./routes/auth'));
app.use('/api/todos', require('./routes/todos'));

// 路由未找到處理
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: '無效的路由'
  });
});

// 錯誤處理
app.use((err, req, res, next) => {
  console.error('伺服器錯誤:', err);
  res.status(500).json({
    success: false,
    message: '伺服器錯誤',
    error: err.message
  });
});

// 啟動伺服器
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 伺服器運行在 http://localhost:${PORT}`);
  console.log(`環境: ${process.env.NODE_ENV}`);
});
// === 應用初始化結束 === 