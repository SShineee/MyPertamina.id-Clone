<script setup lang="ts">
defineProps<{
  name: string
  color?: string
}>()
</script>

<template>
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <g v-if="name === 'formula'">
      <circle cx="14" cy="14" r="3" :stroke="color ?? '#dc2626'" stroke-width="1.5" />
      <circle cx="6" cy="8" r="2" :fill="color ?? '#dc2626'" />
      <circle cx="22" cy="8" r="2" :fill="color ?? '#dc2626'" />
      <circle cx="6" cy="20" r="2" :fill="color ?? '#dc2626'" />
      <circle cx="22" cy="20" r="2" :fill="color ?? '#dc2626'" />
      <path d="M11.5 12L7.5 9M16.5 12L20.5 9M11.5 16L7.5 19M16.5 16L20.5 19" :stroke="color ?? '#dc2626'" stroke-width="1.2" />
    </g>
    <g v-else-if="name === 'octane'">
      <path d="M14 3c3 4-5 7-2 12 1.5 2.5 5.5 2.5 6.5-.5C20 10 16 8 14 3z" :fill="color ?? '#dc2626'" />
      <path d="M14 12c-4 3-6 7-3 11 2 2.5 6 2.5 8 0 2-2.5 1-5.5-1-7.5" :stroke="color ?? '#dc2626'" stroke-width="1.5" fill="none" />
    </g>
    <g v-else-if="name === 'ignition'">
      <rect x="9" y="4" width="10" height="20" rx="2" :stroke="color ?? '#dc2626'" stroke-width="1.5" />
      <path d="M15 8l-3.5 6h4l-1 6 4.5-7h-3.5z" :fill="color ?? '#dc2626'" />
    </g>
    <g v-else-if="name === 'flame'">
      <path
        d="M14 4c1 4-4 5-4 9a4 4 0 108 0c0-1.5-1-2-1-3.5 1 .5 2 2 2 4a5 5 0 11-10 0c0-5 3-6.5 5-9.5z"
        :fill="color ?? '#dc2626'"
      />
    </g>
    <g v-else-if="name === 'shield'">
      <path d="M14 3l8 3v6c0 6-4 9.5-8 11-4-1.5-8-5-8-11V6z" :stroke="color ?? '#dc2626'" stroke-width="1.5" fill="none" />
      <path d="M10.5 14l2.5 2.5 4.5-5" :stroke="color ?? '#dc2626'" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <g v-else>
      <circle cx="14" cy="14" r="10" :stroke="color ?? '#dc2626'" stroke-width="1.5" fill="none" />
      <path d="M4 14h20M14 4c3 3 3 17 0 20M14 4c-3 3-3 17 0 20" :stroke="color ?? '#dc2626'" stroke-width="1.2" fill="none" />
    </g>
  </svg>
</template>
