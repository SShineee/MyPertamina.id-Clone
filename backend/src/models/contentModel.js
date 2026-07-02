const pool = require('../config/db');

async function list({ type, activeOnly, category, search, excludeSlug } = {}) {
  const conditions = [];
  const params = [];
  if (type) {
    conditions.push('type = ?');
    params.push(type);
  }
  if (category) {
    conditions.push('category = ?');
    params.push(category);
  }
  if (search) {
    conditions.push('(title LIKE ? OR description LIKE ?)');
    params.push(`%${search}%`, `%${search}%`);
  }
  if (excludeSlug) {
    conditions.push('slug != ?');
    params.push(excludeSlug);
  }
  if (activeOnly) {
    conditions.push('is_active = TRUE');
    conditions.push('(start_date IS NULL OR start_date <= CURDATE())');
    conditions.push('(end_date IS NULL OR end_date >= CURDATE())');
  }
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const [rows] = await pool.query(
    `SELECT id, type, category, slug, title, description, image_url, is_active, start_date, end_date, created_at, updated_at
     FROM contents ${where} ORDER BY created_at DESC`,
    params
  );
  return rows;
}

async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM contents WHERE id = ?', [id]);
  return rows[0] || null;
}

async function findBySlug(slug) {
  const [rows] = await pool.query('SELECT * FROM contents WHERE slug = ? AND is_active = TRUE', [slug]);
  return rows[0] || null;
}

async function create({ type, category, slug, title, description, bodyHtml, imageUrl, isActive, startDate, endDate, createdBy }) {
  const [result] = await pool.query(
    `INSERT INTO contents (type, category, slug, title, description, body_html, image_url, is_active, start_date, end_date, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      type,
      category || null,
      slug || null,
      title,
      description || null,
      bodyHtml || null,
      imageUrl || null,
      isActive ?? true,
      startDate || null,
      endDate || null,
      createdBy,
    ]
  );
  return findById(result.insertId);
}

async function update(id, { type, category, slug, title, description, bodyHtml, imageUrl, isActive, startDate, endDate }) {
  await pool.query(
    `UPDATE contents SET type = ?, category = ?, slug = ?, title = ?, description = ?, body_html = ?, image_url = ?,
       is_active = ?, start_date = ?, end_date = ?
     WHERE id = ?`,
    [
      type,
      category || null,
      slug || null,
      title,
      description || null,
      bodyHtml || null,
      imageUrl || null,
      isActive ?? true,
      startDate || null,
      endDate || null,
      id,
    ]
  );
  return findById(id);
}

async function remove(id) {
  await pool.query('DELETE FROM contents WHERE id = ?', [id]);
}

module.exports = { list, findById, findBySlug, create, update, remove };
