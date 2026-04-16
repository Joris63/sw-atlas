<script setup lang="ts">
import SwIconButton from '@/components/ui/SwIconButton.vue'
import { useDarkMode } from '@/composables/useDarkMode'

const { isDark, toggle } = useDarkMode()
</script>

<template>
  <span class="sw-dark-toggle">
    <SwIconButton
      :icon="isDark ? 'sun' : 'moon'"
      :label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      variant="plain"
      @click="toggle"
    />
  </span>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-dark-toggle :deep(.sw-icon-btn) {
  @apply text-text-on-primary;
}

.sw-dark-toggle :deep(.sw-icon-btn:not(:disabled):hover) {
  background: rgba(0, 0, 0, 0.1);
}

.dark .sw-dark-toggle :deep(.sw-icon-btn:not(:disabled):hover) {
  background: rgba(255, 255, 255, 0.15);
}
</style>
