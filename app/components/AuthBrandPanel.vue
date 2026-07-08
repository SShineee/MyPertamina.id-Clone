<script setup lang="ts">
const logoFailed = ref(false)
</script>

<template>
  <aside class="brand-panel">
    <div class="brand-inner">
      <NuxtLink to="/" class="brand-logo" aria-label="MyPertamina">
        <img
          v-if="!logoFailed"
          src="/images/branding/mypertamina-logo.png"
          alt="MyPertamina"
          @error="logoFailed = true"
        />
        <span v-else class="brand-logo-fallback"><b>My</b>PERTAMINA</span>
      </NuxtLink>

      <div class="brand-copy">
        <h2>Satu aplikasi untuk semua kebutuhan energimu.</h2>
        <p>
          Nikmati kemudahan transaksi BBM & LPG, kumpulkan poin, tebus voucher, dan pantau
          Subsidi Tepat — semua dalam satu akun MyPertamina.
        </p>
      </div>

      <ul class="brand-points">
        <li><span class="dot" /> Transaksi lebih cepat & aman</li>
        <li><span class="dot" /> Kumpulkan & tukarkan poin</li>
        <li><span class="dot" /> Promo dan voucher eksklusif</li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
.brand-panel {
  position: relative;
  overflow: hidden;
  color: #fff;
  background:
    radial-gradient(120% 120% at 0% 0%, rgba(59, 130, 246, 0.55), transparent 55%),
    radial-gradient(120% 120% at 100% 20%, rgba(220, 38, 38, 0.55), transparent 55%),
    radial-gradient(140% 120% at 100% 100%, rgba(34, 197, 94, 0.45), transparent 55%),
    radial-gradient(120% 120% at 0% 100%, rgba(250, 204, 21, 0.4), transparent 55%),
    linear-gradient(135deg, #1e3a8a, #1d4ed8 55%, #b91c1c);
}
.brand-inner {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: clamp(2rem, 4vw, 3.5rem);
}
.brand-logo {
  display: inline-flex;
  background: #fff;
  padding: 0.55rem 0.9rem;
  border-radius: 0.75rem;
  align-self: flex-start;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
}
.brand-logo img {
  height: 30px;
  width: auto;
  display: block;
}
.brand-logo-fallback {
  font-weight: 800;
  font-size: 1.05rem;
  color: #1d4ed8;
}
.brand-logo-fallback b {
  color: #b91c1c;
}
.brand-copy {
  margin-top: auto;
}
.brand-copy h2 {
  margin: 0 0 1rem;
  font-size: clamp(1.75rem, 2.6vw, 2.6rem);
  line-height: 1.15;
  font-weight: 800;
  letter-spacing: -0.02em;
}
.brand-copy p {
  margin: 0;
  max-width: 42ch;
  font-size: 1.05rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}
.brand-points {
  list-style: none;
  margin: 2rem 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}
.brand-points li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.25);
  flex-shrink: 0;
}
</style>
