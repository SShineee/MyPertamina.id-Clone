<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    ratio?: string
    fill?: boolean
  }>(),
  {
    ratio: '16 / 9',
    fill: false,
  },
)
</script>

<template>
  <div class="image-placeholder" :class="{ fill }" :style="fill ? {} : { aspectRatio: ratio }">
    <span class="ph-icon" aria-hidden="true">&#128247;</span>
    <span class="ph-label">{{ label }}</span>
  </div>
</template>

<style scoped>
.image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  border: 2px dashed #d1d5db;
  border-radius: 1rem;
  background: #f9fafb;
  color: #9ca3af;
  text-align: center;
  padding: 1rem;
}
.image-placeholder.fill {
  height: 100%;
  border-radius: 0;
}
.ph-icon {
  font-size: 2rem;
}
.ph-label {
  font-size: 0.85rem;
  font-weight: 500;
  max-width: 220px;
}
</style>
