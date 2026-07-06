<script setup lang="ts">
withDefaults(
  defineProps<{
    carImageUrl?: string | null
    phoneImageUrl?: string | null
  }>(),
  {
    carImageUrl: null,
    phoneImageUrl: null,
  },
)
</script>

<template>
  <section class="about-section">
    <div class="container">
      <h2><span class="highlight">Tentang</span> E-Voucher MyPertamina</h2>

      <article class="about-card">
        <div class="about-text">
          <p>
            E-Voucher MyPertamina adalah salah satu metode pembayaran digital dari Pertamina yang dapat digunakan
            untuk menikmati berbagai produk dan layanan unggulan dari Pertamina dan/atau mitra resmi MyPertamina.
          </p>
          <p>
            E-Voucher tidak hanya memudahkan transaksi, namun juga dapat dikirimkan sebagai hadiah untuk teman.
            Tiap transaksi menggunakan E-Voucher MyPertamina, pengguna juga bisa mendapatkan poin MyPertamina yang
            dapat ditukarkan dengan penawaran menarik dari MyPertamina.
          </p>
        </div>
        <div class="about-image">
          <img v-if="carImageUrl" :src="carImageUrl" alt="Maskot MyPertamina mengendarai mobil dengan E-Voucher" />
          <ImagePlaceholder v-else label="Ilustrasi maskot E-Voucher naik mobil" ratio="4 / 3" fill />
        </div>
      </article>

      <article class="about-card reverse">
        <div class="about-image">
          <img v-if="phoneImageUrl" :src="phoneImageUrl" alt="Maskot MyPertamina menunjukkan E-Voucher di ponsel" />
          <ImagePlaceholder v-else label="Ilustrasi maskot menunjukkan E-Voucher di HP" ratio="4 / 3" fill />
        </div>
        <div class="about-text">
          <p>
            Semua transaksi dilakukan tanpa perlu uang tunai, cukup melalui aplikasi MyPertamina. E-Voucher yang
            telah diklaim dapat langsung digunakan dengan mudah dan aman di berbagai outlet atau mitra yang bekerja
            sama.
          </p>
          <p>
            Fitur E-Voucher MyPertamina dihadirkan untuk memberikan pengalaman transaksi digital yang praktis,
            cepat, dan hemat, sekaligus menjadi bentuk apresiasi bagi konsumen setia Pertamina.
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  background: #eef1f6;
  padding: 3rem 0 3.5rem;
}
.about-section h2 {
  margin: 0 0 1.5rem;
  text-align: center;
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
}
.about-section h2 .highlight {
  color: #1d4ed8;
}
.about-card {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  align-items: center;
  gap: 2.5rem;
  background: #fff;
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}
.about-card + .about-card {
  margin-top: 1.5rem;
}
.about-text {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.about-text p {
  margin: 0;
  color: #374151;
  font-size: 1.02rem;
  line-height: 1.7;
}
.about-image {
  aspect-ratio: 4 / 3;
  border-radius: 1.25rem;
  overflow: hidden;
  background: linear-gradient(135deg, #bfdbfe, #dbeafe);
}
.about-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (max-width: 860px) {
  .about-card,
  .about-card.reverse {
    grid-template-columns: 1fr;
  }
  .about-card .about-image {
    order: -1;
  }
}
</style>
