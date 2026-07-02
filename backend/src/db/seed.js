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

const PRODUCTS = [
  {
    category: 'gasoline',
    slug: 'pertamax-turbo',
    name: 'Pertamax Turbo',
    brandColor: '#dc2626',
    logoUrl: '/images/products/pertamax-turbo-logo.png',
    heroBackgroundUrl: '/images/products/pertamax-turbo-hero-bg.jpg',
    heroObjectUrl: '/images/products/pertamax-turbo-car.png',
    headline: 'Ultimate Drive Experience With Precision, Power, and Protection',
    specBadge: 'RON 98   <   50 PPM',
    tagline: 'Perfection in Performance',
    techTitle: 'Fuel Technology at the Edge of Innovation',
    techHighlight: 'Innovation',
    techImageUrl: '/images/products/pertamax-turbo-nozzle.png',
    videoUrl: 'https://www.youtube.com/embed/aqz-KE-bpKQ',
    videoTitle: 'Ultimate Driving Experience With Perfection Performance',
    baPhotoUrl: '/images/products/ambassador-sean-gelael.png',
    baPosition: 'Brand Ambassador Pertamax Turbo & SPBU Pertamina',
    baName: 'Sean Gelael',
    baQuote: 'Pertamax Turbo, Kebanggaan Indonesia. Performa Kelas Dunia!',
    benefitsTitle: 'Rahasia Dibalik Akselerasi Sempurna',
    benefitsHighlight: 'Akselerasi Sempurna',
    techFeatures: [
      {
        title: 'Performa puncak — RON 98 (Research Octane Number)',
        titleHighlight: 'Performa puncak',
        description:
          'Dirancang untuk kendaraan berperforma tinggi; menghadirkan akselerasi instan, respon throttle superior, dan drivability yang impresif.',
      },
      {
        title: 'Ramah lingkungan — Sulfur ≤ 50 ppm, setara EURO 4',
        titleHighlight: 'Ramah lingkungan',
        description:
          'Formula low-sulfur memenuhi standar emisi EURO 4 untuk pengurangan polutan tanpa mengorbankan tenaga.',
      },
      {
        title: 'Efisiensi pembakaran — Ignition Boost Formula',
        titleHighlight: 'Efisiensi pembakaran',
        description:
          'Meningkatkan efisiensi pembakaran sehingga menghasilkan tenaga maksimal dengan konsumsi bahan bakar yang lebih efisien.',
      },
      {
        title: 'Perlindungan mesin — Pertatec technology',
        titleHighlight: 'Perlindungan mesin',
        description:
          'Membersihkan ruang bakar, mencegah korosi, dan memperpanjang umur mesin demi performa yang konsisten.',
      },
    ],
    techBadges: [
      { icon: 'formula', label: 'Formula Pertatec' },
      { icon: 'octane', label: 'Oktan Tinggi RON 98' },
      { icon: 'ignition', label: 'Teknologi Ignition Boost' },
    ],
    benefits: [
      {
        icon: 'flame',
        title: 'High Performance Formula',
        description: 'Rasakan tenaga mesin maksimal dengan bahan bakar RON 98 yang dirancang untuk performa terbaik.',
      },
      {
        icon: 'shield',
        title: 'Protects Your Engine',
        description:
          'Teknologi PERTATEC membantu menjaga kebersihan dan daya tahan mesin untuk penggunaan jangka panjang.',
      },
      {
        icon: 'globe',
        title: 'Meets Global Standards',
        description: 'Bersertifikat standar emisi EURO 4 — bahan bakar lebih bersih untuk lingkungan yang lebih bersih.',
      },
    ],
  },
  {
    category: 'gasoline',
    slug: 'pertamax-green-95',
    name: 'Pertamax Green 95',
    brandColor: '#16a34a',
    logoUrl: '/images/products/pertamax-green-95-logo.png',
    heroBackgroundUrl: '/images/products/pertamax-green-95-hero-bg.jpg',
    heroObjectUrl: '/images/products/pertamax-green-95-car.png',
    headline: 'Energi Lebih Bersih untuk Perjalanan Setiap Hari',
    specBadge: 'RON 95   ETHANOL 5%',
    tagline: 'Cleaner Energy, Better Tomorrow',
    techTitle: 'Formula Ramah Lingkungan dengan Kandungan Bioetanol',
    techHighlight: 'Ramah Lingkungan',
    techImageUrl: '/images/products/pertamax-green-95-nozzle.png',
    videoUrl: null,
    videoTitle: null,
    baPhotoUrl: null,
    baPosition: null,
    baName: null,
    baQuote: null,
    benefitsTitle: 'Kenapa Memilih Pertamax Green 95',
    benefitsHighlight: 'Pertamax Green 95',
    techFeatures: [
      {
        title: 'Kandungan bioetanol — Ethanol 5%',
        titleHighlight: 'Kandungan bioetanol',
        description: 'Mengurangi emisi karbon dengan campuran bioetanol dari tebu tanpa mengurangi performa mesin.',
      },
      {
        title: 'Oktan tinggi — RON 95',
        titleHighlight: 'Oktan tinggi',
        description: 'Pembakaran lebih sempurna untuk tenaga responsif pada kendaraan harian.',
      },
    ],
    techBadges: [
      { icon: 'octane', label: 'RON 95' },
      { icon: 'formula', label: 'Bioetanol 5%' },
    ],
    benefits: [
      {
        icon: 'globe',
        title: 'Rendah Emisi',
        description: 'Kandungan bioetanol membantu menekan emisi gas buang kendaraan.',
      },
      {
        icon: 'flame',
        title: 'Performa Optimal',
        description: 'RON 95 menghasilkan pembakaran lebih baik dibanding BBM RON di bawahnya.',
      },
      {
        icon: 'shield',
        title: 'Aman untuk Mesin',
        description: 'Diformulasikan agar tetap kompatibel dengan mesin kendaraan modern.',
      },
    ],
  },
  {
    category: 'gasoline',
    slug: 'pertamax',
    name: 'Pertamax',
    brandColor: '#2563eb',
    logoUrl: '/images/products/pertamax-logo.png',
    heroBackgroundUrl: '/images/products/pertamax-hero-bg.jpg',
    heroObjectUrl: '/images/products/pertamax-car.png',
    headline: 'Performa Andal untuk Mobilitas Sehari-hari',
    specBadge: 'RON 92',
    tagline: 'Reliable Power, Every Drive',
    techTitle: 'Teknologi Pertatec untuk Mesin yang Lebih Terjaga',
    techHighlight: 'Pertatec',
    techImageUrl: '/images/products/pertamax-nozzle.png',
    videoUrl: null,
    videoTitle: null,
    baPhotoUrl: null,
    baPosition: null,
    baName: null,
    baQuote: null,
    benefitsTitle: 'Keunggulan Pertamax',
    benefitsHighlight: 'Pertamax',
    techFeatures: [
      {
        title: 'Oktan seimbang — RON 92',
        titleHighlight: 'Oktan seimbang',
        description: 'Cocok untuk mayoritas kendaraan berteknologi injeksi modern di Indonesia.',
      },
      {
        title: 'Teknologi Pertatec',
        titleHighlight: 'Teknologi Pertatec',
        description: 'Membantu membersihkan dan melindungi komponen mesin dari endapan karbon.',
      },
    ],
    techBadges: [
      { icon: 'octane', label: 'RON 92' },
      { icon: 'formula', label: 'Formula Pertatec' },
    ],
    benefits: [
      {
        icon: 'flame',
        title: 'Tenaga Optimal',
        description: 'Pembakaran lebih sempurna dibanding BBM beroktan rendah.',
      },
      {
        icon: 'shield',
        title: 'Mesin Terlindungi',
        description: 'Aditif Pertatec membantu menjaga kebersihan ruang bakar.',
      },
      {
        icon: 'globe',
        title: 'Standar Emisi Baik',
        description: 'Diformulasikan untuk pembakaran yang lebih bersih.',
      },
    ],
  },
  {
    category: 'diesel',
    slug: 'pertamina-dex',
    name: 'Pertamina Dex',
    brandColor: '#065f46',
    logoUrl: '/images/products/pertamina-dex-logo.png',
    heroBackgroundUrl: '/images/products/pertamina-dex-hero-bg.jpg',
    heroObjectUrl: '/images/products/pertamina-dex-car.png',
    headline: 'Bahan Bakar Diesel Premium untuk Performa Maksimal',
    specBadge: 'CN 53   SULFUR ≤ 300 PPM',
    tagline: 'Premium Diesel Performance',
    techTitle: 'Formula Cetane Tinggi untuk Mesin Diesel Modern',
    techHighlight: 'Cetane Tinggi',
    techImageUrl: '/images/products/pertamina-dex-nozzle.png',
    videoUrl: null,
    videoTitle: null,
    baPhotoUrl: null,
    baPosition: null,
    baName: null,
    baQuote: null,
    benefitsTitle: 'Keunggulan Pertamina Dex',
    benefitsHighlight: 'Pertamina Dex',
    techFeatures: [
      {
        title: 'Cetane number tinggi — CN 53',
        titleHighlight: 'Cetane number tinggi',
        description: 'Pembakaran lebih cepat dan sempurna untuk mesin diesel common-rail.',
      },
      {
        title: 'Sulfur rendah — ≤ 300 ppm',
        titleHighlight: 'Sulfur rendah',
        description: 'Mengurangi keausan komponen mesin dan emisi gas buang.',
      },
    ],
    techBadges: [
      { icon: 'octane', label: 'CN 53' },
      { icon: 'shield', label: 'Sulfur Rendah' },
    ],
    benefits: [
      {
        icon: 'flame',
        title: 'Akselerasi Responsif',
        description: 'Cetane tinggi mempercepat waktu pembakaran mesin diesel.',
      },
      {
        icon: 'shield',
        title: 'Melindungi Injector',
        description: 'Formulasi khusus menjaga kebersihan sistem injeksi bahan bakar.',
      },
      {
        icon: 'globe',
        title: 'Emisi Lebih Rendah',
        description: 'Kandungan sulfur rendah untuk pembakaran lebih ramah lingkungan.',
      },
    ],
  },
  {
    category: 'diesel',
    slug: 'dexlite',
    name: 'Dexlite',
    brandColor: '#4b5563',
    logoUrl: '/images/products/dexlite-logo.png',
    heroBackgroundUrl: '/images/products/dexlite-hero-bg.jpg',
    heroObjectUrl: '/images/products/dexlite-car.png',
    headline: 'Solusi Diesel Bersih dengan Harga Terjangkau',
    specBadge: 'CN 51   SULFUR ≤ 1200 PPM',
    tagline: 'Clean Diesel, Smart Choice',
    techTitle: 'Diesel Lebih Bersih dengan Cetane Number Terjaga',
    techHighlight: 'Lebih Bersih',
    techImageUrl: '/images/products/dexlite-nozzle.png',
    videoUrl: null,
    videoTitle: null,
    baPhotoUrl: null,
    baPosition: null,
    baName: null,
    baQuote: null,
    benefitsTitle: 'Keunggulan Dexlite',
    benefitsHighlight: 'Dexlite',
    techFeatures: [
      {
        title: 'Cetane number terjaga — CN 51',
        titleHighlight: 'Cetane number terjaga',
        description: 'Performa pembakaran lebih baik dibanding solar subsidi.',
      },
      {
        title: 'Warna jernih bebas partikulat',
        titleHighlight: 'Warna jernih',
        description: 'Mengurangi risiko penyumbatan filter bahan bakar.',
      },
    ],
    techBadges: [
      { icon: 'octane', label: 'CN 51' },
      { icon: 'formula', label: 'Bebas Partikulat' },
    ],
    benefits: [
      {
        icon: 'flame',
        title: 'Performa Lebih Baik',
        description: 'Cetane number lebih tinggi dibanding solar bersubsidi.',
      },
      {
        icon: 'shield',
        title: 'Mesin Lebih Awet',
        description: 'Kandungan partikulat rendah menjaga komponen mesin diesel.',
      },
      {
        icon: 'globe',
        title: 'Harga Terjangkau',
        description: 'Alternatif diesel berkualitas dengan harga lebih ekonomis.',
      },
    ],
  },
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

    for (const product of PRODUCTS) {
      await conn.query(
        `INSERT INTO products (
           category, slug, name, brand_color, logo_url, hero_background_url, hero_object_url,
           headline, spec_badge, tagline, tech_title, tech_highlight, tech_image_url,
           video_url, video_title, ba_photo_url, ba_position, ba_name, ba_quote,
           benefits_title, benefits_highlight
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           name = VALUES(name), brand_color = VALUES(brand_color), logo_url = VALUES(logo_url),
           hero_background_url = VALUES(hero_background_url), hero_object_url = VALUES(hero_object_url),
           headline = VALUES(headline), spec_badge = VALUES(spec_badge), tagline = VALUES(tagline),
           tech_title = VALUES(tech_title), tech_highlight = VALUES(tech_highlight),
           tech_image_url = VALUES(tech_image_url), video_url = VALUES(video_url),
           video_title = VALUES(video_title), ba_photo_url = VALUES(ba_photo_url),
           ba_position = VALUES(ba_position), ba_name = VALUES(ba_name), ba_quote = VALUES(ba_quote),
           benefits_title = VALUES(benefits_title), benefits_highlight = VALUES(benefits_highlight)`,
        [
          product.category,
          product.slug,
          product.name,
          product.brandColor,
          product.logoUrl,
          product.heroBackgroundUrl,
          product.heroObjectUrl,
          product.headline,
          product.specBadge,
          product.tagline,
          product.techTitle,
          product.techHighlight,
          product.techImageUrl,
          product.videoUrl,
          product.videoTitle,
          product.baPhotoUrl,
          product.baPosition,
          product.baName,
          product.baQuote,
          product.benefitsTitle,
          product.benefitsHighlight,
        ]
      );
      const [[productRow]] = await conn.query('SELECT id FROM products WHERE category = ? AND slug = ?', [
        product.category,
        product.slug,
      ]);

      await conn.query('DELETE FROM product_tech_features WHERE product_id = ?', [productRow.id]);
      for (let i = 0; i < product.techFeatures.length; i++) {
        const feature = product.techFeatures[i];
        await conn.query(
          'INSERT INTO product_tech_features (product_id, title, title_highlight, description, sort_order) VALUES (?, ?, ?, ?, ?)',
          [productRow.id, feature.title, feature.titleHighlight, feature.description, i]
        );
      }

      await conn.query('DELETE FROM product_tech_badges WHERE product_id = ?', [productRow.id]);
      for (let i = 0; i < product.techBadges.length; i++) {
        const badge = product.techBadges[i];
        await conn.query(
          'INSERT INTO product_tech_badges (product_id, icon, label, sort_order) VALUES (?, ?, ?, ?)',
          [productRow.id, badge.icon, badge.label, i]
        );
      }

      await conn.query('DELETE FROM product_benefits WHERE product_id = ?', [productRow.id]);
      for (let i = 0; i < product.benefits.length; i++) {
        const benefit = product.benefits[i];
        await conn.query(
          'INSERT INTO product_benefits (product_id, icon, title, description, sort_order) VALUES (?, ?, ?, ?, ?)',
          [productRow.id, benefit.icon, benefit.title, benefit.description, i]
        );
      }
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
