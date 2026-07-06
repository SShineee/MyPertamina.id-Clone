<script setup lang="ts">
interface SafetyItem {
  key: string
  title: string
  points: string[]
  image: string | null
}

const items: SafetyItem[] = [
  {
    key: '12kg',
    title: 'Bright Gas 12Kg',
    points: [
      'Cocok untuk Usaha Kuliner, UMKM atau keluarga besar.',
      'Seal cap tabung berwarna kuning.',
      'Fitur pengaman ganda (Double Spindle Valve System)',
      'Pindai QR Code pada seal cap untuk cek keaslian tabung',
    ],
    image: null,
  },
  {
    key: '5-5kg',
    title: 'Bright Gas 5,5Kg',
    points: [
      'Cocok untuk keluarga kecil atau penghuni apartement',
      'Seal cap tabung berwarna putih.',
      'Fitur pengaman ganda (Double Spindle Valve System)',
      'Pindai QR Code pada seal cap untuk cek keaslian tabung',
    ],
    image: null,
  },
  {
    key: 'can-220gr',
    title: 'Bright Gas Can 220Gr',
    points: [
      'Aman, ringan, mudah dibawa.',
      'Tersedia di minimarket mitra Pertamina terdekat.',
      'Cocok untuk kegiatan masak outdoor/indoor dengan kompor portable.',
      'Terjangkau dan ideal untuk memenuhi kebutuhan anak kost.',
    ],
    image: null,
  },
]

const openKey = ref(items[0].key)

const activeItem = computed(() => items.find((item) => item.key === openKey.value) ?? items[0])

function toggle(key: string) {
  openKey.value = openKey.value === key ? '' : key
}
</script>

<template>
  <section class="container safety-section">
    <h2>Rahasia di <span class="highlight">Keamanan Memasak</span></h2>

    <div class="safety-panel">
      <div class="safety-list">
        <div v-for="item in items" :key="item.key" class="safety-item">
          <button
            type="button"
            class="safety-trigger"
            :class="{ active: openKey === item.key }"
            :aria-expanded="openKey === item.key"
            @click="toggle(item.key)"
          >
            <span>{{ item.title }}</span>
            <svg
              class="chevron"
              :class="{ rotated: openKey === item.key }"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path d="M2 5l5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <ul v-if="openKey === item.key" class="safety-points">
            <li v-for="point in item.points" :key="point">
              <span class="check-icon" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7l2.5 2.5L11 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
              <span>{{ point }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="safety-image">
        <img v-if="activeItem.image" :src="activeItem.image" :alt="activeItem.title" />
        <ImagePlaceholder v-else :label="`Gambar ${activeItem.title}`" fill />
      </div>
    </div>
  </section>
</template>

<style scoped>
.safety-section {
  padding: 2.5rem 1.5rem 3.5rem;
}
.safety-section h2 {
  margin: 0 0 1.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}
.safety-section h2 .highlight {
  color: #db2777;
}
.safety-panel {
  display: grid;
  grid-template-columns: minmax(260px, 420px) 1fr;
  gap: 2rem;
  background: #fff;
  border-radius: 1.25rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}
.safety-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.safety-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  border: none;
  background: #f3f4f6;
  color: #111827;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
  transition: background-color 0.15s ease, color 0.15s ease;
}
.safety-trigger.active {
  background: #db2777;
  color: #fff;
}
.chevron {
  flex-shrink: 0;
  transition: transform 0.15s ease;
}
.chevron.rotated {
  transform: rotate(180deg);
}
.safety-points {
  list-style: none;
  margin: 0.75rem 0 0.25rem;
  padding: 0 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}
.safety-points li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: #374151;
  font-size: 0.95rem;
  line-height: 1.4;
}
.check-icon {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1.5px solid #2563eb;
  color: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.1rem;
}
.safety-image {
  border-radius: 1rem;
  overflow: hidden;
  background:
    repeating-linear-gradient(45deg, #f3e8ff 0, #f3e8ff 1px, #faf5ff 1px, #faf5ff 26px),
    radial-gradient(circle at 55% 45%, rgba(219, 39, 119, 0.18), rgba(219, 39, 119, 0) 55%);
  min-height: 320px;
}

@media (max-width: 860px) {
  .safety-panel {
    grid-template-columns: 1fr;
  }
  .safety-image {
    min-height: 240px;
  }
}
</style>
