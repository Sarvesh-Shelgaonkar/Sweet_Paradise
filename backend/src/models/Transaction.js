const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  sweet: { type: mongoose.Schema.Types.ObjectId, ref: 'Sweet', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['purchase', 'restock'], required: true },
  quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
