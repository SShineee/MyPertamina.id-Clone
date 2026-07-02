<script setup lang="ts">
withDefaults(
  defineProps<{
    videoSrc?: string
    posterSrc?: string
    appStoreUrl?: string
    aboutUrl?: string
  }>(),
  {
    videoSrc: '/videos/hero-spbu.mp4',
    posterSrc: undefined,
    appStoreUrl: 'https://play.google.com/store/apps/details?id=com.telkomsel.mypertamina',
    aboutUrl: '/tentang',
  },
)
</script>

<template>
  <section class="hero">
    <video class="hero-video" autoplay muted loop playsinline :poster="posterSrc">
      <source :src="videoSrc" type="video/mp4" />
    </video>
    <div class="hero-overlay" />

    <div class="hero-container">
      <div class="hero-content">
        <h1 class="hero-headline">Rasakan Berbagai Kemudahan Bertransaksi & Beragam Keistimewaan Bersama MyPertamina</h1>
        <p class="hero-description">
          MyPertamina hadir sebagai apresiasi kepada pelanggan setia Pertamina melalui penawaran berbagai promo dan 
          program loyalti menarik, hingga pengalaman berkendara yang praktis dengan kemudahan bertransaksi melalui 
          satu aplikasi.
        </p>

        <div class="hero-actions">
          <a
            class="btn btn-primary"
            :href="appStoreUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="icon-download" aria-hidden="true">&#8595;</span>
            Dapatkan Aplikasi
          </a>

          <NuxtLink class="btn btn-secondary" :to="aboutUrl">
            Pelajari Lebih Lanjut
            <span class="icon-external" aria-hidden="true">&#8599;</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  min-height: 480px;
  display: flex;
  align-items: center;
  overflow: hidden;
  color: #fff;
}
.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.35) 60%, rgba(0, 0, 0, 0.1) 100%);
  z-index: 1;
}
.hero-container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 0.5rem;
}
.hero-content {
  max-width: 640px;
  text-align: left;
  padding-top: 3.5rem;
  padding-bottom: 3.5rem;
}
.hero-headline {
  margin: 0 0 1rem;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
}
.hero-description {
  margin: 0 0 2rem;
  font-size: 1.05rem;
  opacity: 0.9;
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.15s ease;
}
.btn:hover {
  opacity: 0.85;
}
.btn-primary {
  background: #1d4ed8;
  color: #fff;
}
.btn-secondary {
  background: #fff;
  color: #111827;
}
.icon-download,
.icon-external {
  font-size: 1rem;
  line-height: 1;
}
</style>
