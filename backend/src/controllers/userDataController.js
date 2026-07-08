const appServiceClient = require('../services/appServiceClient');

async function me(req, res) {
  const data = await appServiceClient.get('/users/me', { token: req.appToken });
  res.json({ data: data.user });
}

async function balance(req, res) {
  const data = await appServiceClient.get('/balance', { token: req.appToken });
  res.json({ data: data.balance });
}

async function points(req, res) {
  const data = await appServiceClient.get('/points', { token: req.appToken });
  res.json({ data: data.points });
}

async function listVehicles(req, res) {
  const data = await appServiceClient.get('/vehicles', { token: req.appToken });
  res.json({ data: data.vehicles });
}

async function listTransactions(req, res) {
  const data = await appServiceClient.get('/transactions', { token: req.appToken });
  res.json({ data: data.transactions });
}

// TODO upstream (see pertamina-apps/README (1).md §24) — wired now so this
// starts working the moment the app service ships it, nothing to change here.
async function vouchers(req, res) {
  const data = await appServiceClient.get('/vouchers', { token: req.appToken });
  res.json({ data: data.vouchers });
}

async function notifications(req, res) {
  const data = await appServiceClient.get('/notifications', { token: req.appToken });
  res.json({ data: data.notifications });
}

module.exports = { me, balance, points, listVehicles, listTransactions, vouchers, notifications };
