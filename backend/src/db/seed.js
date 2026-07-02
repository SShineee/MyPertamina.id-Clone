require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('../config/db');

const PERMISSIONS = [
  ['price.view', 'Melihat harga BBM'],
  ['price.update', 'Mengubah harga BBM'],
  ['content.view', 'Melihat konten'],
  ['content.manage', 'Mengelola konten (promo, banner, berita)'],
  ['user.manage', 'Mengelola pengguna'],
  ['role.manage', 'Mengelola role & permission'],
];

const ROLES = [
  { name: 'Super Admin', permissions: PERMISSIONS.map((p) => p[0]) },
  { name: 'Content Editor', permissions: ['price.view', 'content.view', 'content.manage'] },
  { name: 'Price Manager', permissions: ['price.view', 'price.update'] },
];

async function seed() {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    for (const [code, description] of PERMISSIONS) {
      await conn.query(
        'INSERT INTO permissions (code, description) VALUES (?, ?) ON DUPLICATE KEY UPDATE description = VALUES(description)',
        [code, description]
      );
    }

    for (const role of ROLES) {
      await conn.query(
        'INSERT INTO roles (name) VALUES (?) ON DUPLICATE KEY UPDATE name = VALUES(name)',
        [role.name]
      );
      const [[roleRow]] = await conn.query('SELECT id FROM roles WHERE name = ?', [role.name]);
      await conn.query('DELETE FROM role_permissions WHERE role_id = ?', [roleRow.id]);
      for (const permCode of role.permissions) {
        const [[permRow]] = await conn.query('SELECT id FROM permissions WHERE code = ?', [permCode]);
        await conn.query(
          'INSERT IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)',
          [roleRow.id, permRow.id]
        );
      }
    }

    const [[superAdminRole]] = await conn.query('SELECT id FROM roles WHERE name = ?', ['Super Admin']);
    const passwordHash = await bcrypt.hash('Admin123!', 10);
    await conn.query(
      `INSERT INTO users (name, email, password_hash, role_id)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), role_id = VALUES(role_id)`,
      ['Super Admin', 'admin@mypertamina.local', passwordHash, superAdminRole.id]
    );

    const fuelPrices = [
      ['Pertalite', 10000],
      ['Pertamax', 12100],
      ['Pertamax Turbo', 13550],
      ['Solar', 6800],
      ['Dexlite', 13400],
    ];
    for (const [fuelType, price] of fuelPrices) {
      await conn.query(
        'INSERT INTO fuel_prices (fuel_type, price) VALUES (?, ?) ON DUPLICATE KEY UPDATE fuel_type = fuel_type',
        [fuelType, price]
      );
    }

    const brightGasPrices = [
      ['Aceh', 111000, 230000],
      ['Sumatera Utara', 111000, 230000],
      ['Sumatera Barat', 111000, 230000],
      ['Riau', 111000, 230000],
      ['Kepulauan Riau', 116000, 238000],
      ['Jambi', 112000, 231000],
      ['Sumatera Selatan', 112000, 231000],
      ['Bengkulu', 114000, 235000],
      ['Lampung', 113000, 232000],
      ['Kepulauan Bangka Belitung', null, null],
      ['DKI Jakarta', 102000, 210000],
      ['Jawa Barat', 103000, 212000],
      ['Jawa Tengah', 104000, 213000],
      ['DI Yogyakarta', 105000, 214000],
      ['Jawa Timur', 104000, 213000],
      ['Banten', 103000, 212000],
      ['Bali', 118000, 240000],
      ['Nusa Tenggara Barat', 120000, 245000],
      ['Kalimantan Barat', 119000, 242000],
      ['Kalimantan Timur', 116000, 238000],
      ['Sulawesi Selatan', 118000, 240000],
      ['Papua', null, null],
    ];
    for (const [province, price55, price12] of brightGasPrices) {
      await conn.query(
        'INSERT INTO bright_gas_prices (province, price_5_5kg, price_12kg) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE province = province',
        [province, price55, price12]
      );
    }

    await conn.commit();
    console.log('Seed selesai. Login CMS: admin@mypertamina.local / Admin123!');
  } catch (err) {
    await conn.rollback();
    console.error('Seed gagal:', err);
    process.exitCode = 1;
  } finally {
    conn.release();
    await pool.end();
  }
}

seed();
