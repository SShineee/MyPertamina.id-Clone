const pool = require('../config/db');

async function list() {
  const [rows] = await pool.query(
    'SELECT id, province, price_5_5kg, price_12kg, updated_at FROM bright_gas_prices ORDER BY province'
  );
  return rows;
}

async function findById(id) {
  const [rows] = await pool.query(
    'SELECT id, province, price_5_5kg, price_12kg, updated_at FROM bright_gas_prices WHERE id = ?',
    [id]
  );
  return rows[0] || null;
}

async function lastUpdatedAt() {
  const [[row]] = await pool.query('SELECT MAX(updated_at) AS last_updated_at FROM bright_gas_prices');
  return row.last_updated_at;
}

async function create({ province, price5_5kg, price12kg, updatedBy }) {
  const [result] = await pool.query(
    'INSERT INTO bright_gas_prices (province, price_5_5kg, price_12kg, updated_by) VALUES (?, ?, ?, ?)',
    [province, price5_5kg ?? null, price12kg ?? null, updatedBy]
  );
  return findById(result.insertId);
}

async function update(id, { price5_5kg, price12kg, updatedBy }) {
  await pool.query(
    'UPDATE bright_gas_prices SET price_5_5kg = ?, price_12kg = ?, updated_by = ? WHERE id = ?',
    [price5_5kg ?? null, price12kg ?? null, updatedBy, id]
  );
  return findById(id);
}

async function remove(id) {
  await pool.query('DELETE FROM bright_gas_prices WHERE id = ?', [id]);
}

module.exports = { list, findById, lastUpdatedAt, create, update, remove };
