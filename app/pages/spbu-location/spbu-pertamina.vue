<script setup lang="ts">
const columns = [
  { key: 'code', label: 'Kode SPBU' },
  { key: 'address', label: 'Alamat SPBU', fallback: '-' },
  { key: 'city', label: 'Kota' },
  { key: 'province', label: 'Provinsi' },
]
</script>

<template>
  <div>
    <AppHeader />

    <LocationDirectory
      channel="spbu-pertamina"
      title-accent="Lokasi "
      title-rest="SPBU Pertamina"
      accent-color="#1d4ed8"
      hover-color="#eff6ff"
      description="Temukan lokasi SPBU Pertamina resmi di seluruh Indonesia, lengkap dengan alamat, kota, dan provinsi."
      search-placeholder="Cari Kota / Provinsi SPBU"
      :columns="columns"
    />

    <footer class="site-footer">
      <div class="container">
        <p>Proyek pembelajaran magang &mdash; tidak berafiliasi resmi dengan Pertamina.</p>
      </div>
    </footer>
  </div>
</template>
