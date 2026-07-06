<script setup lang="ts">
withDefaults(
  defineProps<{
    imageUrl?: string | null
  }>(),
  {
    imageUrl: null,
  },
)
</script>

<template>
  <section class="ev-hero">
    <div class="container hero-grid">
      <div class="hero-copy">
        <div class="hero-logo">
          <svg class="ticket-icon" width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
            <path
              d="M4 12a3 3 0 0 0 0-6V4a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v2a3 3 0 0 0 0 6v4a3 3 0 0 0 0 6v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a3 3 0 0 0 0-6z"
              stroke="#1d4ed8"
              stroke-width="2"
              stroke-linejoin="round"
            />
            <path d="M17 3v28" stroke="#1d4ed8" stroke-width="2" stroke-dasharray="3 3" />
          </svg>
          <span class="logo-text">E-Voucher</span>
        </div>
        <div class="logo-mypertamina">
          <span class="logo-mark">My</span>
          <span class="logo-word">PERTAMINA</span>
        </div>

        <h1>Memberikan pengalaman transaksi digital yang praktis, cepat, dan hemat</h1>

        <div class="tag-strip">E-Voucher MyPertamina</div>
      </div>

      <div class="hero-image">
        <img v-if="imageUrl" :src="imageUrl" alt="Ilustrasi E-Voucher MyPertamina" />
        <ImagePlaceholder v-else label="Ilustrasi maskot E-Voucher MyPertamina" ratio="1 / 1" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.ev-hero {
  position: relative;
  overflow: hidden;
  background: linear-gradient(90deg, #ffffff 0%, #ffffff 42%, #dbeafe 68%, #60a5fa 100%);
}
.ev-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  left: 45%;
  background: repeating-conic-gradient(
    from 0deg at 75% 45%,
    rgba(255, 255, 255, 0.16) 0deg 6deg,
    transparent 6deg 18deg
  );
  pointer-events: none;
}
.hero-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(280px, 520px) 1fr;
  align-items: center;
  gap: 2rem;
  padding: 3.5rem 1.5rem;
}
.hero-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}
.hero-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.logo-text {
  font-size: 2rem;
  font-weight: 800;
  color: #1d4ed8;
}
.logo-mypertamina {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 1rem;
}
.logo-mark {
  background: #b91c1c;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.3rem 0.55rem;
  border-radius: 0.4rem;
  line-height: 1;
}
.logo-word {
  font-weight: 800;
  font-size: 1.2rem;
  color: #1d4ed8;
  letter-spacing: 0.02em;
}
.hero-copy h1 {
  margin: 0.5rem 0 1.5rem;
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.35;
  color: #374151;
  max-width: 480px;
}
.tag-strip {
  background: linear-gradient(90deg, #c7d2fe 0%, rgba(199, 210, 254, 0) 100%);
  color: #1e293b;
  font-weight: 700;
  font-size: 1.05rem;
  padding: 0.85rem 1.5rem;
  border-radius: 0.25rem;
  width: 100%;
  max-width: 460px;
}
.hero-image {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}
.hero-image img {
  width: 100%;
  max-width: 460px;
  height: auto;
  object-fit: contain;
}
.hero-image :deep(.image-placeholder) {
  max-width: 420px;
  background: rgba(255, 255, 255, 0.55);
}

@media (max-width: 900px) {
  .ev-hero::before {
    left: 0;
  }
  .hero-grid {
    grid-template-columns: 1fr;
  }
  .hero-image {
    order: -1;
  }
  .hero-copy h1 {
    max-width: 100%;
  }
}
</style>
