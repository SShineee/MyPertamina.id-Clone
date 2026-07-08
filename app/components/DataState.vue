<script setup lang="ts">
const props = defineProps<{
  pending: boolean
  error?: any
  empty?: boolean
  loadingText?: string
  emptyText?: string
  emptyIcon?: string
}>()

const errorText = computed(() => apiErrorMessage(props.error, 'Gagal memuat data. Silakan coba lagi nanti.'))
</script>

<template>
  <div v-if="pending" class="ds ds-loading">
    <span class="spinner" aria-hidden="true" />
    <p>{{ loadingText || 'Memuat data...' }}</p>
  </div>

  <div v-else-if="error" class="ds ds-error" role="alert">
    <span class="ds-icon">⚠️</span>
    <p class="ds-title">Tidak dapat memuat data</p>
    <p class="ds-sub">{{ errorText }}</p>
    <slot name="error-action" />
  </div>

  <div v-else-if="empty" class="ds ds-empty">
    <span class="ds-icon">{{ emptyIcon || '📭' }}</span>
    <p class="ds-sub">{{ emptyText || 'Belum ada data.' }}</p>
  </div>

  <slot v-else />
</template>

<style scoped>
.ds {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2.5rem 1.5rem;
  color: #6b7280;
}
.ds-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}
.ds-title {
  margin: 0 0 0.25rem;
  font-weight: 700;
  color: #111827;
}
.ds-sub {
  margin: 0;
  font-size: 0.95rem;
}
.ds-error {
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 1rem;
}
.spinner {
  width: 34px;
  height: 34px;
  border: 3px solid #e5e7eb;
  border-top-color: #1d4ed8;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 0.85rem;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
