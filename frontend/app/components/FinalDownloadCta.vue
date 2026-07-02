<script setup lang="ts">
import { checklistFeatures } from '~/composables/useBenefitContent'

withDefaults(
  defineProps<{
    illustrationSrc?: string
    googlePlayUrl?: string
    appStoreUrl?: string
  }>(),
  {
    illustrationSrc: '/images/benefit/app-illustration.png',
    googlePlayUrl: 'https://play.google.com/store/apps/details?id=com.telkomsel.mypertamina',
    appStoreUrl: 'https://apps.apple.com/id/app/mypertamina/id1522190115',
  },
)
</script>

<template>
  <section class="container section final-cta">
    <div class="cta-text">
      <h2>Dapatkan <span class="accent-blue">Kemudahan &amp; Transaksi</span> yang Menyenangkan bersama MyPertamina</h2>

      <ul class="checklist">
        <li v-for="feature in checklistFeatures" :key="feature.label">
          <span class="feature-icon" aria-hidden="true">{{ feature.icon }}</span>
          <span class="feature-label">{{ feature.label }}</span>
          <span class="check-icon" aria-hidden="true">&#10003;</span>
        </li>
      </ul>

      <div class="store-badges">
        <a class="store-badge" :href="googlePlayUrl" target="_blank" rel="noopener noreferrer">
          Get it on Google Play
        </a>
        <a class="store-badge" :href="appStoreUrl" target="_blank" rel="noopener noreferrer">
          Download on the App Store
        </a>
      </div>
    </div>

    <div class="cta-visual">
      <img :src="illustrationSrc" alt="Ilustrasi Aplikasi MyPertamina" />
    </div>
  </section>
</template>

<style scoped>
.final-cta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: center;
}
.cta-text h2 {
  margin: 0 0 1.5rem;
  font-size: 1.6rem;
  font-weight: 700;
  color: #111827;
  line-height: 1.35;
}
.accent-blue {
  color: #1d4ed8;
}
.checklist {
  list-style: none;
  margin: 0 0 1.75rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}
.checklist li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
}
.feature-icon {
  font-size: 1.1rem;
}
.feature-label {
  flex: 1;
  font-weight: 500;
  color: #111827;
}
.check-icon {
  color: #16a34a;
  font-weight: 700;
}
.store-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.store-badge {
  background: #111827;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
}
.cta-visual img {
  width: 100%;
  display: block;
}
@media (max-width: 768px) {
  .final-cta {
    grid-template-columns: 1fr;
  }
  .cta-visual {
    order: -1;
  }
}
</style>
