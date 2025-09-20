
const Sweet = require('../models/Sweet');

exports.create = async (req, res, next) => {
  try {
    let { name, category, price, quantity, stock, description } = req.body;

    const finalStock = (stock !== undefined) ? Number(stock) : (quantity !== undefined ? Number(quantity) : undefined);

    const payload = {
      name,
      category,
      price,
      description,
    };

    if (finalStock !== undefined) payload.stock = finalStock;

    const sweet = await Sweet.create(payload);
    res.status(201).json(sweet);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'Sweet name must be unique' });
    next(err);
  }
};
exports.list = async (req, res, next) => {
  try {
    const { page = 1, per_page = 20 } = req.query;
    const skip = (Math.max(1, Number(page)) - 1) * Number(per_page);
    const items = await Sweet.find().skip(skip).limit(Number(per_page));
    const total = await Sweet.countDocuments();
    res.json({ items, total, page: Number(page), per_page: Number(per_page) });
  } catch (err) {
    next(err);
  }
};

exports.search = async (req, res, next) => {
  try {
    const { q, category, min_price, max_price } = req.query;
    const filter = {};
    if (q) filter.name = new RegExp(q, 'i');
    if (category) filter.category = category;
    if (min_price) filter.price = Object.assign(filter.price || {}, { $gte: Number(min_price) });
    if (max_price) filter.price = Object.assign(filter.price || {}, { $lte: Number(max_price) });

    const items = await Sweet.find(filter);
    res.json({ items });
  } catch (err) {
    next(err);
  }
};

exports.show = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sweet = await Sweet.findById(id).lean();
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
    res.json(sweet);
  } catch (err) {
    next(err);
  }
};

exports.purchase = async (req, res, next) => {
  try {
    const { id } = req.params;
    const qty = Number(req.body.quantity);

    if (!qty || Number.isNaN(qty) || qty <= 0) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }

    const sweet = await Sweet.findById(id);
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });

    const stockField = sweet.stock !== undefined ? 'stock' : (sweet.quantity !== undefined ? 'quantity' : null);

    if (!stockField) {
      return res.status(500).json({ message: 'Sweet schema missing stock/quantity field' });
    }

    if (sweet[stockField] < qty) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    sweet[stockField] -= qty;
    await sweet.save();

    return res.status(200).json({
      message: 'Purchase successful',
      remaining_quantity: sweet[stockField],
    });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = { ...req.body };

    if (update.quantity !== undefined && update.stock === undefined) {
      update.stock = update.quantity;
      delete update.quantity;
    }
    const sweet = await Sweet.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
    res.json(sweet);
  } catch (err) {
    next(err);
  }
};


exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sweet = await Sweet.findByIdAndDelete(id);
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
