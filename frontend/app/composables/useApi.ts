export function useApi<T>(path: string, opts: Record<string, any> = {}) {
  const config = useRuntimeConfig()
  return useFetch<T>(path, {
    baseURL: config.public.apiBase,
    ...opts,
  })
}
