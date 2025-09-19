const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const User = require('../../models/User');
const Sweet = require('../../models/Sweet');

const MONGO_TEST_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sweetshop_test';

let adminToken;

beforeAll(async () => {
  await mongoose.connect(MONGO_TEST_URI);
  await User.deleteMany({});
  const pw = await User.password('adminpass');
  const admin = await User.create({ email: 'admin@a.com', password: pw, isAdminRole: true });
  const login = await request(app).post('/api/auth/login').send({ email: 'admin@a.com', password: 'adminpass' });
  adminToken = login.body.access_token;
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
    .set('Authorization', `Bearer ${adminToken}`)
    .send({ name: 'Rasgulla', category: 'Mithai', price: 10, quantity: 5 });
  expect(resp.status).toBe(201);
  expect(resp.body.name).toBe('Rasgulla');
});
