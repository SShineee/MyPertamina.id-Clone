<script setup lang="ts">
interface Faq {
  id: number
  question: string
  answer: string
}

defineProps<{
  faqs: Faq[]
}>()

const openIds = ref(new Set<number>())

function toggle(id: number) {
  if (openIds.value.has(id)) {
    openIds.value.delete(id)
  } else {
    openIds.value.add(id)
  }
  openIds.value = new Set(openIds.value)
}
</script>

<template>
  <div class="faq-list">
    <div v-for="faq in faqs" :key="faq.id" class="faq-item">
      <button
        type="button"
        class="faq-question"
        :aria-expanded="openIds.has(faq.id)"
        @click="toggle(faq.id)"
      >
        <span>{{ faq.question }}</span>
        <svg
          class="chevron"
          :class="{ open: openIds.has(faq.id) }"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path d="M2 5l5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <div class="faq-answer-wrap" :class="{ open: openIds.has(faq.id) }">
        <div class="faq-answer-inner">
          <p>{{ faq.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.faq-item {
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  overflow: hidden;
}
.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.1rem 1.5rem;
  background: #fff;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  font-family: inherit;
}
.chevron {
  flex-shrink: 0;
  color: #6b7280;
  transition: transform 0.2s ease;
}
.chevron.open {
  transform: rotate(180deg);
}
.faq-answer-wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.25s ease;
}
.faq-answer-wrap.open {
  grid-template-rows: 1fr;
}
.faq-answer-inner {
  overflow: hidden;
}
.faq-answer-inner p {
  margin: 0;
  padding: 0 1.5rem 1.25rem;
  color: #4b5563;
  line-height: 1.7;
  font-size: 0.95rem;
}
</style>
