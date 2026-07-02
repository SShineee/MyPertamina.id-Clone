<script setup lang="ts">
interface PromoDetail {
  id: number
  category: string | null
  slug: string
  title: string
  description: string | null
  body_html: string | null
  image_url: string | null
  created_at: string
}

const route = useRoute()
const slug = route.params.slug as string

const { data: res } = await useApi<{ data: PromoDetail }>(`/contents/slug/${slug}`)

if (!res.value?.data) {
  throw createError({ statusCode: 404, statusMessage: 'Promo tidak ditemukan', fatal: true })
}

const promo = computed(() => res.value!.data)
const imageFailed = ref(false)

const publishedLabel = computed(() =>
  new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(promo.value.created_at))
)

useHead(() => ({ title: `MyPertamina | ${promo.value.title}` }))
</script>

<template>
  <div>
    <AppHeader />

    <article class="container detail">
      <h1 class="detail-title">{{ promo.title }}</h1>

      <div class="detail-banner">
        <img
          v-if="promo.image_url && !imageFailed"
          :src="promo.image_url"
          :alt="promo.title"
          @error="imageFailed = true"
        />
        <div v-else class="banner-fallback">{{ promo.category ?? 'Promo' }}</div>
      </div>

      <div class="detail-meta">
        <span class="badge-category">{{ promo.category ?? 'Promo' }}</span>
        <span class="badge-date">Diterbitkan : {{ publishedLabel }}</span>
      </div>

      <div v-if="promo.body_html" class="rich-text" v-html="promo.body_html" />
      <p v-else-if="promo.description">{{ promo.description }}</p>

      <PromoShareButtons :title="promo.title" />
      <PromoRelated :current-slug="promo.slug" />
    </article>
  </div>
</template>

<style scoped>
.detail {
  padding: 2.5rem 0 4rem;
}
.detail-title {
  margin: 0 0 1.5rem;
  font-size: 2rem;
  font-weight: 800;
  color: #111827;
  line-height: 1.3;
}
.detail-banner {
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 1.25rem;
}
.detail-banner img {
  width: 100%;
  display: block;
}
.banner-fallback {
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #dbeafe, #eef2ff);
  color: #1d4ed8;
  font-weight: 700;
  font-size: 1.25rem;
}
.detail-meta {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
}
.badge-category {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1.1rem;
  border-radius: 999px;
  background: #1d4ed8;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
}
.badge-date {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1.1rem;
  border-radius: 999px;
  background: #fff;
  border: 1px solid #e5e7eb;
  color: #374151;
  font-size: 0.85rem;
}
.rich-text {
  max-width: 800px;
  color: #374151;
  font-size: 1rem;
  line-height: 1.75;
}
.rich-text :deep(h2) {
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
  margin: 2rem 0 1rem;
}
.rich-text :deep(h3) {
  font-size: 1.15rem;
  font-weight: 700;
  color: #111827;
  margin: 1.75rem 0 0.75rem;
}
.rich-text :deep(p) {
  margin: 0 0 1.1rem;
}
.rich-text :deep(strong) {
  font-weight: 700;
  color: #111827;
}
.rich-text :deep(a) {
  color: #1d4ed8;
  text-decoration: underline;
}
.rich-text :deep(ol),
.rich-text :deep(ul) {
  margin: 0 0 1.1rem;
  padding-left: 1.5rem;
}
.rich-text :deep(li) {
  margin-bottom: 0.5rem;
}
</style>
