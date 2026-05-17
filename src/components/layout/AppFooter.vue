<template>
  <footer class="footer">
    <div class="footer-glow"></div>
    <div class="container">
      <div class="footer-grid">
        <!-- Brand -->
        <div class="footer-brand">
          <div class="brand-logo">
            <span class="logo-bracket">&lt;</span>
            <span class="logo-name">l4km47</span>
            <span class="logo-bracket">/&gt;</span>
          </div>
          <p class="brand-tagline">Low-level enough to understand the system.<br>High-level enough to engineer the
            solution.</p>
          <div class="social-links">
            <a href="https://github.com/l4km47" target="_blank" rel="noopener" class="social-link" aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a href="mailto:manojlakmal999@gmail.com" class="social-link" aria-label="Email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Navigation -->
        <div class="footer-col">
          <h4 class="footer-heading">Navigation</h4>
          <ul class="footer-links">
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
          <h4 class="footer-heading">Featured Projects</h4>
          <ul class="footer-links">
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
          <h4 class="footer-heading">Get In Touch</h4>
          <div class="footer-contact">
            <a href="mailto:manojlakmal999@gmail.com" class="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              manojlakmal999@gmail.com
            </a>
            <a href="https://wa.me/94768104839" target="_blank" rel="noopener" class="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              +94 76 810 4839
            </a>
            <span class="contact-item location">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Sri Lanka 🇱🇰
            </span>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="footer-bottom">
        <p class="copyright">© {{ new Date().getFullYear() }} Lakmal. Built with ☕</p>
        <p class="footer-note">Open to new projects & collaborations</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background: var(--color-bg-alt);
  border-top: 1px solid var(--color-border);
  padding: var(--space-16) 0 var(--space-8);
  position: relative;
  overflow: hidden;
}

.footer-glow {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: var(--space-12);
  margin-bottom: var(--space-12);
}

/* Brand */
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.brand-logo {
  font-family: var(--font-mono);
  font-size: 1.2rem;
  font-weight: 700;
}

.logo-bracket {
  color: var(--color-primary-light);
}

.logo-name {
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-tagline {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-text-faint);
}

.social-links {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

.social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  transition: all var(--transition-base);
}

.social-link:hover {
  border-color: var(--color-primary);
  color: var(--color-primary-light);
  background: rgba(124, 58, 237, 0.1);
  transform: translateY(-2px);
}

/* Cols */
.footer-col {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.footer-heading {
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.footer-links a {
  font-size: 0.9rem;
  color: var(--color-text-faint);
  transition: color var(--transition-fast);
}

.footer-links a:hover {
  color: var(--color-primary-light);
}

/* Contact */
.footer-contact {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.85rem;
  color: var(--color-text-faint);
  transition: color var(--transition-fast);
}

.contact-item:not(.location):hover {
  color: var(--color-accent);
}

.contact-item.location {
  cursor: default;
}

/* Bottom */
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.copyright {
  font-size: 0.85rem;
  color: var(--color-text-faint);
}

.footer-note {
  font-size: 0.8rem;
  color: var(--color-text-faint);
  font-family: var(--font-mono);
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-8);
  }

  .footer-brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  .footer-bottom {
    flex-direction: column;
    gap: var(--space-2);
    text-align: center;
  }
}
</style>
