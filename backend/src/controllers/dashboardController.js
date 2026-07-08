const appServiceClient = require('../services/appServiceClient');

// App Service has its own native GET /api/dashboard (user+balance+points+
// vehicles+recent_transactions+vouchers+notifications+unread_notifications
// in one call) — proxy straight to it instead of re-aggregating client-side.
async function dashboard(req, res) {
  const data = await appServiceClient.get('/dashboard', { token: req.appToken });
  res.json({ data });
}

module.exports = { dashboard };
