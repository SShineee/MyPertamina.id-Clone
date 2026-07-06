<script setup lang="ts">
const { data: bannersRes, pending: bannersPending } = await useApi<{ data: any[] }>('/contents', {
  query: { type: 'banner', activeOnly: 'true' },
})
const { data: promosRes, pending: promosPending } = await useApi<{ data: any[] }>('/contents', {
  query: { type: 'promo', activeOnly: 'true' },
})
const homePromos = computed(() => (promosRes.value?.data ?? []).slice(0, 4))
const { data: newsRes, pending: newsPending } = await useApi<{ data: any[] }>('/contents', {
  query: { type: 'berita', activeOnly: 'true' },
})
</script>

<template>
  <div>
    <AppHeader />
    <HeroSection />

    <ContentGrid
      v-if="bannersRes?.data?.length || bannersPending"
      class="container section"
      :contents="bannersRes?.data ?? []"
      :pending="bannersPending"
      empty-text="Belum ada banner."
    />

    <section id="harga" class="container section">
      <ProductCategoryShowcase />
    </section>

    <section id="promo" class="container section">
      <div class="section-header">
        <h2>Promo</h2>
        <NuxtLink to="/promo-event" class="see-all">Lihat Semua Promo &rarr;</NuxtLink>
      </div>
      <p v-if="promosPending">Memuat promo...</p>
      <p v-else-if="!homePromos.length">Belum ada promo aktif.</p>
      <div v-else class="promo-grid-home">
        <NuxtLink v-for="promo in homePromos" :key="promo.id" :to="`/promo-event/${promo.slug}`" class="promo-link">
          <PromoCard
            :title="promo.title"
            :category="promo.category ?? 'Promo'"
            :image-url="promo.image_url"
            :published-at="promo.created_at"
          />
        </NuxtLink>
      </div>
    </section>

    <section id="berita" class="container section">
      <h2>Berita &amp; Informasi</h2>
      <ContentGrid :contents="newsRes?.data ?? []" :pending="newsPending" empty-text="Belum ada berita." />
    </section>

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
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}
.section-header h2 {
  margin: 0;
}
.see-all {
  flex-shrink: 0;
  color: #b91c1c;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
}
.see-all:hover {
  text-decoration: underline;
}
.promo-grid-home {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.75rem;
}
.promo-link {
  text-decoration: none;
  color: inherit;
}
@media (max-width: 900px) {
  .promo-grid-home {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 560px) {
  .promo-grid-home {
    grid-template-columns: 1fr;
  }
}
</style>
