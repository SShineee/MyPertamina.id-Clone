<script setup lang="ts">
interface Feature {
  title: string
  title_highlight: string | null
  description: string
}
interface Badge {
  icon: string
  label: string
}

const props = defineProps<{
  title: string
  highlight: string | null
  imageUrl: string | null
  features: Feature[]
  badges: Badge[]
  brandColor: string
}>()

const imageFailed = ref(false)

const titleParts = computed(() => splitTitle(props.title, props.highlight))
function splitTitle(title: string, highlight: string | null) {
  if (!highlight) return { before: title, highlight: '', after: '' }
  const index = title.indexOf(highlight)
  if (index === -1) return { before: title, highlight: '', after: '' }
  return { before: title.slice(0, index), highlight, after: title.slice(index + highlight.length) }
}
function featureParts(feature: Feature) {
  return splitTitle(feature.title, feature.title_highlight)
}

const half = computed(() => Math.ceil(props.features.length / 2))
const leftFeatures = computed(() => props.features.slice(0, half.value))
const rightFeatures = computed(() => props.features.slice(half.value))
</script>

<template>
  <section class="technology" :style="{ '--brand-color': brandColor }">
    <div class="container">
      <h2 class="tech-title">
        {{ titleParts.before }}<span class="highlight">{{ titleParts.highlight }}</span>{{ titleParts.after }}
      </h2>

      <div class="tech-grid">
        <div class="tech-column">
          <div v-for="feature in leftFeatures" :key="feature.title" class="feature-block">
            <h3>
              {{ featureParts(feature).before }}<span class="highlight">{{ featureParts(feature).highlight }}</span
              >{{ featureParts(feature).after }}
            </h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>

        <div class="tech-image">
          <img v-if="imageUrl && !imageFailed" :src="imageUrl" alt="" @error="imageFailed = true" />
          <div v-else class="tech-image-fallback" />
        </div>

        <div class="tech-column">
          <div v-for="feature in rightFeatures" :key="feature.title" class="feature-block">
            <h3>
              {{ featureParts(feature).before }}<span class="highlight">{{ featureParts(feature).highlight }}</span
              >{{ featureParts(feature).after }}
            </h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>

      <div v-if="badges.length" class="badges-row">
        <div v-for="badge in badges" :key="badge.label" class="badge-item">
          <ProductIcon :name="badge.icon" :color="brandColor" />
          <span>{{ badge.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.technology {
  padding: 3.5rem 0;
  background: #f3f4f6;
}
.tech-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 3rem;
}
.tech-title .highlight,
.feature-block .highlight {
  color: var(--brand-color);
}
.tech-grid {
  display: grid;
  grid-template-columns: 1fr minmax(220px, 320px) 1fr;
  gap: 2.5rem;
  align-items: center;
}
.tech-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.feature-block h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
}
.feature-block p {
  margin: 0;
  color: #4b5563;
  font-size: 0.95rem;
  line-height: 1.6;
}
.tech-image {
  display: flex;
  align-items: center;
  justify-content: center;
}
.tech-image img {
  width: 100%;
  max-width: 300px;
}
.tech-image-fallback {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--brand-color) 0%, transparent 70%);
  opacity: 0.3;
}
.badges-row {
  margin-top: 3rem;
  padding: 1.5rem;
  background: #fff;
  border-radius: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.5rem;
}
.badge-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 700;
  font-size: 0.85rem;
  color: #111827;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

@media (max-width: 768px) {
  .tech-grid {
    grid-template-columns: 1fr;
  }
  .tech-image {
    order: -1;
  }
  .tech-title {
    font-size: 1.4rem;
  }
}
</style>
