const facilityStatModel = require('../models/facilityStatModel');
const ucollectLocationModel = require('../models/ucollectLocationModel');

async function listFacilityStats(req, res) {
  const data = await facilityStatModel.list();
  res.json({ data });
}

async function listUcollectLocations(req, res) {
  const { search } = req.query;
  const data = await ucollectLocationModel.list({ search });
  res.json({ data });
}

module.exports = { listFacilityStats, listUcollectLocations };
