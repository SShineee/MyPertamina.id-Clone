<template>
  <section class="container section about">
    <div class="text">
      <h2>Tentang Bright Cafe</h2>
      <p>
        Dilengkapi Wi-Fi gratis dan tempat duduk yang nyaman, Bright Cafe cocok untuk meeting
        santai, mengerjakan tugas, atau sekadar bersantai sambil menikmati secangkir kopi pilihan.
      </p>
    </div>
    <div class="image">
      <ImagePlaceholder label="Foto interior Bright Cafe" ratio="4 / 3" />
    </div>
  </section>
</template>

<style scoped>
.about {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: center;
}
.text h2 {
  margin: 0 0 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}
.text p {
  margin: 0;
  color: #374151;
}
@media (max-width: 768px) {
  .about {
    grid-template-columns: 1fr;
  }
  .image {
    order: -1;
  }
}
</style>
