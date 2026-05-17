import { ref } from 'vue'

const cache = {}

export function useData() {
  const loading = ref(false)
  const error = ref(null)

  async function fetchData(path) {
    if (cache[path]) return cache[path]

    loading.value = true
    error.value = null

    try {
      const res = await fetch(path)
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
