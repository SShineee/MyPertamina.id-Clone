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

    const fuelPriceMatrix = [
      ['Prov. DKI Jakarta', false, 10000, 12100, 13550, 6800, 7500, null],
      ['Prov. Jawa Barat', false, 10000, 12100, 13550, 6800, 7500, 12600],
      ['Prov. Jawa Tengah', false, 10000, 12200, 13650, 6800, null, 12700],
      ['Prov. Jawa Timur', false, 10000, 12200, 13650, 6800, 7550, 12700],
      ['Prov. DI Yogyakarta', false, 10000, 12200, null, 6800, null, 12700],
      ['Prov. Banten', false, 10000, 12100, 13550, 6800, 7500, null],
      ['Prov. Bali', false, 10300, 12400, 13850, 6800, 7700, null],
      ['Prov. Sumatera Utara', false, 10300, 12500, 13950, 6800, 7750, 13000],
      ['Prov. Sumatera Barat', false, 10300, 12500, null, 6800, null, 13000],
      ['Prov. Riau', false, 10300, 12500, 13950, 6800, 7750, null],
      ['Prov. Kepulauan Riau', false, 10450, 12650, 14100, 6800, 7900, null],
      ['Prov. Sumatera Selatan', false, 10300, 12500, 13950, 6800, null, 13000],
      ['Prov. Kalimantan Timur', false, 10450, 12650, 14100, 6800, 7900, 13150],
      ['Prov. Sulawesi Selatan', false, 10450, 12650, null, 6800, null, 13150],
      ['Prov. Papua', false, 10600, 12800, null, 6800, null, null],
      ['FTZ Batam, Bintan, dan Karimun', true, null, 11800, 13250, null, 7200, null],
    ];
    for (const row of fuelPriceMatrix) {
      const [province, isFtz, ...prices] = row;
      await conn.query(
        `INSERT INTO fuel_price_matrix
           (province, is_ftz, pertalite, pertamax, pertamax_turbo, biosolar_subsidi, biosolar_nonsubsidi, pertamax_pertashop)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE province = province`,
        [province, isFtz, ...prices]
      );
    }

    const benefitContent = {
      hero_video_id: 'dQw4w9WgXcQ',
      mascot_video_id: 'dQw4w9WgXcQ',
      mascot_jiffy_image: '/images/benefit/jiffy-mascot.png',
      mascot_campaign_image: '/images/benefit/energi-untuk-negeri.png',
      loyalty_image: '/images/benefit/grading-member.png',
      guide_image: '/images/benefit/guide-book.png',
      guide_pdf_url: '/documents/panduan-mypertamina.pdf',
      final_illustration: '/images/benefit/app-illustration.png',
      google_play_url: 'https://play.google.com/store/apps/details?id=com.telkomsel.mypertamina',
      app_store_url: 'https://apps.apple.com/id/app/mypertamina/id1522190115',
      solution_cards: JSON.stringify([
        { title: 'Terintegrasi', description: 'Satu aplikasi untuk seluruh kebutuhan transaksi energi Anda.', icon: '\u{1F517}' },
        { title: 'Pembelian Mudah', description: 'Transaksi cepat tanpa antre, kapan saja dan di mana saja.', icon: '\u{1F4B3}' },
        { title: 'Beragam Fitur', description: 'Dari subsidi tepat hingga tukar poin, semua dalam genggaman.', icon: '✨' },
      ]),
      feature_slides: JSON.stringify([
        { title: 'Subsidi Tepat', description: 'Pastikan BBM subsidi tepat sasaran dengan pendaftaran mudah.', icon: '⛽' },
        { title: 'Tukar Poin', description: 'Kumpulkan poin dari setiap transaksi dan tukar dengan hadiah menarik.', icon: '\u{1F381}' },
        { title: 'Tagihan Gas', description: 'Bayar tagihan gas rumah tangga langsung dari aplikasi.', icon: '\u{1F525}' },
        { title: 'Cek Lokasi EV Charging', description: 'Temukan titik pengisian daya kendaraan listrik terdekat.', icon: '\u{1F50C}' },
        { title: 'Pesan Tiket & Hotel', description: 'Rencanakan perjalanan Anda tanpa berpindah aplikasi.', icon: '✈️' },
      ]),
      payment_methods: JSON.stringify([
        { name: 'VISA', bg: '#1a1f71', text: '#fff' },
        { name: 'GoPay', bg: '#00aed6', text: '#fff' },
        { name: 'OVO', bg: '#4c2a86', text: '#fff' },
        { name: 'AstraPay', bg: '#005baa', text: '#fff' },
        { name: 'Mandiri', bg: '#003d79', text: '#fff' },
        { name: 'BNI', bg: '#f37021', text: '#fff' },
      ]),
      social_links: JSON.stringify([
        { name: 'Instagram', url: 'https://instagram.com/mypertamina', icon: '\u{1F4F7}' },
        { name: 'TikTok', url: 'https://tiktok.com/@mypertamina', icon: '\u{1F3B5}' },
        { name: 'YouTube', url: 'https://youtube.com/@mypertamina', icon: '▶️' },
        { name: 'Website', url: 'https://mypertamina.id', icon: '\u{1F310}' },
      ]),
      checklist_features: JSON.stringify([
        { label: 'Cek QR Code', icon: '\u{1F4F1}' },
        { label: 'Cek lokasi EV Charging', icon: '\u{1F50C}' },
        { label: 'Bayar Tagihan Gas', icon: '\u{1F525}' },
        { label: 'Pesan tiket pesawat', icon: '✈️' },
        { label: 'Pesan hotel', icon: '\u{1F3E8}' },
      ]),
    };
    await conn.query(
      `INSERT INTO benefit_page_content
         (id, hero_video_id, mascot_video_id, mascot_jiffy_image, mascot_campaign_image, loyalty_image,
          guide_image, guide_pdf_url, final_illustration, google_play_url, app_store_url,
          solution_cards, feature_slides, payment_methods, social_links, checklist_features)
       VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE id = id`,
      [
        benefitContent.hero_video_id,
        benefitContent.mascot_video_id,
        benefitContent.mascot_jiffy_image,
        benefitContent.mascot_campaign_image,
        benefitContent.loyalty_image,
        benefitContent.guide_image,
        benefitContent.guide_pdf_url,
        benefitContent.final_illustration,
        benefitContent.google_play_url,
        benefitContent.app_store_url,
        benefitContent.solution_cards,
        benefitContent.feature_slides,
        benefitContent.payment_methods,
        benefitContent.social_links,
        benefitContent.checklist_features,
      ]
    );

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
