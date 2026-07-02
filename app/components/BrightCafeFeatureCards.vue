<script setup lang="ts">
const features = [
  { icon: '\u{1F4B3}', title: 'Pembayaran Mudah', description: 'Bayar praktis dengan MyPertamina, e-wallet, atau kartu debit/kredit.' },
  { icon: '\u{1F381}', title: 'Berpeluang Raih Poin', description: 'Kumpulkan poin MyPertamina dari setiap transaksi di Bright Cafe.' },
  { icon: '\u{1F4B0}', title: 'Hemat dan Praktis', description: 'Harga bersahabat dengan kualitas kopi dan makanan yang terjaga.' },
]
</script>

<template>
  <section class="container section">
    <h2>What Makes It <span class="accent-blue">Better</span></h2>
    <div class="feature-grid">
      <div v-for="feature in features" :key="feature.title" class="feature-card">
        <span class="icon" aria-hidden="true">{{ feature.icon }}</span>
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
h2 {
  margin: 0 0 1.5rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
}
.accent-blue {
  color: #1d4ed8;
}
.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
.feature-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
}
.icon {
  font-size: 1.75rem;
}
.feature-card h3 {
  margin: 0.75rem 0 0.5rem;
  font-size: 1.05rem;
  color: #111827;
}
.feature-card p {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
}
@media (max-width: 768px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
