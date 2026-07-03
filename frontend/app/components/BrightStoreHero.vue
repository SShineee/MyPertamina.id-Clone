<script setup lang="ts">
function scrollToDirectory() {
  document.getElementById('lokasi-bright-store')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="hero">
    <div class="container hero-grid">
      <div class="hero-text">
        <span class="logo">
          <span class="logo-bright">Bright</span><span class="logo-store">Store</span>
        </span>
        <h1>Have a Bright Day...</h1>
        <p>
          Belanja kebutuhan harian jadi lebih praktis dan menyenangkan di Bright Store, convenience
          store resmi Pertamina yang tersedia di SPBU pilihan.
        </p>
        <button type="button" class="btn-cta" @click="scrollToDirectory">
          Cari Lokasi Bright Store <span aria-hidden="true">&#8595;</span>
        </button>
      </div>
      <div class="hero-visual">
        <ImagePlaceholder label="Foto fasad toko Bright Store (cutout)" ratio="4 / 5" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: linear-gradient(180deg, #ffffff 0%, #f3f4f6 100%);
  padding: 3.5rem 0;
}
.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: center;
}
.logo {
  display: inline-flex;
  font-weight: 800;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}
.logo-bright {
  color: #dc2626;
}
.logo-store {
  color: #111827;
}
.hero-text h1 {
  margin: 0 0 1rem;
  font-size: 2.25rem;
  font-weight: 800;
  color: #111827;
}
.hero-text p {
  margin: 0 0 1.75rem;
  color: #374151;
  max-width: 480px;
}
.btn-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #1d4ed8;
  color: #fff;
  border: none;
  padding: 0.85rem 1.75rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
}
@media (max-width: 768px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
  .hero-visual {
    order: -1;
  }
}
</style>
