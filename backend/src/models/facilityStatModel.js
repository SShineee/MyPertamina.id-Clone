const pool = require('../config/db');

async function list() {
  const [rows] = await pool.query('SELECT stat_key, label, value FROM facility_stats ORDER BY id');
  return rows;
}

module.exports = { list };
