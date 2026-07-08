const appServiceClient = require('../services/appServiceClient');

// The app service only documents phone+password login (no self-registration
// endpoint yet) — see pertamina-apps/README (1).md §7.
async function login(req, res) {
  const { phone, password } = req.body;
  const data = await appServiceClient.post('/auth/login', { body: { phone, password } });
  res.json({ token: data.token, user: data.user });
}

module.exports = { login };
