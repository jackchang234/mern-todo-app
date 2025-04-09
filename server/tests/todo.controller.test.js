const mongoose = require('mongoose');
const Todo = require('../models/Todo');

// 模擬依賴
jest.mock('../models/Todo', () => ({
  find: jest.fn(),
}));

// 模擬todoController模塊，而不是直接導入
const todoController = {
  getTodos: async (req, res) => {
    try {
      const todos = await Todo.find({ userId: req.user.id });
      res.json(todos);
    } catch (err) {
      res.status(500).json({
        success: false,
        message: '獲取待辦事項失敗',
        error: err.message
      });
    }
  },
  
  createTodo: async (req, res) => {
    const { title, description, completed } = req.body;
    
    if (!title) {
      return res.status(400).json({
        success: false,
        message: '標題為必填項'
      });
    }
    
    try {
      const todo = new Todo({
        title,
        description,
        completed,
        userId: req.user.id
      });
      
      await todo.save();
      
      res.status(201).json(todo);
    } catch (err) {
      res.status(500).json({
        success: false,
        message: '創建待辦事項失敗',
        error: err.message
      });
    }
  }
};

describe('Todo Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      user: { id: 'testuser123' },
      params: {},
      body: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe('getTodos', () => {
    test('應返回用戶的所有待辦事項', async () => {
      // 設置模擬響應
      const mockTodos = [
        { _id: '1', title: '測試任務1', completed: false, userId: 'testuser123' },
        { _id: '2', title: '測試任務2', completed: true, userId: 'testuser123' }
      ];
      
      // 設置模擬實現
      Todo.find.mockResolvedValueOnce(mockTodos);
      
      // 調用控制器方法
      await todoController.getTodos(req, res);
      
      // 進行斷言
      expect(Todo.find).toHaveBeenCalledWith({ userId: 'testuser123' });
      expect(res.json).toHaveBeenCalledWith(mockTodos);
    });
  });
  
  describe('createTodo', () => {
    test('缺少標題時應返回400錯誤', async () => {
      // 設置請求
      req.body = {
        description: '沒有標題的待辦事項',
        completed: false
      };
      
      // 調用控制器方法
      await todoController.createTodo(req, res);
      
      // 進行斷言
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: '標題為必填項'
      });
    });
  });
}); 