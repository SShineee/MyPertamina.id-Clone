const pool = require('../config/db');

async function list({ activeOnly } = {}) {
  const where = activeOnly ? 'WHERE is_active = TRUE' : '';
  const [rows] = await pool.query(
    `SELECT id, question, answer, sort_order, is_active FROM faqs ${where} ORDER BY sort_order, id`
  );
  return rows;
}

async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM faqs WHERE id = ?', [id]);
  return rows[0] || null;
}

async function create({ question, answer, sortOrder, isActive }) {
  const [result] = await pool.query(
    'INSERT INTO faqs (question, answer, sort_order, is_active) VALUES (?, ?, ?, ?)',
    [question, answer, sortOrder ?? 0, isActive ?? true]
  );
  return findById(result.insertId);
}

async function update(id, { question, answer, sortOrder, isActive }) {
  await pool.query('UPDATE faqs SET question = ?, answer = ?, sort_order = ?, is_active = ? WHERE id = ?', [
    question,
    answer,
    sortOrder ?? 0,
    isActive ?? true,
    id,
  ]);
  return findById(id);
}

async function remove(id) {
  await pool.query('DELETE FROM faqs WHERE id = ?', [id]);
}

module.exports = { list, findById, create, update, remove };
