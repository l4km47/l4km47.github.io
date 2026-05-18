<template>
  <footer class="footer">
    <div class="footer-glow-top"></div>

    <div class="container">
      <div class="glass-panel">

        <div class="footer-body">
          <!-- Brand -->
          <div class="footer-brand">
            <div class="brand-logo">
              <span class="logo-bracket">&lt;</span>
              <span class="logo-name">l4km47</span>
              <span class="logo-bracket">/&gt;</span>
            </div>
            <p class="brand-tagline">
              Low-level enough to understand the system.
              High-level enough to engineer the solution.
            </p>
            <div class="social-row">
              <a href="https://github.com/l4km47" target="_blank" rel="noopener" class="social-btn" aria-label="GitHub">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a href="mailto:manojlakmal999@gmail.com" class="social-btn" aria-label="Email">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
              <a href="https://wa.me/94768104839" target="_blank" rel="noopener" class="social-btn"
                aria-label="WhatsApp">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          <!-- Nav -->
          <div class="footer-col">
            <h4 class="col-label">Navigation</h4>
            <ul class="link-list">
              <li>
                <RouterLink to="/">Home</RouterLink>
              </li>
              <li>
                <RouterLink to="/about">About</RouterLink>
              </li>
              <li>
                <RouterLink to="/projects">Projects</RouterLink>
              </li>
              <li>
                <RouterLink to="/skills">Skills</RouterLink>
              </li>
              <li>
                <RouterLink to="/contact">Contact</RouterLink>
              </li>
            </ul>
          </div>

          <!-- Projects -->
          <div class="footer-col">
            <h4 class="col-label">Projects</h4>
            <ul class="link-list">
              <li>
                <RouterLink to="/projects/alpha-dashboard">The Alpha</RouterLink>
              </li>
              <li>
                <RouterLink to="/projects/dansal-app">Dansal App</RouterLink>
              </li>
              <li>
                <RouterLink to="/projects/excellent-computers">ExcellentComputers</RouterLink>
              </li>
              <li>
                <RouterLink to="/projects/weedr">Weedr</RouterLink>
              </li>
              <li>
                <RouterLink to="/projects/apk-wooper">APK-Wooper</RouterLink>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div class="footer-col">
            <h4 class="col-label">Get in touch</h4>
            <div class="contact-list">
              <a href="mailto:manojlakmal999@gmail.com" class="contact-row">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                manojlakmal999@gmail.com
              </a>
              <a href="https://wa.me/94768104839" target="_blank" rel="noopener" class="contact-row">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
                +94 76 810 4839
              </a>
              <span class="contact-row contact-row--static">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Sri Lanka 🇱🇰
              </span>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <span class="copyright">© {{ new Date().getFullYear() }} Lakmal. Built with ☕</span>
          <span class="collab-note">Open to new projects &amp; collaborations</span>
        </div>

      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  position: relative;
  padding-top: var(--space-12);
  overflow: hidden;
  margin-bottom: 10px;
}

.footer-glow-top {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
  opacity: 0.5;
}

/* ── Glass panel ── */
.glass-panel {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px 16px;
  overflow: hidden;
}

/* ── Body grid ── */
.footer-body {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.4fr;
  gap: var(--space-10);
  padding: var(--space-12) var(--space-10);
}

/* ── Brand ── */
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.brand-logo {
  font-family: var(--font-mono);
  font-size: 1.25rem;
  font-weight: 700;
}

.logo-bracket {
  color: var(--color-primary-light);
  opacity: 0.65;
}

.logo-name {
  background: linear-gradient(120deg, var(--color-primary-light), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-tagline {
  font-size: 0.83rem;
  line-height: 1.7;
  color: var(--color-text-faint);
  max-width: 230px;
}

.social-row {
  display: flex;
  gap: var(--space-2);
}

.social-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  transition:
    background var(--transition-fast),
    border-color var(--transition-fast),
    color var(--transition-fast),
    transform var(--transition-fast);
}

.social-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--color-primary);
  color: var(--color-primary-light);
  transform: translateY(-2px);
}

/* ── Columns ── */
.footer-col {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding-top: var(--space-1);
}

.col-label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  font-family: var(--font-display);
}

.link-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.link-list a {
  font-size: 0.875rem;
  color: var(--color-text-faint);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.link-list a:hover {
  color: var(--color-primary-light);
}

/* ── Contact ── */
.contact-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: var(--color-text-faint);
  text-decoration: none;
  transition: color var(--transition-fast);
  line-height: 1;
}

.contact-row:not(.contact-row--static):hover {
  color: var(--color-accent);
}

.contact-row--static {
  cursor: default;
  opacity: 0.65;
}

/* ── Bottom bar ── */
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-10);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(0, 0, 0, 0.12);
}

.copyright,
.collab-note {
  font-size: 0.8rem;
  color: var(--color-text-faint);
  font-family: var(--font-mono);
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .footer-body {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-8);
  }

  .footer-brand {
    grid-column: 1 / -1;
  }

  .brand-tagline {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .footer-body {
    grid-template-columns: 1fr;
    padding: var(--space-8) var(--space-6);
  }

  .footer-bottom {
    flex-direction: column;
    gap: var(--space-2);
    text-align: center;
    padding: var(--space-4) var(--space-6);
  }
}
</style>