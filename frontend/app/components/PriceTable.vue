<script setup lang="ts">
defineProps<{
  prices: Array<{ id: number; fuel_type: string; price: number; unit: string }>
  pending: boolean
}>()

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)
}
</script>

<template>
  <div class="price-table">
    <p v-if="pending">Memuat harga BBM...</p>
    <p v-else-if="!prices?.length">Belum ada data harga BBM.</p>
    <div v-else class="price-grid">
      <div v-for="item in prices" :key="item.id" class="price-card">
        <h3>{{ item.fuel_type }}</h3>
        <p class="price">{{ formatRupiah(item.price) }}</p>
        <p class="unit">/ {{ item.unit }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.price-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
}
.price-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.25rem;
  text-align: center;
}
.price-card h3 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  color: #374151;
}
.price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #b91c1c;
  margin: 0;
}
.unit {
  margin: 0.25rem 0 0;
  color: #6b7280;
  font-size: 0.85rem;
}
</style>
