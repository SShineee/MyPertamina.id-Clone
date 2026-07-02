const pool = require('../config/db');

async function list({ search } = {}) {
  const conditions = [];
  const params = [];
  if (search) {
    conditions.push('(name LIKE ? OR address LIKE ? OR region LIKE ?)');
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const [rows] = await pool.query(
    `SELECT id, name, address, region FROM ucollect_locations ${where} ORDER BY region, name`,
    params
  );
  return rows;
}

module.exports = { list };
