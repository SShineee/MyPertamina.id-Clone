<script setup lang="ts">
const columns = [
  { key: 'name', label: 'Nama Outlet / Agen' },
  { key: 'type', label: 'Tipe' },
  { key: 'address', label: 'Alamat', fallback: '-' },
  { key: 'city', label: 'Kota' },
  { key: 'province', label: 'Provinsi' },
]

const summaryCards = [
  { icon: '\u{1F3EA}', label: 'Outlet', key: 'outlet' },
  { icon: '\u{1F69A}', label: 'Agen', key: 'agen' },
]

const filterConfig = {
  paramName: 'type' as const,
  label: 'Semua',
  options: [
    { label: 'Outlet', value: 'Outlet' },
    { label: 'Agen', value: 'Agen' },
  ],
}
</script>

<template>
  <div>
    <AppHeader />

    <LocationDirectory
      channel="lpg"
      title-accent="Lokasi "
      title-rest="Outlet / Agen LPG Bright Gas"
      accent-color="#db2777"
      hover-color="#fdf2f8"
      description="Temukan outlet dan agen resmi Bright Gas terdekat untuk kebutuhan LPG rumah tangga Anda."
      search-placeholder="Cari nama, kota, atau provinsi"
      :columns="columns"
      :summary-cards="summaryCards"
      :filter-config="filterConfig"
    />

    <footer class="site-footer">
      <div class="container">
        <p>Proyek pembelajaran magang &mdash; tidak berafiliasi resmi dengan Pertamina.</p>
      </div>
    </footer>
  </div>
</template>
