const locationModel = require('../models/locationModel');

async function list(req, res) {
  const { channel } = req.params;
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const pageSize = Math.min(100, Math.max(1, parseInt(req.query.pageSize, 10) || 10));
  const search = (req.query.search || '').trim();
  const type = req.query.type || undefined;
  const facility = req.query.facility || undefined;

  const [data, total, lastUpdatedAt, summary] = await Promise.all([
    locationModel.list({ channel, search, type, facility, page, pageSize }),
    locationModel.count({ channel, search, type, facility }),
    locationModel.lastUpdatedAt(channel),
    locationModel.summary(channel),
  ]);

  res.json({
    data,
    pagination: { page, pageSize, total },
    lastUpdatedAt,
    summary,
  });
}

module.exports = { list };
