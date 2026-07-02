<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    itemCount: number
  }>(),
  {},
)

const track = ref<HTMLElement | null>(null)
const activeIndex = ref(0)

function scrollToIndex(index: number) {
  const el = track.value
  if (!el) return
  const clamped = Math.max(0, Math.min(index, props.itemCount - 1))
  const slide = el.children[clamped] as HTMLElement | undefined
  if (slide) {
    el.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' })
  }
  activeIndex.value = clamped
}

function prev() {
  scrollToIndex(activeIndex.value - 1)
}
function next() {
  scrollToIndex(activeIndex.value + 1)
}

function onScroll() {
  const el = track.value
  if (!el) return
  let closest = 0
  let closestDistance = Infinity
  Array.from(el.children).forEach((child, i) => {
    const distance = Math.abs((child as HTMLElement).offsetLeft - el.scrollLeft)
    if (distance < closestDistance) {
      closestDistance = distance
      closest = i
    }
  })
  activeIndex.value = closest
}
</script>

<template>
  <div class="slide-carousel">
    <button class="nav-btn nav-prev" type="button" aria-label="Sebelumnya" @click="prev">&#8592;</button>

    <div ref="track" class="track" @scroll.passive="onScroll">
      <div v-for="i in itemCount" :key="i" class="slide">
        <slot :index="i - 1" />
      </div>
    </div>

    <button class="nav-btn nav-next" type="button" aria-label="Berikutnya" @click="next">&#8594;</button>

    <div class="dots">
      <button
        v-for="i in itemCount"
        :key="i"
        class="dot"
        :class="{ active: activeIndex === i - 1 }"
        type="button"
        :aria-label="`Slide ${i}`"
        @click="scrollToIndex(i - 1)"
      />
    </div>
  </div>
</template>

<style scoped>
.slide-carousel {
  position: relative;
}
.track {
  display: flex;
  gap: 1.25rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding-bottom: 0.5rem;
}
.track::-webkit-scrollbar {
  display: none;
}
.slide {
  flex: 0 0 260px;
  scroll-snap-align: start;
}
.nav-btn {
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  z-index: 2;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #111827;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-prev {
  left: -0.75rem;
}
.nav-next {
  right: -0.75rem;
}
.dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}
.dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  border: none;
  background: #e5e7eb;
  cursor: pointer;
  padding: 0;
}
.dot.active {
  background: #1d4ed8;
  width: 1.25rem;
  border-radius: 999px;
}
</style>
