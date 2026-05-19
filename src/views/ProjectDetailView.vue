<template>
  <div class="detail-page" v-if="project">
    <!-- Hero -->
    <section id="detail-hero" class="detail-hero section-sm" :style="{ '--project-color': project.color }">
      <div class="hero-bg-slider">
        <div 
          v-for="(bg, idx) in heroBackgrounds" 
          :key="bg"
          class="hero-bg-slide"
          :class="{ active: idx === currentBgIndex }"
          :style="{ backgroundImage: `url(${bg})` }"
        ></div>
        <div class="hero-bg-overlay"></div>
      </div>
      <div class="hero-glow"></div>
      <div class="container">
        <RouterLink to="/projects" class="back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          All Projects
        </RouterLink>
        <div class="hero-content">
          <div class="hero-meta">
            <span class="badge badge-primary">{{ project.year }}</span>
            <span v-for="cat in project.category" :key="cat" class="badge badge-accent">{{ cat }}</span>
            <span class="badge" :class="project.status === 'Live' ? 'badge-success' : 'badge-primary'">{{ project.status
              }}</span>
          </div>
          <h1>{{ project.title }}</h1>
          <p class="hero-subtitle">{{ project.subtitle }}</p>
          <div class="hero-actions">
            <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener" class="btn btn-primary btn-lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              View Live
            </a>
            <a v-if="project.github" :href="project.github" target="_blank" rel="noopener"
              class="btn btn-outline btn-lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub Repo
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Overview strip -->
    <div class="overview-strip">
      <div class="container">
        <div class="tech-stack-row">
          <span class="strip-label">Tech Stack:</span>
          <div class="tech-badges">
            <span v-for="t in project.tech" :key="t" class="badge badge-primary">{{ t }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Case Study Content -->
    <section id="detail-case" class="section case-study">
      <div class="container">
        <div class="case-grid">
          <!-- Main content -->
          <div class="case-main">
            <!-- Overview -->
            <div class="case-block reveal">
              <h2 class="block-title"><span class="block-num">01</span> Overview</h2>
              <p>{{ project.overview }}</p>
            </div>

            <!-- Goal -->
            <div class="case-block reveal">
              <h2 class="block-title"><span class="block-num">02</span> The Goal</h2>
              <p>{{ project.goal }}</p>
            </div>

            <!-- Process -->
            <div class="case-block reveal">
              <h2 class="block-title"><span class="block-num">03</span> Process & Approach</h2>
              <p>{{ project.process }}</p>
            </div>

            <!-- Architecture -->
            <div class="case-block reveal" v-if="project.architecture">
              <h2 class="block-title"><span class="block-num">04</span> Architecture</h2>
              <div class="arch-diagram card">
                <div class="arch-mermaid" ref="mermaidEl" v-html="mermaidSvg"></div>
                <details class="arch-source">
                  <summary>View diagram source</summary>
                  <pre><code>{{ project.architecture }}</code></pre>
                </details>
              </div>
            </div>

            <!-- Outcome -->
            <div class="case-block reveal">
              <h2 class="block-title"><span class="block-num">05</span> Outcome</h2>
              <p>{{ project.outcome }}</p>
            </div>

            <!-- Screenshots -->
            <div class="case-block reveal" v-if="project.screenshots && project.screenshots.length">
              <h2 class="block-title"><span class="block-num">06</span> Screenshots</h2>
              <div class="screenshots-grid">
                <div v-for="(ss, i) in project.screenshots" :key="i" class="screenshot-wrap">
                  <img :src="ss" :alt="`${project.title} screenshot ${i + 1}`" loading="lazy" class="screenshot"
                    @error="(e) => e.target.parentElement.style.display = 'none'" />
                </div>
              </div>
            </div>

            <!-- Disclaimer -->
            <div class="case-block reveal" v-if="project.disclaimer">
              <div class="disclaimer-box">
                <div class="disclaimer-icon">⚠️</div>
                <div>
                  <h4>Legal & Responsible Use</h4>
                  <p>{{ project.disclaimer }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <aside id="detail-sidebar" class="case-sidebar">
            <!-- Highlights -->
            <div class="sidebar-card card reveal" v-if="project.highlights && project.highlights.length">
              <h3 class="sidebar-title">Key Highlights</h3>
              <ul class="highlights-list">
                <li v-for="h in project.highlights" :key="h">
                  <span class="highlight-dot"></span>
                  {{ h }}
                </li>
              </ul>
            </div>

            <!-- Quick Info -->
            <div class="sidebar-card card reveal reveal-delay-1">
              <h3 class="sidebar-title">Quick Info</h3>
              <div class="info-rows">
                <div class="info-row" style="display:flex; align-items: start; gap:5px;">
                  <span class="info-label">Role</span>
                  <span class="info-val">{{ project.role }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Year</span>
                  <span class="info-val">{{ project.year }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Status</span>
                  <span class="info-val" :style="{ color: project.color }">{{ project.status }}</span>
                </div>
              </div>
            </div>

            <!-- Links -->
            <div class="sidebar-card card reveal reveal-delay-2">
              <h3 class="sidebar-title">Links</h3>
              <div class="sidebar-links">
                <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener" class="sidebar-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path
                      d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  Live Demo
                </a>
                <a v-if="project.github" :href="project.github" target="_blank" rel="noopener" class="sidebar-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  Source Code
                </a>
                <span v-if="!project.demo && !project.github" class="no-links">Code is private</span>
              </div>
            </div>
          </aside>
        </div>

        <!-- Prev/Next nav -->
        <div id="detail-nav" class="project-nav reveal">
          <RouterLink v-if="prevProject" :to="`/projects/${prevProject.slug}`" class="nav-proj">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            <span>
              <small>Previous</small>
              <strong>{{ prevProject.title }}</strong>
            </span>
          </RouterLink>
          <RouterLink v-if="nextProject" :to="`/projects/${nextProject.slug}`" class="nav-proj nav-next">
            <span>
              <small>Next</small>
              <strong>{{ nextProject.title }}</strong>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>

  <!-- Not Found -->
  <div v-else-if="!loading" class="not-found section text-center">
    <h2>Project not found</h2>
    <RouterLink to="/projects" class="btn btn-primary">Back to Projects</RouterLink>
  </div>

  <!-- Loading -->
  <div v-else class="loading-state section text-center">
    <div class="spinner"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useData } from '@/composables/useData'

const route = useRoute()
const { loading, fetchData } = useData()
const projects = ref([])
const mermaidSvg = ref('')

const project = computed(() =>
  projects.value.find(p => p.slug === route.params.slug)
)

const currentIndex = computed(() =>
  projects.value.findIndex(p => p.slug === route.params.slug)
)
const prevProject = computed(() =>
  currentIndex.value > 0 ? projects.value[currentIndex.value - 1] : null
)
const nextProject = computed(() =>
  currentIndex.value < projects.value.length - 1 ? projects.value[currentIndex.value + 1] : null
)

// Background slider logic
const heroBackgrounds = computed(() => {
  if (!project.value) return []
  const imgs = []
  if (project.value.thumbnail) imgs.push(project.value.thumbnail)
  if (project.value.screenshots?.length) {
    imgs.push(...project.value.screenshots)
  }
  return [...new Set(imgs)]
})

const currentBgIndex = ref(0)
let bgInterval = null

function startBgSlider() {
  stopBgSlider()
  if (heroBackgrounds.value.length > 1) {
    bgInterval = setInterval(() => {
      currentBgIndex.value = (currentBgIndex.value + 1) % heroBackgrounds.value.length
    }, 4000)
  }
}

function stopBgSlider() {
  if (bgInterval) clearInterval(bgInterval)
}

onUnmounted(() => {
  stopBgSlider()
})

async function renderMermaid() {
  if (!project.value?.architecture) return
  try {
    const { default: mermaid } = await import('mermaid')
    mermaid.initialize({
      startOnLoad: false, theme: 'dark', themeVariables: {
        primaryColor: '#7c3aed',
        primaryTextColor: '#f1f5f9',
        primaryBorderColor: '#7c3aed',
        lineColor: '#94a3b8',
        background: '#111128',
        mainBkg: '#111128'
      }
    })
    const id = `mermaid-${Date.now()}`
    const { svg } = await mermaid.render(id, project.value.architecture)
    mermaidSvg.value = svg
  } catch (e) {
    mermaidSvg.value = `<p style="color:var(--color-text-muted);font-family:var(--font-mono);font-size:0.8rem">Architecture diagram</p><pre style="color:var(--color-text-faint)">${project.value.architecture}</pre>`
  }
}

watch(project, async () => {
  currentBgIndex.value = 0
  startBgSlider()
  await renderMermaid()
})

onMounted(async () => {
  projects.value = await fetchData('/data/projects.json') || []
  if (project.value) {
    startBgSlider()
    await renderMermaid()
  }
})
</script>

<style scoped>
.detail-page {
  min-height: 100vh;
}

.detail-hero {
  position: relative;
  overflow: hidden;
  padding-top: var(--space-10);
  background: var(--color-bg);
}

.hero-bg-slider {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.hero-bg-slide {
  position: absolute;
  inset: -20px; /* prevent blur artifacts on edges */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  filter: blur(20px);
  transform: scale(1.05);
  transition: opacity 1.5s ease-in-out, filter 1.5s ease-in-out, transform 1.5s ease-in-out;
}

.hero-bg-slide.active {
  opacity: 0.3;
  filter: blur(8px);
  transform: scale(1);
}

.hero-bg-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(17,17,40,0.3) 0%, var(--color-bg) 100%);
  z-index: 1;
}

.hero-glow, .container {
  position: relative;
  z-index: 2;
}

.hero-glow {
  position: absolute;
  top: -100px;
  left: -100px;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--project-color, var(--color-primary)) 0%, transparent 70%);
  opacity: 0.08;
  pointer-events: none;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin-bottom: var(--space-6);
  transition: color var(--transition-fast);
  font-family: var(--font-mono);
}

.back-link:hover {
  color: var(--color-primary-light);
}

.hero-meta {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
  margin-bottom: var(--space-4);
}

.hero-content h1 {
  font-size: clamp(2rem, 4vw, 3.5rem);
  margin-bottom: var(--space-3);
}

.hero-subtitle {
  font-size: 1.1rem;
  color: var(--color-text-muted);
  margin-bottom: var(--space-6);
}

.hero-actions {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.overview-strip {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-4) 0;
}

.tech-stack-row {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.strip-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-faint);
  white-space: nowrap;
}

.tech-badges {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.case-grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: var(--space-12);
  align-items: start;
}

.case-main {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
}

.case-block {}

.block-title {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: 1.5rem;
  margin-bottom: var(--space-5);
}

.block-num {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-primary-light);
  background: rgba(124, 58, 237, 0.1);
  border: 1px solid rgba(124, 58, 237, 0.3);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
}

.arch-diagram {
  padding: var(--space-6);
}

.arch-mermaid {
  overflow-x: auto;
}

.arch-mermaid svg {
  max-width: 100%;
  height: auto;
}

.arch-source {
  margin-top: var(--space-4);
}

.arch-source summary {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-faint);
  cursor: pointer;
}

.arch-source pre {
  margin-top: var(--space-3);
  padding: var(--space-4);
  background: var(--color-bg);
  border-radius: var(--radius-md);
  overflow-x: auto;
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.screenshots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-4);
}

.screenshot-wrap {
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.screenshot {
  width: 100%;
  height: auto;
  display: block;
  transition: transform var(--transition-slow);
}

.screenshot:hover {
  transform: scale(1.02);
}

.disclaimer-box {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-6);
  background: rgba(245, 158, 11, 0.05);
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-radius: var(--radius-lg);
  border-left: 3px solid var(--color-warning);
}

.disclaimer-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.disclaimer-box h4 {
  color: var(--color-warning);
  margin-bottom: var(--space-2);
}

.disclaimer-box p {
  font-size: 0.875rem;
  margin: 0;
}

/* Sidebar */
.case-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  position: sticky;
  top: calc(var(--nav-height) + var(--space-6));
}

.sidebar-card {
  padding: var(--space-5);
}

.sidebar-title {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: var(--space-4);
}

.highlights-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.highlights-list li {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.highlight-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-primary);
  flex-shrink: 0;
  margin-top: 6px;
}

.info-rows {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-faint);
}

.info-val {
  font-size: 0.875rem;
  font-weight: 500;
}

.sidebar-links {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.875rem;
  color: var(--color-text-muted);
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.sidebar-link:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
  background: rgba(6, 182, 212, 0.05);
}

.no-links {
  font-size: 0.85rem;
  color: var(--color-text-faint);
  font-family: var(--font-mono);
}

/* Prev/Next */
.project-nav {
  display: flex;
  justify-content: space-between;
  gap: var(--space-6);
  margin-top: var(--space-12);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border);
}

.nav-proj {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  max-width: 280px;
}

.nav-proj:hover {
  border-color: var(--color-primary);
  background: rgba(124, 58, 237, 0.05);
}

.nav-proj span {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-proj small {
  font-size: 0.7rem;
  font-family: var(--font-mono);
  color: var(--color-text-faint);
}

.nav-proj strong {
  font-size: 0.9rem;
  color: var(--color-text);
}

.nav-next {
  margin-left: auto;
  text-align: right;
  flex-direction: row-reverse;
}

.not-found,
.loading-state {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-6);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@media (max-width: 1024px) {
  .case-grid {
    grid-template-columns: 1fr;
  }

  .case-sidebar {
    position: static;
  }
}

@media (max-width: 768px) {
  .project-nav {
    flex-direction: column;
  }

  .nav-proj {
    max-width: 100%;
  }

  .nav-next {
    margin-left: 0;
    flex-direction: row;
    text-align: left;
  }
}
</style>
