const pool = require('../config/db');

async function list() {
  const [rows] = await pool.query('SELECT id, code, description FROM permissions ORDER BY code');
  return rows;
}

module.exports = { list };
