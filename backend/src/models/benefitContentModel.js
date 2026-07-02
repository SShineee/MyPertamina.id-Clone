const pool = require('../config/db');

const SCALAR_FIELDS = [
  'hero_video_id',
  'mascot_video_id',
  'mascot_jiffy_image',
  'mascot_campaign_image',
  'loyalty_image',
  'guide_image',
  'guide_pdf_url',
  'final_illustration',
  'google_play_url',
  'app_store_url',
];

const JSON_FIELDS = ['solution_cards', 'feature_slides', 'payment_methods', 'social_links', 'checklist_features'];

async function get() {
  const [rows] = await pool.query('SELECT * FROM benefit_page_content WHERE id = 1');
  return rows[0] || null;
}

async function update(fields, updatedBy) {
  const columns = [];
  const values = [];

  for (const key of SCALAR_FIELDS) {
    if (fields[key] !== undefined) {
      columns.push(`${key} = ?`);
      values.push(fields[key]);
    }
  }
  for (const key of JSON_FIELDS) {
    if (fields[key] !== undefined) {
      columns.push(`${key} = ?`);
      values.push(JSON.stringify(fields[key]));
    }
  }

  if (!columns.length) {
    return get();
  }

  columns.push('updated_by = ?');
  values.push(updatedBy, 1);

  await pool.query(`UPDATE benefit_page_content SET ${columns.join(', ')} WHERE id = ?`, values);
  return get();
}

module.exports = { get, update };
