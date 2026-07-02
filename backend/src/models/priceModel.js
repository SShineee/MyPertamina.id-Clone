const pool = require('../config/db');

async function list() {
  const [rows] = await pool.query('SELECT id, fuel_type, price, unit, updated_at FROM fuel_prices ORDER BY fuel_type');
  return rows;
}

async function findById(id) {
  const [rows] = await pool.query('SELECT id, fuel_type, price, unit, updated_at FROM fuel_prices WHERE id = ?', [id]);
  return rows[0] || null;
}

async function create({ fuelType, price, unit, updatedBy }) {
  const [result] = await pool.query(
    'INSERT INTO fuel_prices (fuel_type, price, unit, updated_by) VALUES (?, ?, ?, ?)',
    [fuelType, price, unit || 'liter', updatedBy]
  );
  return findById(result.insertId);
}

async function update(id, { price, unit, updatedBy }) {
  await pool.query('UPDATE fuel_prices SET price = ?, unit = ?, updated_by = ? WHERE id = ?', [
    price,
    unit || 'liter',
    updatedBy,
    id,
  ]);
  return findById(id);
}

async function remove(id) {
  await pool.query('DELETE FROM fuel_prices WHERE id = ?', [id]);
}

module.exports = { list, findById, create, update, remove };
