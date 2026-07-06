<script setup lang="ts">
withDefaults(
  defineProps<{
    imageUrl?: string | null
  }>(),
  {
    imageUrl: '/images/product/bright-gas/scanner.png',
  },
)

interface CheckStep {
  key: string
  caption: string
  image: string | null
}

const steps: CheckStep[] = [
  { key: 'nomor-seri', caption: 'Nomor Seri dan keaslian tabung', image: null },
  { key: 'lokasi-pengisian', caption: 'Lokasi pengisian resmi Pertamina', image: null },
  { key: 'tanggal-produksi', caption: 'Tanggal Produksi dan Pengecekan Terakhir', image: null },
  { key: 'informasi-keamanan', caption: 'Informasi Keamanan dan panduan penggunaan', image: null },
]

const googlePlayUrl = 'https://play.google.com/store/apps/details?id=com.telkomsel.mypertamina'

const imageFailed = ref(false)
</script>

<template>
  <section class="container scanner-section">
    <div class="scanner-panel">
      <div class="scanner-text">
        <h2><span class="highlight">Bright Gas Scanner:</span> Inovasi Keamanan &amp; Keaslian Tabung Gas Anda!</h2>
        <p>
          Bright Gas Scanner membantu Anda mengecek keaslian tabung hanya dengan memindai QR Code atau barcode. Dengan
          sekali scan, Anda bisa memastikan tabung yang digunakan adalah produk resmi dan terjamin keamanannya.
        </p>
        <a class="store-badge" :href="googlePlayUrl" target="_blank" rel="noopener noreferrer">
          Get it on Google Play
        </a>
      </div>

      <div class="scanner-image">
        <img v-if="imageUrl && !imageFailed" :src="imageUrl" alt="Bright Gas Scanner" @error="imageFailed = true" />
        <ImagePlaceholder v-else label="Gambar Bright Gas Scanner" ratio="16 / 10" />
      </div>
    </div>

    <div class="steps-intro">
      <h3>Gimana <span class="highlight">Cara Ceknya?</span></h3>
      <p>Cukup scan QR code pada segel atau badan tabung Bright Gas dengan smartphone untuk langsung mendapatkan informasi penting, seperti:</p>
    </div>

    <div class="steps-grid">
      <div v-for="step in steps" :key="step.key" class="step-card">
        <div class="step-image">
          <img v-if="step.image" :src="step.image" :alt="step.caption" />
          <ImagePlaceholder v-else :label="step.caption" ratio="4 / 3" />
        </div>
        <p class="step-caption">{{ step.caption }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scanner-section {
  padding: 2.5rem 1.5rem 3.5rem;
}
.highlight {
  color: #db2777;
}
.scanner-panel {
  display: grid;
  grid-template-columns: minmax(280px, 480px) 1fr;
  gap: 2.5rem;
  align-items: center;
  background: #fff;
  border-radius: 1.25rem;
  padding: 2.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  margin-bottom: 3rem;
}
.scanner-text h2 {
  margin: 0 0 1rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
  line-height: 1.35;
}
.scanner-text p {
  margin: 0 0 1.5rem;
  color: #4b5563;
}
.store-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #111827;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
}
.scanner-image img {
  width: 100%;
  max-height: 380px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}

.steps-intro {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 2rem;
}
.steps-intro h3 {
  margin: 0 0 0.75rem;
  font-size: 1.3rem;
  font-weight: 700;
  color: #111827;
}
.steps-intro p {
  margin: 0;
  color: #6b7280;
}
.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
.step-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  overflow: hidden;
}
.step-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.step-caption {
  margin: 0;
  padding: 0.9rem 1rem;
  color: #374151;
  font-size: 0.9rem;
  font-weight: 500;
}

@media (max-width: 900px) {
  .scanner-panel {
    grid-template-columns: 1fr;
  }
  .steps-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 520px) {
  .steps-grid {
    grid-template-columns: 1fr;
  }
}
</style>
