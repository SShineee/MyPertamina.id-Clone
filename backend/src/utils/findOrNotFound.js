async function findOrNotFound(model, id, res, message) {
  const existing = await model.findById(id);
  if (!existing) {
    res.status(404).json({ message });
    return null;
  }
  return existing;
}

module.exports = { findOrNotFound };
