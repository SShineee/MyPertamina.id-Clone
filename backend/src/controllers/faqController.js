const faqModel = require('../models/faqModel');

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
  const existing = await faqModel.findById(req.params.id);
  if (!existing) {
    return res.status(404).json({ message: 'FAQ tidak ditemukan' });
  }
  const { question, answer, sortOrder, isActive } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ message: 'question dan answer wajib diisi' });
  }
  const updated = await faqModel.update(req.params.id, { question, answer, sortOrder, isActive });
  res.json({ data: updated });
}

async function remove(req, res) {
  const existing = await faqModel.findById(req.params.id);
  if (!existing) {
    return res.status(404).json({ message: 'FAQ tidak ditemukan' });
  }
  await faqModel.remove(req.params.id);
  res.status(204).send();
}

module.exports = { list, create, update, remove };
