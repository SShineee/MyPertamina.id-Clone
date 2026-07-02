<script setup lang="ts">
interface ChannelLink {
  key: string
  title: string
  to: string
}

const props = defineProps<{
  excludeKey: string
}>()

const allChannels: ChannelLink[] = [
  { key: 'spbu-pertamina', title: 'SPBU Pertamina', to: '/spbu-location/spbu-pertamina' },
  { key: 'ges', title: 'Green Energy Station', to: '/spbu-location/ges' },
  { key: 'bright-store', title: 'Bright Store', to: '/spbu-location/bright-store' },
  { key: 'bright-cafe', title: 'Bright Cafe', to: '/spbu-location/bright-cafe' },
]

const channels = computed(() => allChannels.filter((c) => c.key !== props.excludeKey))
</script>

<template>
  <section class="container section">
    <h2>Lihat MyPertamina Channel Lainnya</h2>
    <div class="channel-grid">
      <NuxtLink v-for="channel in channels" :key="channel.key" :to="channel.to" class="channel-card">
        <ImagePlaceholder :label="`Foto ${channel.title}`" ratio="16 / 10" />
        <div class="channel-footer">
          <span>{{ channel.title }}</span>
          <span aria-hidden="true">&#8594;</span>
        </div>
      </NuxtLink>
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
.channel-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
.channel-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1rem;
}
.channel-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  color: #111827;
}
@media (max-width: 768px) {
  .channel-grid {
    grid-template-columns: 1fr;
  }
}
</style>
