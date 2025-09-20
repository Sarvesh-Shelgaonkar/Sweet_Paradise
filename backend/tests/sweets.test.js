process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_jwt_secret_key';
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Sweet = require('../src/models/Sweet');
const app = require('../src/app'); 
const workerId = process.env.JEST_WORKER_ID || '1';
const MONGO_TEST_URI =
  process.env.MONGODB_URI || `mongodb://localhost:27017/sweetshop_test_${workerId}`;

let adminToken;

beforeAll(async () => {
  await mongoose.connect(MONGO_TEST_URI);

  await User.deleteMany({});
  await Sweet.deleteMany({});

  await request(app)
    .post('/api/auth/register')
    .send({ email: `admin@${workerId}.test`, password: 'adminpass', name: 'Admin' })
    .expect(201);

  await User.updateOne({ email: `admin@${workerId}.test` }, { $set: { isAdminRole: true } });

  const loginResp = await request(app)
    .post('/api/auth/login')
    .send({ email: `admin@${workerId}.test`, password: 'adminpass' });

  expect(loginResp.status).toBe(200);
  adminToken = loginResp.body.access_token || loginResp.body.token || loginResp.body.accessToken;
  expect(adminToken).toBeDefined();
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Sweet.deleteMany({});
});

test('admin can create sweet', async () => {
  const resp = await request(app)
    .post('/api/sweets')
    .set('Authorization', 'Bearer ' + adminToken)
    .send({
      name: 'Rasgulla',
      category: 'indian',
      price: 10,
      stock: 5,
      description: 'Sweet cottage cheese balls',
    });

  expect(resp.status).toBe(201);
  expect(resp.body.name).toBe('Rasgulla');
});
