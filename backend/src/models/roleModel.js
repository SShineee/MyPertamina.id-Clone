const pool = require('../config/db');

async function list() {
  const [roles] = await pool.query('SELECT id, name, description, created_at FROM roles ORDER BY id');
  const [rows] = await pool.query(
    `SELECT rp.role_id, p.code, p.description FROM role_permissions rp
     JOIN permissions p ON p.id = rp.permission_id`
  );
  return roles.map((role) => ({
    ...role,
    permissions: rows.filter((r) => r.role_id === role.id).map((r) => r.code),
  }));
}

async function findById(id) {
  const [rows] = await pool.query('SELECT id, name, description, created_at FROM roles WHERE id = ?', [id]);
  return rows[0] || null;
}

async function create({ name, description, permissionIds }) {
  const [result] = await pool.query('INSERT INTO roles (name, description) VALUES (?, ?)', [
    name,
    description || null,
  ]);
  const roleId = result.insertId;
  await setPermissions(roleId, permissionIds);
  return roleId;
}

async function update(id, { name, description, permissionIds }) {
  await pool.query('UPDATE roles SET name = ?, description = ? WHERE id = ?', [name, description || null, id]);
  if (permissionIds) {
    await setPermissions(id, permissionIds);
  }
}

async function setPermissions(roleId, permissionIds = []) {
  await pool.query('DELETE FROM role_permissions WHERE role_id = ?', [roleId]);
  if (permissionIds.length === 0) return;
  const values = permissionIds.map((pid) => [roleId, pid]);
  await pool.query('INSERT INTO role_permissions (role_id, permission_id) VALUES ?', [values]);
}

async function remove(id) {
  await pool.query('DELETE FROM roles WHERE id = ?', [id]);
}

async function countUsersWithRole(id) {
  const [[row]] = await pool.query('SELECT COUNT(*) AS count FROM users WHERE role_id = ?', [id]);
  return row.count;
}

module.exports = { list, findById, create, update, remove, countUsersWithRole };
