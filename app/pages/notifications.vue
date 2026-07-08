<script setup lang="ts">
definePageMeta({ layout: 'account', middleware: 'auth' })

interface Notification {
  id: number
  title: string
  message: string
  is_read: boolean | number
  created_at: string
}

const { data, pending, error } = useAppFetch<Notification[]>('/notifications')
const notifications = computed(() => data.value?.data ?? [])
const unread = computed(() => notifications.value.filter((n) => !n.is_read).length)
</script>

<template>
  <div>
    <div class="page-head">
      <h1 class="page-title">Notifikasi</h1>
      <span v-if="unread" class="unread-badge">{{ unread }} belum dibaca</span>
    </div>

    <DataState
      :pending="pending"
      :error="error"
      :empty="!notifications.length"
      loading-text="Memuat notifikasi..."
      empty-text="Belum ada notifikasi."
      empty-icon="🔔"
    >
      <ul class="notif-list">
        <li v-for="n in notifications" :key="n.id" class="notif-item" :class="{ unread: !n.is_read }">
          <span class="notif-ic">🔔</span>
          <div class="notif-main">
            <div class="notif-top">
              <p class="notif-title">{{ n.title }}</p>
              <span v-if="!n.is_read" class="dot" aria-label="Belum dibaca" />
            </div>
            <p class="notif-msg">{{ n.message }}</p>
            <p class="notif-time">{{ formatDateTime(n.created_at) }}</p>
          </div>
        </li>
      </ul>
    </DataState>
  </div>
</template>

<style scoped>
.page-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}
.page-title {
  margin: 0;
  font-size: 1.5rem;
}
.unread-badge {
  background: #fee2e2;
  color: #b91c1c;
  font-weight: 700;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  font-size: 0.85rem;
}
.notif-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}
.notif-item {
  display: flex;
  gap: 1rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1.1rem 1.25rem;
}
.notif-item.unread {
  background: #f5f9ff;
  border-color: #bfdbfe;
}
.notif-ic {
  width: 44px;
  height: 44px;
  border-radius: 0.75rem;
  background: #f3e8ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  flex-shrink: 0;
}
.notif-main {
  flex: 1;
  min-width: 0;
}
.notif-top {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.notif-title {
  margin: 0;
  font-weight: 700;
  color: #111827;
}
.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #dc2626;
  flex-shrink: 0;
}
.notif-msg {
  margin: 0.25rem 0 0.5rem;
  font-size: 0.9rem;
  color: #4b5563;
  line-height: 1.5;
}
.notif-time {
  margin: 0;
  font-size: 0.8rem;
  color: #9ca3af;
}
</style>
