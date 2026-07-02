<script setup lang="ts">
withDefaults(
  defineProps<{
    imageSrc?: string
  }>(),
  {
    imageSrc: '/images/benefit/grading-member.png',
  },
)
</script>

<template>
  <section class="container section">
    <h2>Skema Poin &amp; Tier Membership</h2>
    <div class="loyalty-scroll">
      <img :src="imageSrc" alt="Tabel Grading Member MyPertamina" class="loyalty-image" />
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
.loyalty-scroll {
  overflow-x: auto;
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
}
.loyalty-image {
  display: block;
  min-width: 720px;
  width: 100%;
  height: auto;
}
</style>
