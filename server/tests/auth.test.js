const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../index');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Auth Endpoints', () => {
  describe('GET /api/auth/me', () => {
    it('should return 401 if no token provided', async () => {
      const res = await request(app).get('/api/auth/me');
      expect(res.status).toBe(401);
    });
  });

  describe('POST /api/auth/google', () => {
    it('should return 400 if no token provided', async () => {
      const res = await request(app).post('/api/auth/google');
      expect(res.status).toBe(400);
    });
  });
});

// 簡單測試
describe('Basic Tests', () => {
  it('should run a simple test', () => {
    expect(true).toBe(true);
  });
}); 