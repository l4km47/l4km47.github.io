<template>
  <RouterLink :to="`/projects/${project.slug}`" class="project-card card">
    <!-- Thumbnail -->
    <div class="card-thumb">
      <img v-if="project.thumbnail && !imgError" :src="project.thumbnail" :alt="`${project.title} screenshot`"
        @error="imgError = true" loading="lazy" />
      <div v-else class="thumb-placeholder"
        :style="{ background: `linear-gradient(135deg, ${project.color}22 0%, ${project.color}11 100%)` }">
        <div class="thumb-icon" :style="{ color: project.color }">
          <svg v-if="project.category.includes('mobile')" width="48" height="48" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.5">
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <path d="M12 18h.01" />
          </svg>
          <svg v-else-if="project.category.includes('tools')" width="48" height="48" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.5">
            <path
              d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
          <svg v-else width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
        </div>
        <span class="thumb-title">{{ project.title }}</span>
      </div>

      <!-- Status badge -->
      <div class="card-status" :class="statusClass">{{ project.status }}</div>
    </div>

    <!-- Body -->
    <div class="card-body">
      <div class="card-meta">
        <span class="card-year">{{ project.year }}</span>
        <div class="card-cats">
          <span v-for="cat in project.category.slice(0, 2)" :key="cat" class="badge badge-primary">{{ cat }}</span>
        </div>
      </div>

      <h3 class="card-title">{{ project.title }}</h3>
      <p class="card-subtitle">{{ project.subtitle }}</p>
      <p class="card-overview">{{ truncate(project.overview, 120) }}</p>

      <!-- Tech stack -->
      <div class="card-tech">
        <span v-for="t in project.tech.slice(0, 4)" :key="t" class="tech-tag">{{ t }}</span>
        <span v-if="project.tech.length > 4" class="tech-tag tech-more">+{{ project.tech.length - 4 }}</span>
      </div>

      <!-- Links row -->
      <div class="card-links">
        <span class="view-case-study">
          Case Study
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </span>
        <div class="ext-links">
          <a v-if="project.github" :href="project.github" target="_blank" rel="noopener" @click.stop title="GitHub"
            class="ext-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener" @click.stop title="Live Demo"
            class="ext-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Accent line -->
    <div class="card-accent" :style="{ background: project.color }"></div>
  </RouterLink>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  project: { type: Object, required: true }
})

const imgError = ref(false)

const truncate = (text, len) => text?.length > len ? text.slice(0, len) + '…' : text

const statusClass = computed(() => {
  const s = props.project.status
  if (s === 'Live') return 'status-live'
  if (s === 'Open Source') return 'status-oss'
  return 'status-wip'
})
</script>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  cursor: pointer;
  padding: 0;
  overflow: hidden;
}

/* Thumbnail */
.card-thumb {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: var(--color-surface-alt);
}

.card-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.project-card:hover .card-thumb img {
  transform: scale(1.05);
}

.thumb-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
}

.thumb-title {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.card-status {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: 0.7rem;
  font-weight: 600;
  font-family: var(--font-mono);
}

.status-live {
  background: rgba(16, 185, 129, 0.15);
  color: var(--color-success);
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.status-oss {
  background: rgba(124, 58, 237, 0.15);
  color: var(--color-primary-light);
  border: 1px solid rgba(124, 58, 237, 0.3);
}

.status-wip {
  background: rgba(245, 158, 11, 0.15);
  color: var(--color-warning);
  border: 1px solid rgba(245, 158, 11, 0.3);
}

/* Body */
.card-body {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  flex: 1;
}

.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-year {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-faint);
}

.card-cats {
  display: flex;
  gap: var(--space-2);
}

.card-title {
  font-size: 1.2rem;
  color: var(--color-text);
  transition: color var(--transition-fast);
}

.project-card:hover .card-title {
  color: var(--color-primary-light);
}

.card-subtitle {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin: 0;
  line-height: 1.4;
}

.card-overview {
  font-size: 0.85rem;
  color: var(--color-text-faint);
  line-height: 1.6;
  flex: 1;
  margin: 0;
}

.card-tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.tech-tag {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  padding: 2px var(--space-2);
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-faint);
}

.tech-more {
  color: var(--color-primary-light);
  border-color: rgba(124, 58, 237, 0.3);
}

.card-links {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-border);
}

.view-case-study {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-primary-light);
  transition: gap var(--transition-fast);
}

.project-card:hover .view-case-study {
  gap: var(--space-3);
}

.ext-links {
  display: flex;
  gap: var(--space-2);
}

.ext-link {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
  transition: all var(--transition-fast);
}

.ext-link:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

/* Accent line */
.card-accent {
  height: 3px;
  opacity: 0.6;
  transition: opacity var(--transition-base);
}

.project-card:hover .card-accent {
  opacity: 1;
}
</style>
