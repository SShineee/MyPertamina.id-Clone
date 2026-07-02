<script setup lang="ts">
interface Benefit {
  icon: string
  title: string
  description: string
}

const props = defineProps<{
  title: string
  highlight: string | null
  benefits: Benefit[]
  brandColor: string
}>()

const titleParts = computed(() => {
  if (!props.highlight) return { before: props.title, highlight: '', after: '' }
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
  <section class="benefits">
    <div class="container">
      <h2 class="benefits-title">
        {{ titleParts.before }}<span class="highlight" :style="{ color: brandColor }">{{ titleParts.highlight }}</span
        >{{ titleParts.after }}
      </h2>

      <div class="benefits-grid">
        <div v-for="benefit in benefits" :key="benefit.title" class="benefit-card">
          <div class="benefit-icon" :style="{ background: `${brandColor}1a` }">
            <ProductIcon :name="benefit.icon" :color="brandColor" />
          </div>
          <h3>{{ benefit.title }}</h3>
          <p>{{ benefit.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.benefits {
  padding: 3.5rem 0;
}
.benefits-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 2rem;
}
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.benefit-card {
  background: #fff;
  border-radius: 1rem;
  padding: 1.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}
.benefit-icon {
  width: 52px;
  height: 52px;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}
.benefit-card h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
}
.benefit-card p {
  margin: 0;
  color: #4b5563;
  font-size: 0.9rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .benefits-grid {
    grid-template-columns: 1fr;
  }
}
</style>
