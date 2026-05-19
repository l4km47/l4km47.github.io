<template>
  <nav class="navbar" :class="{ scrolled: isScrolled, 'menu-open': menuOpen }">
    <div class="container nav-inner">
      <!-- Logo -->
      <RouterLink to="/" class="nav-logo" @click="menuOpen = false">
        <span class="logo-bracket">&lt;</span>
        <span class="logo-name">l4km47</span>
        <span class="logo-bracket">/&gt;</span>
      </RouterLink>

      <!-- Desktop Nav -->
      <ul class="nav-links">
        <li v-for="link in navLinks" :key="link.to">
          <RouterLink :to="link.to" class="nav-link" :class="{ active: isActive(link.to) }">
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>

      <!-- CTA -->
      <div class="nav-actions">
        <a href="https://github.com/l4km47" target="_blank" rel="noopener" class="btn btn-ghost btn-sm nav-github">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          GitHub
        </a>
        <RouterLink to="/contact" class="btn btn-primary btn-sm">
          Hire Me
        </RouterLink>
      </div>

      <!-- Hamburger -->
      <button class="hamburger" :class="{ open: menuOpen }" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div v-if="menuOpen" class="mobile-menu">
        <ul>
          <li v-for="link in navLinks" :key="link.to">
            <RouterLink :to="link.to" class="mobile-link" @click="menuOpen = false">
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
        <div class="mobile-actions">
          <a href="https://github.com/l4km47" target="_blank" rel="noopener" class="btn btn-outline w-full"
            style="justify-content:center">
            GitHub Profile
          </a>
          <RouterLink to="/contact" class="btn btn-primary w-full" style="justify-content:center"
            @click="menuOpen = false">
            Hire Me
          </RouterLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isScrolled = ref(false)
const menuOpen = ref(false)

const navLinks = [
  { to: '/', label: 'Home' },
  {
    to: '/about', label: 'About', sections: [
      { to: "#hero", label: "Hero" },
      { to: "#timeline", label: "Timeline" },
      { to: "#philosophy", label: "Philosophy" },
    ]
  },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/contact', label: 'Contact' }
]

const isActive = (path) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

const onScroll = () => { isScrolled.value = window.scrollY > 20 }

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--nav-height);
  display: flex;
  align-items: center;
  transition: background var(--transition-base), border-color var(--transition-base), backdrop-filter var(--transition-base);
  border-bottom: 1px solid transparent;
}

.navbar.scrolled {
  background: rgba(7, 7, 17, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom-color: var(--color-border);
}

.nav-inner {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  width: 100%;
}

/* Logo */
.nav-logo {
  font-family: var(--font-mono);
  font-size: 1.1rem;
  font-weight: 600;
  white-space: nowrap;
  transition: opacity var(--transition-fast);
}

.nav-logo:hover {
  opacity: 0.8;
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

/* Links */
.nav-links {
  display: flex;
  list-style: none;
  gap: var(--space-1);
  flex: 1;
  justify-content: center;
}

.nav-link {
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-muted);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  transition: color var(--transition-fast), background var(--transition-fast);
}

.nav-link:hover {
  color: var(--color-text);
  background: var(--color-surface-alt);
}

.nav-link.active {
  color: var(--color-primary-light);
  background: rgba(124, 58, 237, 0.1);
}

/* Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.nav-github {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-muted);
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: var(--space-2);
  margin-left: auto;
}

.hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--color-text);
  border-radius: 2px;
  transition: transform var(--transition-base), opacity var(--transition-base);
}

.hamburger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile Menu */
.mobile-menu {
  position: absolute;
  top: var(--nav-height);
  left: 0;
  right: 0;
  background: rgba(7, 7, 17, 0.98);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.mobile-menu ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.mobile-link {
  display: block;
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--color-text-muted);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  transition: color var(--transition-fast), background var(--transition-fast);
}

.mobile-link:hover {
  color: var(--color-text);
  background: var(--color-surface);
}

.mobile-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

/* Transitions */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}


@media (min-width: 769px) {
  .navbar {
    top: 0;
    bottom: 0;
    right: auto;
    width: var(--nav-side-width);
    height: 100vh;
    border-right: 1px solid transparent;
    border-bottom: none;
    justify-content: center;
  }

  .navbar.scrolled {
    border-right-color: var(--color-border);
    border-bottom-color: transparent;
  }

  .nav-inner {
    flex-direction: column;
    justify-content: space-between;
    gap: var(--space-6);
    height: 100%;
    width: 100%;
    padding: var(--space-6) 0;
  }

  .nav-logo {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-size: 1rem;
  }

  .nav-links {
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
    gap: var(--space-4);
  }

  .nav-link {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    padding: var(--space-4) var(--space-2);
  }

  .nav-actions {
    flex-direction: column;
    gap: var(--space-4);
  }

  .nav-actions .btn {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    min-height: 110px;
    min-width: 42px;
    padding: var(--space-3) var(--space-2);
    justify-content: center;
  }

  .nav-github {
    gap: var(--space-1);
  }

  .nav-github svg {
    transform: rotate(180deg);
  }
}

@media (max-width: 768px) {

  .nav-links,
  .nav-actions {
    display: none;
  }

  .hamburger {
    display: flex;
  }
}
</style>
