const benefitContentModel = require('../models/benefitContentModel');

async function get(req, res) {
  const content = await benefitContentModel.get();
  res.json({ data: content });
}

async function update(req, res) {
  const updated = await benefitContentModel.update(req.body, req.user.id);
  res.json({ data: updated });
}

module.exports = { get, update };
