process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_jwt_secret_key';
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/User');

const workerId = process.env.JEST_WORKER_ID || '1';
const MONGO_TEST_URI =
  process.env.MONGO_URI || `mongodb://localhost:27017/sweetshop_test_${workerId}`;

let adminToken, userToken, sweetId;

beforeAll(async () => {
  await mongoose.connect(MONGO_TEST_URI);

  await User.deleteMany({});

  await request(app)
    .post('/api/auth/register')
    .send({ email: `admin@${workerId}.test`, password: 'adminpass', name: 'Admin' })
    .expect(201);

  await User.updateOne(
    { email: `admin@${workerId}.test` },
    { $set: { isAdminRole: true } }
  );

  const adminLogin = await request(app)
    .post('/api/auth/login')
    .send({ email: `admin@${workerId}.test`, password: 'adminpass' });

  expect(adminLogin.status).toBe(200);
  adminToken = adminLogin.body.access_token || adminLogin.body.token || adminLogin.body.accessToken;
  expect(adminToken).toBeDefined();

  await request(app)
    .post('/api/auth/register')
    .send({ email: `user@${workerId}.test`, password: 'userpass', name: 'User' })
    .expect(201);

  const userLogin = await request(app)
    .post('/api/auth/login')
    .send({ email: `user@${workerId}.test`, password: 'userpass' });

  expect(userLogin.status).toBe(200);
  userToken = userLogin.body.access_token || userLogin.body.token || userLogin.body.accessToken;
  expect(userToken).toBeDefined();

  const createSweetResp = await request(app)
    .post('/api/sweets')
    .set('Authorization', 'Bearer ' + adminToken)
    .send({
      name: 'Ladoo',
      category: 'indian',            
      price: 20,
      stock: 2,                    
      description: 'Traditional sweet',
    });

  console.log('createSweetResp.status:', createSweetResp.status);

  console.log('createSweetResp.body:', createSweetResp.body);

  expect([200, 201]).toContain(createSweetResp.status);

  sweetId =
    createSweetResp.body._id ||
    createSweetResp.body.id ||
    (createSweetResp.body.data && createSweetResp.body.data._id);

  expect(sweetId).toBeDefined();
  const getResp = await request(app).get(`/api/sweets/${sweetId}`);
  console.log('GET /api/sweets/:id status:', getResp.status, 'body:', getResp.body);
  expect(getResp.status).toBe(200);
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

test('purchase decrements quantity', async () => {
  const resp = await request(app)
    .post(`/api/sweets/${sweetId}/purchase`)
    .set('Authorization', 'Bearer ' + userToken)
    .send({ quantity: 1 });

  if (resp.status === 404) {
    console.error('Purchase returned 404. Response body:', resp.body);
  }
  expect(resp.status).toBe(200);
  expect(resp.body.remaining_quantity).toBe(1);
});

test('purchase insufficient stock returns 400', async () => {
  const resp = await request(app)
    .post(`/api/sweets/${sweetId}/purchase`)
    .set('Authorization', 'Bearer ' + userToken)
    .send({ quantity: 100 });

  if (resp.status === 404) {
    console.error('Purchase (insufficient stock) returned 404. Response body:', resp.body);
  }
  expect(resp.status).toBe(400);
  expect(resp.body.message).toBe('Insufficient stock');
});
