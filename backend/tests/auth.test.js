process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_jwt_secret_key';
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

const workerId = process.env.JEST_WORKER_ID || '1';
const MONGO_TEST_URI =
  process.env.MONGODB_URI || `mongodb://localhost:27017/sweetshop_test_${workerId}`;

const setup = require('./setup');
const request = setup.request;
const User = require('../src/models/User');

const app = setup.getApp();

beforeAll(async () => {
  await setup.connect(MONGO_TEST_URI);
});

afterAll(async () => {
  await setup.close();
});

beforeEach(async () => {
  await User.deleteMany({});
});

test('register then login', async () => {
  const registerResp = await request(app)
    .post('/api/auth/register')
    .send({ email: 'a@b.com', password: 'pass123', name: 'Tester' });

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
