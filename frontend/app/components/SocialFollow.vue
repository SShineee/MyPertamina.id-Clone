<script setup lang="ts">
import { socialLinks } from '~/composables/useBenefitContent'
</script>

<template>
  <section class="container section">
    <h2>Ikuti Kami untuk Informasi Terkini</h2>
    <div class="social-grid">
      <a
        v-for="social in socialLinks"
        :key="social.name"
        class="social-card"
        :href="social.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="icon" aria-hidden="true">{{ social.icon }}</span>
        <span>{{ social.name }}</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
h2 {
  margin: 0 0 1.5rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
}
.social-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}
.social-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1.5rem;
  text-decoration: none;
  color: #111827;
  font-weight: 600;
}
.icon {
  font-size: 1.75rem;
}
@media (max-width: 768px) {
  .social-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
