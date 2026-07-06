<script setup lang="ts">
withDefaults(
  defineProps<{
    logoUrl?: string | null
    imageUrl?: string | null
  }>(),
  {
    logoUrl: null,
    imageUrl: null,
  },
)
</script>

<template>
  <section class="bg-hero">
    <div class="container hero-grid">
      <div class="hero-copy">
        <img v-if="logoUrl" :src="logoUrl" alt="Bright Gas" class="hero-logo" />
        <div v-else class="hero-logo-fallback">
          Bright<span>Gas</span>
        </div>

        <h1>Extra Protection, Extra Easy</h1>
        <p class="hero-description">
          Bright Gas, solusi energi yang aman, praktis, dan modern, demi perlindungan terbaik keluarga Anda setiap
          hari.
        </p>

        <div class="feature-strip">
          <span>QR Secured</span>
          <span>Double Safety System</span>
        </div>

        <p class="hero-cert">SNI Certified &bull; Verified by Pertamina</p>
      </div>

      <div class="hero-image">
        <img v-if="imageUrl" :src="imageUrl" alt="Tabung Bright Gas" />
        <ImagePlaceholder v-else label="Gambar produk Bright Gas" ratio="4 / 5" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-hero {
  background: linear-gradient(120deg, #fdf1f6 0%, #f7f2fb 45%, #eef2fb 100%);
  overflow: hidden;
}
.hero-grid {
  display: grid;
  grid-template-columns: minmax(280px, 480px) 1fr;
  align-items: center;
  gap: 2rem;
  padding: 3.5rem 1.5rem;
}
.hero-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
}
.hero-logo {
  height: 56px;
}
.hero-logo-fallback {
  font-size: 2.25rem;
  font-weight: 800;
  font-style: italic;
  color: #db2777;
  line-height: 1;
}
.hero-logo-fallback span {
  color: #4c1d95;
}
.hero-copy h1 {
  margin: 0;
  font-size: 1.9rem;
  font-weight: 800;
  color: #111827;
}
.hero-description {
  margin: 0;
  color: #4b5563;
  font-size: 1.05rem;
  max-width: 480px;
}
.feature-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  background: linear-gradient(90deg, #db2777 0%, rgba(219, 39, 119, 0.15) 100%);
  color: #fff;
  font-weight: 700;
  padding: 1rem 1.5rem;
  width: 100%;
  border-radius: 0.25rem;
}
.hero-cert {
  margin: 0;
  color: #374151;
  font-size: 0.9rem;
}
.hero-image {
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-image img {
  width: 100%;
  max-width: 480px;
  height: auto;
  object-fit: contain;
}

@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
  .hero-image {
    order: -1;
  }
}
</style>
