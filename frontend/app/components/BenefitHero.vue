<script setup lang="ts">
withDefaults(
  defineProps<{
    videoId?: string
  }>(),
  {
    videoId: 'dQw4w9WgXcQ',
  },
)
</script>

<template>
  <section class="benefit-hero">
    <div class="container hero-content">
      <h1>MYPERTAMINA BERAGAM KEISTIMEWAAN DALAM SATU APLIKASI</h1>
      <a class="btn btn-cta" href="#poin">
        Cek Poin MyPertamina
        <span aria-hidden="true">&#8594;</span>
      </a>
    </div>

    <svg class="wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
      <path fill="#f9fafb" d="M0,32 C240,90 480,0 720,32 C960,64 1200,10 1440,48 L1440,90 L0,90 Z" />
    </svg>
  </section>

  <section class="container energi-section">
    <div class="energi-text">
      <h2>Energi Untuk Negeri Dalam Genggaman</h2>
      <p>
        Sebagai bagian dari kontribusi Pertamina untuk negeri, MyPertamina menghadirkan
        kemudahan mengakses energi bagi seluruh masyarakat Indonesia &mdash; kapan pun dan di
        mana pun Anda berada.
      </p>
    </div>
    <div class="energi-video">
      <YoutubeEmbed :video-id="videoId" title="Energi Untuk Negeri Dalam Genggaman" />
    </div>
  </section>
</template>

<style scoped>
.benefit-hero {
  position: relative;
  background: linear-gradient(135deg, #1e3a8a, #1d4ed8 55%, #3b82f6);
  color: #fff;
  padding: 5rem 0 6rem;
  overflow: hidden;
}
.hero-content {
  text-align: center;
  max-width: 760px;
  margin: 0 auto;
}
.hero-content h1 {
  margin: 0 0 2rem;
  font-size: 2.25rem;
  font-weight: 800;
  line-height: 1.3;
}
.btn-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #fff;
  color: #1d4ed8;
  padding: 0.85rem 1.75rem;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
}
.wave {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 90px;
  display: block;
}
.energi-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: center;
  padding: 3rem 1.5rem;
}
.energi-text h2 {
  margin: 0 0 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}
.energi-text p {
  margin: 0;
  color: #374151;
}
@media (max-width: 768px) {
  .energi-section {
    grid-template-columns: 1fr;
  }
  .hero-content h1 {
    font-size: 1.65rem;
  }
}
</style>
