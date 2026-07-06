const faqModel = require('../models/faqModel');
const { findOrNotFound } = require('../utils/findOrNotFound');

async function list(req, res) {
  const { activeOnly } = req.query;
  const data = await faqModel.list({ activeOnly: activeOnly === 'true' });
  res.json({ data });
}

async function create(req, res) {
  const { question, answer, sortOrder, isActive } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ message: 'question dan answer wajib diisi' });
  }
  const created = await faqModel.create({ question, answer, sortOrder, isActive });
  res.status(201).json({ data: created });
}

async function update(req, res) {
  const existing = await findOrNotFound(faqModel, req.params.id, res, 'FAQ tidak ditemukan');
  if (!existing) return;
  const { question, answer, sortOrder, isActive } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ message: 'question dan answer wajib diisi' });
  }
  const updated = await faqModel.update(req.params.id, { question, answer, sortOrder, isActive });
  res.json({ data: updated });
}

async function remove(req, res) {
  const existing = await findOrNotFound(faqModel, req.params.id, res, 'FAQ tidak ditemukan');
  if (!existing) return;
  await faqModel.remove(req.params.id);
  res.status(204).send();
}

module.exports = { list, create, update, remove };
