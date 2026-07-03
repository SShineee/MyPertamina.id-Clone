const pool = require('../config/db');

const SELECT_FIELDS = 'id, code, name, address, city, province, type, has_spklu, has_spbklu, updated_at';

function buildWhere({ channel, search, type, facility }) {
  const conditions = ['channel = ?'];
  const params = [channel];

  if (search) {
    conditions.push('(city LIKE ? OR province LIKE ? OR name LIKE ? OR code LIKE ?)');
    const like = `%${search}%`;
    params.push(like, like, like, like);
  }
  if (type) {
    conditions.push('type = ?');
    params.push(type);
  }
  if (facility === 'spklu') {
    conditions.push('has_spklu = 1');
  } else if (facility === 'spbklu') {
    conditions.push('has_spbklu = 1');
  }

  return { where: conditions.join(' AND '), params };
}

async function list({ channel, search, type, facility, page, pageSize }) {
  const { where, params } = buildWhere({ channel, search, type, facility });
  const offset = (page - 1) * pageSize;
  const [rows] = await pool.query(
    `SELECT ${SELECT_FIELDS} FROM location_directory WHERE ${where} ORDER BY province, city, id LIMIT ? OFFSET ?`,
    [...params, pageSize, offset]
  );
  return rows;
}

async function count({ channel, search, type, facility }) {
  const { where, params } = buildWhere({ channel, search, type, facility });
  const [[row]] = await pool.query(`SELECT COUNT(*) AS total FROM location_directory WHERE ${where}`, params);
  return row.total;
}

async function lastUpdatedAt(channel) {
  const [[row]] = await pool.query(
    'SELECT MAX(updated_at) AS last_updated_at FROM location_directory WHERE channel = ?',
    [channel]
  );
  return row.last_updated_at;
}

async function summary(channel) {
  if (channel === 'ges') {
    const [[row]] = await pool.query(
      `SELECT SUM(has_spklu = 1) AS spklu, SUM(has_spbklu = 1) AS spbklu
       FROM location_directory WHERE channel = ?`,
      [channel]
    );
    return { spklu: Number(row.spklu) || 0, spbklu: Number(row.spbklu) || 0 };
  }
  if (channel === 'lpg') {
    const [[row]] = await pool.query(
      `SELECT SUM(type = 'Outlet') AS outlet, SUM(type = 'Agen') AS agen
       FROM location_directory WHERE channel = ?`,
      [channel]
    );
    return { outlet: Number(row.outlet) || 0, agen: Number(row.agen) || 0 };
  }
  return null;
}

module.exports = { list, count, lastUpdatedAt, summary };
