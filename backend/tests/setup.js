// tests/setup.js
const mongoose = require('mongoose');
const app = require('../src/app'); 
const request = require('supertest');

module.exports = {
  getApp: () => app,
  request,
  async connect(uri) {
    if (!uri) throw new Error('connect(uri) requires a MongoDB URI');
    await mongoose.connect(uri);
  },
  async close() {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  },
};
