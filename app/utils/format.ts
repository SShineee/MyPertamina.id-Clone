export function formatRupiah(value: number | string | null | undefined): string {
  const n = Number(value ?? 0)
  if (Number.isNaN(n)) return 'Rp 0'
  return 'Rp ' + n.toLocaleString('id-ID')
}

export function formatNumber(value: number | string | null | undefined): string {
  const n = Number(value ?? 0)
  if (Number.isNaN(n)) return '0'
  return n.toLocaleString('id-ID')
}

export function formatDate(input: string | Date | null | undefined): string {
  if (!input) return '-'
  const d = new Date(input)
  if (Number.isNaN(d.getTime())) return '-'
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatDateTime(input: string | Date | null | undefined): string {
  if (!input) return '-'
  const d = new Date(input)
  if (Number.isNaN(d.getTime())) return '-'
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/** Ambil pesan error yang jelas dari error useFetch/$fetch untuk ditampilkan ke user. */
export function apiErrorMessage(error: any, fallback = 'Terjadi kesalahan. Silakan coba lagi.'): string {
  if (!error) return fallback
  const e = error?.value ?? error
  return e?.data?.message || e?.message || fallback
}
