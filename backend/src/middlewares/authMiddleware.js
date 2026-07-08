// Auth for the /api/app/* proxy routes — distinct from middlewares/auth.js
// (CMS admin auth). backend/ doesn't hold the App Service's JWT secret, so it
// only checks a Bearer token is present and forwards it; the App Service is
// the one that actually validates it (an invalid/expired token surfaces as
// the 401 that service returns, propagated by appServiceClient).
function requireAppToken(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ message: 'Token tidak ditemukan' });
  }
  req.appToken = token;
  next();
}

module.exports = { requireAppToken };
