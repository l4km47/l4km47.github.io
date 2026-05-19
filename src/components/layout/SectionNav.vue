<template>
  <aside v-if="sections.length" class="section-nav" aria-label="Page sections">
    <div class="section-nav-track"></div>
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
let observer

const sectionsByRoute = {
  '/': [
    { id: 'home-hero', label: 'Home' },
    { id: 'home-projects', label: 'Projects' },
    { id: 'home-expertise', label: 'Skills' },
    { id: 'home-cta', label: 'Contact' }
  ],
  '/projects': [
    { id: 'projects-hero', label: 'Projects' },
    { id: 'projects-grid', label: 'All Projects' },
    { id: 'projects-cta', label: 'Contact' }
  ],
  '/contact': [
    { id: 'contact-hero', label: 'Contact' },
    { id: 'contact-channels', label: 'Channels' },
    { id: 'contact-form', label: 'Send Message' }
  ],
  '/skills': [
    { id: 'skills-hero', label: 'Skills' },
    { id: 'skills-groups', label: 'Groups' },
    { id: 'skills-tags', label: 'Tech Stack' }
  ]
}

const sections = computed(() => route.path.startsWith('/projects/')
  ? [
    { id: 'detail-hero', label: 'Overview' },
    { id: 'detail-case', label: 'Case Study' },
    { id: 'detail-sidebar', label: 'Highlights' },
    { id: 'detail-nav', label: 'More Projects' }
  ]
  : (sectionsByRoute[route.path] || [])
)

const connectObserver = async () => {
  if (observer) observer.disconnect()
  await nextTick()

  const targets = sections.value
    .map(s => document.getElementById(s.id))
    .filter(Boolean)

  if (!targets.length) {
    activeSection.value = ''
    return
  }

  observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
    if (visible[0]) activeSection.value = visible[0].target.id
  }, {
    rootMargin: '-25% 0px -55% 0px',
    threshold: [0.2, 0.45, 0.7]
  })

  targets.forEach(el => observer.observe(el))
  activeSection.value = targets[0].id
}

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

watch(() => route.fullPath, connectObserver)
onMounted(connectObserver)
onBeforeUnmount(() => observer?.disconnect())
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
.section-nav ul { list-style: none; display: flex; flex-direction: column; gap: var(--space-2); }
.section-link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-faint);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  transition: all var(--transition-fast);
}
.section-link:hover { color: var(--color-text); background: var(--color-surface); }
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
.label { font-size: 0.75rem; font-family: var(--font-mono); letter-spacing: 0.04em; }

@media (max-width: 1024px) {
  .section-nav { display: none; }
}
</style>
