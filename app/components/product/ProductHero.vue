<script setup lang="ts">
const props = defineProps<{
  name: string
  brandColor: string
  logoUrl: string | null
  heroBackgroundUrl: string | null
  heroObjectUrl: string | null
  headline: string
  specBadge: string | null
  tagline: string | null
}>()

const logoFailed = ref(false)
const bgFailed = ref(false)
const objectFailed = ref(false)
</script>

<template>
  <section class="hero" :style="{ '--brand-color': brandColor }">
    <img
      v-if="heroBackgroundUrl && !bgFailed"
      :src="heroBackgroundUrl"
      alt=""
      aria-hidden="true"
      class="hero-bg"
      @error="bgFailed = true"
    />
    <div class="hero-overlay" />

    <div class="container hero-inner">
      <img
        v-if="logoUrl && !logoFailed"
        :src="logoUrl"
        :alt="name"
        class="hero-logo"
        @error="logoFailed = true"
      />
      <p v-else class="hero-logo-fallback">{{ name }}</p>

      <h1 class="hero-headline">{{ headline }}</h1>

      <div v-if="specBadge" class="hero-badge">{{ specBadge }}</div>

      <p v-if="tagline" class="hero-tagline">{{ tagline }}</p>
    </div>

    <img
      v-if="heroObjectUrl && !objectFailed"
      :src="heroObjectUrl"
      :alt="name"
      class="hero-object"
      @error="objectFailed = true"
    />
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 460px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(120deg, var(--brand-color), #111827);
}
.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.15) 60%, rgba(0, 0, 0, 0) 100%);
}
.hero-inner {
  position: relative;
  z-index: 1;
  padding: 3rem 1.5rem;
  max-width: 620px;
}
.hero-logo {
  height: 40px;
  margin-bottom: 1.5rem;
}
.hero-logo-fallback {
  color: #fff;
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: 0.03em;
  margin: 0 0 1.5rem;
}
.hero-headline {
  margin: 0 0 1.5rem;
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.25;
}
.hero-badge {
  display: inline-block;
  background: var(--brand-color);
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 0.6rem 1.5rem;
  margin-bottom: 1rem;
}
.hero-tagline {
  margin: 0;
  color: #e5e7eb;
  font-style: italic;
  font-size: 1rem;
}
.hero-object {
  position: relative;
  z-index: 1;
  max-width: 45%;
  max-height: 380px;
  object-fit: contain;
  margin-left: auto;
  margin-right: 3rem;
}

@media (max-width: 768px) {
  .hero-inner {
    padding: 2.5rem 1.25rem;
  }
  .hero-headline {
    font-size: 1.5rem;
  }
  .hero-object {
    display: none;
  }
}
</style>
