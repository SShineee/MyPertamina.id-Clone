const pool = require('../config/db');

const PRODUCT_COLUMNS = [
  'pertalite',
  'pertamax',
  'pertamax_turbo',
  'biosolar_subsidi',
  'biosolar_nonsubsidi',
  'pertamax_pertashop',
];

const SELECT_FIELDS = `id, province, is_ftz, ${PRODUCT_COLUMNS.join(', ')}, updated_at`;

async function list() {
  const [rows] = await pool.query(`SELECT ${SELECT_FIELDS} FROM fuel_price_matrix ORDER BY province`);
  return rows;
}

async function findById(id) {
  const [rows] = await pool.query(`SELECT ${SELECT_FIELDS} FROM fuel_price_matrix WHERE id = ?`, [id]);
  return rows[0] || null;
}

async function lastUpdatedAt() {
  const [[row]] = await pool.query('SELECT MAX(updated_at) AS last_updated_at FROM fuel_price_matrix');
  return row.last_updated_at;
}

async function create({ province, isFtz, prices = {}, updatedBy }) {
  const values = PRODUCT_COLUMNS.map((key) => prices[key] ?? null);
  const [result] = await pool.query(
    `INSERT INTO fuel_price_matrix (province, is_ftz, ${PRODUCT_COLUMNS.join(', ')}, updated_by)
     VALUES (?, ?, ${PRODUCT_COLUMNS.map(() => '?').join(', ')}, ?)`,
    [province, !!isFtz, ...values, updatedBy]
  );
  return findById(result.insertId);
}

async function update(id, { isFtz, prices = {}, updatedBy }) {
  const values = PRODUCT_COLUMNS.map((key) => prices[key] ?? null);
  await pool.query(
    `UPDATE fuel_price_matrix
     SET is_ftz = ?, ${PRODUCT_COLUMNS.map((key) => `${key} = ?`).join(', ')}, updated_by = ?
     WHERE id = ?`,
    [!!isFtz, ...values, updatedBy, id]
  );
  return findById(id);
}

async function remove(id) {
  await pool.query('DELETE FROM fuel_price_matrix WHERE id = ?', [id]);
}

module.exports = { PRODUCT_COLUMNS, list, findById, lastUpdatedAt, create, update, remove };
