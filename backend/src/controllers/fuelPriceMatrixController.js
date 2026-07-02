const fuelPriceMatrixModel = require('../models/fuelPriceMatrixModel');

async function list(req, res) {
  const [data, lastUpdatedAt] = await Promise.all([
    fuelPriceMatrixModel.list(),
    fuelPriceMatrixModel.lastUpdatedAt(),
  ]);
  res.json({ data, lastUpdatedAt });
}

async function create(req, res) {
  const { province, isFtz, prices } = req.body;
  if (!province) {
    return res.status(400).json({ message: 'province wajib diisi' });
  }
  const created = await fuelPriceMatrixModel.create({ province, isFtz, prices, updatedBy: req.user.id });
  res.status(201).json({ data: created });
}

async function update(req, res) {
  const existing = await fuelPriceMatrixModel.findById(req.params.id);
  if (!existing) {
    return res.status(404).json({ message: 'Data provinsi tidak ditemukan' });
  }
  const { isFtz, prices } = req.body;
  const updated = await fuelPriceMatrixModel.update(req.params.id, { isFtz, prices, updatedBy: req.user.id });
  res.json({ data: updated });
}

async function remove(req, res) {
  const existing = await fuelPriceMatrixModel.findById(req.params.id);
  if (!existing) {
    return res.status(404).json({ message: 'Data provinsi tidak ditemukan' });
  }
  await fuelPriceMatrixModel.remove(req.params.id);
  res.status(204).send();
}

module.exports = { list, create, update, remove };
