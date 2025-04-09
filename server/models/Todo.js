const mongoose = require('mongoose');

// === 待辦事項模型開始 ===
const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, '標題為必填項']
    },
    description: {
      type: String,
      default: ''
    },
    completed: {
      type: Boolean,
      default: false
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);
// === 待辦事項模型結束 ===

module.exports = mongoose.model('Todo', todoSchema); 