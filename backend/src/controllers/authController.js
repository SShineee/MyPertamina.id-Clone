const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const { signToken } = require('../utils/jwt');

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email dan password wajib diisi' });
  }

  const user = await userModel.findByEmail(email);
  if (!user || !user.is_active) {
    return res.status(401).json({ message: 'Email atau password salah' });
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    return res.status(401).json({ message: 'Email atau password salah' });
  }

  const permissions = await userModel.getPermissions(user.id);
  const token = signToken({ sub: user.id });

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role_name,
      permissions,
    },
  });
}

async function me(req, res) {
  res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role_name,
      permissions: req.permissions,
    },
  });
}

module.exports = { login, me };
