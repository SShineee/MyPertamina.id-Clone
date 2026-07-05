<script setup lang="ts">
import { ref, computed } from 'vue'

const search = ref('')

// 1. Tarik data dari API Backend
const { data: apiResponse } = await useFetch<{ data: any[] }>('http://localhost:3001/api/prices')

// 2. Olah data mentah menjadi bentuk Matriks (dikelompokkan per provinsi)
const matrixData = computed(() => {
  if (!apiResponse.value?.data) return []

  const rawData = apiResponse.value.data
  const grouped: Record<string, any> = {}

  rawData.forEach((item) => {
    // Jika provinsi belum ada di objek, buat kerangkanya
    if (!grouped[item.province]) {
      grouped[item.province] = { province: item.province }
    }
    // Masukkan harga ke dalam jenis BBM yang sesuai (misal: grouped['DKI Jakarta']['Pertalite'] = 10000)
    grouped[item.province][item.fuel_type] = item.price
  })

  // Ubah kembali menjadi array agar bisa di-loop oleh tabel
  return Object.values(grouped)
})

// 3. Logika pencarian (filter) yang mengarah ke data matrix dinamis
const filteredRows = computed(() => {
  const keyword = search.value.trim().toLowerCase()
  if (!keyword) return matrixData.value
  return matrixData.value.filter((row: any) => row.province.toLowerCase().includes(keyword))
})

// 4. Cari tanggal update paling baru (maksimal) secara otomatis
const lastUpdated = computed(() => {
  if (!apiResponse.value?.data || apiResponse.value.data.length === 0) return 'Belum ada data'
  
  const latestDate = apiResponse.value.data.reduce((maxDate, item) => {
    const itemDate = new Date(item.updated_at)
    return itemDate > maxDate ? itemDate : maxDate
  }, new Date(0))

  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(latestDate)
})
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
  </div>
</template>

<style scoped>
.table-container {
  margin-top: 1.5rem;
}
</style>