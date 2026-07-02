<script setup lang="ts">
const stats = [
  { value: '3.7K+', label: 'SPBU Pertamina', icon: 'pump' },
  { value: '408', label: 'SPBU Green Energy Station', icon: 'bolt' },
  { value: '136', label: 'Bright Store', icon: 'store' },
  { value: '8', label: 'Bright Cafe', icon: 'cup' },
]

const channels = [
  {
    title: 'SPBU Pertamina',
    highlight: 'SPBU',
    description:
      'Jaringan terluas dengan hadir di seluruh Indonesia, memastikan energi selalu tersedia dan mendukung mobilitas konsumen dengan jaminan kualitas dan takaran pas untuk performa mesin kendaraan Anda.',
    imageUrl: '/images/channel/spbu-pertamina.jpg',
    imageAlt: 'SPBU Pertamina',
    buttonLink: '/produk/spbu-pertamina',
    imagePosition: 'right' as const,
  },
  {
    title: 'SPBU Pertamina Green Energy Station',
    highlight: 'Green Energy Station',
    description:
      'Wujud nyata Pertamina untuk melestarikan bumi. SPBU Pertamina Green Energy Station hadir dengan SPBU yang berkonsepkan ramah lingkungan dengan layanan Solar PV, Charging Station, dan Battery Swapping untuk kendaraan listrik.',
    imageUrl: '/images/channel/spbu-green-energy-station.jpg',
    imageAlt: 'SPBU Pertamina Green Energy Station',
    buttonLink: '/produk/spbu-green-energy-station',
    imagePosition: 'left' as const,
  },
  {
    title: 'Bright Store',
    highlight: 'Store',
    description:
      'Butuh camilan atau kebutuhan darurat di jalan? Semua tersedia lengkap, praktis, dan higienis. Bright Store tidak hanya menyediakan kebutuhan harian, namun juga menyediakan kebutuhan lainnya seperti Bright Gas dan pelumas Pertamina.',
    imageUrl: '/images/channel/bright-store.jpg',
    imageAlt: 'Bright Store',
    buttonLink: '/produk/bright-store',
    imagePosition: 'right' as const,
  },
  {
    title: 'Bright Cafe',
    highlight: 'Cafe',
    description:
      'Bright Cafe hadir di SPBU Pertamina sebagai one-stop solution yang menyediakan tempat recharge energi tubuh Anda. Nikmati kopi berkualitas dan suasana nyaman untuk istirahat sejenak sebelum melanjutkan perjalanan.',
    imageUrl: '/images/channel/bright-cafe.jpg',
    imageAlt: 'Bright Cafe',
    buttonLink: '/produk/bright-cafe',
    imagePosition: 'left' as const,
  },
]
</script>

<template>
  <div>
    <AppHeader />

    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-illustration" aria-hidden="true">
          <svg viewBox="0 0 400 260" width="100%" height="100%">
            <rect x="0" y="180" width="400" height="80" fill="#dbeafe" />
            <rect x="30" y="90" width="200" height="12" rx="6" fill="#dc2626" />
            <rect x="40" y="102" width="20" height="80" fill="#e5e7eb" />
            <rect x="200" y="102" width="20" height="80" fill="#e5e7eb" />
            <rect x="70" y="140" width="16" height="55" fill="#f3f4f6" stroke="#d1d5db" />
            <rect x="150" y="140" width="16" height="55" fill="#f3f4f6" stroke="#d1d5db" />
            <rect x="250" y="120" width="110" height="70" rx="6" fill="#fff" stroke="#e5e7eb" />
            <rect x="250" y="112" width="110" height="14" rx="4" fill="#dc2626" />
            <ellipse cx="120" cy="215" rx="55" ry="18" fill="#93c5fd" />
            <rect x="80" y="185" width="80" height="30" rx="8" fill="#1e3a8a" />
            <circle cx="98" cy="215" r="9" fill="#111827" />
            <circle cx="150" cy="215" r="9" fill="#111827" />
          </svg>
        </div>

        <div class="hero-content">
          <h1 class="hero-title">MyPertamina Channel</h1>
          <p class="hero-subtitle">Satu Perhentian, Berjuta Kenyamanan Bersama MyPertamina</p>
          <p class="hero-description">
            Perjalanan Anda begitu berharga. Karena itu, MyPertamina Channel hadir lebih dari sekadar tempat
            pengisian bahan bakar. Kami menciptakan ekosistem layanan terpadu untuk menemani mobilitas dan gaya
            hidup Anda
          </p>
        </div>
      </div>
    </section>

    <section class="container stats-section">
      <div class="stats-grid">
        <div v-for="stat in stats" :key="stat.label" class="stat-card">
          <div class="stat-text">
            <p class="stat-value">{{ stat.value }}</p>
            <p class="stat-label">{{ stat.label }}</p>
          </div>
          <svg v-if="stat.icon === 'pump'" class="stat-icon" viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
            <rect x="8" y="6" width="18" height="30" rx="3" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5" />
            <rect x="12" y="12" width="10" height="6" rx="1" fill="#dc2626" />
            <path d="M26 16h4a2 2 0 0 1 2 2v10a2 2 0 0 0 2 2" fill="none" stroke="#dc2626" stroke-width="1.5" />
          </svg>
          <svg v-else-if="stat.icon === 'bolt'" class="stat-icon" viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
            <rect x="8" y="8" width="24" height="24" rx="4" fill="#dcfce7" />
            <path d="M21 10l-9 13h7l-2 9 10-14h-7z" fill="#16a34a" />
          </svg>
          <svg v-else-if="stat.icon === 'store'" class="stat-icon" viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
            <rect x="6" y="16" width="28" height="18" rx="2" fill="#fee2e2" />
            <path d="M6 16l3-8h22l3 8" fill="none" stroke="#dc2626" stroke-width="1.5" />
            <rect x="17" y="24" width="6" height="10" fill="#dc2626" />
          </svg>
          <svg v-else class="stat-icon" viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
            <path d="M10 16h16v8a8 8 0 0 1-8 8 8 8 0 0 1-8-8z" fill="#fef3c7" stroke="#d97706" stroke-width="1.5" />
            <path d="M26 18h3a3 3 0 0 1 0 6h-3" fill="none" stroke="#d97706" stroke-width="1.5" />
          </svg>
        </div>
      </div>
    </section>

    <section class="container channels-section">
      <ChannelCard
        v-for="channel in channels"
        :key="channel.title"
        :title="channel.title"
        :highlight="channel.highlight"
        :description="channel.description"
        :image-url="channel.imageUrl"
        :image-alt="channel.imageAlt"
        :button-link="channel.buttonLink"
        :image-position="channel.imagePosition"
      />
    </section>
  </div>
</template>

<style scoped>
.hero {
  background: linear-gradient(180deg, #bfdbfe 0%, #eff6ff 100%);
  padding: 3rem 0;
}
.hero-inner {
  display: flex;
  align-items: center;
  gap: 3rem;
}
.hero-illustration {
  flex: 1 1 45%;
}
.hero-content {
  flex: 1 1 55%;
}
.hero-title {
  margin: 0 0 0.5rem;
  font-size: 2.25rem;
  font-weight: 800;
  color: #1e3a8a;
}
.hero-subtitle {
  margin: 0 0 1rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #dc2626;
}
.hero-description {
  margin: 0;
  color: #374151;
  font-size: 1rem;
  line-height: 1.7;
  max-width: 520px;
}

.stats-section {
  padding: 2.5rem 0;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}
.stat-card {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.stat-value {
  margin: 0 0 0.35rem;
  font-size: 1.75rem;
  font-weight: 800;
  color: #1d4ed8;
}
.stat-label {
  margin: 0;
  color: #4b5563;
  font-size: 0.9rem;
}
.stat-icon {
  flex-shrink: 0;
}

.channels-section {
  padding: 1rem 0 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .hero-inner {
    flex-direction: column;
  }
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
