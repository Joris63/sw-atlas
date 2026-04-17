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
    class="sw-nav-sidebar"
    :class="{
      'sw-nav-sidebar--collapsed': !sidebarOpen && !isMobile,
      'sw-nav-sidebar--mobile': isMobile,
      'sw-nav-sidebar--tablet': !isMobile && !isDesktop,
      'sw-nav-sidebar--open': sidebarOpen,
    }"
  >
    <div class="sw-nav-sidebar__inner">
      <nav class="sw-nav-sidebar__nav">
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
      class="sw-nav-sidebar__toggle"
      @click="toggle"
    />
  </aside>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

/* ── Desktop (default) ──────────────────────────────────────── */
.sw-nav-sidebar {
  @apply relative flex flex-col h-full border-r border-border
         transition-[width] duration-200 ease-in-out overflow-visible shrink-0
         w-[15rem];
}

.sw-nav-sidebar--collapsed {
  @apply w-[4.5rem];
}

.sw-nav-sidebar__inner {
  @apply flex flex-col flex-1 bg-surface overflow-hidden h-full shadow-md;
  clip-path: inset(0 -20px 0 0); /* no @apply equivalent for clip-path */
}

.sw-nav-sidebar__nav {
  @apply flex flex-col gap-1 p-2 overflow-y-auto overflow-x-hidden flex-1;
}

/* Toggle button — floats on the right border, near the top */
:deep(.sw-nav-sidebar__toggle) {
  @apply absolute bg-surface text-text-muted z-50 -right-[1em] top-6 shadow-md;
}

/* ── Mobile ─────────────────────────────────────────────────── */
.sw-nav-sidebar--mobile {
  @apply fixed left-0 top-16 h-[calc(100vh-4rem)] w-[15rem] z-50
         -translate-x-full transition-transform duration-200 ease-in-out
         border-r-0;
}

.sw-nav-sidebar--mobile.sw-nav-sidebar--open {
  @apply translate-x-0;
}

/* ── Tablet ──────────────────────────────────────────────────── */
.sw-nav-sidebar--tablet {
  @apply w-[4.5rem] transition-none;
}

/* When expanded on tablet: inner becomes an overlay, sidebar keeps its 4.5rem footprint */
.sw-nav-sidebar--tablet.sw-nav-sidebar--open .sw-nav-sidebar__inner {
  @apply absolute left-0 top-0 w-[15rem] h-full z-50;
}

/* Move toggle button to track the right edge of the expanded inner (15rem - 4.5rem = 10.5rem offset) */
.sw-nav-sidebar--tablet.sw-nav-sidebar--open :deep(.sw-nav-sidebar__toggle) {
  right: calc(-1em - (15rem - 4.5rem)); /* complex calc — no @apply equivalent */
}
</style>
