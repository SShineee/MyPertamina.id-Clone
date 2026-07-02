const productModel = require('../models/productModel');

async function list(req, res) {
  const { category, excludeSlug } = req.query;
  const data = await productModel.listPublished({ category, excludeSlug });
  res.json({ data });
}

async function detail(req, res) {
  const { category, slug } = req.params;
  const product = await productModel.findDetailBySlug(category, slug);
  if (!product) {
    return res.status(404).json({ message: 'Produk tidak ditemukan' });
  }
  res.json({ data: product });
}

module.exports = { list, detail };
