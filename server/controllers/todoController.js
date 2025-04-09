const Todo = require('../models/Todo');

// === 待辦事項控制器開始 ===

// 獲取所有待辦事項
exports.getTodos = async (req, res) => {
  try {
    console.log('📥 [GET /todos] 收到請求');
    
    const todos = await Todo.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
      
    res.json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (err) {
    console.error('[GET /todos] 錯誤:', err);
    res.status(500).json({
      success: false,
      message: '獲取待辦事項失敗',
      error: err.message
    });
  }
};

// 獲取單個待辦事項
exports.getTodo = async (req, res) => {
  try {
    console.log(`📥 [GET /todos/${req.params.id}] 收到請求`);
    
    const todo = await Todo.findOne({ 
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: '未找到該待辦事項'
      });
    }
    
    res.json({
      success: true,
      data: todo
    });
  } catch (err) {
    console.error(`[GET /todos/${req.params.id}] 錯誤:`, err);
    res.status(500).json({
      success: false,
      message: '獲取待辦事項失敗',
      error: err.message
    });
  }
};

// 創建待辦事項
exports.createTodo = async (req, res) => {
  try {
    console.log('📥 [POST /todos] 收到請求');
    
    const { title, description, completed } = req.body;
    
    const todo = await Todo.create({
      title,
      description,
      completed: completed || false,
      userId: req.user.id
    });
    
    res.status(201).json({
      success: true,
      data: todo
    });
  } catch (err) {
    console.error('[POST /todos] 錯誤:', err);
    res.status(500).json({
      success: false,
      message: '創建待辦事項失敗',
      error: err.message
    });
  }
};

// 更新待辦事項
exports.updateTodo = async (req, res) => {
  try {
    console.log(`📥 [PUT /todos/${req.params.id}] 收到請求`);
    
    const { title, description, completed } = req.body;
    
    let todo = await Todo.findOne({
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: '未找到該待辦事項'
      });
    }
    
    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      data: todo
    });
  } catch (err) {
    console.error(`[PUT /todos/${req.params.id}] 錯誤:`, err);
    res.status(500).json({
      success: false,
      message: '更新待辦事項失敗',
      error: err.message
    });
  }
};

// 刪除待辦事項
exports.deleteTodo = async (req, res) => {
  try {
    console.log(`📥 [DELETE /todos/${req.params.id}] 收到請求`);
    
    const todo = await Todo.findOne({
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: '未找到該待辦事項'
      });
    }
    
    await todo.deleteOne();
    
    res.json({
      success: true,
      data: {}
    });
  } catch (err) {
    console.error(`[DELETE /todos/${req.params.id}] 錯誤:`, err);
    res.status(500).json({
      success: false,
      message: '刪除待辦事項失敗',
      error: err.message
    });
  }
};

// === 待辦事項控制器結束 === 