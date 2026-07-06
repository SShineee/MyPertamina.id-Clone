const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const { findOrNotFound } = require('../utils/findOrNotFound');

async function list(req, res) {
  const users = await userModel.list();
  res.json({ data: users });
}

async function create(req, res) {
  const { name, email, password, roleId } = req.body;
  if (!name || !email || !password || !roleId) {
    return res.status(400).json({ message: 'name, email, password, roleId wajib diisi' });
  }
  const existing = await userModel.findByEmail(email);
  if (existing) {
    return res.status(409).json({ message: 'Email sudah terdaftar' });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const created = await userModel.create({ name, email, passwordHash, roleId });
  res.status(201).json({ data: created });
}

async function update(req, res) {
  const existing = await findOrNotFound(userModel, req.params.id, res, 'Pengguna tidak ditemukan');
  if (!existing) return;
  const { name, email, roleId, isActive } = req.body;
  if (!name || !email || !roleId) {
    return res.status(400).json({ message: 'name, email, roleId wajib diisi' });
  }
  const updated = await userModel.update(req.params.id, { name, email, roleId, isActive: isActive ?? true });
  res.json({ data: updated });
}

async function resetPassword(req, res) {
  const existing = await findOrNotFound(userModel, req.params.id, res, 'Pengguna tidak ditemukan');
  if (!existing) return;
  const { password } = req.body;
  if (!password || password.length < 6) {
    return res.status(400).json({ message: 'Password minimal 6 karakter' });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await userModel.updatePassword(req.params.id, passwordHash);
  res.status(204).send();
}

async function remove(req, res) {
  const existing = await findOrNotFound(userModel, req.params.id, res, 'Pengguna tidak ditemukan');
  if (!existing) return;
  if (existing.id === req.user.id) {
    return res.status(400).json({ message: 'Tidak bisa menghapus akun sendiri' });
  }
  await userModel.remove(req.params.id);
  res.status(204).send();
}

module.exports = { list, create, update, resetPassword, remove };
