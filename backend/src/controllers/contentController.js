const contentModel = require('../models/contentModel');

// Kembalikan ke tipe struktur utama website
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
  let { type, category, slug, title, description, bodyHtml, imageUrl, isActive, startDate, endDate } = req.body;
  
  if (req.file) {
    imageUrl = `/public/uploads/promos/${req.file.filename}`;
  }

  if (!type || !VALID_TYPES.includes(type) || !title) {
    return res.status(400).json({ message: `type (${VALID_TYPES.join('/')}) dan title wajib diisi` });
  }
  
  const created = await contentModel.create({
    type, category, slug, title, description, bodyHtml, imageUrl, isActive, startDate, endDate,
    createdBy: req.user.id,
  });
  res.status(201).json({ data: created });
}

async function update(req, res) {
  const existing = await contentModel.findById(req.params.id);
  if (!existing) {
    return res.status(404).json({ message: 'Konten tidak ditemukan' });
  }
  
  let { type, category, slug, title, description, bodyHtml, imageUrl, isActive, startDate, endDate } = req.body;
  
  if (req.file) {
    imageUrl = `/public/uploads/promos/${req.file.filename}`;
  } else {
    imageUrl = imageUrl || existing.image_url;
  }

  if (type && !VALID_TYPES.includes(type)) {
    return res.status(400).json({ message: `type (${VALID_TYPES.join('/')}) dan title wajib diisi` });
  }
  
  const updated = await contentModel.update(req.params.id, {
    type: type || existing.type,
    category: category !== undefined ? category : existing.category,
    slug: slug || existing.slug,
    title: title || existing.title,
    description: description !== undefined ? description : existing.description,
    bodyHtml: bodyHtml || existing.body_html,
    imageUrl: imageUrl,
    isActive: isActive !== undefined ? isActive : existing.is_active,
    startDate: startDate !== undefined ? startDate : existing.start_date,
    endDate: endDate !== undefined ? endDate : existing.end_date,
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