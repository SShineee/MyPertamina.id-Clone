<script setup lang="ts">
const { user } = useAuth()
const { data: pricesRes } = await useApi<{ data: any[] }>('/prices')
const { data: contentsRes } = await useApi<{ data: any[] }>('/contents')
</script>

<template>
  <div>
    <h1>Selamat datang, {{ user?.name }}</h1>
    <p class="muted">Role: {{ user?.role }}</p>

    <div class="stat-grid">
      <div class="stat-card">
        <p class="stat-value">{{ pricesRes?.data?.length ?? 0 }}</p>
        <p class="stat-label">Jenis BBM</p>
      </div>
      <div class="stat-card">
        <p class="stat-value">{{ contentsRes?.data?.length ?? 0 }}</p>
        <p class="stat-label">Total Konten</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.muted {
  color: #6b7280;
  margin-top: 0;
}
.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}
.stat-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: center;
}
.stat-value {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: #b91c1c;
}
.stat-label {
  margin: 0.25rem 0 0;
  color: #6b7280;
}
</style>
