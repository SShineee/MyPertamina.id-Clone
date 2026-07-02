<script setup lang="ts">
const { data: pricesRes, pending: pricesPending } = await useApi<{ data: any[] }>('/prices')
const { data: bannersRes, pending: bannersPending } = await useApi<{ data: any[] }>('/contents', {
  query: { type: 'banner', activeOnly: 'true' },
})
const { data: promosRes, pending: promosPending } = await useApi<{ data: any[] }>('/contents', {
  query: { type: 'promo', activeOnly: 'true' },
})
const { data: newsRes, pending: newsPending } = await useApi<{ data: any[] }>('/contents', {
  query: { type: 'berita', activeOnly: 'true' },
})
</script>

<template>
  <div>
    <HeroSection />

    <ContentGrid
      v-if="bannersRes?.data?.length || bannersPending"
      class="container section"
      :contents="bannersRes?.data ?? []"
      :pending="bannersPending"
      empty-text="Belum ada banner."
    />

    <section id="harga" class="container section">
      <h2>Harga BBM Hari Ini</h2>
      <PriceTable :prices="pricesRes?.data ?? []" :pending="pricesPending" />
    </section>

    <section id="promo" class="container section">
      <h2>Promo</h2>
      <ContentGrid :contents="promosRes?.data ?? []" :pending="promosPending" empty-text="Belum ada promo aktif." />
    </section>

    <section id="berita" class="container section">
      <h2>Berita &amp; Informasi</h2>
      <ContentGrid :contents="newsRes?.data ?? []" :pending="newsPending" empty-text="Belum ada berita." />
    </section>

    <footer class="site-footer">
      <div class="container">
        <p>Proyek pembelajaran magang &mdash; tidak berafiliasi resmi dengan Pertamina.</p>
      </div>
    </footer>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: 'Segoe UI', system-ui, sans-serif;
  background: #f9fafb;
  color: #111827;
}
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
.section {
  padding: 2.5rem 0;
}
.section h2 {
  margin: 0 0 1.25rem;
  font-size: 1.35rem;
}
.site-footer {
  border-top: 1px solid #e5e7eb;
  padding: 1.5rem 0;
  color: #6b7280;
  font-size: 0.85rem;
  text-align: center;
}
</style>
