const contentModel = require('../models/contentModel');

const VALID_TYPES = ['promo', 'banner', 'berita'];

async function list(req, res) {
  const { type, activeOnly, category, search } = req.query;
  const contents = await contentModel.list({ type, activeOnly: activeOnly === 'true', category, search });
  res.json({ data: contents });
}

async function detail(req, res) {
  const content = await contentModel.findBySlug(req.params.slug);
  if (!content) {
    return res.status(404).json({ message: 'Konten tidak ditemukan' });
  }
  res.json({ data: content });
}

async function create(req, res) {
  const { type, category, slug, title, description, bodyHtml, imageUrl, isActive, startDate, endDate } = req.body;
  if (!type || !VALID_TYPES.includes(type) || !title) {
    return res.status(400).json({ message: `type (${VALID_TYPES.join('/')}) dan title wajib diisi` });
  }
  const created = await contentModel.create({
    type,
    category,
    slug,
    title,
    description,
    bodyHtml,
    imageUrl,
    isActive,
    startDate,
    endDate,
    createdBy: req.user.id,
  });
  res.status(201).json({ data: created });
}

async function update(req, res) {
  const existing = await contentModel.findById(req.params.id);
  if (!existing) {
    return res.status(404).json({ message: 'Konten tidak ditemukan' });
  }
  const { type, category, slug, title, description, bodyHtml, imageUrl, isActive, startDate, endDate } = req.body;
  if (!type || !VALID_TYPES.includes(type) || !title) {
    return res.status(400).json({ message: `type (${VALID_TYPES.join('/')}) dan title wajib diisi` });
  }
  const updated = await contentModel.update(req.params.id, {
    type,
    category,
    slug,
    title,
    description,
    bodyHtml,
    imageUrl,
    isActive,
    startDate,
    endDate,
  });
  res.json({ data: updated });
}

async function remove(req, res) {
  const existing = await contentModel.findById(req.params.id);
  if (!existing) {
    return res.status(404).json({ message: 'Konten tidak ditemukan' });
  }
  await contentModel.remove(req.params.id);
  res.status(204).send();
}

module.exports = { list, detail, create, update, remove };
