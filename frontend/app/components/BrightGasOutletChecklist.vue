<script setup lang="ts">
interface OutletChannel {
  key: string
  icon: string
  title: string
  points: string[]
}

const channels: OutletChannel[] = [
  {
    key: 'bright-store',
    icon: '⛽',
    title: 'Bright Store',
    points: [
      'Berlokasi di SPBU Pertamina terdekat',
      'Bonus poin di setiap transaksi dengan aplikasi MyPertamina',
      'Mudah dicari, lebih aman, dan keaslian produk terjamin',
    ],
  },
  {
    key: 'outlet-agen',
    icon: '🏪',
    title: 'Outlet / Agen Bright Gas',
    points: [
      'Akses terjangkau (Cek lokasi via Bright Gas Scanner)',
      'Bonus poin di setiap transaksi dengan aplikasi MyPertamina (Outlet/Agen tertentu)',
      'Lebih aman dan keaslian produk terjamin',
    ],
  },
  {
    key: 'delivery',
    icon: '🛵',
    title: 'Pertamina Delivery Service 135',
    points: ['Praktis, pesan melalui MyPertamina atau Pertamina Contact Center 135', 'Dapat diantar langsung ke lokasi tujuan'],
  },
  {
    key: 'minimarket',
    icon: '🏬',
    title: 'Mini Market',
    points: ['Mudah ditemukan di mini market terdekat', 'Tersedia untuk Bright Gas Can 220Gr'],
  },
]
</script>

<template>
  <section class="container outlet-section">
    <h2>Temukan Bright Gas di <span class="highlight">Outlet &amp; Agen Terdekat</span></h2>

    <div class="outlet-grid">
      <div v-for="channel in channels" :key="channel.key" class="outlet-column">
        <div class="outlet-icon" aria-hidden="true">{{ channel.icon }}</div>
        <h3>{{ channel.title }}</h3>
        <ul>
          <li v-for="point in channel.points" :key="point">
            <span class="check-badge" aria-hidden="true">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5l2 2 4-4" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
            <span>{{ point }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.outlet-section {
  padding: 2.5rem 1.5rem 3.5rem;
}
.outlet-section h2 {
  margin: 0 0 2rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}
.outlet-section h2 .highlight {
  color: #db2777;
}
.outlet-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}
.outlet-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.outlet-icon {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #fce7f3;
  border: 2px solid #f9a8d4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.25rem;
  margin-bottom: 1rem;
}
.outlet-column h3 {
  margin: 0 0 1rem;
  font-size: 1.05rem;
  font-weight: 700;
  color: #1d4ed8;
}
.outlet-column ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: left;
  width: 100%;
}
.outlet-column li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  color: #4b5563;
  font-size: 0.9rem;
  line-height: 1.45;
}
.check-badge {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #db2777;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.15rem;
}

@media (max-width: 900px) {
  .outlet-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 560px) {
  .outlet-grid {
    grid-template-columns: 1fr;
  }
}
</style>
