<script setup lang="ts">
defineProps<{
  title: string
  category: string
  imageUrl: string | null
  publishedAt: string
}>()

const imageFailed = ref(false)

function formatDate(value: string) {
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value))
}
</script>

<template>
  <article class="promo-card">
    <div class="promo-image">
      <img v-if="imageUrl && !imageFailed" :src="imageUrl" :alt="title" @error="imageFailed = true" />
      <div v-else class="promo-image-fallback">{{ category }}</div>
    </div>
    <div class="promo-body">
      <h3 class="promo-title">{{ title }}</h3>
      <div class="promo-meta">
        <span class="badge-category">{{ category }}</span>
        <span class="badge-date">Diterbitkan : {{ formatDate(publishedAt) }}</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.promo-card {
  display: flex;
  flex-direction: column;
}
.promo-image {
  aspect-ratio: 16 / 9;
  border-radius: 0.75rem;
  overflow: hidden;
  background: linear-gradient(135deg, #dbeafe, #eef2ff);
}
.promo-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.promo-image-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1d4ed8;
  font-weight: 700;
  text-align: center;
  padding: 1rem;
}
.promo-body {
  padding-top: 0.9rem;
}
.promo-title {
  margin: 0 0 0.75rem;
  font-size: 1.05rem;
  font-weight: 700;
  color: #111827;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.promo-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}
.badge-category {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  background: #1d4ed8;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
}
.badge-date {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  background: #fff;
  border: 1px solid #e5e7eb;
  color: #374151;
  font-size: 0.8rem;
}
</style>
