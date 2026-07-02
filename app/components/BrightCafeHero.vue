<script setup lang="ts">
function scrollToDirectory() {
  document.getElementById('lokasi-bright-cafe')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="hero">
    <div class="hero-bg">
      <ImagePlaceholder label="Foto latar: barista menuangkan kopi" fill />
    </div>
    <div class="hero-overlay" />

    <div class="container hero-content">
      <span class="logo">Bright Cafe</span>
      <p class="tagline">Ngopi santai, isi bensin, semua beres di satu tempat.</p>
      <button type="button" class="btn-cta" @click="scrollToDirectory">
        Cari Lokasi Bright Cafe <span aria-hidden="true">&#8595;</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  min-height: 420px;
  display: flex;
  align-items: center;
  overflow: hidden;
  color: #fff;
}
.hero-bg {
  position: absolute;
  inset: 0;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(17, 24, 39, 0.55);
  z-index: 1;
}
.hero-content {
  position: relative;
  z-index: 2;
  padding: 3rem 1.5rem;
  text-align: center;
  margin: 0 auto;
}
.logo {
  display: block;
  font-family: 'Brush Script MT', 'Segoe Script', cursive;
  font-style: italic;
  font-size: 3rem;
  color: #fbbf24;
  text-shadow: 0 0 12px rgba(251, 191, 36, 0.6);
  margin-bottom: 1rem;
}
.tagline {
  margin: 0 0 1.75rem;
  font-size: 1.1rem;
  opacity: 0.95;
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
</style>
