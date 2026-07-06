<script setup lang="ts">
interface Step {
  text: string
  imageUrl?: string | null
}

interface StepPoint {
  label: string
  heading: string
  steps: Step[]
}

const points: StepPoint[] = [
  {
    label: 'Beli E-Voucher',
    heading: 'Cara Beli E-Voucher',
    steps: [
      { text: 'Buka aplikasi **MyPertamina**, lalu pilih menu **E-Voucher** pada halaman Beranda', imageUrl: '/images/product/e-voucher/steps/beli-e-voucher-1.png' },
      { text: 'Pilih nominal E-Voucher yang diinginkan, misalnya **Rp100.000**', imageUrl: '/images/product/e-voucher/steps/beli-e-voucher-2.png' },
      { text: 'Periksa detail voucher, lalu tekan tombol **Beli Sekarang**', imageUrl: '/images/product/e-voucher/steps/beli-e-voucher-3.png' },
      { text: 'Periksa ringkasan pesanan pada halaman **Konfirmasi Pesanan**', imageUrl: '/images/product/e-voucher/steps/beli-e-voucher-4.png' },
      { text: 'Tekan tombol **Lanjut** untuk melanjutkan ke pembayaran', imageUrl: '/images/product/e-voucher/steps/beli-e-voucher-5.png' },
      { text: 'Masukkan PIN pembayaran sesuai metode yang dipilih, misalnya **LinkAja**', imageUrl: '/images/product/e-voucher/steps/beli-e-voucher-6.png' },
      { text: 'Tekan tombol **Pay** untuk menyelesaikan pembayaran', imageUrl: '/images/product/e-voucher/steps/beli-e-voucher-7.png' },
      { text: 'Voucher berhasil dibeli dan tampil halaman **Pembelian Anda Berhasil**', imageUrl: '/images/product/e-voucher/steps/beli-e-voucher-8.png' },
    ],
  },
  {
    label: 'Gunakan E-Voucher',
    heading: 'Cara Gunakan E-Voucher',
    steps: [
      { text: 'Buka aplikasi **MyPertamina**, lalu pilih menu **E-Voucher**' },
      { text: 'Masuk ke menu **E-Voucher Saya** untuk melihat daftar voucher yang dimiliki' },
      { text: 'Pilih E-Voucher yang ingin digunakan' },
      { text: 'Periksa detail dan masa berlaku E-Voucher tersebut' },
      { text: 'Tekan tombol **Gunakan Sekarang** pada E-Voucher pilihan' },
      { text: 'Datangi SPBU atau outlet resmi Pertamina terdekat' },
      { text: 'Tunjukkan kode QR E-Voucher kepada petugas' },
      { text: 'Petugas akan memindai kode QR menggunakan aplikasi **MyPertamina Merchant**' },
      { text: 'Sistem akan memverifikasi keabsahan E-Voucher secara otomatis' },
      { text: 'Transaksi akan dipotong sesuai nilai E-Voucher yang digunakan' },
      { text: 'E-Voucher yang telah digunakan akan berpindah ke menu **Riwayat Transaksi**' },
    ],
  },
  {
    label: 'Kirim ke Teman',
    heading: 'Cara Kirim E-Voucher ke Teman',
    steps: [
      { text: 'Buka aplikasi **MyPertamina**, lalu pilih menu **E-Voucher**' },
      { text: 'Masuk ke menu **E-Voucher Saya** dan pilih E-Voucher yang ingin dikirim' },
      { text: 'Tekan tombol **Kirim ke Teman** pada E-Voucher pilihan' },
      { text: 'Masukkan nomor HP atau ID akun **MyPertamina** penerima' },
      { text: 'Periksa kembali data penerima agar sesuai' },
      { text: 'Tambahkan pesan singkat sebagai pelengkap (opsional)' },
      { text: 'Konfirmasi pengiriman E-Voucher' },
      { text: 'Penerima akan mendapatkan notifikasi dan E-Voucher otomatis masuk ke akunnya' },
    ],
  },
  {
    label: 'Beli untuk Teman',
    heading: 'Cara Beli E-Voucher untuk Teman',
    steps: [
      { text: 'Buka aplikasi **MyPertamina**, lalu pilih menu **E-Voucher**' },
      { text: 'Pilih menu **Beli untuk Teman** pada halaman utama E-Voucher' },
      { text: 'Pilih kategori produk E-Voucher yang ingin diberikan' },
      { text: 'Tentukan nominal E-Voucher sesuai kebutuhan' },
      { text: 'Masukkan nomor HP atau ID akun **MyPertamina** penerima' },
      { text: 'Periksa kembali data penerima agar sesuai' },
      { text: 'Tambahkan ucapan atau pesan khusus untuk penerima (opsional)' },
      { text: 'Pilih metode pembayaran yang tersedia' },
      { text: 'Periksa kembali ringkasan transaksi sebelum melanjutkan' },
      { text: 'Konfirmasi dan selesaikan pembayaran' },
      { text: 'E-Voucher otomatis terkirim ke akun **MyPertamina** penerima' },
    ],
  },
]

const activePointIndex = ref(0)
const activeStep = ref(1)
const direction = ref<1 | -1>(1)

const activePoint = computed(() => points[activePointIndex.value])
const totalSteps = computed(() => activePoint.value.steps.length)
const currentStep = computed(() => activePoint.value.steps[activeStep.value - 1])
const currentStepHtml = computed(() => currentStep.value.text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'))
const progressPercent = computed(() => (activeStep.value / totalSteps.value) * 100)
const transitionName = computed(() => (direction.value === 1 ? 'slide-next' : 'slide-prev'))

function selectPoint(index: number) {
  direction.value = index > activePointIndex.value ? 1 : -1
  activePointIndex.value = index
  activeStep.value = 1
}
function prevStep() {
  direction.value = -1
  activeStep.value = activeStep.value > 1 ? activeStep.value - 1 : totalSteps.value
}
function nextStep() {
  direction.value = 1
  activeStep.value = activeStep.value < totalSteps.value ? activeStep.value + 1 : 1
}
</script>

<template>
  <section class="container section">
    <div class="tutorial-card">
      <div class="point-list">
        <button
          v-for="(point, i) in points"
          :key="point.label"
          type="button"
          class="point-item"
          :class="{ active: activePointIndex === i }"
          @click="selectPoint(i)"
        >
          <span class="point-number">{{ i + 1 }}</span>
          <span class="point-label">{{ point.label }}</span>
        </button>
      </div>

      <div class="step-image-wrap">
        <Transition :name="transitionName">
          <div :key="`${activePointIndex}-${activeStep}`" class="step-image">
            <img v-if="currentStep.imageUrl" :src="currentStep.imageUrl" :alt="`${activePoint.heading} — langkah ${activeStep}`" />
            <ImagePlaceholder v-else :label="`Screenshot aplikasi MyPertamina — ${activePoint.heading}`" ratio="9 / 19.5" fill />
          </div>
        </Transition>
      </div>

      <div class="step-panel">
        <h3>{{ activePoint.heading }}</h3>
        <span class="step-badge">Langkah {{ activeStep }}</span>
        <p class="step-description" v-html="currentStepHtml" />

        <div class="step-controls">
          <span class="step-counter">{{ activeStep }} / {{ totalSteps }}</span>
          <div class="progress-track">
            <div class="progress-fill" :style="{ width: progressPercent + '%' }" />
          </div>
          <div class="step-nav">
            <button type="button" class="nav-btn" aria-label="Langkah sebelumnya" @click="prevStep">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <button type="button" class="nav-btn" aria-label="Langkah berikutnya" @click="nextStep">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tutorial-card {
  position: relative;
  display: grid;
  grid-template-columns: minmax(220px, 300px) minmax(180px, 260px) 1fr;
  align-items: center;
  gap: 2.5rem;
  border-radius: 2rem;
  padding: 3rem;
  background:
    radial-gradient(circle at 15% 20%, rgba(191, 219, 254, 0.6), transparent 40%),
    radial-gradient(circle at 85% 15%, rgba(233, 213, 255, 0.5), transparent 45%),
    radial-gradient(circle at 90% 85%, rgba(191, 219, 254, 0.5), transparent 45%),
    radial-gradient(circle at 10% 90%, rgba(253, 224, 241, 0.5), transparent 40%),
    #f8f9fc;
}

.point-list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}
.point-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  border: none;
  border-radius: 1rem;
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.7);
  color: #111827;
  font-weight: 600;
  font-size: 1rem;
  text-align: left;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}
.point-item .point-number {
  flex-shrink: 0;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 0.5rem;
  background: #dbeafe;
  color: #1d4ed8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
}
.point-item.active {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: #fff;
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
}
.point-item.active .point-number {
  background: rgba(255, 255, 255, 0.25);
  color: #fff;
}

.step-image-wrap {
  position: relative;
  width: min(220px, 100%);
  aspect-ratio: 9 / 19.5;
  margin: 0 auto;
}
.step-image {
  position: absolute;
  inset: 0;
}
.step-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 20px 30px rgba(17, 24, 39, 0.2));
}
.step-image :deep(.image-placeholder) {
  border-radius: 2.25rem;
}

.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-next-enter-from {
  transform: translateX(32px);
  opacity: 0;
}
.slide-next-leave-to {
  transform: translateX(-32px);
  opacity: 0;
}
.slide-prev-enter-from {
  transform: translateX(-32px);
  opacity: 0;
}
.slide-prev-leave-to {
  transform: translateX(32px);
  opacity: 0;
}

.step-panel h3 {
  margin: 0 0 1.25rem;
  font-size: 1.9rem;
  font-weight: 800;
  color: #111827;
}
.step-badge {
  display: inline-block;
  background: #dbeafe;
  color: #1d4ed8;
  font-weight: 700;
  font-size: 0.85rem;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  margin-bottom: 1.25rem;
}
.step-description {
  margin: 0 0 2rem;
  color: #374151;
  font-size: 1.05rem;
  line-height: 1.7;
  min-height: 3.4em;
}
.step-description :deep(strong) {
  color: #111827;
}
.step-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.step-counter {
  flex-shrink: 0;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.65rem;
  padding: 0.5rem 0.85rem;
  font-weight: 700;
  color: #111827;
  font-size: 0.95rem;
}
.progress-track {
  flex: 1;
  height: 0.4rem;
  border-radius: 999px;
  background: #e5e7eb;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: #1d4ed8;
  border-radius: 999px;
  transition: width 0.2s ease;
}
.step-nav {
  display: flex;
  gap: 0.6rem;
  flex-shrink: 0;
}
.nav-btn {
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
.nav-btn:hover {
  background: #f3f4f6;
}

@media (max-width: 900px) {
  .tutorial-card {
    grid-template-columns: 1fr;
    padding: 2rem;
  }
  .step-image-wrap {
    order: -1;
  }
}
</style>
