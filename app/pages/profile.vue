<script setup lang="ts">
definePageMeta({ layout: 'account', middleware: 'auth' })

interface UserData {
  id: number
  name: string
  email?: string
  phone: string
  status: string
  created_at?: string
}

const { user } = useAuth()
const { data: meRes, pending, error } = useAppFetch<UserData>('/me')
const { data: balanceRes } = useAppFetch<{ balance: number | string; currency: string }>('/balance')
const { data: pointsRes } = useAppFetch<{ total_points: number | string }>('/points')

const me = computed(() => meRes.value?.data ?? user.value)
const initials = computed(() => {
  const n = me.value?.name?.trim() || 'U'
  return n.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('')
})

const menu = [
  { to: '/vehicles', label: 'Kendaraan Anda', desc: 'Kelola kendaraan terdaftar', emoji: '🚗' },
  { to: '/transactions', label: 'Riwayat Transaksi', desc: 'Lihat pembelian BBM & LPG', emoji: '🧾' },
  { to: '/vouchers', label: 'Voucher Saya', desc: 'Voucher & cashback aktif', emoji: '🎟️' },
  { to: '/notifications', label: 'Notifikasi', desc: 'Kabar terbaru untukmu', emoji: '🔔' },
]
</script>

<template>
  <div>
    <h1 class="page-title">Akun Saya</h1>

    <DataState :pending="pending" :error="error" loading-text="Memuat profil...">
      <section class="profile-card">
        <div class="pc-avatar">{{ initials }}</div>
        <div class="pc-meta">
          <h2 class="pc-name">{{ me?.name }}</h2>
          <p class="pc-phone">+62 {{ (me?.phone || '').replace(/^0/, '') }}</p>
          <span class="pc-status" :class="me?.status">{{ me?.status === 'active' ? 'Akun Aktif' : me?.status }}</span>
        </div>
      </section>

      <div class="stat-row">
        <div class="stat-box">
          <span class="stat-emoji">⭐</span>
          <div>
            <p class="stat-label">Poin MyPertamina</p>
            <p class="stat-value">{{ formatNumber(pointsRes?.data?.total_points) }}</p>
          </div>
        </div>
        <div class="stat-box">
          <span class="stat-emoji">💳</span>
          <div>
            <p class="stat-label">Saldo</p>
            <p class="stat-value">{{ formatRupiah(balanceRes?.data?.balance) }}</p>
          </div>
        </div>
      </div>

      <section class="menu-card">
        <NuxtLink v-for="m in menu" :key="m.to" :to="m.to" class="menu-item">
          <span class="menu-emoji">{{ m.emoji }}</span>
          <div class="menu-text">
            <p class="menu-label">{{ m.label }}</p>
            <p class="menu-desc">{{ m.desc }}</p>
          </div>
          <span class="menu-arrow">›</span>
        </NuxtLink>
      </section>

      <section class="info-card">
        <h3>Informasi Pribadi</h3>
        <div class="info-row"><span>Nama</span><b>{{ me?.name || '-' }}</b></div>
        <div class="info-row"><span>Nomor telepon</span><b>{{ me?.phone || '-' }}</b></div>
        <div class="info-row"><span>Email</span><b>{{ me?.email || 'Belum dihubungkan' }}</b></div>
        <div class="info-row"><span>Bergabung</span><b>{{ formatDate(me?.created_at) }}</b></div>
      </section>
    </DataState>
  </div>
</template>

<style scoped>
.page-title {
  margin: 0 0 1.25rem;
  font-size: 1.5rem;
}
.profile-card {
  background: linear-gradient(135deg, #1d4ed8, #1e40af);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.15rem;
  color: #fff;
  margin-bottom: 1.25rem;
}
.pc-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 800;
  flex-shrink: 0;
}
.pc-name {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 800;
}
.pc-phone {
  margin: 0.25rem 0 0.5rem;
  opacity: 0.9;
}
.pc-status {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.22);
}
.stat-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.25rem;
}
.stat-box {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1.1rem 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.85rem;
}
.stat-emoji {
  font-size: 1.6rem;
}
.stat-label {
  margin: 0;
  font-size: 0.85rem;
  color: #6b7280;
}
.stat-value {
  margin: 0.15rem 0 0;
  font-size: 1.3rem;
  font-weight: 800;
  color: #111827;
}
.menu-card,
.info-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  margin-bottom: 1.25rem;
  overflow: hidden;
}
.menu-item {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 1rem 1.25rem;
  text-decoration: none;
  color: inherit;
  border-top: 1px solid #f3f4f6;
}
.menu-item:first-child {
  border-top: none;
}
.menu-item:hover {
  background: #f9fafb;
}
.menu-emoji {
  font-size: 1.35rem;
}
.menu-text {
  flex: 1;
}
.menu-label {
  margin: 0;
  font-weight: 700;
  color: #111827;
}
.menu-desc {
  margin: 0.1rem 0 0;
  font-size: 0.85rem;
  color: #6b7280;
}
.menu-arrow {
  font-size: 1.5rem;
  color: #9ca3af;
}
.info-card {
  padding: 1.25rem 1.35rem;
}
.info-card h3 {
  margin: 0 0 0.85rem;
  font-size: 1.05rem;
}
.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.7rem 0;
  border-top: 1px solid #f3f4f6;
  font-size: 0.95rem;
}
.info-row span {
  color: #6b7280;
}
.info-row b {
  color: #111827;
  text-align: right;
}

@media (max-width: 520px) {
  .stat-row {
    grid-template-columns: 1fr;
  }
}
</style>
