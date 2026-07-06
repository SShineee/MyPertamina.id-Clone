<script setup lang="ts">
interface ColumnConfig {
  key: string
  label: string
  type?: 'text' | 'boolean'
  fallback?: string
}

interface FilterOption {
  label: string
  value: string
}

interface FilterConfig {
  paramName: 'type' | 'facility'
  label: string
  options: FilterOption[]
}

interface SummaryCard {
  icon: string
  label: string
  key: string
}

const props = withDefaults(
  defineProps<{
    channel: string
    titlePrefix?: string
    titleAccent: string
    titleRest: string
    accentColor: string
    hoverColor: string
    description: string
    columns: ColumnConfig[]
    searchPlaceholder: string
    pageSize?: number
    filterConfig?: FilterConfig
    summaryCards?: SummaryCard[]
    anchorId?: string
  }>(),
  {
    titlePrefix: '',
    pageSize: 10,
    filterConfig: undefined,
    summaryCards: undefined,
    anchorId: undefined,
  },
)

interface LocationRow {
  id: number
  code: string | null
  name: string | null
  address: string | null
  city: string
  province: string
  type: string | null
  has_spklu: number | boolean | null
  has_spbklu: number | boolean | null
  updated_at: string
}

interface LocationResponse {
  data: LocationRow[]
  pagination: { page: number; pageSize: number; total: number }
  lastUpdatedAt: string | null
  summary: Record<string, number> | null
}

const page = ref(1)
const search = ref('')
const searchInput = ref('')
const filterValue = ref('')
let debounceTimer: ReturnType<typeof setTimeout> | undefined

watch(searchInput, (val) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    search.value = val
  }, 350)
})

watch([search, filterValue], () => {
  page.value = 1
})

function submitSearch() {
  clearTimeout(debounceTimer)
  search.value = searchInput.value
}

const query = computed(() => {
  const q: Record<string, string | number> = { page: page.value, pageSize: props.pageSize }
  if (search.value) q.search = search.value
  if (props.filterConfig && filterValue.value) q[props.filterConfig.paramName] = filterValue.value
  return q
})

const { data, pending } = useApi<LocationResponse>(`/locations/${props.channel}`, { query })

const rows = computed(() => data.value?.data ?? [])
const pagination = computed(() => data.value?.pagination ?? { page: 1, pageSize: props.pageSize, total: 0 })
const summary = computed(() => data.value?.summary ?? {})

const updatedAtLabel = computed(() => {
  const value = data.value?.lastUpdatedAt
  if (!value) return null
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value))
})

function cellValue(row: LocationRow, col: ColumnConfig) {
  const raw = (row as Record<string, unknown>)[col.key]
  if (col.type === 'boolean') {
    return raw ? '✓' : '-'
  }
  return raw ?? col.fallback ?? '-'
}
</script>

<template>
  <section :id="anchorId" class="container section">
    <h1 class="page-title">
      {{ titlePrefix }}<span class="accent" :style="{ color: accentColor }">{{ titleAccent }}</span>{{ titleRest }}
    </h1>
    <p class="page-description">{{ description }}</p>

    <div v-if="summaryCards?.length" class="summary-grid">
      <div v-for="card in summaryCards" :key="card.key" class="summary-card">
        <span class="summary-icon" :style="{ color: accentColor }" aria-hidden="true">{{ card.icon }}</span>
        <div>
          <strong>{{ summary[card.key] ?? 0 }}</strong>
          <span class="summary-label">{{ card.label }}</span>
        </div>
      </div>
    </div>

    <div class="toolbar">
      <span v-if="updatedAtLabel" class="badge">Diperbarui pada {{ updatedAtLabel }}</span>
      <span v-else class="badge" />

      <div class="toolbar-controls">
        <select v-if="filterConfig" v-model="filterValue" class="filter-select">
          <option value="">{{ filterConfig.label }}</option>
          <option v-for="opt in filterConfig.options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>

        <label class="search-bar">
          <input
            v-model="searchInput"
            type="text"
            :placeholder="searchPlaceholder"
            @keyup.enter="submitSearch"
          />
          <button type="button" class="search-icon" aria-label="Cari" @click="submitSearch">&#128269;</button>
        </label>
      </div>
    </div>

    <div class="table-wrapper">
      <p v-if="pending" class="state-text">Memuat data...</p>
      <template v-else>
        <table v-if="rows.length" class="location-table">
          <thead>
            <tr :style="{ background: accentColor }">
              <th>No</th>
              <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, i) in rows"
              :key="row.id"
              class="data-row"
              :style="{ '--hover-bg': hoverColor }"
            >
              <td>{{ (pagination.page - 1) * pagination.pageSize + i + 1 }}</td>
              <td v-for="col in columns" :key="col.key">{{ cellValue(row, col) }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else class="state-text">
          {{ search ? `Tidak ditemukan hasil untuk "${search}".` : 'Belum ada data.' }}
        </p>
      </template>
    </div>

    <LocationPagination
      v-if="pagination.total"
      v-model:page="page"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      :accent-color="accentColor"
    />
  </section>
</template>

<style scoped>
.page-title {
  margin: 0 0 0.75rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
}
.page-description {
  margin: 0 0 1.5rem;
  max-width: 720px;
  color: #374151;
}
.summary-grid {
  display: flex;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}
.summary-card {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1.25rem 1.5rem;
}
.summary-icon {
  font-size: 2rem;
}
.summary-card strong {
  display: block;
  font-size: 1.5rem;
  color: #111827;
}
.summary-label {
  color: #6b7280;
  font-size: 0.85rem;
}
.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}
.badge {
  background: #f3f4f6;
  color: #374151;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  white-space: nowrap;
}
.toolbar-controls {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.filter-select {
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  color: #111827;
  background: #fff;
}
.search-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  min-width: 260px;
}
.search-bar input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 0.9rem;
  font-family: inherit;
  color: #111827;
}
.search-icon {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.25rem;
}
.table-wrapper {
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
}
.state-text {
  margin: 0;
  padding: 2.5rem;
  text-align: center;
  color: #6b7280;
}
.location-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 640px;
}
.location-table th,
.location-table td {
  padding: 0.85rem 1.25rem;
  text-align: left;
  font-size: 0.9rem;
  white-space: nowrap;
}
.location-table thead th {
  color: #fff;
  font-weight: 700;
}
.data-row {
  border-top: 1px solid #f3f4f6;
}
.data-row:hover {
  background: var(--hover-bg);
}
</style>
