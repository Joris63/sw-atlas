<script setup lang="ts">
import { ref, provide } from 'vue'
import SwIconButton from '@/components/ui/SwIconButton.vue'

const isOpen = ref(true)
const openItemId = ref<symbol | null>(null)

provide('sidebarOpen', isOpen)
provide('openNavItemId', openItemId)

function toggle() {
  isOpen.value = !isOpen.value
  if (!isOpen.value) openItemId.value = null
}
</script>

<template>
  <aside class="sw-sidebar" :class="{ 'sw-sidebar--collapsed': !isOpen }">
    <div class="sw-sidebar__inner">
      <nav class="sw-sidebar__nav">
        <slot />
      </nav>
    </div>

    <SwIconButton
      :icon="isOpen ? 'chevron-left' : 'chevron-right'"
      :label="isOpen ? 'Collapse sidebar' : 'Expand sidebar'"
      variant="outline"
      rounded
      size="sm"
      class="sw-sidebar__toggle"
      @click="toggle"
    />
  </aside>
</template>

<style scoped>
@reference "../../styles/tailwind.css";

.sw-sidebar {
  @apply relative flex flex-col h-full border-r border-border
         transition-[width] duration-200 ease-in-out overflow-visible shrink-0;
  width: 15rem;
}

.sw-sidebar--collapsed {
  width: 4.5rem;
}

.sw-sidebar__inner {
  @apply flex flex-col flex-1 bg-surface overflow-hidden h-full shadow-md;
  clip-path: inset(0 -20px 0 0); /* only cast shadow to the right */
}

.sw-sidebar__nav {
  @apply flex flex-col gap-1 p-2 overflow-y-auto overflow-x-hidden flex-1;
}

/* Toggle button — floats on the right border, near the top */
:deep(.sw-sidebar__toggle) {
  @apply absolute bg-surface text-text-muted z-50 -right-[1em] top-6 shadow-md;
}
</style>
