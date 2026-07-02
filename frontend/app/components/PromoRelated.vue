<script setup lang="ts">
interface PromoItem {
  id: number
  category: string | null
  slug: string | null
  title: string
  image_url: string | null
  created_at: string
}

const props = defineProps<{
  currentSlug: string
}>()

const { data: res } = await useApi<{ data: PromoItem[] }>('/contents', {
  query: { type: 'promo', activeOnly: 'true', excludeSlug: props.currentSlug },
})

const promos = computed(() => (res.value?.data ?? []).slice(0, 3))
</script>

<template>
  <section v-if="promos.length" class="related">
    <div class="related-header">
      <h2>Berita Lainnya</h2>
      <NuxtLink to="/promo-event" class="see-all">Lihat semua</NuxtLink>
    </div>

    <div class="related-grid">
      <NuxtLink v-for="promo in promos" :key="promo.id" :to="`/promo-event/${promo.slug}`" class="related-link">
        <PromoCard
          :title="promo.title"
          :category="promo.category ?? 'Promo'"
          :image-url="promo.image_url"
          :published-at="promo.created_at"
        />
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.related {
  margin-top: 1.5rem;
}
.related-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
.related-header h2 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: #111827;
}
.see-all {
  color: #1d4ed8;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.95rem;
}
.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.75rem;
}
.related-link {
  text-decoration: none;
  color: inherit;
}
</style>
