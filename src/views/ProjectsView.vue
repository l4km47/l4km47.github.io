<template>
  <div class="projects-page">
    <section id="projects-hero" class="projects-hero section-sm">
      <div class="hero-bg-subtle"></div>
      <div class="container text-center">
        <span class="section-label reveal">Portfolio</span>
        <h1 class="reveal reveal-delay-1">Things I Actually Finished <span class="gradient-text">Somehow</span></h1>
        <p class="page-desc reveal reveal-delay-2">Production apps, open-source tools, and engineering experiments.</p>
      </div>
    </section>

    <section id="projects-grid" class="section">
      <div class="container">
        <div class="filter-wrap reveal">
          <div class="filter-tabs">
            <button v-for="cat in categories" :key="cat.value" class="filter-tab"
              :class="{ active: activeFilter === cat.value }" @click="activeFilter = cat.value">
              {{ cat.label }}
              <span class="filter-count">{{ cat.count }}</span>
            </button>
          </div>
        </div>

        <div v-if="loading" class="loading-grid">
          <div v-for="i in 4" :key="i" class="skeleton-card"></div>
        </div>

        <div v-else class="grid-auto projects-grid">
          <ProjectCard v-for="(project, i) in filteredProjects" :key="project.slug" :project="project" class="reveal"
            :class="`reveal-delay-${(i % 4) + 1}`" />
        </div>
      </div>
    </section>

    <section id="projects-cta" class="section-sm projects-cta">
      <div class="container">
        <div class="card text-center">
          <h2>Need a custom build?</h2>
          <p>Let's discuss your product and ship something production-ready.</p>
          <RouterLink to="/contact" class="btn btn-primary" style="margin-top: var(--space-4)">Start a Project
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useData } from '@/composables/useData'
import ProjectCard from '@/components/projects/ProjectCard.vue'

const { loading, fetchData } = useData()
const projects = ref([])
const activeFilter = ref('all')

const allCategories = computed(() => {
  const cats = new Set()
  projects.value.forEach(p => p.category.forEach(c => cats.add(c)))
  return [...cats]
})

const categories = computed(() => {
  const base = [{ value: 'all', label: 'All', count: projects.value.length }]
  allCategories.value.forEach(cat => {
    base.push({
      value: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
      count: projects.value.filter(p => p.category.includes(cat)).length
    })
  })
  return base
})

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects.value
  return projects.value.filter(p => p.category.includes(activeFilter.value))
})

onMounted(async () => {
  projects.value = await fetchData('/data/projects.json') || []
})
</script>

<style scoped>
.projects-page {
  min-height: 100vh;
}

.projects-hero {
  position: relative;
}

.hero-bg-subtle {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 80%, rgba(124, 58, 237, 0.08) 0%, transparent 60%);
  pointer-events: none;
}

.page-desc {
  font-size: 1.05rem;
  max-width: 600px;
  margin: var(--space-4) auto 0;
}

.filter-wrap {
  margin-bottom: var(--space-10);
}

.filter-tabs {
  display: inline-flex;
  gap: var(--space-2);
  flex-wrap: wrap;
  padding: var(--space-2);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-xl);
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-5);
  border-radius: var(--radius-lg);
  font-family: var(--font-display);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-muted);
  transition: all var(--transition-fast);
  background: transparent;
}

.filter-tab:hover {
  color: var(--color-text);
  background: var(--color-surface-alt);
}

.filter-tab.active {
  background: var(--color-primary);
  color: white;
  box-shadow: 0 4px 15px var(--color-primary-glow);
}

.filter-count {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  padding: 1px 6px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.15);
}

.projects-grid {
  min-height: 300px;
}

.projects-cta {
  padding-top: 0;
}

.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-6);
}

.skeleton-card {
  height: 380px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-xl);
  backdrop-filter: blur(16px);
  position: relative;
  overflow: hidden;
}

.skeleton-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
  animation: shimmer 1.5s infinite;
}
</style>
