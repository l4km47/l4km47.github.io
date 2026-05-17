<template>
  <div class="home">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-bg">
        <div class="hero-orb hero-orb-1"></div>
        <div class="hero-orb hero-orb-2"></div>
        <div class="hero-grid"></div>
      </div>
      <div class="container hero-content">
        <div class="hero-badge reveal">
          <span class="status-dot"></span>
          Available for new projects
        </div>

        <h1 class="hero-title reveal reveal-delay-1">
          Hi, I'm <span class="gradient-text">Lakmal</span><br />
          <span class="typewriter" ref="typewriterEl"></span>
        </h1>

        <p class="hero-desc reveal reveal-delay-2">
          Low-level enough to understand the system.<br />
          High-level enough to engineer the solution.
        </p>

        <div class="hero-actions reveal reveal-delay-3">
          <RouterLink to="/projects" class="btn btn-primary btn-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            View My Work
          </RouterLink>
          <RouterLink to="/contact" class="btn btn-outline btn-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Contact Me
          </RouterLink>
        </div>

        <div class="hero-stats reveal reveal-delay-4">
          <div class="stat">
            <span class="stat-num">12+</span>
            <span class="stat-label">Years Building</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">110+</span>
            <span class="stat-label">Projects Shipped</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">900K+</span>
            <span class="stat-label">App Downloads</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">231+</span>
            <span class="stat-label">GitHub Repos</span>
          </div>
        </div>
      </div>

      <div class="scroll-indicator">
        <div class="scroll-mouse">
          <div class="scroll-wheel"></div>
        </div>
        <span>Scroll</span>
      </div>
    </section>

    <!-- FEATURED PROJECTS -->
    <section class="section featured-section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Selected Work</span>
          <h2 class="section-title reveal">Featured <span class="gradient-text">Projects</span></h2>
          <p class="section-desc reveal">Production-grade applications, open-source tools, and engineering experiments.
          </p>
        </div>

        <div v-if="loading" class="loading-grid">
          <div v-for="i in 3" :key="i" class="skeleton-card"></div>
        </div>

        <div v-else class="projects-grid">
          <ProjectCard v-for="(project, i) in featuredProjects" :key="project.slug" :project="project"
            :class="`reveal reveal-delay-${i + 1}`" />
        </div>

        <div class="view-all-wrap reveal">
          <RouterLink to="/projects" class="btn btn-outline">
            View All Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- WHAT I DO -->
    <section class="section what-i-do">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Expertise</span>
          <h2 class="section-title reveal">What I <span class="gradient-text">Build</span></h2>
        </div>
        <div class="expertise-grid">
          <div v-for="(item, i) in expertise" :key="item.title" class="expertise-card card reveal"
            :class="`reveal-delay-${i + 1}`">
            <div class="expertise-icon" :style="{ color: item.color }">
              <component :is="'div'" v-html="item.icon"></component>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
            <div class="expertise-tags">
              <span v-for="tag in item.tags" :key="tag" class="badge badge-primary">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SKILLS CLOUD -->
    <section class="section-sm skills-cloud-section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Tech Stack</span>
          <h2 class="section-title reveal">Tools of the <span class="gradient-text">Trade</span></h2>
        </div>
        <div class="tags-wrap reveal">
          <span v-for="tag in techTags" :key="tag" class="tag-chip">{{ tag }}</span>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section-sm cta-section">
      <div class="container">
        <div class="cta-card card-glass reveal">
          <div class="cta-glow"></div>
          <h2>Let's Build Something <span class="gradient-text">Great</span></h2>
          <p>I'm open to freelance projects, full-time roles, and interesting collaborations.</p>
          <div class="cta-actions">
            <RouterLink to="/contact" class="btn btn-primary btn-lg">
              Get In Touch
            </RouterLink>
            <a href="https://github.com/l4km47" target="_blank" rel="noopener" class="btn btn-outline btn-lg">
              Browse GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useData } from '@/composables/useData'
import ProjectCard from '@/components/projects/ProjectCard.vue'

const { loading, fetchData } = useData()
const projects = ref([])
const typewriterEl = ref(null)

const featuredProjects = computed(() => projects.value.filter(p => p.featured))

const techTags = [
  'Node.js', 'Python', 'C#', 'C++', 'Vue 3', 'Flutter', 'React',
  'Android (Native)', 'Java', 'Kotlin', 'Room DB', 'Retrofit',
  'Flask', 'Express', 'PostgreSQL', 'MySQL', 'SQLite', 'MongoDB',
  'Firebase', 'JWT', 'Argon2', 'Docker', 'GitHub Actions',
  'REST APIs', 'IDA Pro', 'WinDbg', 'x64dbg', 'Ghidra',
  'Reverse Engineering', 'PE Analysis', 'Firmware Analysis',
  'JADX', 'Kernel Development', 'ESP32'
]

const expertise = [
  {
    title: 'Full-Stack Web',
    color: '#7c3aed',
    desc: 'Production-grade web applications from database schema to polished UI. Vue 3, React, Node.js, and Python backends.',
    tags: ['Vue 3', 'Node.js', 'Flask', 'PostgreSQL'],
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`
  },
  {
    title: 'Systems & Kernel',
    color: '#06b6d4',
    desc: 'Windows kernel driver development, hardware interaction, HWID authentication systems, and anti-tamper engineering.',
    tags: ['C++', 'C#', 'WDK', 'HWID'],
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M15 20v2M2 15h2M20 15h2M9 2v2M9 20v2M2 9h2M20 9h2"/></svg>`
  },
  {
    title: 'Mobile & Cross-Platform',
    color: '#10b981',
    desc: 'Cross-platform apps with Flutter and native Android development (Java/Kotlin). SQLite/Room DB, Retrofit API integration, Firebase backend, Google Maps, push notifications, and background services.',
    tags: ['Flutter', 'Android (Native)', 'Room DB', 'Retrofit', 'Firebase'],
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>`
  },
  {
    title: 'Security & Reverse Engineering',
    color: '#ef4444',
    desc: 'Full-spectrum reverse engineering across platforms — Windows PE/DLL analysis with IDA Pro & WinDbg, embedded/firmware targets, Android APK decompilation, and custom static analysis tooling. From kernel-mode debugging to mobile bytecode.',
    tags: ['IDA Pro', 'WinDbg', 'x64dbg', 'JADX', 'Firmware'],
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
  },
  {
    title: 'DevOps & Tooling',
    color: '#f59e0b',
    desc: 'CI/CD pipelines, Docker containerization, GitHub Actions automation, and building developer tools that improve workflows.',
    tags: ['Docker', 'GitHub Actions', 'Linux', 'Bash'],
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`
  },
  {
    title: 'AI/ML Experiments',
    color: '#9d6bf5',
    desc: 'Model training experiments, AI-assisted automation, and exploring the intersection of AI with systems programming.',
    tags: ['Python', 'ML', 'AI', 'Automation'],
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 8v4l3 3"/></svg>`
  }
]

// Typewriter effect
const phrases = [
  'Full-Stack Developer',
  'Systems Engineer',
  'Security Researcher',
  'Open Source Builder',
  'Kernel Developer'
]

let phraseIdx = 0
let charIdx = 0
let deleting = false

function typeStep() {
  if (!typewriterEl.value) return
  const phrase = phrases[phraseIdx]

  if (!deleting) {
    typewriterEl.value.textContent = phrase.substring(0, charIdx + 1)
    charIdx++
    if (charIdx === phrase.length) {
      deleting = true
      setTimeout(typeStep, 2000)
      return
    }
  } else {
    typewriterEl.value.textContent = phrase.substring(0, charIdx - 1)
    charIdx--
    if (charIdx === 0) {
      deleting = false
      phraseIdx = (phraseIdx + 1) % phrases.length
    }
  }
  setTimeout(typeStep, deleting ? 60 : 100)
}

onMounted(async () => {
  projects.value = await fetchData('/data/projects.json') || []
  typeStep()
})
</script>

<style scoped>
/* HERO */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: var(--space-20) 0;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.12;
}

.hero-orb-1 {
  width: 600px;
  height: 600px;
  background: var(--color-primary);
  top: -100px;
  left: -100px;
  animation: float 8s ease-in-out infinite;
}

.hero-orb-2 {
  width: 500px;
  height: 500px;
  background: var(--color-accent);
  bottom: -100px;
  right: -100px;
  animation: float 10s ease-in-out infinite reverse;
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(124, 58, 237, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(124, 58, 237, 0.04) 1px, transparent 1px);
  background-size: 60px 60px;
}

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-6);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: var(--radius-full);
  padding: var(--space-2) var(--space-4);
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-success);
  font-family: var(--font-mono);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-success);
  animation: pulse-glow 2s infinite;
  box-shadow: 0 0 8px var(--color-success);
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 5rem);
  line-height: 1.1;
}

.typewriter {
  display: inline-block;
  color: var(--color-accent-light);
  font-family: var(--font-mono);
  font-size: 0.7em;
  font-weight: 400;
  border-right: 2px solid var(--color-accent);
  padding-right: 4px;
  animation: blink 1s step-end infinite;
  min-height: 1.2em;
}

.hero-desc {
  font-size: 1.1rem;
  color: var(--color-text-muted);
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
  justify-content: center;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  margin-top: var(--space-4);
  padding: var(--space-5) var(--space-8);
  background: rgba(17, 17, 40, 0.6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  backdrop-filter: blur(20px);
}

.stat {
  text-align: center;
}

.stat-num {
  display: block;
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--color-text-faint);
  white-space: nowrap;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: var(--color-border);
}

/* Scroll indicator */
.scroll-indicator {
  position: absolute;
  bottom: var(--space-8);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-faint);
  font-size: 0.7rem;
  font-family: var(--font-mono);
  letter-spacing: 0.1em;
  animation: fadeIn 1s ease 2s both;
}

.scroll-mouse {
  width: 22px;
  height: 36px;
  border: 2px solid var(--color-text-faint);
  border-radius: 11px;
  display: flex;
  justify-content: center;
  padding-top: 6px;
}

.scroll-wheel {
  width: 4px;
  height: 8px;
  background: var(--color-primary-light);
  border-radius: 2px;
  animation: float 1.5s ease-in-out infinite;
}

/* FEATURED PROJECTS */
.featured-section {
  background: var(--color-bg-alt);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--space-6);
}

.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--space-6);
}

.skeleton-card {
  height: 300px;
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  background: linear-gradient(90deg, var(--color-surface) 0%, var(--color-surface-alt) 50%, var(--color-surface) 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.view-all-wrap {
  text-align: center;
  margin-top: var(--space-10);
}

/* EXPERTISE */
.expertise-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

.expertise-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.expertise-icon {
  margin-bottom: var(--space-2);
}

.expertise-card h3 {
  font-size: 1.1rem;
}

.expertise-card p {
  font-size: 0.9rem;
  flex: 1;
}

.expertise-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

/* SKILLS CLOUD */
.skills-cloud-section {
  background: var(--color-bg-alt);
}

.tags-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  justify-content: center;
  max-width: 900px;
  margin: 0 auto;
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
  border-color: var(--color-primary);
  color: var(--color-primary-light);
  background: rgba(124, 58, 237, 0.1);
  transform: translateY(-2px);
}

/* CTA */
.cta-card {
  border-radius: var(--radius-xl);
  padding: var(--space-16) var(--space-12);
  text-align: center;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
}

.cta-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 300px;
  background: radial-gradient(ellipse, var(--color-primary-glow), transparent 70%);
  pointer-events: none;
}

.cta-card h2 {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
}

.cta-card p {
  max-width: 500px;
}

.cta-actions {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
  justify-content: center;
}

@media (max-width: 1024px) {
  .expertise-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-stats {
    gap: var(--space-4);
    padding: var(--space-4);
    flex-wrap: wrap;
    justify-content: center;
  }

  .expertise-grid {
    grid-template-columns: 1fr;
  }

  .cta-card {
    padding: var(--space-10) var(--space-6);
  }
}
</style>
