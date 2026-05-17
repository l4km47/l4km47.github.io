<template>
  <div id="app-root" class="bg-grid">
    <MouseParticles />
    <AppNavbar />
    <main>
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import MouseParticles from '@/components/layout/MouseParticles.vue'
import { useRevealObserver } from '@/composables/useRevealObserver'

useRevealObserver()
</script>

<style scoped>
#app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
main {
  flex: 1;
  padding-top: var(--nav-height);
}
</style>
