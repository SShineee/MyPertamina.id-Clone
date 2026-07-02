const { verifyToken } = require('../utils/jwt');
const userModel = require('../models/userModel');

async function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ message: 'Token tidak ditemukan' });
  }
  try {
    const payload = verifyToken(token);
    const user = await userModel.findById(payload.sub);
    if (!user || !user.is_active) {
      return res.status(401).json({ message: 'Akun tidak aktif atau tidak ditemukan' });
    }
    req.user = user;
    req.permissions = await userModel.getPermissions(user.id);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token tidak valid atau kedaluwarsa' });
  }
}

function requirePermission(...codes) {
  return (req, res, next) => {
    const hasPermission = codes.some((code) => req.permissions?.includes(code));
    if (!hasPermission) {
      return res.status(403).json({ message: 'Anda tidak memiliki akses untuk aksi ini' });
    }
    next();
  };
}

module.exports = { requireAuth, requirePermission };
