const brightGasPriceModel = require('../models/brightGasPriceModel');
const { findOrNotFound } = require('../utils/findOrNotFound');

async function list(req, res) {
  const [data, lastUpdatedAt] = await Promise.all([
    brightGasPriceModel.list(),
    brightGasPriceModel.lastUpdatedAt(),
  ]);
  res.json({ data, lastUpdatedAt });
}

async function create(req, res) {
  const { province, price5_5kg, price12kg } = req.body;
  if (!province) {
    return res.status(400).json({ message: 'province wajib diisi' });
  }
  const created = await brightGasPriceModel.create({ province, price5_5kg, price12kg, updatedBy: req.user.id });
  res.status(201).json({ data: created });
}

async function update(req, res) {
  const existing = await findOrNotFound(brightGasPriceModel, req.params.id, res, 'Data provinsi tidak ditemukan');
  if (!existing) return;
  const { price5_5kg, price12kg } = req.body;
  const updated = await brightGasPriceModel.update(req.params.id, { price5_5kg, price12kg, updatedBy: req.user.id });
  res.json({ data: updated });
}

async function remove(req, res) {
  const existing = await findOrNotFound(brightGasPriceModel, req.params.id, res, 'Data provinsi tidak ditemukan');
  if (!existing) return;
  await brightGasPriceModel.remove(req.params.id);
  res.status(204).send();
}

module.exports = { list, create, update, remove };
