<script setup lang="ts">
const columns = [
  { key: 'code', label: 'Kode SPBU' },
  { key: 'city', label: 'Kota' },
  { key: 'province', label: 'Provinsi' },
  { key: 'has_spklu', label: 'SPKLU', type: 'boolean' as const },
  { key: 'has_spbklu', label: 'SPBKLU', type: 'boolean' as const },
]

const summaryCards = [
  { icon: '⚡', label: 'SPKLU', key: 'spklu' },
  { icon: '\u{1F50C}', label: 'SPBKLU', key: 'spbklu' },
]

const filterConfig = {
  paramName: 'facility' as const,
  label: 'Semua',
  options: [
    { label: 'SPKLU', value: 'spklu' },
    { label: 'SPBKLU', value: 'spbklu' },
  ],
}
</script>

<template>
  <div>
    <AppHeader />

    <LocationDirectory
      channel="ges"
      title-accent="Lokasi "
      title-rest="SPBU Pertamina Green Energy Station (GES)"
      accent-color="#16a34a"
      hover-color="#f0fdf4"
      description="Jaringan SPBU Green Energy Station Pertamina mendukung pelestarian lingkungan dan pengurangan emisi karbon lewat fasilitas SPKLU dan SPBKLU."
      search-placeholder="Cari Kota / Provinsi SPBU GES"
      :columns="columns"
      :summary-cards="summaryCards"
      :filter-config="filterConfig"
    />
  </div>
</template>
