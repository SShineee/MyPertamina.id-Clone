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
      channel="pertamax-green-95"
      title-accent="Lokasi SPBU Pertamina "
      title-rest="Dengan Produk Pertamax Green 95"
      accent-color="#7e22ce"
      hover-color="#faf5ff"
      description="Pertamax Green 95 mengandung bioetanol dengan nilai oktan RON 95, tersedia di SPBU Pertamina terpilih berikut ini."
      search-placeholder="Cari Kota / Provinsi SPBU..."
      :columns="columns"
    />
  </div>
</template>
