<script setup lang="ts">
import SwIconButton from '@/components/ui/buttons/SwIconButton.vue';
import { useDarkMode } from '@/composables/useDarkMode';

const { isDark, toggle } = useDarkMode();
</script>

<template>
  <span class="sw-dark-mode-toggle">
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

.sw-dark-mode-toggle :deep(.sw-icon-button) {
  @apply text-text-on-primary;
}

.sw-dark-mode-toggle :deep(.sw-icon-button:not(:disabled):hover) {
  background: rgba(0, 0, 0, 0.1);
}

.dark .sw-dark-mode-toggle :deep(.sw-icon-button:not(:disabled):hover) {
  background: rgba(255, 255, 255, 0.15);
}
</style>
