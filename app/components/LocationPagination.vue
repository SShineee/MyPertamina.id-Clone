<script setup lang="ts">
const props = defineProps<{
  page: number
  pageSize: number
  total: number
  accentColor: string
}>()

const emit = defineEmits<{
  'update:page': [value: number]
}>()

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

const rangeLabel = computed(() => {
  if (!props.total) return '0 dari 0 hasil'
  const start = (props.page - 1) * props.pageSize + 1
  const end = Math.min(props.page * props.pageSize, props.total)
  return `${start}-${end} dari ${props.total} hasil`
})

const pageItems = computed<(number | '...')[]>(() => {
  const total = totalPages.value
  const current = props.page
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const items = new Set<number>([1, total, current, current - 1, current + 1])
  const sorted = [...items].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b)
  const result: (number | '...')[] = []
  let prev = 0
  for (const n of sorted) {
    if (prev && n - prev > 1) result.push('...')
    result.push(n)
    prev = n
  }
  return result
})

function goTo(page: number) {
  if (page < 1 || page > totalPages.value || page === props.page) return
  emit('update:page', page)
}
</script>

<template>
  <div class="pagination-bar">
    <span class="range-label">{{ rangeLabel }}</span>

    <div class="controls">
      <button type="button" class="page-btn arrow" :disabled="page <= 1" aria-label="Halaman sebelumnya" @click="goTo(page - 1)">
        &#8592;
      </button>

      <template v-for="(item, i) in pageItems" :key="i">
        <span v-if="item === '...'" class="ellipsis">&hellip;</span>
        <button
          v-else
          type="button"
          class="page-btn"
          :class="{ active: item === page }"
          :style="item === page ? { color: accentColor, borderColor: accentColor } : {}"
          @click="goTo(item)"
        >
          {{ item }}
        </button>
      </template>

      <button
        type="button"
        class="page-btn arrow"
        :disabled="page >= totalPages"
        aria-label="Halaman berikutnya"
        @click="goTo(page + 1)"
      >
        &#8594;
      </button>
    </div>
  </div>
</template>

<style scoped>
.pagination-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;
}
.range-label {
  color: #6b7280;
  font-size: 0.875rem;
}
.controls {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}
.page-btn {
  min-width: 2rem;
  height: 2rem;
  padding: 0 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #374151;
  cursor: pointer;
  font-size: 0.875rem;
}
.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.page-btn.active {
  font-weight: 700;
  background: #fff;
}
.ellipsis {
  padding: 0 0.25rem;
  color: #9ca3af;
}
</style>
