const express = require('express');
const router = express.Router();
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController');
const auth = require('../middleware/auth');

// === 待辦事項路由開始 ===

// 所有路由都需要認證
router.use(auth);

// @route   GET /api/todos
// @desc    獲取所有待辦事項
// @access  Private
router.get('/', getTodos);

// @route   GET /api/todos/:id
// @desc    獲取單個待辦事項
// @access  Private
router.get('/:id', getTodo);

// @route   POST /api/todos
// @desc    創建待辦事項
// @access  Private
router.post('/', createTodo);

// @route   PUT /api/todos/:id
// @desc    更新待辦事項
// @access  Private
router.put('/:id', updateTodo);

// @route   DELETE /api/todos/:id
// @desc    刪除待辦事項
// @access  Private
router.delete('/:id', deleteTodo);

// === 待辦事項路由結束 ===

module.exports = router; 