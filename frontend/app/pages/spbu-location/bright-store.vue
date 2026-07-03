<script setup lang="ts">
const columns = [
  { key: 'code', label: 'Kode SPBU / Lokasi' },
  { key: 'name', label: 'Gerai Bright Store' },
  { key: 'address', label: 'Alamat Bright Store', fallback: '-' },
  { key: 'city', label: 'Kota' },
]
</script>

<template>
  <div>
    <AppHeader />

    <BrightStoreHero />
    <BrightStoreShowcase />
    <BrightStoreGallery />
    <BrightStoreFeatureCards />
    <BrightStoreRewardsTable />

    <LocationDirectory
      channel="bright-store"
      anchor-id="lokasi-bright-store"
      title-prefix="Lokasi "
      title-accent="Bright Store"
      title-rest=""
      accent-color="#dc2626"
      hover-color="#fef2f2"
      description="Temukan gerai Bright Store terdekat di SPBU Pertamina pilihan Anda."
      search-placeholder="Cari Kota / Lokasi Bright Store"
      :columns="columns"
    />

    <OtherChannelsSection exclude-key="bright-store" />
  </div>
</template>
