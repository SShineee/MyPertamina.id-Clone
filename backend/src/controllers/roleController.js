const roleModel = require('../models/roleModel');
const permissionModel = require('../models/permissionModel');
const { findOrNotFound } = require('../utils/findOrNotFound');

async function list(req, res) {
  const roles = await roleModel.list();
  res.json({ data: roles });
}

async function listPermissions(req, res) {
  const permissions = await permissionModel.list();
  res.json({ data: permissions });
}

async function create(req, res) {
  const { name, description, permissionIds } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'name wajib diisi' });
  }
  const id = await roleModel.create({ name, description, permissionIds: permissionIds || [] });
  res.status(201).json({ data: { id } });
}

async function update(req, res) {
  const existing = await findOrNotFound(roleModel, req.params.id, res, 'Role tidak ditemukan');
  if (!existing) return;
  const { name, description, permissionIds } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'name wajib diisi' });
  }
  await roleModel.update(req.params.id, { name, description, permissionIds });
  res.json({ data: { id: Number(req.params.id) } });
}

async function remove(req, res) {
  const existing = await findOrNotFound(roleModel, req.params.id, res, 'Role tidak ditemukan');
  if (!existing) return;
  const usersCount = await roleModel.countUsersWithRole(req.params.id);
  if (usersCount > 0) {
    return res.status(409).json({ message: 'Role masih digunakan oleh pengguna lain' });
  }
  await roleModel.remove(req.params.id);
  res.status(204).send();
}

module.exports = { list, listPermissions, create, update, remove };
