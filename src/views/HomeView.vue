<template>
  <div class="home">
    <!-- HERO -->
    <section id="home-hero" class="hero" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave"
      :style="{ '--scroll-y': scrollY }">
      <div class="hero-bg">
        <div class="mesh-blob mesh-blob-1"></div>
        <div class="mesh-blob mesh-blob-2"></div>
        <div class="mesh-blob mesh-blob-3"></div>
        <div class="glass-pane"></div>
      </div>
      <div class="hero-massive-name">LAKMAL SiRiWARDHANA<span>.</span></div>

      <div class="container hero-content">
        <!-- Left Side: Intro & Actions -->
        <div class="hero-left">
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
        </div>

        <!-- Right Side: Vertical Stats -->
        <div class="hero-right reveal reveal-delay-4">
          <div class="stat">
            <span class="stat-num">12</span>
            <span class="stat-label">Years of Experience</span>
          </div>
          <div class="stat">
            <span class="stat-num">110</span>
            <span class="stat-label">Projects Completed</span>
          </div>
          <div class="stat">
            <span class="stat-num">146</span>
            <span class="stat-label">Happy Clients</span>
          </div>
          <div class="stat">
            <span class="stat-num">231</span>
            <span class="stat-label">GitHub Repositories</span>
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
    <section id="home-projects" class="section featured-section">
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
    <section id="home-expertise" class="section what-i-do">
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
    <section id="home-cta" class="section-sm cta-section">
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
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useData } from '@/composables/useData'
import ProjectCard from '@/components/projects/ProjectCard.vue'

const { loading, fetchData } = useData()
const projects = ref([])
const typewriterEl = ref(null)

const mouseX = ref(0)
const mouseY = ref(0)
const scrollY = ref(0)

function handleScroll() {
  scrollY.value = window.scrollY
}

function handleMouseMove(e) {
  mouseX.value = (e.clientX / window.innerWidth) * 2 - 1
  mouseY.value = -(e.clientY / window.innerHeight) * 2 + 1
}

function handleMouseLeave() {
  mouseX.value = 0
  mouseY.value = 0
}

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
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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
  overflow: hidden;
  pointer-events: none;
  background: var(--color-bg);
  will-change: transform;
  transform: translateY(calc(var(--scroll-y, 0) * 0.28px));
}

.mesh-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.5;
  animation: float-mesh 15s ease-in-out infinite alternate;
}

.mesh-blob-1 {
  width: 80vw;
  height: 80vw;
  max-width: 800px;
  max-height: 800px;
  background: rgba(79, 237, 58, 0.12);
  /* primary */
  top: -20%;
  left: -10%;
  animation-delay: 0s;
}

.mesh-blob-2 {
  width: 60vw;
  height: 60vw;
  max-width: 600px;
  max-height: 600px;
  background: rgba(6, 212, 126, 0.12);
  /* accent */
  bottom: -10%;
  right: -5%;
  animation-delay: -5s;
}

.mesh-blob-3 {
  width: 50vw;
  height: 50vw;
  max-width: 500px;
  max-height: 500px;
  background: rgba(124, 58, 237, 0.08);
  /* complementary purple */
  top: 30%;
  left: 30%;
  animation-delay: -10s;
}

.glass-pane {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, transparent 100%);
  z-index: 0;
}

@keyframes float-mesh {
  0% {
    transform: translate(0, 0) scale(1);
  }

  50% {
    transform: translate(5%, 10%) scale(1.1);
  }

  100% {
    transform: translate(-5%, 5%) scale(0.9);
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: -10vh;
  /* Shift up to balance bottom text */
  will-change: transform, opacity;
  transform: translateY(calc(var(--scroll-y, 0) * -0.18px));
  opacity: calc(1 - var(--scroll-y, 0) / 450);
}

.hero-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  max-width: 550px;
  gap: var(--space-6);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: var(--radius-md);
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
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1.1;
}

.typewriter {
  display: inline-block;
  color: var(--color-accent-light);
  font-family: var(--font-mono);
  font-size: 0.6em;
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
}

/* Right Side Stats */
.hero-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  gap: var(--space-10);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.stat-num {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(3rem, 5vw, 4.5rem);
  font-weight: 700;
  line-height: 1;
  background: var(--color-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--space-2);
}

.stat-num::after {
  content: '+';
  font-size: 0.8em;
  color: var(--color-accent);
  -webkit-text-fill-color: var(--color-accent);
}

.stat-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-faint);
  white-space: nowrap;
}



/* Massive Bottom Typography */
.hero-massive-name {
  position: absolute;
  bottom: 4vh;
  left: 50%;
  transform: translateX(-50%) translateY(calc(var(--scroll-y, 0) * 0.4px));
  font-size: clamp(3rem, 7vw, 12rem);
  font-family: var(--font-display);
  font-weight: 900;
  line-height: 1;
  color: var(--color-text);
  z-index: 1;
  pointer-events: none;
  white-space: nowrap;
  letter-spacing: -0.05em;
  will-change: transform, opacity;
  opacity: calc(1 - var(--scroll-y, 0) / 600);
}

.hero-massive-name span {
  color: var(--color-accent);
}

/* Scroll indicator */
.scroll-indicator {
  position: absolute;
  bottom: calc(4vh + clamp(3rem, 7vw, 12rem) + var(--space-4));
  left: 50%;
  transform: translateX(-50%) translateY(calc(var(--scroll-y, 0) * 0.3px));
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-faint);
  font-size: 0.7rem;
  font-family: var(--font-mono);
  letter-spacing: 0.1em;
  animation: fadeIn 1s ease 2s both;
  z-index: 2;
  will-change: transform, opacity;
  opacity: calc(1 - var(--scroll-y, 0) / 180);
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
  .hero-content {
    flex-direction: column;
    text-align: center;
    gap: var(--space-12);
    margin-top: -4vh;
  }

  .hero-desc {
    font-size: 1rem;
    max-width: none;
  }

  .hero-actions.reveal {
    transform: none;
    opacity: 1;
    display: flex;
    flex-direction: row;
    gap: var(--space-4);
    justify-content: center;
    font-size: 1rem;
  }

  .hero-left {
    align-items: center;
    text-align: center;
  }

  .hero-right {
    align-items: center;
    text-align: center;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-6);
  }

  .stat {
    align-items: center;
  }

  .expertise-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 814px) {
  .hero-content {
    margin-top: 0;
  }

  .hero-massive-name {
    font-size: clamp(2.3rem, 9vw, 4.5rem);
    bottom: 2vh;
  }

  .scroll-indicator {
    bottom: calc(2vh + clamp(2.3rem, 9vw, 4.5rem) + var(--space-2));
  }
}

@media (max-width: 768px) {
  .hero-core-graphic {
    transform: translate(-50%, -50%) scale(0.6);
  }

  .hero {
    padding: var(--space-1) 0;
  }

  .hero-massive-name {
    font-size: 8vw;
    bottom: 4vh;
  }

  .scroll-indicator {
    bottom: calc(4vh + 8vw + var(--space-2));
  }

  .expertise-grid {
    grid-template-columns: 1fr;
  }

  .cta-card {
    padding: var(--space-10) var(--space-6);
  }
}
</style>
