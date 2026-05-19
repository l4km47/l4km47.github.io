<template>
  <div class="about-page">
    <!-- Hero -->
    <section id="hero" class="about-hero section">
      <div class="hero-bg-subtle"></div>
      <div class="container">
        <div class="about-hero-grid">
          <!-- Profile -->
          <div class="profile-side reveal">
            <div class="avatar-wrap">
              <img src="https://avatars.githubusercontent.com/l4km47" alt="Lakmal — Full-Stack Developer" class="avatar"
                loading="eager" />
              <div class="avatar-ring"></div>
              <div class="avatar-badge">
                <span class="status-dot"></span>
                Alive
              </div>
            </div>
            <div class="profile-quick">
              <div class="quick-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Sri Lanka 🇱🇰
              </div>
              <div class="quick-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <a href="https://github.com/l4km47" target="_blank" rel="noopener">github.com/l4km47</a>
              </div>
              <div class="quick-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a href="mailto:manojlakmal999@gmail.com">manojlakmal999@gmail.com</a>
              </div>
            </div>
          </div>

          <!-- Bio -->
          <div class="bio-side">
            <span class="section-label reveal">About Me</span>
            <h1 class="reveal reveal-delay-1">
              Hey, I'm <span class="gradient-text">Lakmal</span>
            </h1>
            <div class="bio-text reveal reveal-delay-2">
              <p>
                I'm a passionate <strong>full-stack developer and systems engineer</strong> based in Sri Lanka.
                I specialize in building things that sit close to the operating system, interact directly with hardware,
                or solve difficult engineering problems efficiently.
              </p>
              <p>
                My work spans from <strong>Windows kernel drivers and HWID authentication systems</strong> to
                <strong>production SaaS platforms and mobile apps</strong>. I've shipped apps with 800K+ downloads,
                built live e-commerce stores, and engineered cryptographic licensing systems — all while staying
                deeply rooted in the fundamentals of how software actually works.
              </p>
              <p>
                Most of my serious work lives in private repositories — security tooling, performance systems,
                hardware-integrated software, and research projects. The public repos are just the tip of the iceberg.
              </p>
            </div>

            <div class="bio-code reveal reveal-delay-3">
              <pre><code>while(alive) {
  build();
  break_();
  reverse();
  learn();
  optimize();
}</code></pre>
            </div>

            <div class="bio-actions reveal reveal-delay-4">
              <RouterLink to="/projects" class="btn btn-primary">View Projects</RouterLink>
              <RouterLink to="/contact" class="btn btn-outline">Get In Touch</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section id="timeline" class="section timeline-section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Journey</span>
          <h2 class="section-title reveal">My <span class="gradient-text">Timeline</span></h2>
        </div>

        <div v-if="timelineLoading" class="loading-state">Loading timeline...</div>
        <div v-else class="timeline">
          <div v-for="(item, i) in timeline" :key="item.year + item.title" class="timeline-item reveal"
            :class="`reveal-delay-${(i % 4) + 1}`">
            <div class="timeline-line"></div>
            <div class="timeline-dot" :class="`dot-${item.type}`"></div>
            <div class="timeline-content card">
              <div class="timeline-year">{{ item.year }}</div>
              <div class="timeline-badge"
                :class="item.type === 'project' ? 'badge-accent badge' : item.type === 'work' ? 'badge-work badge' : 'badge-primary badge'">
                {{ item.type === 'project' ? '🚀 Project' : item.type === 'work' ? '💼 Work Experience' : '⚡ Milestone'
                }}
              </div>
              <h3 class="timeline-title">{{ item.title }}</h3>
              <p class="timeline-desc">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Philosophy -->
    <section id="philosophy" class="section-sm philosophy-section">
      <div class="container">
        <div class="philosophy-card card-glass reveal">
          <blockquote>
            <span class="quote-mark">"</span>
            <p class="quote-text">Living in typical buduammo life and little bit ammata hudu here and there.</p>
          </blockquote>
          <cite>— me</cite>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useData } from '@/composables/useData'

const { loading: timelineLoading, fetchData } = useData()
const timeline = ref([])

onMounted(async () => {
  timeline.value = await fetchData('/data/timeline.json') || []
})
</script>

<style scoped>
.about-page {
  min-height: 100vh;
}

.about-hero {
  position: relative;
  overflow: hidden;
}

.hero-bg-subtle {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 80% 50%, rgba(124, 58, 237, 0.06) 0%, transparent 60%);
  pointer-events: none;
}

.about-hero-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--space-16);
  align-items: start;
}

/* Profile */
.profile-side {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  align-items: center;
}

.avatar-wrap {
  position: relative;
  width: 200px;
  height: 200px;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--color-border);
  position: relative;
  z-index: 1;
}

.avatar-ring {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  background: conic-gradient(var(--color-primary), var(--color-accent), var(--color-primary));
  z-index: 0;
  animation: spin 8s linear infinite;
  opacity: 0.6;
}

.avatar-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(7, 7, 17, 0.9);
  border: 1px solid rgba(16, 185, 129, 0.4);
  border-radius: var(--radius-full);
  padding: 4px 10px;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-success);
  font-family: var(--font-mono);
}

.status-dot {
  width: 6px;
  height: 6px;
  background: var(--color-success);
  border-radius: 50%;
  box-shadow: 0 0 6px var(--color-success);
  animation: pulse-glow 2s infinite;
}

.profile-quick {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  width: 100%;
}

.quick-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.quick-item a {
  color: var(--color-text-muted);
  transition: color var(--transition-fast);
}

.quick-item a:hover {
  color: var(--color-primary-light);
}

/* Bio */
.bio-side {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.bio-side h1 {
  font-size: clamp(2rem, 4vw, 3.5rem);
}

.bio-text {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.bio-text p {
  font-size: 1rem;
}

.bio-text strong {
  color: var(--color-text);
  font-weight: 600;
}

.bio-code {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-5);
  border-left: 3px solid var(--color-primary);
}

.bio-code pre {
  margin: 0;
}

.bio-code code {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--color-accent-light);
  white-space: pre;
}

.bio-actions {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

/* Timeline */
.timeline-section {
  background: var(--color-bg-alt);
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 16px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--color-primary), var(--color-accent));
  opacity: 0.3;
}

.timeline-item {
  position: relative;
  padding-left: 60px;
  padding-bottom: var(--space-8);
}

.timeline-dot {
  position: absolute;
  left: 10px;
  top: 20px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid var(--color-bg);
  z-index: 1;
}

.dot-project {
  background: var(--color-accent);
  box-shadow: 0 0 10px var(--color-accent-glow);
}

.dot-milestone {
  background: var(--color-primary);
  box-shadow: 0 0 10px var(--color-primary-glow);
}

.dot-work {
  background: var(--color-warning);
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.4);
}

.timeline-content {
  padding: var(--space-5) var(--space-6);
}

.timeline-year {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-faint);
  margin-bottom: var(--space-2);
}

.badge-work {
  background: rgba(245, 158, 11, 0.1);
  color: var(--color-warning);
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.timeline-title {
  font-size: 1.1rem;
  margin: var(--space-2) 0;
}

.timeline-desc {
  font-size: 0.9rem;
  margin: 0;
}

/* Philosophy */
.philosophy-card {
  border-radius: var(--radius-xl);
  padding: var(--space-12);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

blockquote {
  border: none;
  margin: 0;
  padding: 0;
}

.quote-mark {
  font-size: 6rem;
  line-height: 1;
  color: var(--color-primary);
  font-family: var(--font-display);
  opacity: 0.3;
  display: block;
  margin-bottom: -2rem;
}

.quote-text {
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.5;
}

cite {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--color-text-faint);
  font-style: normal;
}

.loading-state {
  text-align: center;
  color: var(--color-text-muted);
  font-family: var(--font-mono);
  padding: var(--space-12);
}

@media (max-width: 768px) {
  .about-hero-grid {
    grid-template-columns: 1fr;
  }

  .profile-side {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
  }

  .avatar-wrap {
    width: 120px;
    height: 120px;
  }

  .philosophy-card {
    padding: var(--space-8) var(--space-6);
  }
}
</style>
