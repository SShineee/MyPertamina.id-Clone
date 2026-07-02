<script setup lang="ts">
import { fuelPriceMatrix } from '~/composables/useFuelPriceMatrix'

const search = ref('')

const filteredRows = computed(() => {
  const keyword = search.value.trim().toLowerCase()
  if (!keyword) return fuelPriceMatrix
  return fuelPriceMatrix.filter((row) => row.province.toLowerCase().includes(keyword))
})

// TODO: ganti dengan tanggal update terakhir dari API/CMS saat backend mendukung.
const lastUpdated = '1 Juli 2026'
</script>

<template>
  <div>
    <AppHeader />

    <section class="container section">
      <PriceInfoHeader v-model="search" :updated-at="lastUpdated" />

      <div class="table-container">
        <FuelPriceTable :rows="filteredRows" :searching="!!search.trim()" />
      </div>
    </section>

    <footer class="site-footer">
      <div class="container">
        <p>Proyek pembelajaran magang &mdash; tidak berafiliasi resmi dengan Pertamina.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.table-container {
  margin-top: 1.5rem;
}
</style>
