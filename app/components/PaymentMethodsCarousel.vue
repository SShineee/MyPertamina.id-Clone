<script setup lang="ts">
import { paymentMethods } from '~/composables/useBenefitContent'
</script>

<template>
  <section class="container section">
    <h2>Metode Pembayaran MyPertamina</h2>
    <SlideCarousel :item-count="paymentMethods.length">
      <template #default="{ index }">
        <div
          class="payment-chip"
          :style="{ background: paymentMethods[index].bg, color: paymentMethods[index].text }"
        >
          {{ paymentMethods[index].name }}
        </div>
      </template>
    </SlideCarousel>
  </section>
</template>

<style scoped>
h2 {
  margin: 0 0 1.5rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
}
.payment-chip {
  height: 90px;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
}
</style>
