const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const auth = require('../middleware/auth');

// 模擬依賴
jest.mock('jsonwebtoken');
jest.mock('../models/User');

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      header: jest.fn()
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  test('沒有提供token時應返回401錯誤', async () => {
    // 模擬未提供token
    req.header.mockReturnValue(undefined);

    await auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: '沒有提供認證令牌，訪問被拒絕'
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('token有效且用戶存在時應調用next', async () => {
    // 模擬有效的token
    const token = 'valid.jwt.token';
    req.header.mockReturnValue(`Bearer ${token}`);

    // 模擬jwt驗證
    const userId = 'valid-user-id';
    jwt.verify.mockReturnValue({ id: userId });

    // 模擬用戶查找
    User.findById.mockResolvedValue({
      _id: userId,
      email: 'test@example.com'
    });

    await auth(req, res, next);

    // 驗證結果
    expect(jwt.verify).toHaveBeenCalledWith(token, process.env.JWT_SECRET);
    expect(User.findById).toHaveBeenCalledWith(userId);
    expect(req.user).toEqual({ id: userId });
    expect(next).toHaveBeenCalled();
  });

  test('token有效但用戶不存在時應返回401錯誤', async () => {
    // 模擬有效的token
    const token = 'valid.jwt.token';
    req.header.mockReturnValue(`Bearer ${token}`);

    // 模擬jwt驗證
    const userId = 'nonexistent-user-id';
    jwt.verify.mockReturnValue({ id: userId });

    // 模擬用戶不存在
    User.findById.mockResolvedValue(null);

    await auth(req, res, next);

    // 驗證結果
    expect(jwt.verify).toHaveBeenCalledWith(token, process.env.JWT_SECRET);
    expect(User.findById).toHaveBeenCalledWith(userId);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: '無效的用戶，訪問被拒絕'
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('token無效時應返回401錯誤', async () => {
    // 模擬無效的token
    const token = 'invalid.jwt.token';
    req.header.mockReturnValue(`Bearer ${token}`);

    // 模擬jwt驗證失敗
    jwt.verify.mockImplementation(() => {
      throw new Error('無效的token');
    });

    await auth(req, res, next);

    // 驗證結果
    expect(jwt.verify).toHaveBeenCalledWith(token, process.env.JWT_SECRET);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: '認證失敗，訪問被拒絕',
      error: '無效的token'
    });
    expect(next).not.toHaveBeenCalled();
  });
}); 