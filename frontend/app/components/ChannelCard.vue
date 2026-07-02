<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    highlight: string
    description: string
    imageUrl: string
    imageAlt: string
    buttonLink: string
    imagePosition?: 'left' | 'right'
  }>(),
  {
    imagePosition: 'right',
  }
)

const imageFailed = ref(false)

const titleParts = computed(() => {
  const index = props.title.indexOf(props.highlight)
  if (index === -1) return { before: props.title, highlight: '', after: '' }
  return {
    before: props.title.slice(0, index),
    highlight: props.highlight,
    after: props.title.slice(index + props.highlight.length),
  }
})
</script>

<template>
  <article class="channel-card" :class="imagePosition === 'left' ? 'image-left' : 'image-right'">
    <div class="channel-image">
      <img
        v-show="!imageFailed"
        :src="imageUrl"
        :alt="imageAlt"
        @error="imageFailed = true"
      />
      <div v-if="imageFailed" class="image-fallback">{{ imageAlt }}</div>
    </div>
    <div class="channel-content">
      <h3 class="channel-title">{{ titleParts.before }}<span class="highlight">{{ titleParts.highlight }}</span>{{ titleParts.after }}</h3>
      <p class="channel-description">{{ description }}</p>
      <NuxtLink class="btn btn-primary" :to="buttonLink">
        Lihat Lebih Lanjut
        <span class="icon-external" aria-hidden="true">&#8599;</span>
      </NuxtLink>
    </div>
  </article>
</template>

<style scoped>
.channel-card {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  background: #f9fafb;
  border-radius: 1.25rem;
  padding: 2rem;
}
.channel-card.image-left {
  flex-direction: row;
}
.channel-card.image-right {
  flex-direction: row-reverse;
}
.channel-image {
  flex: 1 1 45%;
  aspect-ratio: 16 / 10;
  border-radius: 1rem;
  overflow: hidden;
  background: linear-gradient(135deg, #dbeafe, #eef2ff);
}
.channel-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.image-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.9rem;
}
.channel-content {
  flex: 1 1 55%;
}
.channel-title {
  margin: 0 0 1rem;
  font-size: 1.75rem;
  font-weight: 800;
  color: #111827;
}
.channel-title .highlight {
  color: #1d4ed8;
}
.channel-description {
  margin: 0 0 1.5rem;
  color: #4b5563;
  font-size: 1rem;
  line-height: 1.6;
}
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  background: #1d4ed8;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
}
.btn-primary:hover {
  opacity: 0.85;
}
.icon-external {
  font-size: 0.95rem;
  line-height: 1;
}

@media (max-width: 768px) {
  .channel-card,
  .channel-card.image-left,
  .channel-card.image-right {
    flex-direction: column;
    align-items: stretch;
    gap: 1.25rem;
  }
  .channel-image {
    order: 1;
  }
  .channel-content {
    order: 2;
  }
  .channel-title {
    font-size: 1.4rem;
  }
}
</style>
