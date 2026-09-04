import { ref } from 'vue'

const cache = {}

export function useData() {
  const loading = ref(false)
  const error = ref(null)

  async function fetchData(path) {
    // Only same-origin, root-relative data files are loadable through this
    // helper; it must never be turned into a generic fetch proxy.
    if (typeof path !== 'string' || !/^\/[\w\-./]+$/.test(path) || path.includes('..')) {
      error.value = 'Invalid data path'
      return null
    }

    if (cache[path]) return cache[path]

    loading.value = true
    error.value = null

    try {
      const res = await fetch(path, { credentials: 'omit' })
      if (!res.ok) throw new Error(`Failed to load ${path}`)
      const data = await res.json()
      cache[path] = data
      return data
    } catch (e) {
      error.value = e.message
      return null
    } finally {
      loading.value = false
    }
  }

  return { loading, error, fetchData }
}
