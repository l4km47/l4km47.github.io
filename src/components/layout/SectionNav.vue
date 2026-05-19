<template>
  <aside v-if="sections.length" class="section-nav" aria-label="Page sections">
    <ul>
      <li v-for="section in sections" :key="section.id">
        <button class="section-link" :class="{ active: activeSection === section.id }" @click="scrollTo(section.id)">
          <span class="dot"></span>
          <span class="label">{{ section.label }}</span>
        </button>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeSection = ref('')
let observer = null
let mutationObserver = null
const observedElements = new Set()
const visibilityMap = new Map()

const sectionsByRoute = {
  '/': [
    { id: 'home-hero', label: 'Home' },
    { id: 'home-projects', label: 'Projects' },
    { id: 'home-expertise', label: 'Skills' },
    { id: 'home-cta', label: 'Contact' }
  ],
  '/projects': [
    //{ id: 'projects-hero', label: 'Projects' },
    { id: 'projects-grid', label: 'All Projects' },
    { id: 'projects-cta', label: 'Contact' }
  ],
  '/skills': [
    { id: 'skills-hero', label: 'Skills' },
    { id: 'skills-tags', label: 'Tech Stack' }
  ],
  '/about': [
    { id: 'hero', label: 'Me' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'philosophy', label: 'Philosophy' }
  ]
}

const sections = computed(() => route.path.startsWith('/projects/')
  ? [
    { id: 'detail-hero', label: 'Case Study' },
    { id: 'detail-sidebar', label: 'Highlights' },
  ]
  : (sectionsByRoute[route.path] || [])
)

const updateObserver = () => {
  const currentTargets = sections.value
    .map(s => document.getElementById(s.id))
    .filter(Boolean)

  // Verify if observed elements are identical to current targets
  const matches = currentTargets.length === observedElements.size &&
    currentTargets.every(el => observedElements.has(el))

  if (matches) return

  // Disconnect existing observer
  if (observer) {
    observer.disconnect()
    observer = null
  }
  observedElements.clear()
  visibilityMap.clear()

  if (!currentTargets.length) {
    activeSection.value = ''
    return
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      visibilityMap.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
    })

    // Determine the section with the highest intersection ratio
    let maxRatio = 0
    let mostVisibleId = activeSection.value

    for (const [id, ratio] of visibilityMap.entries()) {
      if (ratio > maxRatio) {
        maxRatio = ratio
        mostVisibleId = id
      }
    }

    if (maxRatio > 0) {
      activeSection.value = mostVisibleId
    }
  }, {
    rootMargin: '-20% 0px -40% 0px',
    threshold: [0.1, 0.2, 0.4, 0.6, 0.8]
  })

  currentTargets.forEach(el => {
    observer.observe(el)
    observedElements.add(el)
  })

  // Set the fallback active section if none is active or the current is no longer present
  if (!activeSection.value || !currentTargets.some(el => el.id === activeSection.value)) {
    activeSection.value = currentTargets[0].id
  }
}

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

watch(() => route.fullPath, () => {
  nextTick(updateObserver)
})

onMounted(() => {
  updateObserver()

  // Track DOM additions/modifications to safely connect components as they mount after transition
  mutationObserver = new MutationObserver(() => {
    updateObserver()
  })
  mutationObserver.observe(document.body, { childList: true, subtree: true })
})

onBeforeUnmount(() => {
  observer?.disconnect()
  mutationObserver?.disconnect()
})
</script>

<style scoped>
.section-nav {
  position: fixed;
  top: 50%;
  right: var(--space-4);
  transform: translateY(-50%);
  z-index: 90;
  display: flex;
  gap: var(--space-3);
  align-items: stretch;
}

.section-nav-track {
  width: 2px;
  border-radius: var(--radius-full);
  background: linear-gradient(180deg, transparent, rgba(204, 245, 107, 0.45), transparent);
}

.section-nav ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.section-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  color: var(--color-text-faint);
  padding: var(--space-4) var(--space-2);
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  transition: all var(--transition-fast);
}

.section-link:hover {
  color: var(--color-text);
  background: var(--color-surface);
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid var(--color-border-hover);
  background: transparent;
  box-shadow: 0 0 0 0 rgba(204, 245, 107, 0.35);
}

.section-link.active {
  color: var(--color-primary-light);
  border-color: rgba(204, 245, 107, 0.35);
  background: rgba(6, 212, 126, 0.08);
}

.section-link.active .dot {
  background: var(--color-primary-light);
  border-color: var(--color-primary-light);
  box-shadow: 0 0 14px 2px rgba(204, 245, 107, 0.35);
}

.label {
  font-size: 0.72rem;
  font-family: var(--font-mono);
  letter-spacing: 0.08em;
  writing-mode: vertical-rl;
  white-space: nowrap;
}

@media (max-width: 1024px) {
  .section-nav {
    display: none;
  }
}
</style>
