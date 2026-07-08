<script setup lang="ts">
definePageMeta({ layout: 'account', middleware: 'auth' })

interface DashboardData {
  user: { id: number; name: string; email?: string; phone: string; status: string }
  balance: { balance: number | string; currency: string }
  points: { total_points: number | string }
  vehicles: any[]
  recent_transactions: any[]
  vouchers: any[]
  notifications: any[]
  unread_notifications: number
}

const { user } = useAuth()
const { data, pending, error } = useAppFetch<DashboardData>('/dashboard')
const d = computed(() => data.value?.data)

const services = [
  { label: 'Subsidi Tepat', to: '/subsidi-tepat/subsidi-tepat-via-mypertamina', color: '#2563eb', emoji: '🎯' },
  { label: 'E-Voucher', to: '/product/e-voucher', color: '#dc2626', emoji: '🎟️' },
  { label: 'Tukar Poin', to: '/vouchers', color: '#f59e0b', emoji: '⭐' },
  { label: 'Kendaraan', to: '/vehicles', color: '#0ea5e9', emoji: '🚗' },
  { label: 'Transaksi', to: '/transactions', color: '#16a34a', emoji: '🧾' },
  { label: 'Notifikasi', to: '/notifications', color: '#7c3aed', emoji: '🔔' },
  { label: 'Promo', to: '/promo-event', color: '#db2777', emoji: '🏷️' },
  { label: 'Lokasi SPBU', to: '/spbu-location/spbu-pertamina', color: '#0d9488', emoji: '📍' },
]
</script>

<template>
  <div>
    <DataState :pending="pending" :error="error" loading-text="Memuat dashboard...">
      <template #error-action>
        <button class="retry" @click="() => reloadNuxtApp()">Muat ulang</button>
      </template>

      <!-- Hero -->
      <section class="hero">
        <div class="hero-top">
          <div>
            <p class="hero-hi">Halo,</p>
            <h1 class="hero-name">{{ d?.user?.name || user?.name || 'Sobat MyPertamina' }} 👋</h1>
            <p class="hero-sub">Selamat datang kembali di MyPertamina</p>
          </div>
          <NuxtLink to="/notifications" class="hero-bell" aria-label="Notifikasi">
            🔔
            <span v-if="d?.unread_notifications" class="bell-badge">{{ d.unread_notifications }}</span>
          </NuxtLink>
        </div>

        <div class="hero-cards">
          <div class="hero-card">
            <span class="hc-label">Saldo MyPertamina</span>
            <span class="hc-value">{{ formatRupiah(d?.balance?.balance) }}</span>
            <span class="hc-cur">{{ d?.balance?.currency || 'IDR' }}</span>
          </div>
          <div class="hero-card">
            <span class="hc-label">Poin MyPertamina</span>
            <span class="hc-value">{{ formatNumber(d?.points?.total_points) }}</span>
            <span class="hc-cur">poin</span>
          </div>
        </div>
      </section>

      <!-- Services -->
      <section class="card">
        <div class="card-head">
          <h2>Jelajah Layanan</h2>
        </div>
        <div class="svc-grid">
          <NuxtLink v-for="s in services" :key="s.label" :to="s.to" class="svc-tile">
            <span class="svc-icon" :style="{ background: s.color + '1a', color: s.color }">{{ s.emoji }}</span>
            <span class="svc-label">{{ s.label }}</span>
          </NuxtLink>
        </div>
      </section>

      <!-- Recent transactions -->
      <section class="card">
        <div class="card-head">
          <h2>Transaksi Terakhir</h2>
          <NuxtLink to="/transactions" class="see-all">Lihat Semua</NuxtLink>
        </div>
        <p v-if="!d?.recent_transactions?.length" class="empty-inline">Belum ada transaksi.</p>
        <ul v-else class="trx-list">
          <li v-for="t in d.recent_transactions" :key="t.id" class="trx-item">
            <span class="trx-ic">⛽</span>
            <div class="trx-meta">
              <p class="trx-title">{{ t.fuel_type || 'Pembelian BBM' }} · {{ t.liters }} L</p>
              <p class="trx-sub">{{ t.spbu_name || '-' }} · {{ formatDateTime(t.transaction_date) }}</p>
            </div>
            <span class="trx-amount">{{ formatRupiah(t.amount) }}</span>
          </li>
        </ul>
      </section>

      <div class="two-col">
        <!-- Vouchers -->
        <section class="card">
          <div class="card-head">
            <h2>Voucher Kamu</h2>
            <NuxtLink to="/vouchers" class="see-all">Lihat Semua</NuxtLink>
          </div>
          <p v-if="!d?.vouchers?.length" class="empty-inline">Belum ada voucher.</p>
          <ul v-else class="mini-list">
            <li v-for="v in d.vouchers" :key="v.id" class="mini-item">
              <span class="mini-ic voucher">🎟️</span>
              <div class="mini-meta">
                <p class="mini-title">{{ v.title }}</p>
                <p class="mini-sub">Berlaku s/d {{ formatDate(v.expired_at) }}</p>
              </div>
              <span class="mini-val">{{ formatRupiah(v.value) }}</span>
            </li>
          </ul>
        </section>

        <!-- Notifications -->
        <section class="card">
          <div class="card-head">
            <h2>Notifikasi</h2>
            <NuxtLink to="/notifications" class="see-all">Lihat Semua</NuxtLink>
          </div>
          <p v-if="!d?.notifications?.length" class="empty-inline">Belum ada notifikasi.</p>
          <ul v-else class="mini-list">
            <li v-for="n in d.notifications" :key="n.id" class="mini-item">
              <span class="mini-ic notif" :class="{ unread: !n.is_read }">🔔</span>
              <div class="mini-meta">
                <p class="mini-title">{{ n.title }}</p>
                <p class="mini-sub clamp">{{ n.message }}</p>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </DataState>
  </div>
</template>

<style scoped>
.hero {
  background: linear-gradient(135deg, #1e3a8a, #1d4ed8 60%, #b91c1c);
  border-radius: 1.25rem;
  padding: 1.75rem;
  color: #fff;
  margin-bottom: 1.5rem;
}
.hero-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}
.hero-hi {
  margin: 0;
  opacity: 0.85;
}
.hero-name {
  margin: 0.15rem 0 0.35rem;
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  font-weight: 800;
}
.hero-sub {
  margin: 0;
  opacity: 0.85;
  font-size: 0.95rem;
}
.hero-bell {
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  text-decoration: none;
  flex-shrink: 0;
}
.bell-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #facc15;
  color: #111827;
  font-size: 0.7rem;
  font-weight: 800;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
}
.hero-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1.5rem;
}
.hero-card {
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 0.9rem;
  padding: 1rem 1.15rem;
  display: flex;
  flex-direction: column;
}
.hc-label {
  font-size: 0.85rem;
  opacity: 0.9;
}
.hc-value {
  font-size: 1.5rem;
  font-weight: 800;
  margin-top: 0.25rem;
  line-height: 1.1;
}
.hc-cur {
  font-size: 0.8rem;
  opacity: 0.8;
}

.card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1.25rem 1.35rem;
  margin-bottom: 1.5rem;
}
.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.card-head h2 {
  margin: 0;
  font-size: 1.1rem;
}
.see-all {
  color: #1d4ed8;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
}
.see-all:hover {
  text-decoration: underline;
}
.empty-inline {
  margin: 0;
  color: #6b7280;
  font-size: 0.95rem;
  padding: 0.5rem 0;
}

.svc-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem 0.5rem;
}
.svc-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #374151;
}
.svc-icon {
  width: 54px;
  height: 54px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: transform 0.15s ease;
}
.svc-tile:hover .svc-icon {
  transform: translateY(-2px);
}
.svc-label {
  font-size: 0.82rem;
  font-weight: 600;
  text-align: center;
}

.trx-list,
.mini-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.trx-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.75rem 0;
  border-top: 1px solid #f3f4f6;
}
.trx-item:first-child {
  border-top: none;
}
.trx-ic {
  width: 42px;
  height: 42px;
  border-radius: 0.7rem;
  background: #eff6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}
.trx-meta {
  flex: 1;
  min-width: 0;
}
.trx-title {
  margin: 0;
  font-weight: 600;
  color: #111827;
}
.trx-sub {
  margin: 0.15rem 0 0;
  font-size: 0.85rem;
  color: #6b7280;
}
.trx-amount {
  font-weight: 700;
  color: #111827;
  white-space: nowrap;
}

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
.mini-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0;
  border-top: 1px solid #f3f4f6;
}
.mini-item:first-child {
  border-top: none;
}
.mini-ic {
  width: 38px;
  height: 38px;
  border-radius: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
}
.mini-ic.voucher {
  background: #fef3c7;
}
.mini-ic.notif {
  background: #f3e8ff;
}
.mini-ic.unread::after {
  content: '';
  position: absolute;
  top: -2px;
  right: -2px;
  width: 10px;
  height: 10px;
  background: #dc2626;
  border-radius: 50%;
  border: 2px solid #fff;
}
.mini-meta {
  flex: 1;
  min-width: 0;
}
.mini-title {
  margin: 0;
  font-weight: 600;
  color: #111827;
  font-size: 0.95rem;
}
.mini-sub {
  margin: 0.1rem 0 0;
  font-size: 0.83rem;
  color: #6b7280;
}
.mini-sub.clamp {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.mini-val {
  font-weight: 700;
  color: #16a34a;
  white-space: nowrap;
  font-size: 0.9rem;
}
.retry {
  margin-top: 0.85rem;
  border: 1px solid #1d4ed8;
  background: #fff;
  color: #1d4ed8;
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  cursor: pointer;
  font-family: inherit;
}

@media (max-width: 720px) {
  .hero-cards,
  .two-col {
    grid-template-columns: 1fr;
  }
  .svc-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (max-width: 460px) {
  .svc-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
