const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// 加載環境變數
const envPath = path.resolve(__dirname, '..', '.env');
dotenv.config({ path: envPath });
console.log('Current environment:', process.env.NODE_ENV);

// === 應用初始化開始 ===
const app = express();

// 中間件
app.use(express.json());
app.use(cors());

// 連接資料庫
const mongoUri = process.env.MONGODB_URI;
console.log('MongoDB URI:', mongoUri);

if (!mongoUri) {
  console.error('錯誤: 未設置 MONGODB_URI 環境變數');
  process.exit(1);
}

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB 連接成功'))
.catch(err => {
  console.error('❌ MongoDB 連接失敗:', err);
  process.exit(1);
});

// API 路由
app.use('/api/auth', require('./routes/auth'));
app.use('/api/todos', require('./routes/todos'));

// 在生產環境中提供靜態文件
if (process.env.NODE_ENV === 'production') {
  // 提供靜態文件
  app.use(express.static(path.join(__dirname, '../client/build')));

  // 所有未匹配的路由都返回 index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
} else {
  // 開發環境中的路由未找到處理
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: '無效的路由'
    });
  });
}

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
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 伺服器運行在 http://localhost:${PORT}`);
  console.log(`環境: ${process.env.NODE_ENV}`);
});
// === 應用初始化結束 === 