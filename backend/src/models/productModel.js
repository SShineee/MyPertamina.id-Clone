const pool = require('../config/db');

const LIST_FIELDS = `
  id, category, slug, name, brand_color, logo_url, hero_background_url,
  hero_object_url, headline, spec_badge, tagline
`;

async function listPublished({ category, excludeSlug } = {}) {
  const conditions = ['is_published = TRUE'];
  const params = [];
  if (category) {
    conditions.push('category = ?');
    params.push(category);
  }
  if (excludeSlug) {
    conditions.push('slug != ?');
    params.push(excludeSlug);
  }
  const [rows] = await pool.query(
    `SELECT ${LIST_FIELDS} FROM products WHERE ${conditions.join(' AND ')} ORDER BY name`,
    params
  );
  return rows;
}

async function findDetailBySlug(category, slug) {
  const [rows] = await pool.query(
    'SELECT * FROM products WHERE category = ? AND slug = ? AND is_published = TRUE',
    [category, slug]
  );
  const product = rows[0];
  if (!product) return null;

  const [techFeatures] = await pool.query(
    'SELECT title, title_highlight, description FROM product_tech_features WHERE product_id = ? ORDER BY sort_order',
    [product.id]
  );
  const [techBadges] = await pool.query(
    'SELECT icon, label FROM product_tech_badges WHERE product_id = ? ORDER BY sort_order',
    [product.id]
  );
  const [benefits] = await pool.query(
    'SELECT icon, title, description FROM product_benefits WHERE product_id = ? ORDER BY sort_order',
    [product.id]
  );

  return { ...product, techFeatures, techBadges, benefits };
}

module.exports = { listPublished, findDetailBySlug };
