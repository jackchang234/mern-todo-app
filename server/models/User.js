const mongoose = require('mongoose');

// === 用戶模型開始 ===
const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    picture: {
      type: String
    }
  },
  { timestamps: true }
);
// === 用戶模型結束 ===

module.exports = mongoose.model('User', userSchema); 