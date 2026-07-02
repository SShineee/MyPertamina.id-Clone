<script setup lang="ts">
defineProps<{
  contents: Array<{ id: number; title: string; description: string | null; image_url: string | null }>
  pending: boolean
  emptyText: string
}>()
</script>

<template>
  <div class="content-grid-wrap">
    <p v-if="pending">Memuat konten...</p>
    <p v-else-if="!contents?.length">{{ emptyText }}</p>
    <div v-else class="content-grid">
      <article v-for="item in contents" :key="item.id" class="content-card">
        <img v-if="item.image_url" :src="item.image_url" :alt="item.title" />
        <div class="content-body">
          <h3>{{ item.title }}</h3>
          <p v-if="item.description">{{ item.description }}</p>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
}
.content-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  overflow: hidden;
}
.content-card img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  display: block;
}
.content-body {
  padding: 1rem;
}
.content-body h3 {
  margin: 0 0 0.5rem;
  font-size: 1.05rem;
}
.content-body p {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
}
</style>
