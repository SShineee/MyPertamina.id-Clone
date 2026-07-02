<script setup lang="ts">
const props = defineProps<{
  title: string
}>()

const requestUrl = useRequestURL()
const pageUrl = computed(() => requestUrl.href)

const facebookShareUrl = computed(
  () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl.value)}`
)
const whatsappShareUrl = computed(
  () => `https://wa.me/?text=${encodeURIComponent(`${props.title} ${pageUrl.value}`)}`
)

const copied = ref(false)
let copiedTimeout: ReturnType<typeof setTimeout> | undefined

async function copyLink() {
  await navigator.clipboard.writeText(pageUrl.value)
  copied.value = true
  clearTimeout(copiedTimeout)
  copiedTimeout = setTimeout(() => (copied.value = false), 2000)
}
</script>

<template>
  <div class="share">
    <h2 class="share-title">Bagikan Promo</h2>
    <div class="share-buttons">
      <a
        class="share-icon facebook"
        :href="facebookShareUrl"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Bagikan ke Facebook"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M15 8.5h2V5.5h-2c-2.2 0-4 1.8-4 4V12H9v3h2v6h3v-6h2.2l.8-3H14v-1.5c0-.6.4-1 1-1z"
            fill="currentColor"
          />
        </svg>
      </a>
      <a
        class="share-icon whatsapp"
        :href="whatsappShareUrl"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Bagikan ke WhatsApp"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 4a8 8 0 00-6.9 12l-1 3.6 3.7-1A8 8 0 1012 4z"
            stroke="currentColor"
            stroke-width="1.5"
            fill="none"
          />
          <path
            d="M9 9.5c0 3 2.5 5.5 5.5 5.5.5 0 1-.4 1-1v-.7c0-.3-.2-.5-.4-.6l-1.3-.5c-.2-.1-.5 0-.6.2l-.3.4a4.2 4.2 0 01-2.2-2.2l.4-.3c.2-.1.3-.4.2-.6l-.5-1.3c-.1-.2-.3-.4-.6-.4H10c-.6 0-1 .5-1 1z"
            fill="currentColor"
          />
        </svg>
      </a>
      <button type="button" class="share-icon link" aria-label="Salin tautan" @click="copyLink">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M10 14a4 4 0 005.7 0l2.6-2.6a4 4 0 00-5.7-5.7L11 7"
            stroke="currentColor"
            stroke-width="1.6"
            fill="none"
            stroke-linecap="round"
          />
          <path
            d="M14 10a4 4 0 00-5.7 0l-2.6 2.6a4 4 0 005.7 5.7L13 17"
            stroke="currentColor"
            stroke-width="1.6"
            fill="none"
            stroke-linecap="round"
          />
        </svg>
      </button>
      <span v-if="copied" class="copied-toast" role="status">Tautan disalin</span>
    </div>
  </div>
</template>

<style scoped>
.share {
  margin: 2.5rem 0;
}
.share-title {
  margin: 0 0 1rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: #111827;
}
.share-buttons {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.85rem;
}
.share-icon {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  text-decoration: none;
}
.share-icon.facebook {
  background: #e7f0ff;
  color: #1877f2;
}
.share-icon.whatsapp {
  background: #e6f9ee;
  color: #25d366;
}
.share-icon.link {
  background: #f3f4f6;
  color: #374151;
}
.copied-toast {
  background: #111827;
  color: #fff;
  font-size: 0.8rem;
  padding: 0.4rem 0.75rem;
  border-radius: 0.4rem;
}
</style>
