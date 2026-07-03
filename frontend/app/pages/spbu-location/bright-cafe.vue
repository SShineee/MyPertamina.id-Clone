<script setup lang="ts">
const columns = [
  { key: 'name', label: 'Gerai Bright Cafe' },
  { key: 'address', label: 'Alamat Bright Cafe', fallback: '-' },
]
</script>

<template>
  <div>
    <AppHeader />

    <BrightCafeHero />
    <BrightCafeIntro />
    <BrightCafeAbout />
    <BrightCafeGallery />
    <BrightCafeFeatureCards />

    <LocationDirectory
      channel="bright-cafe"
      anchor-id="lokasi-bright-cafe"
      title-prefix="Lokasi "
      title-accent="Bright Cafe"
      title-rest=""
      accent-color="#dc2626"
      hover-color="#fef2f2"
      description="Temukan gerai Bright Cafe terdekat di SPBU Pertamina pilihan Anda."
      search-placeholder="Cari nama atau lokasi Bright Cafe"
      :columns="columns"
    />

    <OtherChannelsSection exclude-key="bright-cafe" />

    <footer class="site-footer">
      <div class="container">
        <p>Proyek pembelajaran magang &mdash; tidak berafiliasi resmi dengan Pertamina.</p>
      </div>
    </footer>
  </div>
</template>
