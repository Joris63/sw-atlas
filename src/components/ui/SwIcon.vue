<script setup lang="ts">
import { computed } from 'vue'
import * as icons from 'lucide-vue-next'

interface Props {
  name: string
  size?: number | string
  strokeWidth?: number | string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 20,
  strokeWidth: 1.75,
})

const icon = computed(() => {
  // Support both 'arrow-left' and 'ArrowLeft'
  const pascal = props.name
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')

  const found = (icons as Record<string, unknown>)[pascal]

  if (!found && import.meta.env.DEV) {
    console.warn(`[SwIcon] Unknown icon: "${props.name}" (looked up as "${pascal}")`)
  }

  return found ?? null
})
</script>

<template>
  <component
    v-if="icon"
    :is="icon"
    :size="size"
    :stroke-width="strokeWidth"
    :color="color"
  />
</template>
