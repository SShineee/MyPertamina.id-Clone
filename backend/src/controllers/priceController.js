const priceModel = require('../models/priceModel');
const { findOrNotFound } = require('../utils/findOrNotFound');

async function list(req, res) {
  const { province } = req.query;
  const prices = await priceModel.list(province);
  res.json({ data: prices });
}

async function create(req, res) {
  const { province, fuelType, price, unit } = req.body;
  
  if (!province || !fuelType || price === undefined) {
    return res.status(400).json({ message: 'province, fuelType, dan price wajib diisi' });
  }
  
  const created = await priceModel.create({ province, fuelType, price, unit, updatedBy: req.user.id });
  res.status(201).json({ data: created });
}

async function update(req, res) {
  const existing = await findOrNotFound(priceModel, req.params.id, res, 'Harga BBM tidak ditemukan');
  if (!existing) return;
  const { price, unit } = req.body;
  if (price === undefined) {
    return res.status(400).json({ message: 'price wajib diisi' });
  }
  
  const updated = await priceModel.update(req.params.id, { price, unit, updatedBy: req.user.id });
  res.json({ data: updated });
}

async function remove(req, res) {
  const existing = await findOrNotFound(priceModel, req.params.id, res, 'Harga BBM tidak ditemukan');
  if (!existing) return;
  await priceModel.remove(req.params.id);
  res.status(204).send();
}

module.exports = { list, create, update, remove };