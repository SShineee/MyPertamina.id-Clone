<script setup lang="ts">
interface UcollectLocation {
  id: number
  name: string
  address: string
  region: string
}

const { data: locationsRes } = await useApi<{ data: UcollectLocation[] }>('/sustainability/ucollect-locations')
const allLocations = computed(() => locationsRes.value?.data ?? [])

const search = ref('')
const filteredLocations = computed(() => {
  const query = search.value.trim().toLowerCase()
  if (!query) return allLocations.value
  return allLocations.value.filter(
    (loc) =>
      loc.name.toLowerCase().includes(query) ||
      loc.address.toLowerCase().includes(query) ||
      loc.region.toLowerCase().includes(query)
  )
})

const steps = [
  {
    title: 'Kumpulkan Minyak Jelantah',
    description:
      'Mengumpulkan minyak jelantah atau minyak goreng bekas (Used Cooking Oil/UCO) dengan tujuan mengubahnya menjadi barang yang bermanfaat dan ramah lingkungan melalui daur ulang.',
  },
  {
    title: 'Cek Lokasi ucollect box MyPertamina Terdekat',
    description:
      'Temukan tempat pengumpulan UCO terdekat di sekitar Anda, di mana Anda dapat menuangkan minyak jelantah Anda dengan nyaman dan hati-hati.',
  },
  {
    title: 'Setorkan UCO',
    description:
      'Setorkan UCO Anda ke dalam kotak pengumpulan UCO yang telah ditentukan, untuk kemudian diproses di fasilitas daur ulang dengan cara pindai QR Code dengan aplikasi MyPertamina.',
  },
  {
    title: 'Dapatkan Keuntungannya',
    description: 'Dapatkan poin hingga rupiah tiap liternya sebagai bentuk apresiasi karena telah berkontribusi menjaga lingkungan.',
  },
]
</script>

<template>
  <div>
    <AppHeader />

    <section class="hero">
      <div class="hero-illustration" aria-hidden="true">
        <svg viewBox="0 0 400 260" width="100%" height="100%">
          <ellipse cx="200" cy="230" rx="150" ry="16" fill="#bbf7d0" />
          <rect x="60" y="120" width="90" height="80" rx="6" fill="#16a34a" />
          <rect x="60" y="108" width="90" height="16" rx="4" fill="#15803d" />
          <circle cx="105" cy="150" r="18" fill="#fff" opacity="0.3" />
          <rect x="170" y="150" width="30" height="60" rx="4" fill="#fbbf24" opacity="0.85" />
          <circle cx="250" cy="175" r="30" fill="#f97316" />
          <circle cx="242" cy="168" r="4" fill="#111827" />
          <circle cx="258" cy="168" r="4" fill="#111827" />
          <path d="M242 184q8 8 16 0" stroke="#111827" stroke-width="2" fill="none" stroke-linecap="round" />
        </svg>
      </div>

      <div class="container hero-content">
        <div class="hero-logo">MyPERTAMINA <span>x</span> ucollect <small>by noovoleum</small></div>
        <h1>Dari Sisa Jadi Berkah, Wujudkan Energi Berkelanjutan</h1>
      </div>
    </section>

    <section class="container commitment-section">
      <div class="commitment-text">
        <h2>Komitmen Pertamina terhadap <span class="highlight-green">Sustainability</span></h2>
        <p>
          Sebagai bagian dari komitmen Pertamina dalam mendukung ekonomi sirkular dan pengelolaan energi
          berkelanjutan, MyPertamina menghadirkan Program MyPertamina Minyak Jelantah sebuah inisiatif hijau yang
          mengajak masyarakat untuk mengumpulkan dan menyalurkan minyak goreng bekas pakai (jelantah) agar dapat
          diolah menjadi bahan bakar nabati (biofuel) yang ramah lingkungan.
        </p>
      </div>
      <div class="commitment-video">
        <YoutubeEmbed video-id="aqz-KE-bpKQ" title="Program MyPertamina Minyak Jelantah" />
      </div>
    </section>

    <section class="container steps-section">
      <h2>Cara Berkontribusi <span class="highlight-green">di Program ini</span></h2>
      <div class="steps-grid">
        <div v-for="step in steps" :key="step.title" class="step-card">
          <div class="step-image" aria-hidden="true" />
          <div class="step-text">
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="container uco-section">
      <div class="uco-text">
        <h2>MyPertamina <em>Used Cooking Oil</em> Program</h2>
        <p>
          Inisiatif ini tidak hanya membantu mengurangi pencemaran lingkungan akibat pembuangan minyak jelantah
          sembarangan, tetapi juga mendukung upaya nasional dalam pengembangan energi terbarukan, pengurangan emisi
          karbon, serta peningkatan kesejahteraan masyarakat melalui ekonomi hijau.
        </p>
      </div>
      <div class="uco-benefits">
        <div class="benefit-card">
          <div class="benefit-icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 20V10M12 10c0-4 3-7 7-7 0 4-3 7-7 7zm0 0c0-4-3-7-7-7 0 4 3 7 7 7z" stroke="#16a34a" stroke-width="1.6" fill="none" />
            </svg>
          </div>
          <div>
            <h3>Manfaat untuk lingkungan</h3>
            <p>Mengurangi emisi karbon dan mencegah pencemaran air dengan mengalihkan pembuangan minyak bekas dari saluran dan tempat pembuangan akhir.</p>
          </div>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="9" cy="9" r="5" stroke="#16a34a" stroke-width="1.6" />
              <circle cx="15" cy="15" r="5" stroke="#16a34a" stroke-width="1.6" />
            </svg>
          </div>
          <div>
            <h3>Manfaat untuk ekonomi</h3>
            <p>Membuka potensi nilai ekonomi dari bahan limbah sambil memberikan manfaat dan dukungan bagi perkembangan ekonomi sirkular lokal.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="vision-section">
      <div class="container vision-inner">
        <h2>Visi Kami <span class="highlight-green">Dari Dapur untuk Masa Depan</span></h2>
        <p>
          Dengan semangat "Dari Dapur untuk Masa Depan", Program MyPertamina Minyak Jelantah mengajak seluruh
          lapisan masyarakat untuk berpartisipasi aktif dalam menciptakan energi yang bersih, berkelanjutan, dan
          bermanfaat bagi bumi serta generasi mendatang.
        </p>
      </div>
    </section>

    <section class="container ucollect-section">
      <div class="ucollect-header">
        <h2>Lokasi Ucollect Box</h2>
        <label class="search">
          <input v-model="search" type="search" placeholder="Cari lokasi, alamat, atau wilayah..." aria-label="Cari lokasi" />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="search-icon" aria-hidden="true">
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.5" />
            <path d="M11.5 11.5L15 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </label>
      </div>

      <div v-if="filteredLocations.length" class="ucollect-table-wrap">
        <table class="ucollect-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Lokasi</th>
              <th>Alamat</th>
              <th>Wilayah</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(loc, index) in filteredLocations" :key="loc.id">
              <td>{{ index + 1 }}</td>
              <td>{{ loc.name }}</td>
              <td>{{ loc.address }}</td>
              <td>{{ loc.region }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else class="empty-state">Lokasi "{{ search }}" tidak ditemukan. Coba kata kunci lain.</p>
    </section>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 380px;
  display: flex;
  align-items: center;
  background: linear-gradient(120deg, #dcfce7 0%, #f0fdf4 60%, #ecfdf5 100%);
  overflow: hidden;
}
.hero-illustration {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 40%;
  max-width: 400px;
}
.hero-content {
  position: relative;
  z-index: 1;
  margin-left: auto;
  max-width: 560px;
  text-align: right;
}
.hero-logo {
  font-weight: 800;
  color: #111827;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}
.hero-logo span {
  color: #9ca3af;
  font-weight: 400;
}
.hero-logo small {
  display: block;
  font-weight: 400;
  color: #6b7280;
  font-size: 0.75rem;
}
.hero-content h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 800;
  color: #111827;
  line-height: 1.3;
}

.highlight-green {
  color: #16a34a;
}

.commitment-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: center;
  padding: 3rem 1.5rem;
}
.commitment-text h2 {
  margin: 0 0 1rem;
  font-size: 1.75rem;
  font-weight: 800;
  color: #111827;
}
.commitment-text p {
  margin: 0;
  color: #4b5563;
  line-height: 1.7;
}

.steps-section {
  padding: 1.5rem 1.5rem 3rem;
}
.steps-section h2 {
  margin: 0 0 2rem;
  font-size: 1.75rem;
  font-weight: 800;
  color: #111827;
}
.steps-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
.step-card {
  display: flex;
  gap: 1.25rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1.5rem;
}
.step-image {
  flex-shrink: 0;
  width: 90px;
  height: 90px;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, #bbf7d0, #dcfce7);
}
.step-text h3 {
  margin: 0 0 0.5rem;
  color: #16a34a;
  font-size: 1rem;
}
.step-text p {
  margin: 0;
  color: #4b5563;
  font-size: 0.9rem;
  line-height: 1.6;
}

.uco-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  padding: 1.5rem 1.5rem 3rem;
}
.uco-text h2 {
  margin: 0 0 1rem;
  font-size: 1.75rem;
  font-weight: 800;
  color: #111827;
}
.uco-text h2 em {
  color: #16a34a;
  font-style: italic;
}
.uco-text p {
  margin: 0;
  color: #4b5563;
  line-height: 1.7;
}
.uco-benefits {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.benefit-card {
  display: flex;
  gap: 1rem;
  background: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}
.benefit-icon {
  width: 44px;
  height: 44px;
  border-radius: 0.75rem;
  background: #ecfdf3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.benefit-card h3 {
  margin: 0 0 0.4rem;
  color: #16a34a;
  font-size: 1rem;
}
.benefit-card p {
  margin: 0;
  color: #4b5563;
  font-size: 0.9rem;
  line-height: 1.6;
}

.vision-section {
  background: #f9fafb;
  padding: 4rem 1.5rem;
}
.vision-inner {
  max-width: 720px;
  text-align: center;
}
.vision-inner h2 {
  margin: 0 0 1.25rem;
  font-size: 1.75rem;
  font-weight: 800;
  color: #111827;
}
.vision-inner p {
  margin: 0;
  color: #4b5563;
  line-height: 1.8;
  font-size: 1.05rem;
}

.ucollect-section {
  padding: 3rem 1.5rem 4rem;
}
.ucollect-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.ucollect-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 800;
  color: #111827;
}
.search {
  position: relative;
  display: inline-flex;
  align-items: center;
}
.search input {
  width: 280px;
  padding: 0.6rem 2.5rem 0.6rem 1.1rem;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  font-size: 0.9rem;
}
.search-icon {
  position: absolute;
  right: 0.9rem;
  color: #9ca3af;
  pointer-events: none;
}

.ucollect-table-wrap {
  border-radius: 0.75rem;
  overflow-x: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}
.ucollect-table {
  width: 100%;
  min-width: 640px;
  border-collapse: collapse;
}
.ucollect-table thead tr {
  background: #14532d;
}
.ucollect-table th {
  color: #fff;
  text-align: left;
  padding: 0.9rem 1.25rem;
  font-weight: 600;
  font-size: 0.9rem;
}
.ucollect-table td {
  padding: 0.9rem 1.25rem;
  font-size: 0.9rem;
  color: #111827;
  background: #fff;
  border-bottom: 1px solid #f3f4f6;
}
.ucollect-table tbody tr:hover td {
  background: #fef9c3;
}
.empty-state {
  padding: 2.5rem 1.5rem;
  text-align: center;
  color: #6b7280;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
}

@media (max-width: 768px) {
  .commitment-section,
  .steps-grid,
  .uco-section {
    grid-template-columns: 1fr;
  }
  .hero-content {
    text-align: left;
    margin-left: 0;
  }
  .hero-illustration {
    display: none;
  }
  .step-card {
    flex-direction: column;
  }
}
</style>
