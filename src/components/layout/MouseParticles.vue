<template>
  <div class="mouse-bg" aria-hidden="true">
    <div ref="glowEl" class="cursor-glow"></div>
    <div 
      v-for="p in particles" 
      :key="p.id" 
      class="particle"
      :ref="el => setParticleRef(el, p.id)"
      :style="{
        width: p.size + 'px',
        height: p.size + 'px',
        background: p.color,
        boxShadow: `0 0 ${p.size * 1.5}px ${p.color}`
      }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const particles = []
const numParticles = 75
const colors = ['#4fed3a', '#06d47e', '#ccf56b', '#cfee22']

let mouseX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0
let mouseY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0
let smoothX = mouseX
let smoothY = mouseY

const glowEl = ref(null)
const particleEls = {}

function setParticleRef(el, id) {
  if (el) particleEls[id] = el
}

// Ensure window is defined for initial positions
const initW = typeof window !== 'undefined' ? window.innerWidth : 1000
const initH = typeof window !== 'undefined' ? window.innerHeight : 800

for (let i = 0; i < numParticles; i++) {
  particles.push({
    id: i,
    x: Math.random() * initW,
    y: Math.random() * initH,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    size: Math.random() * 2.5 + 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    baseOpacity: Math.random() * 0.3 + 0.1,
    currentOpacity: 0,
    type: Math.random() > 0.4 ? 1 : -1 // 60% repel, 40% attract
  })
}

let rafId = null
let isActive = true

function onMouseMove(e) {
  mouseX = e.clientX
  mouseY = e.clientY
}

function loop() {
  if (!isActive) return

  smoothX += (mouseX - smoothX) * 0.1
  smoothY += (mouseY - smoothY) * 0.1

  if (glowEl.value) {
    glowEl.value.style.transform = `translate3d(${smoothX}px, ${smoothY}px, 0)`
  }

  const ww = window.innerWidth
  const wh = window.innerHeight
  const maxDist = 200

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]
    
    // Constant drift
    p.x += p.vx
    p.y += p.vy

    // Wrap around screen
    if (p.x > ww) p.x = 0; else if (p.x < 0) p.x = ww;
    if (p.y > wh) p.y = 0; else if (p.y < 0) p.y = wh;

    const dx = mouseX - p.x
    const dy = mouseY - p.y
    const dist = Math.sqrt(dx * dx + dy * dy)

    let targetOpacity = p.baseOpacity

    if (dist < maxDist && dist > 0) {
      const force = (maxDist - dist) / maxDist
      
      p.x -= (dx / dist) * force * 2.5 * p.type
      p.y -= (dy / dist) * force * 2.5 * p.type
      
      targetOpacity = p.baseOpacity + force * 0.7
    }

    p.currentOpacity += (targetOpacity - p.currentOpacity) * 0.1

    const el = particleEls[p.id]
    if (el) {
      el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`
      el.style.opacity = p.currentOpacity
    }
  }

  rafId = requestAnimationFrame(loop)
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  rafId = requestAnimationFrame(loop)
})

onUnmounted(() => {
  isActive = false
  window.removeEventListener('mousemove', onMouseMove)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.mouse-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.cursor-glow {
  position: absolute;
  top: -200px;
  left: -200px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(79, 237, 58, 0.04) 0%, rgba(6, 212, 126, 0.01) 40%, transparent 70%);
  border-radius: 50%;
  will-change: transform;
}

.particle {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  will-change: transform, opacity;
}
</style>
