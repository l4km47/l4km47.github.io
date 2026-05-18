<template>
  <Transition name="fade-in-up">
    <button 
      v-show="isVisible" 
      class="scroll-to-top" 
      @click="scrollToTop"
      aria-label="Scroll to top"
    >
      <svg class="progress-ring" width="48" height="48">
        <!-- Background circle -->
        <circle 
          class="progress-ring-bg" 
          cx="24" 
          cy="24" 
          r="20" 
          stroke="rgba(255, 255, 255, 0.08)" 
          stroke-width="3.5"
          fill="rgba(17, 17, 40, 0.65)" 
        />
        <!-- Progress circle -->
        <circle 
          class="progress-ring-fill" 
          cx="24" 
          cy="24" 
          r="20" 
          :stroke-dasharray="circumference" 
          :stroke-dashoffset="strokeDashoffset" 
          stroke="var(--color-primary)" 
          stroke-width="3.5"
          stroke-linecap="round"
          fill="transparent" 
        />
      </svg>
      <!-- Arrow icon -->
      <div class="arrow-container">
        <svg class="chevron-up" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </div>
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const isVisible = ref(false)
const scrollProgress = ref(0)

const radius = 20
const circumference = 2 * Math.PI * radius

const strokeDashoffset = computed(() => {
  return circumference - (scrollProgress.value / 100) * circumference
})

function handleScroll() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  
  // Show button after scrolling 300px
  isVisible.value = scrollTop > 300
  
  // Calculate percentage
  if (docHeight > 0) {
    scrollProgress.value = (scrollTop / docHeight) * 100
  } else {
    scrollProgress.value = 0
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll() // Trigger once initially
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: var(--space-8);
  right: var(--space-8);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
  outline: none;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.scroll-to-top:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 8px 24px rgba(79, 237, 58, 0.25);
}

.scroll-to-top:active {
  transform: translateY(-2px) scale(0.98);
}

.progress-ring {
  position: absolute;
  top: 0;
  left: 0;
  transform: rotate(-90deg); /* Rotates so fill starts from exact top center */
}

.progress-ring-fill {
  transition: stroke-dashoffset 0.1s linear;
}

.arrow-container {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--transition-fast), color var(--transition-fast);
}

.scroll-to-top:hover .arrow-container {
  transform: translateY(-2px);
  color: var(--color-primary-light);
}

.chevron-up {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

/* Vue Transitions */
.fade-in-up-enter-active,
.fade-in-up-leave-active {
  transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-in-up-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.fade-in-up-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.9);
}

/* Ensure responsiveness for mobile viewports */
@media (max-width: 768px) {
  .scroll-to-top {
    bottom: var(--space-4);
    right: var(--space-4);
  }
}
</style>
