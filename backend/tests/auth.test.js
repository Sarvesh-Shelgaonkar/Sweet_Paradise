const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const User = require('../../models/User');

const MONGO_TEST_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sweetshop_test';

beforeAll(async () => {
  await mongoose.connect(MONGO_TEST_URI);
});

afterAll(async () => 
{
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => 
{
  await User.deleteMany({});
});

test('register then login', async () => 
{
  const registerResp = await request(app)
    .post('/api/auth/register')
    .send({ email: 'a@b.com', password: 'pass123', fullName: 'Tester' });
  expect(registerResp.status).toBe(201);

  const loginResp = await request(app)
    .post('/api/auth/login')
    .send({ email: 'a@b.com', password: 'pass123' });
  expect(loginResp.status).toBe(200);
  expect(loginResp.body.access_token).toBeTruthy();
});

test('duplicate register fails', async () => {
  await request(app).post('/api/auth/register').send({ email: 'a@b.com', password: 'p' });
  const resp = await request(app).post('/api/auth/register').send({ email: 'a@b.com', password: 'p' });
  expect(resp.status).toBe(409);
});
