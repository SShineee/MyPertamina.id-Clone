<script setup lang="ts">
const stats = [
  { key: 'outlet', icon: '🏪', value: '1.9K+', label: 'Outlet' },
  { key: 'agen', icon: '🚚', value: '510', label: 'Agen' },
]
</script>

<template>
  <section class="container location-section">
    <div class="location-header">
      <div>
        <h2><span class="highlight">Lokasi</span> Outlet / Agen Bright Gas</h2>
        <p>Temukan outlet resmi dan agen Bright Gas terdekat untuk memenuhi kebutuhan LPG rumah tangga maupun bisnis Anda.</p>
      </div>

      <NuxtLink to="/spbu-location/lpg" class="cta-button">
        Lihat Lokasi <span aria-hidden="true">&rarr;</span>
      </NuxtLink>
    </div>

    <div class="stats-grid">
      <div v-for="stat in stats" :key="stat.key" class="stat-card">
        <span class="stat-icon" aria-hidden="true">{{ stat.icon }}</span>
        <p class="stat-text"><strong>{{ stat.value }}</strong> {{ stat.label }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.location-section {
  padding: 1rem 1.5rem 3.5rem;
}
.location-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
.location-header h2 {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}
.location-header h2 .highlight {
  color: #db2777;
}
.location-header p {
  margin: 0;
  max-width: 620px;
  color: #4b5563;
}
.cta-button {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #db2777;
  color: #fff;
  font-weight: 700;
  padding: 0.85rem 1.5rem;
  border-radius: 999px;
  text-decoration: none;
  white-space: nowrap;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}
.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}
.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 0.75rem;
  background: #fce7f3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  flex-shrink: 0;
}
.stat-text {
  margin: 0;
  font-size: 1.1rem;
  color: #374151;
}
.stat-text strong {
  color: #db2777;
  font-size: 1.6rem;
  margin-right: 0.35rem;
}

@media (max-width: 700px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
