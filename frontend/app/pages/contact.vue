<script setup lang="ts">
interface Faq {
  id: number
  question: string
  answer: string
}

const { data: faqRes } = await useApi<{ data: Faq[] }>('/faqs', { query: { activeOnly: 'true' } })
const faqs = computed(() => faqRes.value?.data ?? [])

const officeAddress =
  'Wisma Tugu II 2nd Floor, Jl. H. R. Rasuna Said No.9 Kavling C7, Kuningan, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12920'
const mapEmbedSrc = computed(() => `https://www.google.com/maps?q=${encodeURIComponent(officeAddress)}&output=embed`)

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/PertaminaOfficial', icon: 'facebook' },
  { label: 'Instagram', href: 'https://www.instagram.com/pertamina', icon: 'instagram' },
  { label: 'X', href: 'https://x.com/pertamina', icon: 'x' },
]

const copiedLabel = ref<string | null>(null)
let copiedTimeout: ReturnType<typeof setTimeout> | undefined

async function copyNumber() {
  await navigator.clipboard.writeText('135')
  copiedLabel.value = 'Nomor berhasil disalin'
  clearTimeout(copiedTimeout)
  copiedTimeout = setTimeout(() => (copiedLabel.value = null), 2500)
}
</script>

<template>
  <div>
    <AppHeader />

    <section class="hero">
      <div class="container">
        <h1><span class="highlight-blue">Hubungi</span> Kami</h1>
        <p>Hubungi kami untuk pertanyaan, bantuan, atau informasi lebih lanjut mengenai produk dan layanan Pertamina</p>
      </div>
    </section>

    <section class="container faq-section">
      <div class="faq-panel">
        <h2>Pertanyaan yang sering ditanyakan</h2>
        <p class="faq-subtitle">Temukan selengkapnya dengan mengakses beberapa informasi yang disediakan</p>
        <FaqAccordion :faqs="faqs" />
      </div>
    </section>

    <section class="container corporate-section">
      <h2>PT Pertamina Patra Niaga</h2>

      <div class="corporate-block">
        <h3>Alamat</h3>
        <p>{{ officeAddress }}</p>
      </div>

      <div class="corporate-block">
        <h3>Waktu Operasional</h3>
        <p>Senin - Jumat 07:00 am - 04:00 pm</p>
      </div>

      <div class="corporate-block">
        <h3>Pertamina Contact Center</h3>
        <div class="social-icons">
          <a
            v-for="social in socialLinks"
            :key="social.label"
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
            class="social-icon"
            :aria-label="social.label"
          >
            <svg v-if="social.icon === 'facebook'" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 8.5h2V5.5h-2c-2.2 0-4 1.8-4 4V12H9v3h2v6h3v-6h2.2l.8-3H14v-1.5c0-.6.4-1 1-1z" fill="currentColor" />
            </svg>
            <svg v-else-if="social.icon === 'instagram'" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.6" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.6" />
              <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
          </a>
        </div>
      </div>

      <div class="map-frame">
        <iframe :src="mapEmbedSrc" title="Lokasi PT Pertamina Patra Niaga" loading="lazy" allowfullscreen />
      </div>
    </section>

    <section class="container cards-section">
      <div class="contact-card">
        <div class="card-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M4 4c0 8 6 14 14 14l1-3.5-4-1.5-1.5 1.5A11 11 0 018 8.5L9.5 7 8 3z"
              stroke="#1d4ed8"
              stroke-width="1.4"
              fill="none"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="card-body">
          <h3>Pertamina Contact Center 135</h3>
          <p>Ingin berbicara langsung dengan tim kami? Kami siap membantu Anda.</p>
        </div>
        <button type="button" class="card-action" @click="copyNumber">Salin Nomor</button>
      </div>

      <div class="contact-card">
        <div class="card-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="2" y="4" width="18" height="14" rx="2" stroke="#1d4ed8" stroke-width="1.4" />
            <path d="M3 5.5l8 6 8-6" stroke="#1d4ed8" stroke-width="1.4" fill="none" />
          </svg>
        </div>
        <div class="card-body">
          <h3>Kirim Email ke Customer Care</h3>
          <p>Kirim pertanyaan atau kendala Anda secara detail ke <strong>pcc135@pertamina.com</strong></p>
        </div>
        <a class="card-action" href="mailto:pcc135@pertamina.com">Kirim Email</a>
      </div>

      <div class="contact-card">
        <div class="card-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="1" y="7" width="12" height="8" rx="1" stroke="#1d4ed8" stroke-width="1.4" />
            <path d="M13 10h4l3 3v2h-7z" stroke="#1d4ed8" stroke-width="1.4" fill="none" />
            <circle cx="6" cy="17" r="1.5" stroke="#1d4ed8" stroke-width="1.2" />
            <circle cx="16" cy="17" r="1.5" stroke="#1d4ed8" stroke-width="1.2" />
          </svg>
        </div>
        <div class="card-body">
          <h3>Pertamina Delivery Service</h3>
          <p>Layanan antar BBM dan LPG ke lokasi Anda. Hubungi <strong>135</strong> untuk pemesanan!</p>
        </div>
        <button type="button" class="card-action" @click="copyNumber">Salin Nomor</button>
      </div>
    </section>

    <div v-if="copiedLabel" class="toast" role="status">{{ copiedLabel }}</div>
  </div>
</template>

<style scoped>
.hero {
  background: linear-gradient(120deg, #fdf1f6 0%, #f3f0fa 50%, #eef2fb 100%);
  padding: 3rem 0 2.5rem;
}
.hero h1 {
  margin: 0 0 0.75rem;
  font-size: 2.25rem;
  font-weight: 800;
  color: #111827;
}
.highlight-blue {
  color: #1d4ed8;
}
.hero p {
  margin: 0;
  color: #4b5563;
  max-width: 700px;
}

.faq-section {
  padding: 2.5rem 0;
}
.faq-panel {
  background: #fff;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}
.faq-panel h2 {
  margin: 0 0 0.5rem;
  font-size: 1.35rem;
  font-weight: 700;
  color: #111827;
}
.faq-subtitle {
  margin: 0 0 1.5rem;
  color: #6b7280;
}

.corporate-section {
  padding: 1rem 0 2.5rem;
}
.corporate-section h2 {
  margin: 0 0 1.5rem;
  font-size: 1.35rem;
  font-weight: 700;
  color: #111827;
}
.corporate-block {
  margin-bottom: 1.5rem;
}
.corporate-block h3 {
  margin: 0 0 0.4rem;
  color: #1d4ed8;
  font-size: 1rem;
  font-weight: 700;
}
.corporate-block p {
  margin: 0;
  color: #374151;
}
.social-icons {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f3f4f6;
  color: #111827;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}
.map-frame {
  margin-top: 1.5rem;
  border-radius: 1rem;
  overflow: hidden;
  aspect-ratio: 16 / 8;
}
.map-frame iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

.cards-section {
  padding: 1rem 0 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.contact-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1.5rem;
}
.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 0.75rem;
  background: #eff6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.card-body {
  flex: 1;
}
.card-body h3 {
  margin: 0 0 0.35rem;
  font-size: 1.05rem;
  color: #111827;
}
.card-body p {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
}
.card-action {
  flex-shrink: 0;
  padding: 0.6rem 1.5rem;
  border-radius: 999px;
  border: 1px solid #1d4ed8;
  color: #1d4ed8;
  background: #fff;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
}

.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: #111827;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  z-index: 50;
}

@media (max-width: 768px) {
  .contact-card {
    flex-direction: column;
    align-items: flex-start;
  }
  .card-action {
    width: 100%;
    text-align: center;
  }
}
</style>
