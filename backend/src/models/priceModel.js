const pool = require('../config/db');

async function list(province = null) {
  let query = 'SELECT id, province, fuel_type, price, unit, updated_at FROM fuel_prices';
  const params = [];

  if (province) {
    query += ' WHERE province = ?';
    params.push(province);
  }

  query += ' ORDER BY province, fuel_type';

  const [rows] = await pool.query(query, params);
  return rows;
}

async function findById(id) {
  const [rows] = await pool.query(
    'SELECT id, province, fuel_type, price, unit, updated_at FROM fuel_prices WHERE id = ?', 
    [id]
  );
  return rows[0] || null;
}

async function create({ province, fuelType, price, unit, updatedBy }) {
  const [result] = await pool.query(
    'INSERT INTO fuel_prices (province, fuel_type, price, unit, updated_by) VALUES (?, ?, ?, ?, ?)',
    [province, fuelType, price, unit || 'liter', updatedBy]
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