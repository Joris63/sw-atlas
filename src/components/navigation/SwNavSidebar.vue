<script setup lang="ts">
import { inject, ref } from 'vue'
import type { Ref } from 'vue'
import SwIconButton from '@/components/ui/SwIconButton.vue'

const sidebarOpen = inject<Ref<boolean>>('sidebarOpen', ref(true))
const isMobile = inject<Ref<boolean>>('isMobile', ref(false))
const isDesktop = inject<Ref<boolean>>('isDesktop', ref(true))
const toggle = inject<() => void>('toggleSidebar', () => {})
</script>

<template>
  <aside
    class="sw-sidebar"
    :class="{
      'sw-sidebar--collapsed': !sidebarOpen && !isMobile,
      'sw-sidebar--mobile': isMobile,
      'sw-sidebar--tablet': !isMobile && !isDesktop,
      'sw-sidebar--open': sidebarOpen,
    }"
  >
    <div class="sw-sidebar__inner">
      <nav class="sw-sidebar__nav">
        <slot />
      </nav>
    </div>

    <SwIconButton
      v-if="!isMobile"
      :icon="sidebarOpen ? 'chevron-left' : 'chevron-right'"
      :label="sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'"
      variant="outline"
      rounded
      size="sm"
      class="sw-sidebar__toggle"
      @click="toggle"
    />
  </aside>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

/* ── Desktop (default) ──────────────────────────────────────── */
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

/* ── Mobile ─────────────────────────────────────────────────── */
.sw-sidebar--mobile {
  position: fixed;
  left: 0;
  top: 4rem; /* below h-16 topbar */
  height: calc(100vh - 4rem);
  width: 15rem;
  z-index: 50;
  transform: translateX(-100%);
  transition: transform 200ms ease;
  border-right: none;
}

.sw-sidebar--mobile.sw-sidebar--open {
  transform: translateX(0);
}

/* ── Tablet ──────────────────────────────────────────────────── */
.sw-sidebar--tablet {
  width: 4.5rem;
  transition: none;
}

/* When expanded on tablet: inner becomes an overlay, sidebar keeps its 4.5rem footprint */
.sw-sidebar--tablet.sw-sidebar--open .sw-sidebar__inner {
  position: absolute;
  left: 0;
  top: 0;
  width: 15rem;
  height: 100%;
  z-index: 50;
}

/* Move toggle button to track the right edge of the expanded inner (15rem - 4.5rem = 10.5rem offset) */
.sw-sidebar--tablet.sw-sidebar--open :deep(.sw-sidebar__toggle) {
  right: calc(-1em - (15rem - 4.5rem));
}
</style>
