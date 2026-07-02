<script setup lang="ts">
defineProps<{
  photoUrl: string | null
  position: string
  name: string
  quote: string
  brandColor: string
}>()

const photoFailed = ref(false)
</script>

<template>
  <section class="ambassador" :style="{ '--brand-color': brandColor }">
    <div class="ambassador-panel">
      <img
        v-if="photoUrl && !photoFailed"
        :src="photoUrl"
        :alt="name"
        class="ambassador-photo"
        @error="photoFailed = true"
      />
      <div class="ambassador-content">
        <h2>{{ position }}</h2>
        <span class="ambassador-name">{{ name }}</span>
        <p class="ambassador-quote">&ldquo;{{ quote }}&rdquo; &mdash; {{ name }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ambassador {
  padding: 0 0 3.5rem;
}
.ambassador-panel {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: flex-end;
  gap: 2rem;
}
.ambassador-photo {
  width: 280px;
  flex-shrink: 0;
  object-fit: contain;
  align-self: flex-end;
}
.ambassador-content {
  flex: 1;
  background: linear-gradient(120deg, var(--brand-color), #1e3a8a);
  border-radius: 1rem;
  padding: 2.5rem;
  color: #fff;
}
.ambassador-content h2 {
  margin: 0 0 1rem;
  font-size: 1.5rem;
  font-weight: 700;
}
.ambassador-name {
  display: inline-block;
  background: rgba(255, 255, 255, 0.9);
  color: var(--brand-color);
  font-weight: 800;
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  margin-bottom: 1rem;
}
.ambassador-quote {
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .ambassador-panel {
    flex-direction: column;
    align-items: center;
  }
  .ambassador-photo {
    width: 200px;
  }
}
</style>
