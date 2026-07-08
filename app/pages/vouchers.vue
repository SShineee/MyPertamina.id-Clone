<script setup lang="ts">
definePageMeta({ layout: 'account', middleware: 'auth' })

interface Voucher {
  id: number
  voucher_code: string
  title: string
  description?: string
  value: number | string
  status: 'active' | 'used' | 'expired' | string
  expired_at?: string
}

const { data, pending, error } = useAppFetch<Voucher[]>('/vouchers')
const vouchers = computed(() => data.value?.data ?? [])

const statusLabel: Record<string, string> = { active: 'Aktif', used: 'Terpakai', expired: 'Kedaluwarsa' }
</script>

<template>
  <div>
    <h1 class="page-title">Voucher Saya</h1>

    <DataState
      :pending="pending"
      :error="error"
      :empty="!vouchers.length"
      loading-text="Memuat voucher..."
      empty-text="Belum ada voucher. Kumpulkan poin untuk menukar voucher!"
      empty-icon="🎟️"
    >
      <div class="vc-grid">
        <article v-for="v in vouchers" :key="v.id" class="vc-card" :class="{ inactive: v.status !== 'active' }">
          <div class="vc-left">
            <span class="vc-emoji">🎟️</span>
          </div>
          <div class="vc-body">
            <div class="vc-top">
              <p class="vc-title">{{ v.title }}</p>
              <span class="vc-status" :class="v.status">{{ statusLabel[v.status] || v.status }}</span>
            </div>
            <p class="vc-desc">{{ v.description }}</p>
            <div class="vc-foot">
              <span class="vc-value">{{ formatRupiah(v.value) }}</span>
              <span class="vc-exp">s/d {{ formatDate(v.expired_at) }}</span>
            </div>
            <div class="vc-code">Kode: <b>{{ v.voucher_code }}</b></div>
          </div>
        </article>
      </div>
    </DataState>
  </div>
</template>

<style scoped>
.page-title {
  margin: 0 0 1.25rem;
  font-size: 1.5rem;
}
.vc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.25rem;
}
.vc-card {
  display: flex;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  overflow: hidden;
}
.vc-card.inactive {
  opacity: 0.65;
}
.vc-left {
  width: 70px;
  background: linear-gradient(160deg, #dc2626, #b91c1c);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
}
.vc-emoji {
  font-size: 1.8rem;
}
.vc-body {
  flex: 1;
  padding: 1.1rem 1.25rem;
  min-width: 0;
}
.vc-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}
.vc-title {
  margin: 0;
  font-weight: 700;
  color: #111827;
}
.vc-status {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  white-space: nowrap;
  background: #dcfce7;
  color: #15803d;
}
.vc-status.used {
  background: #f3f4f6;
  color: #6b7280;
}
.vc-status.expired {
  background: #fee2e2;
  color: #b91c1c;
}
.vc-desc {
  margin: 0.35rem 0 0.85rem;
  font-size: 0.88rem;
  color: #6b7280;
}
.vc-foot {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 0.6rem;
}
.vc-value {
  font-size: 1.25rem;
  font-weight: 800;
  color: #16a34a;
}
.vc-exp {
  font-size: 0.82rem;
  color: #9ca3af;
}
.vc-code {
  font-size: 0.82rem;
  color: #6b7280;
  border-top: 1px dashed #e5e7eb;
  padding-top: 0.6rem;
}
.vc-code b {
  font-family: monospace;
  color: #111827;
}
</style>
