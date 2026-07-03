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

const PROMOS = [
  {
    slug: 'promocashback-gopaycoins',
    category: 'Program Promo',
    title: 'Beli Pertamax Series atau Pertamina Dex Pakai MyPertamina GoPay, Dapatkan Cashback 10.000 GoPay Coins & E-Voucher MyPertamina!',
    description:
      'Khusus pengguna MyPertamina GoPay, dapatkan cashback 10.000 GoPay Coins dan kesempatan E-Voucher MyPertamina Rp100.000,-.',
    imageUrl: '/images/promo/promocashback-gopaycoins.jpg',
    bodyHtml: `
      <h2>Beragam Keistimewaan Hadir Khusus Untuk Kamu Pengguna Setia MyPertamina GoPay, Nikmati Keuntungan Lebih di Setiap Transaksi!</h2>
      <p>Khusus untuk kamu yang pertama kali menggunakan metode pembayaran MyPertamina GoPay untuk transaksi Pertamax Series atau Pertamina Dex dengan minimum transaksi Rp200.000,-, kamu bisa mendapatkan <em>cashback</em> 10.000 GoPay <em>Coins</em>! Tidak hanya itu, 100 konsumen MyPertamina GoPay dengan transaksi tertinggi tiap bulannya berkesempatan mendapatkan E-Voucher MyPertamina Rp100.000,-!</p>
      <p>Jangan sampai terlewat ya, Sob! Periode promo berlaku hingga 31 Agustus 2026. Segera ke SPBU Pertamina dan tingkatkan terus transaksi kamu menggunakan MyPertamina GoPay untuk jaminan bahan bakar berkualitas, raih kesempatan dapat promo lebih besar!</p>
      <h3>Syarat &amp; Ketentuan :</h3>
      <ol>
        <li>Promo berlangsung dari tanggal 1 Juli - 31 Agustus 2026 setiap hari pukul 00:00 – 23:59 WIB.</li>
        <li>Berlaku untuk transaksi pembelian Pertamax Series dan Pertamina Dex minimal Rp200.000,- menggunakan MyPertamina GoPay.</li>
        <li>Cashback 10.000 GoPay Coins hanya berlaku untuk transaksi pertama kali menggunakan metode pembayaran MyPertamina GoPay.</li>
        <li>E-Voucher MyPertamina Rp100.000,- diberikan kepada 100 konsumen dengan transaksi MyPertamina GoPay tertinggi setiap bulannya.</li>
      </ol>
    `,
  },
  {
    slug: 'ovo-cashback-points',
    category: 'Program Promo',
    title: 'Spesial Pengguna MyPertamina OVO, Bertabur Cashback OVO Points di MyPertamina',
    description:
      'Promo berlaku untuk pembelian produk Pertamax Series & Pertamina Dex pembayaran menggunakan MyPertamina OVO di aplikasi MyPertamina.',
    imageUrl: '/images/promo/ovo-cashback-points.jpg',
    bodyHtml: `
      <h2>Cashback Hingga 15.000 OVO Points Khusus Pengguna MyPertamina OVO</h2>
      <p>Nikmati cashback OVO Points untuk setiap transaksi Pertamax Series dan Pertamina Dex menggunakan MyPertamina OVO. Upgrade akun kamu menjadi OVO Nabung untuk mendapatkan cashback tambahan hingga 20.000 OVO Points.</p>
      <h3>Keuntungan yang bisa kamu dapatkan:</h3>
      <ul>
        <li>Cashback hingga 15.000 OVO Points untuk transaksi pertama.</li>
        <li>Cashback tambahan 20.000 OVO Points untuk upgrade akun OVO Nabung.</li>
        <li>Berlaku di seluruh SPBU Pertamina yang menerima pembayaran MyPertamina OVO.</li>
      </ul>
      <p>Promo tidak berlaku untuk pengguna MyPertamina OVO yang sudah mendaftarkan promo serupa di merchant lain. Info lengkap lihat <a href="/about/mypertamina-channel">MyPertamina Channel</a>. Syarat dan ketentuan berlaku.</p>
    `,
  },
  {
    slug: 'pesta-bola-mypertamina',
    category: 'Program Loyalty',
    title: 'MyPertamina Pesta Bola: Transaksi Sekarang, Kumpulkan Poinnya, dan Rayakan Euforianya!',
    description: 'Ayo transaksi, tukar poin, koleksi merchandise spesial, dan nikmati keseruan nobar bersama MyPertamina.',
    imageUrl: '/images/promo/pesta-bola-mypertamina.jpg',
    bodyHtml: `
      <h2>Rayakan Musim Bola Bersama MyPertamina</h2>
      <p>Setiap transaksi BBM dan non-BBM di aplikasi MyPertamina selama periode promo akan mengumpulkan poin ekstra yang bisa ditukar dengan merchandise spesial edisi Pesta Bola.</p>
      <ol>
        <li>Lakukan transaksi minimal Rp100.000,- dalam satu kali transaksi.</li>
        <li>Poin otomatis terkumpul di akun MyPertamina kamu.</li>
        <li>Tukarkan poin dengan merchandise atau tiket nobar eksklusif.</li>
      </ol>
    `,
  },
  {
    slug: 'perubahan-1-menit',
    category: 'Feature',
    title: 'Cukup 1 Menit untuk Perubahan Lebih Baik',
    description: 'Perbarui data akun MyPertamina kamu hanya dalam waktu 1 menit lewat fitur terbaru di aplikasi.',
    imageUrl: '/images/promo/perubahan-1-menit.jpg',
    bodyHtml: `
      <h2>Update Data Akun Jadi Lebih Cepat</h2>
      <p>Fitur baru MyPertamina memungkinkan kamu memperbarui data kendaraan dan informasi akun hanya dalam <strong>1 menit</strong>, tanpa perlu datang ke SPBU.</p>
      <p>Buka aplikasi MyPertamina, masuk ke menu <em>Profil</em>, lalu ikuti langkah-langkah verifikasi singkat untuk memastikan data kamu selalu terkini.</p>
    `,
  },
  {
    slug: 'grand-podium-event',
    category: 'Event',
    title: 'Grand Podium: Raih Hadiah Jutaan Rupiah',
    description: 'Ikuti rangkaian event Grand Podium MyPertamina dan menangkan hadiah total ratusan juta rupiah.',
    imageUrl: '/images/promo/grand-podium-event.jpg',
    bodyHtml: `
      <h2>Grand Podium MyPertamina 2026</h2>
      <p>Kumpulkan poin dari setiap transaksi selama periode event untuk mendapatkan kesempatan memenangkan hadiah utama, mulai dari e-voucher hingga kendaraan.</p>
      <h3>Cara Ikut Serta:</h3>
      <ul>
        <li>Daftar melalui aplikasi MyPertamina.</li>
        <li>Lakukan transaksi BBM minimal 3 kali dalam sebulan.</li>
        <li>Pantau perolehan poin dan hadiah di halaman leaderboard.</li>
      </ul>
    `,
  },
  {
    slug: 'bright-gas-mypergas',
    category: 'Program Promo',
    title: 'Beli Bright Gas Pakai MyPertamina, Langsung Dapat Banyak Untung',
    description: 'Transaksi Bright Gas melalui aplikasi MyPertamina dan dapatkan cashback serta poin loyalitas.',
    imageUrl: '/images/promo/bright-gas-mypergas.jpg',
    bodyHtml: `
      <h2>Untung Berlipat Beli Bright Gas via MyPertamina</h2>
      <p>Setiap pembelian Bright Gas 5,5 Kg maupun 12 Kg melalui aplikasi MyPertamina akan mendapatkan cashback langsung serta poin loyalitas tambahan.</p>
      <p>Promo berlaku di seluruh <strong>Bright Store</strong> dan agen resmi yang terdaftar di aplikasi MyPertamina.</p>
    `,
  },
  {
    slug: 'subsidi-tepat-update',
    category: 'Subsidi Tepat',
    title: 'Update Terbaru Kebijakan Subsidi Tepat BBM',
    description: 'Simak perubahan terbaru mekanisme pendaftaran dan verifikasi Subsidi Tepat BBM.',
    imageUrl: '/images/promo/subsidi-tepat-update.jpg',
    bodyHtml: `
      <h2>Mekanisme Baru Pendaftaran Subsidi Tepat</h2>
      <p>Pemerintah bersama Pertamina memperbarui alur verifikasi data kendaraan untuk memastikan penyaluran BBM subsidi lebih tepat sasaran.</p>
      <ol>
        <li>Daftarkan kendaraan melalui aplikasi MyPertamina atau situs Subsidi Tepat.</li>
        <li>Lengkapi dokumen STNK dan KTP sesuai domisili.</li>
        <li>Tunggu proses verifikasi maksimal 3 hari kerja.</li>
      </ol>
    `,
  },
  {
    slug: 'fitur-baru-mypertamina',
    category: 'Updates',
    title: 'Fitur Baru MyPertamina: Notifikasi Real-Time Transaksi',
    description: 'Pantau setiap transaksi BBM dan non-BBM secara real-time langsung dari aplikasi MyPertamina.',
    imageUrl: '/images/promo/fitur-baru-mypertamina.jpg',
    bodyHtml: `
      <h2>Notifikasi Real-Time Kini Tersedia</h2>
      <p>Kamu akan menerima notifikasi otomatis setiap kali transaksi berhasil dilakukan, lengkap dengan rincian jumlah, lokasi SPBU, dan poin yang didapat.</p>
      <p>Aktifkan notifikasi melalui menu <strong>Pengaturan &gt; Notifikasi</strong> di aplikasi MyPertamina.</p>
    `,
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
    const [[adminUser]] = await conn.query('SELECT id FROM users WHERE email = ?', ['admin@mypertamina.local']);

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

    await conn.query('DELETE FROM location_directory WHERE channel IN (?, ?, ?, ?, ?, ?)', [
      'spbu-pertamina',
      'ges',
      'pertamax-green-95',
      'lpg',
      'bright-store',
      'bright-cafe',
    ]);

    const spbuPertamina = [
      ['31.101.01', 'Jl. MH Thamrin No. 1', 'Jakarta Pusat', 'DKI Jakarta'],
      ['31.101.02', 'Jl. Sudirman No. 45', 'Jakarta Selatan', 'DKI Jakarta'],
      ['31.101.03', null, 'Jakarta Barat', 'DKI Jakarta'],
      ['32.201.01', 'Jl. Asia Afrika No. 10', 'Bandung', 'Jawa Barat'],
      ['32.201.02', 'Jl. Soekarno-Hatta No. 88', 'Bandung', 'Jawa Barat'],
      ['32.301.01', 'Jl. Pahlawan No. 5', 'Bekasi', 'Jawa Barat'],
      ['33.101.01', 'Jl. Pandanaran No. 20', 'Semarang', 'Jawa Tengah'],
      ['33.201.01', null, 'Solo', 'Jawa Tengah'],
      ['34.101.01', 'Jl. Malioboro No. 3', 'Yogyakarta', 'DI Yogyakarta'],
      ['35.101.01', 'Jl. Basuki Rahmat No. 12', 'Surabaya', 'Jawa Timur'],
      ['35.201.01', 'Jl. Ijen No. 7', 'Malang', 'Jawa Timur'],
      ['36.101.01', 'Jl. Jenderal Sudirman No. 90', 'Tangerang', 'Banten'],
      ['51.101.01', 'Jl. Sunset Road No. 15', 'Denpasar', 'Bali'],
      ['12.101.01', 'Jl. Sisingamangaraja No. 8', 'Medan', 'Sumatera Utara'],
      ['13.101.01', 'Jl. Sudirman No. 25', 'Padang', 'Sumatera Barat'],
      ['14.101.01', 'Jl. Diponegoro No. 2', 'Pekanbaru', 'Riau'],
      ['21.101.01', 'Jl. Engku Putri No. 4', 'Batam', 'Kepulauan Riau'],
      ['16.101.01', 'Jl. Kapten A. Rivai No. 11', 'Palembang', 'Sumatera Selatan'],
      ['64.101.01', null, 'Balikpapan', 'Kalimantan Timur'],
      ['64.201.01', 'Jl. Ahmad Yani No. 30', 'Samarinda', 'Kalimantan Timur'],
      ['73.101.01', 'Jl. Sungai Saddang No. 6', 'Makassar', 'Sulawesi Selatan'],
      ['91.101.01', 'Jl. Raya Sentani No. 1', 'Jayapura', 'Papua'],
      ['31.101.04', 'Jl. Kemang Raya No. 55', 'Jakarta Selatan', 'DKI Jakarta'],
      ['32.201.03', 'Jl. Dago No. 100', 'Bandung', 'Jawa Barat'],
    ];
    for (const [code, address, city, province] of spbuPertamina) {
      await conn.query(
        `INSERT INTO location_directory (channel, code, address, city, province)
         VALUES ('spbu-pertamina', ?, ?, ?, ?)`,
        [code, address, city, province]
      );
    }

    const gesStations = [
      ['31.101.01-GES', 'Jakarta Pusat', 'DKI Jakarta', true, true],
      ['31.101.02-GES', 'Jakarta Selatan', 'DKI Jakarta', true, false],
      ['32.201.01-GES', 'Bandung', 'Jawa Barat', true, true],
      ['33.101.01-GES', 'Semarang', 'Jawa Tengah', false, true],
      ['34.101.01-GES', 'Yogyakarta', 'DI Yogyakarta', true, false],
      ['35.101.01-GES', 'Surabaya', 'Jawa Timur', true, true],
      ['36.101.01-GES', 'Tangerang', 'Banten', true, false],
      ['51.101.01-GES', 'Denpasar', 'Bali', true, true],
      ['12.101.01-GES', 'Medan', 'Sumatera Utara', false, true],
      ['14.101.01-GES', 'Pekanbaru', 'Riau', true, false],
      ['21.101.01-GES', 'Batam', 'Kepulauan Riau', true, true],
      ['64.101.01-GES', 'Balikpapan', 'Kalimantan Timur', true, false],
      ['73.101.01-GES', 'Makassar', 'Sulawesi Selatan', false, true],
      ['31.101.05-GES', 'Jakarta Timur', 'DKI Jakarta', true, true],
      ['32.301.01-GES', 'Bekasi', 'Jawa Barat', true, false],
      ['35.201.01-GES', 'Malang', 'Jawa Timur', false, true],
    ];
    for (const [code, city, province, hasSpklu, hasSpbklu] of gesStations) {
      await conn.query(
        `INSERT INTO location_directory (channel, code, city, province, has_spklu, has_spbklu)
         VALUES ('ges', ?, ?, ?, ?, ?)`,
        [code, city, province, hasSpklu, hasSpbklu]
      );
    }

    const pertamaxGreen95 = [
      ['31.101.01', 'Jl. MH Thamrin No. 1', 'Jakarta Pusat', 'DKI Jakarta'],
      ['31.101.02', 'Jl. Sudirman No. 45', 'Jakarta Selatan', 'DKI Jakarta'],
      ['32.201.01', 'Jl. Asia Afrika No. 10', 'Bandung', 'Jawa Barat'],
      ['33.101.01', 'Jl. Pandanaran No. 20', 'Semarang', 'Jawa Tengah'],
      ['35.101.01', 'Jl. Basuki Rahmat No. 12', 'Surabaya', 'Jawa Timur'],
      ['51.101.01', 'Jl. Sunset Road No. 15', 'Denpasar', 'Bali'],
      ['12.101.01', 'Jl. Sisingamangaraja No. 8', 'Medan', 'Sumatera Utara'],
      ['14.101.01', 'Jl. Diponegoro No. 2', 'Pekanbaru', 'Riau'],
      ['64.101.01', null, 'Balikpapan', 'Kalimantan Timur'],
      ['73.101.01', 'Jl. Sungai Saddang No. 6', 'Makassar', 'Sulawesi Selatan'],
      ['31.101.06', 'Jl. Cinere Raya No. 9', 'Jakarta Selatan', 'DKI Jakarta'],
      ['32.201.04', 'Jl. Buah Batu No. 21', 'Bandung', 'Jawa Barat'],
    ];
    for (const [code, address, city, province] of pertamaxGreen95) {
      await conn.query(
        `INSERT INTO location_directory (channel, code, address, city, province)
         VALUES ('pertamax-green-95', ?, ?, ?, ?)`,
        [code, address, city, province]
      );
    }

    const lpgOutlets = [
      ['Bright Gas Outlet Thamrin', 'Outlet', 'Jl. MH Thamrin No. 1', 'Jakarta Pusat', 'DKI Jakarta'],
      ['Agen Sumber Rezeki', 'Agen', 'Jl. Kemang Raya No. 12', 'Jakarta Selatan', 'DKI Jakarta'],
      ['Bright Gas Outlet Dago', 'Outlet', 'Jl. Dago No. 100', 'Bandung', 'Jawa Barat'],
      ['Agen Barokah Gas', 'Agen', null, 'Bandung', 'Jawa Barat'],
      ['Bright Gas Outlet Pandanaran', 'Outlet', 'Jl. Pandanaran No. 20', 'Semarang', 'Jawa Tengah'],
      ['Agen Makmur Jaya', 'Agen', 'Jl. Ahmad Yani No. 5', 'Solo', 'Jawa Tengah'],
      ['Bright Gas Outlet Malioboro', 'Outlet', 'Jl. Malioboro No. 3', 'Yogyakarta', 'DI Yogyakarta'],
      ['Bright Gas Outlet Basuki Rahmat', 'Outlet', 'Jl. Basuki Rahmat No. 12', 'Surabaya', 'Jawa Timur'],
      ['Agen Sumber Makmur', 'Agen', 'Jl. Ijen No. 7', 'Malang', 'Jawa Timur'],
      ['Bright Gas Outlet Sunset Road', 'Outlet', 'Jl. Sunset Road No. 15', 'Denpasar', 'Bali'],
      ['Agen Rejeki Barokah', 'Agen', 'Jl. Sisingamangaraja No. 8', 'Medan', 'Sumatera Utara'],
      ['Bright Gas Outlet Diponegoro', 'Outlet', 'Jl. Diponegoro No. 2', 'Pekanbaru', 'Riau'],
      ['Agen Cahaya Gas', 'Agen', 'Jl. Engku Putri No. 4', 'Batam', 'Kepulauan Riau'],
      ['Bright Gas Outlet Kapten Rivai', 'Outlet', 'Jl. Kapten A. Rivai No. 11', 'Palembang', 'Sumatera Selatan'],
      ['Agen Sumber Energi', 'Agen', 'Jl. Ahmad Yani No. 30', 'Samarinda', 'Kalimantan Timur'],
      ['Bright Gas Outlet Sungai Saddang', 'Outlet', 'Jl. Sungai Saddang No. 6', 'Makassar', 'Sulawesi Selatan'],
      ['Agen Tunas Jaya', 'Agen', 'Jl. Raya Sentani No. 1', 'Jayapura', 'Papua'],
      ['Bright Gas Outlet Tangerang City', 'Outlet', 'Jl. Jenderal Sudirman No. 90', 'Tangerang', 'Banten'],
      ['Agen Berkah Gas', 'Agen', 'Jl. Pahlawan No. 5', 'Bekasi', 'Jawa Barat'],
      ['Bright Gas Outlet Soekarno-Hatta', 'Outlet', 'Jl. Soekarno-Hatta No. 88', 'Bandung', 'Jawa Barat'],
    ];
    for (const [name, type, address, city, province] of lpgOutlets) {
      await conn.query(
        `INSERT INTO location_directory (channel, name, type, address, city, province)
         VALUES ('lpg', ?, ?, ?, ?, ?)`,
        [name, type, address, city, province]
      );
    }

    const brightStoreOutlets = [
      ['31.101.01', 'Bright Store Thamrin', 'Jl. MH Thamrin No. 1', 'Jakarta Pusat', 'DKI Jakarta'],
      ['31.101.02', 'Bright Store Sudirman', 'Jl. Sudirman No. 45', 'Jakarta Selatan', 'DKI Jakarta'],
      ['32.201.01', 'Bright Store Asia Afrika', 'Jl. Asia Afrika No. 10', 'Bandung', 'Jawa Barat'],
      ['32.201.02', 'Bright Store Soekarno-Hatta', null, 'Bandung', 'Jawa Barat'],
      ['33.101.01', 'Bright Store Pandanaran', 'Jl. Pandanaran No. 20', 'Semarang', 'Jawa Tengah'],
      ['34.101.01', 'Bright Store Malioboro', 'Jl. Malioboro No. 3', 'Yogyakarta', 'DI Yogyakarta'],
      ['35.101.01', 'Bright Store Basuki Rahmat', 'Jl. Basuki Rahmat No. 12', 'Surabaya', 'Jawa Timur'],
      ['36.101.01', 'Bright Store Tangerang City', 'Jl. Jenderal Sudirman No. 90', 'Tangerang', 'Banten'],
      ['51.101.01', 'Bright Store Sunset Road', 'Jl. Sunset Road No. 15', 'Denpasar', 'Bali'],
      ['12.101.01', 'Bright Store Sisingamangaraja', 'Jl. Sisingamangaraja No. 8', 'Medan', 'Sumatera Utara'],
      ['14.101.01', 'Bright Store Diponegoro', 'Jl. Diponegoro No. 2', 'Pekanbaru', 'Riau'],
      ['64.101.01', 'Bright Store Balikpapan', null, 'Balikpapan', 'Kalimantan Timur'],
    ];
    for (const [code, name, address, city, province] of brightStoreOutlets) {
      await conn.query(
        `INSERT INTO location_directory (channel, code, name, address, city, province)
         VALUES ('bright-store', ?, ?, ?, ?, ?)`,
        [code, name, address, city, province]
      );
    }

    const brightCafeOutlets = [
      ['Bright Cafe Thamrin', 'Jl. MH Thamrin No. 1', 'Jakarta Pusat', 'DKI Jakarta'],
      ['Bright Cafe Sudirman', 'Jl. Sudirman No. 45', 'Jakarta Selatan', 'DKI Jakarta'],
      ['Bright Cafe Asia Afrika', 'Jl. Asia Afrika No. 10', 'Bandung', 'Jawa Barat'],
      ['Bright Cafe Pandanaran', null, 'Semarang', 'Jawa Tengah'],
      ['Bright Cafe Malioboro', 'Jl. Malioboro No. 3', 'Yogyakarta', 'DI Yogyakarta'],
      ['Bright Cafe Basuki Rahmat', 'Jl. Basuki Rahmat No. 12', 'Surabaya', 'Jawa Timur'],
      ['Bright Cafe Tangerang City', 'Jl. Jenderal Sudirman No. 90', 'Tangerang', 'Banten'],
      ['Bright Cafe Sunset Road', 'Jl. Sunset Road No. 15', 'Denpasar', 'Bali'],
      ['Bright Cafe Sisingamangaraja', 'Jl. Sisingamangaraja No. 8', 'Medan', 'Sumatera Utara'],
      ['Bright Cafe Diponegoro', 'Jl. Diponegoro No. 2', 'Pekanbaru', 'Riau'],
    ];
    for (const [name, address, city, province] of brightCafeOutlets) {
      await conn.query(
        `INSERT INTO location_directory (channel, name, address, city, province)
         VALUES ('bright-cafe', ?, ?, ?, ?)`,
        [name, address, city, province]
      );
    }

    for (const promo of PROMOS) {
      await conn.query(
        `INSERT INTO contents (type, category, slug, title, description, body_html, image_url, is_active, created_by)
         VALUES ('promo', ?, ?, ?, ?, ?, ?, TRUE, ?)
         ON DUPLICATE KEY UPDATE
           category = VALUES(category), title = VALUES(title), description = VALUES(description),
           body_html = VALUES(body_html), image_url = VALUES(image_url)`,
        [promo.category, promo.slug, promo.title, promo.description, promo.bodyHtml, promo.imageUrl, adminUser.id]
      );
    }

    const facilityStats = [
      ['spklu', 'SPKLU', 17],
      ['spbklu', 'SPBKLU', 48],
    ];
    for (const [statKey, label, value] of facilityStats) {
      await conn.query(
        'INSERT INTO facility_stats (stat_key, label, value) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE label = VALUES(label), value = VALUES(value)',
        [statKey, label, value]
      );
    }

    const ucollectLocations = [
      ['SPBU Abdul Muis (31.102.02)', 'Jl. Abdul Muis No.59, RT.4/RW.3, Petojo Sel., Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10160', 'Jakarta Pusat'],
      ['SPBU Industri (31.107.01)', 'Jl. Industri Raya, RT.3/RW.2, Gn. Sahari Utara, Kecamatan Sawah Besar, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10720', 'Jakarta Pusat'],
      ['Kantor Pertamina Regional JBB', 'Jl. Kramat Raya No.59, RT.8/RW.8, Kramat, Kec. Senen, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10450', 'Jakarta Pusat'],
      ['SPBU MT Haryono (31.128.02)', 'MT Haryono St, RT.11/RW.5, West Tebet, Kota Jakarta Selatan, Jakarta 12810', 'Jakarta Selatan'],
      ['SPBU Fatmawati 02 (31.124.02)', 'Jl. RS. Fatmawati Raya No.12, RT.4/RW.4, Cipete Sel., Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12410', 'Jakarta Selatan'],
      ['SPBU Gandaria City (31.121.04)', 'Jl. Gandaria 1 No.25-27 1, RT.1/RW.9, Kramat Pela, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12130', 'Jakarta Selatan'],
      ['SPBU Lenteng Agung (31.126.01)', 'Jl. Lenteng Agung Raya, RT.7/RW.1, Lenteng Agung, Kec. Jagakarsa, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12610', 'Jakarta Selatan'],
      ['SPBU Kelapa Gading (34.101.03)', 'Jl. Boulevard Raya, RT.1/RW.2, Kelapa Gading Barat, Kec. Kelapa Gading, Kota Jakarta Utara, Daerah Khusus Ibukota Jakarta 14240', 'Jakarta Utara'],
      ['SPBU Kemayoran (34.103.05)', 'Jl. Benyamin Sueb, RT.5/RW.3, Kemayoran, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10610', 'Jakarta Pusat'],
      ['SPBU Cawang (31.129.02)', 'Jl. MT Haryono, RT.2/RW.4, Cawang, Kec. Kramat Jati, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13340', 'Jakarta Timur'],
    ];
    for (const [name, address, region] of ucollectLocations) {
      const [[existing]] = await conn.query('SELECT id FROM ucollect_locations WHERE name = ?', [name]);
      if (!existing) {
        await conn.query('INSERT INTO ucollect_locations (name, address, region) VALUES (?, ?, ?)', [name, address, region]);
    const faqs = [
      [
        'Bagaimana jika nomor handphone akun MyPertamina dan E-Wallet saya berbeda (LinkAja, OVO, GoPay)?',
        'Pastikan nomor handphone yang terdaftar di akun MyPertamina sama dengan nomor yang terdaftar di aplikasi E-Wallet Anda. Jika berbeda, silakan perbarui salah satu nomor melalui menu Profil agar proses pembayaran dan penukaran poin berjalan lancar.',
      ],
      [
        'Bagaimana cara mendapatkan poin?',
        'Poin MyPertamina otomatis didapatkan setiap kali Anda melakukan transaksi pembelian BBM atau produk non-BBM menggunakan metode pembayaran yang terhubung dengan aplikasi MyPertamina di SPBU rekanan.',
      ],
      [
        'Kapan saya menerima poin setelah berhasil melakukan transaksi?',
        'Poin umumnya masuk ke akun Anda secara otomatis dalam waktu 1x24 jam setelah transaksi berhasil. Jika lebih dari 24 jam poin belum masuk, silakan hubungi Pertamina Contact Center 135.',
      ],
      [
        'Bagaimana jika tidak bisa melakukan scan QR code melalui aplikasi MyPertamina di SPBU?',
        'Pastikan kamera perangkat Anda bersih dan aplikasi MyPertamina sudah diperbarui ke versi terbaru. Jika masalah masih terjadi, Anda dapat meminta petugas SPBU untuk memasukkan kode transaksi secara manual.',
      ],
      [
        'Produk apa saja yang bisa ditukarkan dengan Poin MyPertamina?',
        'Poin MyPertamina dapat ditukarkan dengan berbagai produk seperti voucher belanja, merchandise eksklusif, saldo e-wallet, hingga produk Bright Store dan Bright Cafe yang tersedia di halaman penukaran poin aplikasi.',
      ],
    ];
    for (let i = 0; i < faqs.length; i++) {
      const [question, answer] = faqs[i];
      const [[existingFaq]] = await conn.query('SELECT id FROM faqs WHERE question = ?', [question]);
      if (existingFaq) {
        await conn.query('UPDATE faqs SET answer = ?, sort_order = ? WHERE id = ?', [answer, i, existingFaq.id]);
      } else {
        await conn.query('INSERT INTO faqs (question, answer, sort_order) VALUES (?, ?, ?)', [question, answer, i]);
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
