const mongoose = require('mongoose');
const Sweet = require('../models/Sweet');
const Transaction = require('../models/Transaction');

exports.purchase = async (req, res, next) => {
  const { id } = req.params;
  const { quantity = 1 } = req.body;
  const qty = Number(quantity);
  if (qty <= 0) return res.status(400).json({ message: 'Quantity must be > 0' });

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const sweet = await Sweet.findById(id).session(session);
    if (!sweet) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Sweet not found' });
    }
    if (sweet.quantity < qty) {
      await session.abortTransaction();
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    sweet.quantity -= qty;
    await sweet.save({ session });
    await Transaction.create([{ sweet: sweet._id, user: req.user.id, type: 'purchase', quantity: qty }], { session });
    await session.commitTransaction();
    res.json({ id: sweet._id, remaining_quantity: sweet.quantity });
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    session.endSession();
  }
};

exports.restock = async (req, res, next) => {
  
  const { id } = req.params;
  const { quantity = 1 } = req.body;
  const qty = Number(quantity);
  if (qty <= 0) return res.status(400).json({ message: 'Quantity must be > 0' });

  try {
    const sweet = await Sweet.findById(id);
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
    sweet.quantity += qty;
    await sweet.save();
    await Transaction.create({ sweet: sweet._id, user: req.user.id, type: 'restock', quantity: qty });
    res.json({ id: sweet._id, new_quantity: sweet.quantity });
  } catch (err) { next(err); }
};
