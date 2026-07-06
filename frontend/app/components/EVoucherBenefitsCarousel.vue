<script setup lang="ts">
interface BenefitCard {
  title: string
  description: string
  imageUrl?: string | null
}

const cards: BenefitCard[] = [
  {
    title: 'Transaksi Lebih Praktis',
    description:
      'Semua proses penukaran dan penggunaan E-Voucher dilakukan secara digital melalui aplikasi MyPertamina tanpa perlu mencetak atau membawa voucher fisik',
  },
  {
    title: 'Keamanan Terjamin',
    description:
      'Setiap E-Voucher MyPertamina dilengkapi dengan sistem verifikasi dan kode unik yang hanya dapat digunakan oleh akun terdaftar, sehingga mencegah penyalahgunaan',
  },
  {
    title: 'Fleksibel dan Mudah Diakses',
    description:
      'E-Voucher MyPertamina dapat digunakan di berbagai merchant, outlet resmi Pertamina, serta UMKM binaan yang bekerja sama, sesuai kebutuhan pengguna',
  },
  {
    title: 'Mendapatkan Poin',
    description:
      'Pengguna MyPertamina dapat menukarkan poin loyalti yang dikumpulkan menjadi berbagai Voucher menarik dengan nilai tukar yang kompetitif',
  },
  {
    title: 'Dukungan Transaksi Non-Tunai (Cashless)',
    description:
      'Mendorong gaya hidup digital dan efisiensi pembayaran dengan memanfaatkan ekosistem MyPertamina yang terintegrasi',
  },
  {
    title: 'Dapat Menjadi Hadiah untuk Teman',
    description:
      'Pengiriman E-Voucher MyPertamina kepada penerima lain untuk dilakukan serta berbagai pilihan nominal sesuai kebutuhan.',
  },
]

const pageSize = 3
const pageCount = Math.ceil(cards.length / pageSize)

const track = ref<HTMLElement | null>(null)
const activePage = ref(0)

function scrollToPage(page: number) {
  const el = track.value
  if (!el) return
  const wrapped = ((page % pageCount) + pageCount) % pageCount
  const index = wrapped * pageSize
  const slide = el.children[index] as HTMLElement | undefined
  if (slide) {
    el.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' })
  }
  activePage.value = wrapped
}

function prev() {
  scrollToPage(activePage.value - 1)
}
function next() {
  scrollToPage(activePage.value + 1)
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
  activePage.value = Math.min(Math.floor(closest / pageSize), pageCount - 1)
}
</script>

<template>
  <section class="better-section">
    <div class="container">
      <h2>What Makes It <span class="highlight">Better</span></h2>
    </div>

    <div class="carousel-bleed">
      <div ref="track" class="track" @scroll.passive="onScroll">
        <article v-for="card in cards" :key="card.title" class="benefit-card">
          <div class="benefit-image">
            <img v-if="card.imageUrl" :src="card.imageUrl" :alt="card.title" />
            <ImagePlaceholder v-else :label="card.title" ratio="1 / 1" />
          </div>
          <h3>{{ card.title }}</h3>
          <p>{{ card.description }}</p>
        </article>
      </div>
    </div>

    <div class="container carousel-controls">
      <span class="counter">{{ activePage * pageSize + 1 }}/{{ cards.length }}</span>

      <div class="dots">
        <button
          v-for="page in pageCount"
          :key="page"
          class="dot"
          :class="{ active: activePage === page - 1 }"
          type="button"
          :aria-label="`Halaman ${page}`"
          @click="scrollToPage(page - 1)"
        />
      </div>

      <div class="nav-buttons">
        <button class="nav-btn" type="button" aria-label="Sebelumnya" @click="prev">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <button class="nav-btn" type="button" aria-label="Berikutnya" @click="next">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.better-section {
  background: #eef1f6;
  padding: 3.5rem 0;
}
.better-section h2 {
  margin: 0 0 2rem;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
}
.better-section h2 .highlight {
  color: #1d4ed8;
}
.carousel-bleed {
  margin: 0 calc(50% - 50vw);
  padding-left: calc(50vw - 50% + 1.5rem);
}
.track {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding: 0.25rem 1.5rem 1rem 0;
}
.track::-webkit-scrollbar {
  display: none;
}
.benefit-card {
  flex: 0 0 calc((100% - 3rem) / 3);
  scroll-snap-align: start;
  background: #fff;
  border-radius: 1.25rem;
  padding: 2.5rem;
}
.benefit-image {
  width: 200px;
  margin: 0 auto 1.5rem;
}
.benefit-image img {
  width: 100%;
  height: auto;
  display: block;
}
.benefit-image :deep(.image-placeholder) {
  border-radius: 50%;
  border-style: solid;
}
.benefit-card h3 {
  margin: 0 0 0.75rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: #111827;
}
.benefit-card p {
  margin: 0;
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.6;
}
.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.5rem;
}
.counter {
  color: #6b7280;
  font-size: 0.9rem;
  font-weight: 500;
  flex-shrink: 0;
}
.dots {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  border: none;
  background: #d1d5db;
  cursor: pointer;
  padding: 0;
}
.dot.active {
  background: #1d4ed8;
  width: 1.5rem;
  border-radius: 999px;
}
.nav-buttons {
  display: flex;
  gap: 0.75rem;
  flex-shrink: 0;
}
.nav-btn {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #111827;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-btn:hover {
  background: #f3f4f6;
}

@media (max-width: 900px) {
  .benefit-card {
    flex: 0 0 min(340px, 82vw);
  }
}

@media (max-width: 640px) {
  .better-section h2 {
    font-size: 1.5rem;
  }
  .dots {
    display: none;
  }
}
</style>
