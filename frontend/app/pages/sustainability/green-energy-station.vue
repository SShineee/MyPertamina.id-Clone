<script setup lang="ts">
interface FacilityStat {
  stat_key: string
  label: string
  value: number
}

const { data: statsRes } = await useApi<{ data: FacilityStat[] }>('/sustainability/facility-stats')
const stats = computed(() => statsRes.value?.data ?? [])

const features = [
  {
    icon: 'solar',
    title: 'PLTS Solar Power',
    description: 'Pembangkit listrik tenaga surya sebagai sumber energi utama untuk operasional GES',
  },
  {
    icon: 'bolt',
    title: 'EV Charging Station',
    description: 'Layanan pengisian kendaraan listrik terintegrasi untuk mendukung ekosistem kendaraan listrik nasional',
  },
  {
    icon: 'leaf',
    title: 'Energi Bersih',
    description: 'Komitmen nyata dalam pengurangan emisi karbon dan pelestarian lingkungan untuk generasi mendatang',
  },
  {
    icon: 'gauge',
    title: 'Efisiensi Maksimal',
    description: 'Teknologi terkini untuk memaksimalkan efisiensi energi dan mengurangi pemborosan sumber daya alam',
  },
]

const galleryItems = [
  {
    title: 'Swapping Station (SPBKLU)',
    description:
      'Pada SPBU Pertamina Green Energy Station (GES), tersedia Battery Swapping Station (SPBKLU) untuk pengendara motor listrik yang dinamis.',
    imageUrl: '/images/ges/gallery-swapping-station.jpg',
  },
  {
    title: 'Solar PV (Panel Surya)',
    description:
      'Setiap SPBU Pertamina Green Energy Station (GES) dilengkapi dengan Solar PV (Panel Surya) yang mengubah sinar matahari menjadi sumber energi utama operasional SPBU. Ini adalah langkah konkret dalam memanfaatkan energi terbarukan hingga mengurangi emisi karbon.',
    imageUrl: '/images/ges/gallery-solar-pv.jpg',
  },
  {
    title: 'EV Charging (SPKLU)',
    description:
      'Fasilitas Charging Station (SPKLU) di SPBU Pertamina Green Energy Station (GES) dirancang kompatibel untuk berbagai jenis kendaraan listrik dan dilengkapi teknologi Fast Charging yang efisien.',
    imageUrl: '/images/ges/gallery-ev-charging.jpg',
  },
  {
    title: 'Area Hijau & Ruang Tunggu',
    description:
      'Dilengkapi ruang tunggu yang nyaman dan area hijau untuk pengalaman menunggu pengisian daya yang lebih menyenangkan.',
    imageUrl: '/images/ges/gallery-waiting-area.jpg',
  },
]

const otherChannels = [
  { label: 'Bright Store', to: '/about/mypertamina-channel', color: '#ffffff', textColor: '#111827' },
  { label: 'Bright Cafe', to: '/about/mypertamina-channel', color: '#ffffff', textColor: '#111827' },
  {
    label: 'Sustainability Minyak Jelantah',
    to: '/sustainability/kumpulkan-minyak-jelantah',
    color: '#16a34a',
    textColor: '#ffffff',
  },
]

const activeGalleryIndex = ref(0)
</script>

<template>
  <div>
    <AppHeader />

    <section class="hero">
      <div class="hero-illustration" aria-hidden="true">
        <svg viewBox="0 0 500 300" width="100%" height="100%" preserveAspectRatio="xMidYMax slice">
          <rect x="0" y="230" width="500" height="70" fill="#e5e7eb" />
          <rect x="60" y="120" width="240" height="14" rx="4" fill="#dc2626" />
          <rect x="75" y="134" width="20" height="96" fill="#e5e7eb" />
          <rect x="265" y="134" width="20" height="96" fill="#e5e7eb" />
          <rect x="110" y="170" width="16" height="60" fill="#f9fafb" stroke="#d1d5db" />
          <rect x="200" y="170" width="16" height="60" fill="#f9fafb" stroke="#d1d5db" />
          <rect x="330" y="150" width="120" height="80" rx="6" fill="#fff" stroke="#d1d5db" />
          <rect x="360" y="200" width="24" height="70" fill="#16a34a" />
          <rect x="400" y="190" width="24" height="80" fill="#16a34a" />
        </svg>
      </div>
      <div class="hero-overlay" />

      <div class="container hero-content">
        <div class="ges-logo">
          <span class="leaf" aria-hidden="true">🍃</span>
          <span class="ges-logo-text">GREEN<br />ENERGY<br />STATION</span>
        </div>
        <h1>Langkah Nyata Menuju Energi Bersih dan Berkelanjutan</h1>
      </div>
    </section>

    <section class="container intro-cards">
      <div class="intro-card">
        <p>
          SPBU Pertamina Green Energy Station (GES) hadir dengan SPBU yang berkonsepkan ramah lingkungan dengan
          menggunakan Solar PV dan berkomitmen untuk menyediakan sumber energi yang ramah lingkungan.
        </p>
      </div>
      <div class="intro-card">
        <p>
          Tidak hanya bahan bakar berkualitas, SPBU Pertamina GES juga dilengkapi dengan layanan Charging Station
          dan Battery Swapping guna mendukung pencapaian target Net Zero Emission (NZE) ditahun 2060.
        </p>
      </div>
    </section>

    <section class="container features-section">
      <h2>Langkah Nyata Pertamina untuk <span class="highlight-green">Masa Depan Berkelanjutan</span></h2>
      <p class="section-description">
        Inovasi Pertamina dalam menghadirkan solusi energi berkelanjutan yang ramah lingkungan, SPBU Pertamina Green
        Energy Station merupakan komitmen nyata dalam menjaga kelestarian lingkungan dan mengurangi emisi karbon
        untuk masa depan yang lebih baik.
      </p>

      <div class="features-grid">
        <div v-for="feature in features" :key="feature.title" class="feature-card">
          <div class="feature-icon">
            <svg v-if="feature.icon === 'solar'" width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="9" height="9" stroke="#16a34a" stroke-width="1.5" />
              <rect x="14" y="3" width="9" height="9" stroke="#16a34a" stroke-width="1.5" />
              <rect x="3" y="14" width="9" height="9" stroke="#16a34a" stroke-width="1.5" />
              <rect x="14" y="14" width="9" height="9" stroke="#16a34a" stroke-width="1.5" />
            </svg>
            <svg v-else-if="feature.icon === 'bolt'" width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
              <circle cx="13" cy="13" r="10" stroke="#16a34a" stroke-width="1.5" />
              <path d="M14 7l-6 8h4l-1 5 6-8h-4z" fill="#16a34a" />
            </svg>
            <svg v-else-if="feature.icon === 'leaf'" width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
              <path d="M6 20c-2-8 2-15 15-15 1 9-4 15-15 15z" stroke="#16a34a" stroke-width="1.5" fill="none" />
              <path d="M8 18c4-6 8-8 12-11" stroke="#16a34a" stroke-width="1.5" />
            </svg>
            <svg v-else width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
              <circle cx="13" cy="13" r="10" stroke="#16a34a" stroke-width="1.5" />
              <path d="M13 13l5-3" stroke="#16a34a" stroke-width="1.5" stroke-linecap="round" />
              <circle cx="13" cy="13" r="1.5" fill="#16a34a" />
            </svg>
          </div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <section class="container gallery-section">
      <h2><span class="highlight-green">Galeri</span> SPBU Green Energy Station</h2>
      <p class="section-description">
        Fasilitas di SPBU Pertamina Green Energy Station dirancang modern dan berorientasi pada kenyamanan konsumen,
        dilengkapi dengan area hijau, tempat istirahat yang nyaman, hingga digitalisasi layanan pembayaran melalui
        aplikasi MyPertamina untuk mendukung transaksi non-tunai yang lebih cepat dan aman.
      </p>

      <SlideCarousel :item-count="galleryItems.length" @update:active-index="(i) => (activeGalleryIndex = i)">
        <template #default="{ index }">
          <article class="gallery-card">
            <div class="gallery-image">
              <img :src="galleryItems[index].imageUrl" :alt="galleryItems[index].title" @error="($event.target as HTMLImageElement).style.display = 'none'" />
            </div>
            <h3>{{ galleryItems[index].title }}</h3>
            <p>{{ galleryItems[index].description }}</p>
          </article>
        </template>
      </SlideCarousel>
      <p class="gallery-position">{{ activeGalleryIndex + 1 }}/{{ galleryItems.length }}</p>
    </section>

    <section class="container location-section">
      <div class="location-header">
        <div>
          <h2><span class="highlight-green">Lokasi</span> SPBU Green Energy Station</h2>
          <p class="section-description">
            Inovasi Pertamina menghadirkan solusi energi berkelanjutan dengan teknologi terdepan, melalui stasiun
            pengisian yang mendukung pelestarian lingkungan dan pengurangan emisi karbon
          </p>
        </div>
        <NuxtLink to="/spbu-location/green-energy-station" class="cta-button">Lihat Lokasi SPBU GES &rarr;</NuxtLink>
      </div>

      <div class="stats-grid">
        <div v-for="stat in stats" :key="stat.stat_key" class="stat-card">
          <div class="stat-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <rect x="4" y="3" width="10" height="16" rx="2" stroke="#16a34a" stroke-width="1.5" />
              <path d="M15 8h2a1 1 0 011 1v6a1 1 0 001 1" stroke="#16a34a" stroke-width="1.5" fill="none" />
            </svg>
          </div>
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </section>

    <section class="container channel-section">
      <h2>Lihat MyPertamina Channel Lainnya</h2>
      <div class="channel-grid">
        <NuxtLink
          v-for="channel in otherChannels"
          :key="channel.label"
          :to="channel.to"
          class="channel-card"
          :style="{ background: channel.color, color: channel.textColor }"
        >
          <span class="channel-label">{{ channel.label }}</span>
          <span class="channel-arrow" aria-hidden="true">&#8599;</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 420px;
  display: flex;
  align-items: flex-end;
  background: linear-gradient(180deg, #bfdbfe 0%, #eff6ff 60%, #e5e7eb 100%);
  overflow: hidden;
}
.hero-illustration {
  position: absolute;
  inset: 0;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.05) 55%, rgba(0, 0, 0, 0) 100%);
}
.hero-content {
  position: relative;
  z-index: 1;
  padding-bottom: 3rem;
  max-width: 520px;
}
.ges-logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.25rem;
}
.leaf {
  font-size: 2rem;
}
.ges-logo-text {
  color: #16a34a;
  font-weight: 800;
  font-size: 1.1rem;
  line-height: 1.1;
}
.hero-content h1 {
  margin: 0;
  color: #fff;
  font-size: 1.9rem;
  font-weight: 700;
  line-height: 1.3;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}

.intro-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  padding: 2.5rem 1.5rem;
}
.intro-card {
  background: #fff;
  border-radius: 1rem;
  padding: 1.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}
.intro-card p {
  margin: 0;
  color: #374151;
  line-height: 1.7;
}

.highlight-green {
  color: #16a34a;
}
.section-description {
  color: #4b5563;
  max-width: 900px;
  line-height: 1.7;
  margin: 0.75rem 0 2rem;
}

.features-section,
.gallery-section,
.location-section {
  padding: 1.5rem 1.5rem 3rem;
}
.features-section h2,
.gallery-section h2,
.location-section h2 {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 800;
  color: #111827;
}
.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
.feature-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1.5rem;
}
.feature-icon {
  width: 48px;
  height: 48px;
  border-radius: 0.75rem;
  background: #ecfdf3;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}
.feature-card h3 {
  margin: 0 0 0.5rem;
  color: #16a34a;
  font-size: 1.05rem;
}
.feature-card p {
  margin: 0;
  color: #4b5563;
  font-size: 0.9rem;
  line-height: 1.6;
}

.gallery-card {
  background: #fff;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}
.gallery-image {
  aspect-ratio: 4 / 3;
  background: linear-gradient(135deg, #dcfce7, #eff6ff);
}
.gallery-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.gallery-card h3 {
  margin: 1rem 1rem 0.5rem;
  color: #16a34a;
  font-size: 1.05rem;
}
.gallery-card p {
  margin: 0 1rem 1.25rem;
  color: #4b5563;
  font-size: 0.9rem;
  line-height: 1.6;
}
.gallery-position {
  margin: 0.75rem 0 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.location-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
.cta-button {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #1d4ed8;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
}
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
.stat-card {
  background: #fff;
  border-radius: 1rem;
  padding: 1.75rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}
.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 0.75rem;
  background: #ecfdf3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.stat-value {
  font-size: 1.75rem;
  font-weight: 800;
  color: #16a34a;
  margin-right: 0.5rem;
}
.stat-label {
  color: #4b5563;
  font-size: 0.95rem;
}

.channel-section {
  padding: 1.5rem 1.5rem 4rem;
}
.channel-section h2 {
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}
.channel-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.channel-card {
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  text-align: center;
}
.channel-arrow {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: #111827;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .intro-cards,
  .features-grid,
  .stats-grid,
  .channel-grid {
    grid-template-columns: 1fr;
  }
  .hero-content h1 {
    font-size: 1.5rem;
  }
  .location-header {
    flex-direction: column;
  }
}
</style>
