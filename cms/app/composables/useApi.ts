export function useApi<T>(path: string, opts: Record<string, any> = {}) {
  const config = useRuntimeConfig()
  const token = useAuthToken()
  return useFetch<T>(path, {
    baseURL: config.public.apiBase,
    headers: token.value ? { Authorization: `Bearer ${token.value}` } : {},
    ...opts,
  })
}

export function apiFetch<T>(path: string, opts: Record<string, any> = {}) {
  const config = useRuntimeConfig()
  const token = useAuthToken()
  return $fetch<T>(path, {
    baseURL: config.public.apiBase,
    headers: token.value ? { Authorization: `Bearer ${token.value}` } : {},
    ...opts,
  })
}
