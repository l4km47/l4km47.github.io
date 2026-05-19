<template>
  <div class="skills-page">
    <section id="skills-hero" class="section-sm skills-hero">
      <div class="hero-bg-subtle"></div>
      <div class="container text-center">
        <span class="section-label reveal">Expertise</span>
        <h1 class="reveal reveal-delay-1">My <span class="gradient-text">Skills</span></h1>
        <p class="page-desc reveal reveal-delay-2">A snapshot of my technical toolkit — languages, frameworks, and domains I work in.</p>
      </div>
    </section>

    <section class="section" v-if="!loading && skills">
      <div class="container">
        <!-- Skill Groups -->
        <div id="skills-groups" class="skill-groups">
          <div v-for="(group, i) in skillGroups" :key="group.key" class="skill-group reveal" :class="`reveal-delay-${i + 1}`">
            <div class="group-header">
              <div class="group-icon" v-html="group.icon"></div>
              <h2 class="group-title">{{ group.label }}</h2>
            </div>
            <div class="skill-bars">
              <div v-for="skill in skills[group.key]" :key="skill.name" class="skill-bar-wrap">
                <div class="skill-info">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-level">{{ skill.level }}%</span>
                </div>
                <div class="skill-track">
                  <div
                    class="skill-fill"
                    :style="{ '--skill-level': skill.level + '%', '--skill-color': skill.color }"
                    :class="{ animated: barsVisible }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tags cloud -->
        <div class="section-header" style="margin-top: var(--space-16)">
          <span class="section-label">All Technologies</span>
          <h2 class="section-title reveal">Full <span class="gradient-text">Tech Stack</span></h2>
        </div>
        <div id="skills-tags" class="tags-cloud reveal">
          <span
            v-for="(tag, i) in skills.tags"
            :key="tag"
            class="tag-chip"
            :style="{ animationDelay: `${i * 0.05}s` }"
          >{{ tag }}</span>
        </div>
      </div>
    </section>

    <div v-else-if="loading" class="loading-state section text-center">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useData } from '@/composables/useData'

const { loading, fetchData } = useData()
const skills = ref(null)
const barsVisible = ref(false)

const skillGroups = [
  {
    key: 'languages',
    label: 'Languages',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`
  },
  {
    key: 'frameworks',
    label: 'Frameworks & Runtimes',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`
  },
  {
    key: 'systems',
    label: 'Systems & Security',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
  },
  {
    key: 'tools',
    label: 'Tools & Databases',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`
  },
  {
    key: 'hardware',
    label: 'Hardware & IT Infrastructure',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M15 20v2M2 15h2M20 15h2M9 2v2M9 20v2M2 9h2M20 9h2"/></svg>`
  }
]

onMounted(async () => {
  skills.value = await fetchData('/data/skills.json')
  setTimeout(() => { barsVisible.value = true }, 300)
})
</script>

<style scoped>
.skills-page { min-height: 100vh; }
.skills-hero { position: relative; }
.hero-bg-subtle {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at 50% 100%, rgba(6,182,212,0.07) 0%, transparent 60%);
  pointer-events: none;
}
.page-desc { font-size: 1.05rem; max-width: 600px; margin: var(--space-4) auto 0; }

.skill-groups {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: var(--space-8);
}

.skill-group {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
}

.group-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
  color: var(--color-primary-light);
}
.group-title { font-size: 1.1rem; }

.skill-bars { display: flex; flex-direction: column; gap: var(--space-4); }
.skill-bar-wrap { }
.skill-info { display: flex; justify-content: space-between; margin-bottom: var(--space-2); }
.skill-name { font-size: 0.875rem; font-weight: 500; }
.skill-level { font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-text-faint); }

.skill-track {
  height: 6px;
  background: var(--color-surface-alt);
  border-radius: var(--radius-full);
  overflow: hidden;
}
.skill-fill {
  height: 100%;
  width: 0;
  border-radius: var(--radius-full);
  background: linear-gradient(90deg, var(--skill-color, var(--color-primary)), var(--color-primary-light));
  transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.skill-fill.animated { width: var(--skill-level); }

/* Tags */
.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  justify-content: center;
}
.tag-chip {
  padding: var(--space-2) var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-text-muted);
  transition: all var(--transition-base);
  cursor: default;
}
.tag-chip:hover {
  border-color: var(--color-accent);
  color: var(--color-accent-light);
  background: rgba(6,182,212,0.05);
  transform: translateY(-2px);
}

.loading-state { min-height: 60vh; display: flex; align-items: center; justify-content: center; }
.spinner {
  width: 40px; height: 40px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@media (max-width: 768px) {
  .skill-groups { grid-template-columns: 1fr; }
}
</style>
