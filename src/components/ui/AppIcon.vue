<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" :stroke-width="strokeWidth"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <component v-for="(shape, i) in shapes" :key="i" :is="shape.tag" v-bind="shape.attrs" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

/**
 * Static icon set rendered as real SVG elements.
 *
 * These used to be raw markup strings injected with `v-html`; keeping them as
 * structured data means the icon path never touches an HTML sink, so the
 * component stays safe even if an icon name ever comes from external data.
 */
const path = d => ({ tag: 'path', attrs: { d } })
const rect = (x, y, width, height, rx) => ({ tag: 'rect', attrs: { x, y, width, height, rx } })
const polyline = points => ({ tag: 'polyline', attrs: { points } })

const ICONS = {
  monitor: [rect(2, 3, 20, 14, 2), path('M8 21h8M12 17v4')],
  chip: [
    rect(4, 4, 16, 16, 2),
    rect(9, 9, 6, 6),
    path('M15 2v2M15 20v2M2 15h2M20 15h2M9 2v2M9 20v2M2 9h2M20 9h2')
  ],
  phone: [rect(5, 2, 14, 20, 2), path('M12 18h.01')],
  shield: [path('M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z')],
  layers: [path('M12 2L2 7l10 5 10-5-10-5z'), path('M2 17l10 5 10-5'), path('M2 12l10 5 10-5')],
  brain: [path('M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z'), path('M12 8v4l3 3')],
  code: [polyline('16 18 22 12 16 6'), polyline('8 6 2 12 8 18')],
  download: [path('M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'), path('M7 10l5 5 5-5'), path('M12 15V3')],
  wrench: [
    path('M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z')
  ]
}

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
  strokeWidth: { type: [Number, String], default: 1.5 }
})

const shapes = computed(() => ICONS[props.name] ?? [])
</script>
