const pool = require('../config/db');

async function findByEmail(email) {
  const [rows] = await pool.query(
    `SELECT u.*, r.name AS role_name
     FROM users u JOIN roles r ON r.id = u.role_id
     WHERE u.email = ?`,
    [email]
  );
  return rows[0] || null;
}

async function findById(id) {
  const [rows] = await pool.query(
    `SELECT u.id, u.name, u.email, u.role_id, u.is_active, u.created_at, r.name AS role_name
     FROM users u JOIN roles r ON r.id = u.role_id
     WHERE u.id = ?`,
    [id]
  );
  return rows[0] || null;
}

async function list() {
  const [rows] = await pool.query(
    `SELECT u.id, u.name, u.email, u.role_id, u.is_active, u.created_at, r.name AS role_name
     FROM users u JOIN roles r ON r.id = u.role_id
     ORDER BY u.created_at DESC`
  );
  return rows;
}

async function create({ name, email, passwordHash, roleId }) {
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password_hash, role_id) VALUES (?, ?, ?, ?)',
    [name, email, passwordHash, roleId]
  );
  return findById(result.insertId);
}

async function update(id, { name, email, roleId, isActive }) {
  await pool.query(
    'UPDATE users SET name = ?, email = ?, role_id = ?, is_active = ? WHERE id = ?',
    [name, email, roleId, isActive, id]
  );
  return findById(id);
}

async function updatePassword(id, passwordHash) {
  await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [passwordHash, id]);
}

async function remove(id) {
  await pool.query('DELETE FROM users WHERE id = ?', [id]);
}

async function getPermissions(userId) {
  const [rows] = await pool.query(
    `SELECT p.code FROM permissions p
     JOIN role_permissions rp ON rp.permission_id = p.id
     JOIN users u ON u.role_id = rp.role_id
     WHERE u.id = ?`,
    [userId]
  );
  return rows.map((r) => r.code);
}

module.exports = { findByEmail, findById, list, create, update, updatePassword, remove, getPermissions };
