<script setup lang="ts">
const slides = [
  'Foto barista Bright Cafe',
  'Foto maskot Bright Cafe',
  'Foto suasana interior Bright Cafe',
]
</script>

<template>
  <section class="container section">
    <h2>Galeri Bright Cafe</h2>
    <SlideCarousel :item-count="slides.length" autoplay>
      <template #default="{ index }">
        <ImagePlaceholder :label="slides[index]" ratio="4 / 3" />
      </template>
    </SlideCarousel>
  </section>
</template>

<style scoped>
h2 {
  margin: 0 0 1.5rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
}
</style>
