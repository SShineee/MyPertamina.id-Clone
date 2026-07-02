const priceModel = require('../models/priceModel');

async function list(req, res) {
  const prices = await priceModel.list();
  res.json({ data: prices });
}

async function create(req, res) {
  const { fuelType, price, unit } = req.body;
  if (!fuelType || price === undefined) {
    return res.status(400).json({ message: 'fuelType dan price wajib diisi' });
  }
  const created = await priceModel.create({ fuelType, price, unit, updatedBy: req.user.id });
  res.status(201).json({ data: created });
}

async function update(req, res) {
  const existing = await priceModel.findById(req.params.id);
  if (!existing) {
    return res.status(404).json({ message: 'Harga BBM tidak ditemukan' });
  }
  const { price, unit } = req.body;
  if (price === undefined) {
    return res.status(400).json({ message: 'price wajib diisi' });
  }
  const updated = await priceModel.update(req.params.id, { price, unit, updatedBy: req.user.id });
  res.json({ data: updated });
}

async function remove(req, res) {
  const existing = await priceModel.findById(req.params.id);
  if (!existing) {
    return res.status(404).json({ message: 'Harga BBM tidak ditemukan' });
  }
  await priceModel.remove(req.params.id);
  res.status(204).send();
}

module.exports = { list, create, update, remove };
