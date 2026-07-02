<script setup lang="ts">
import { solutionCards, featureSlides } from '~/composables/useBenefitContent'
</script>

<template>
  <section class="container section">
    <h2>Solusi Praktis untuk Konsumen Cerdas</h2>
    <div class="solution-grid">
      <div v-for="card in solutionCards" :key="card.title" class="solution-card">
        <span class="icon" aria-hidden="true">{{ card.icon }}</span>
        <h3>{{ card.title }}</h3>
        <p>{{ card.description }}</p>
      </div>
    </div>
  </section>

  <section class="container section">
    <h2>Layanan dan Penawaran Terbaik</h2>
    <SlideCarousel :item-count="featureSlides.length">
      <template #default="{ index }">
        <article class="feature-card">
          <span class="icon" aria-hidden="true">{{ featureSlides[index].icon }}</span>
          <h3>{{ featureSlides[index].title }}</h3>
          <p>{{ featureSlides[index].description }}</p>
        </article>
      </template>
    </SlideCarousel>
  </section>
</template>

<style scoped>
h2 {
  margin: 0 0 1.5rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
}
.solution-grid {
  display: flex;
  gap: 1.5rem;
}
.solution-card {
  flex: 1;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1.75rem;
  text-align: center;
}
.solution-card h3 {
  margin: 0.75rem 0 0.5rem;
  font-size: 1.1rem;
  color: #111827;
}
.solution-card p {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
}
.icon {
  font-size: 2rem;
}
.feature-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1.5rem;
  height: 100%;
}
.feature-card h3 {
  margin: 0.5rem 0;
  font-size: 1.05rem;
  color: #111827;
}
.feature-card p {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
}
@media (max-width: 768px) {
  .solution-grid {
    flex-direction: column;
  }
}
</style>
