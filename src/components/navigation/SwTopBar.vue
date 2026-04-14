<script setup lang="ts"></script>

<template>
  <header class="sw-topbar">
    <div class="sw-topbar__inner">
      <slot name="menu-btn" />

      <div class="sw-topbar__start" v-if="$slots.logo">
        <slot name="logo" />
      </div>

      <nav class="sw-topbar__nav" v-if="$slots.nav">
        <slot name="nav" />
      </nav>

      <div class="sw-topbar__end" v-if="$slots.end">
        <slot name="end" />
      </div>
    </div>
  </header>
</template>

<style scoped>
@reference "../../styles/tailwind.css";

.sw-topbar {
  @apply sticky top-0 z-50 w-full bg-primary border-b border-border h-16 shadow-md;
}

.sw-topbar__inner {
  @apply flex items-center gap-4 h-full px-6;
}

.sw-topbar__start {
  @apply flex items-center shrink-0;
}

.sw-topbar__breadcrumbs {
  @apply flex items-center flex-1 border-l border-text-on-primary/15 pl-6 ml-2;
}

.sw-topbar__nav {
  @apply flex items-center gap-1 flex-1;
}

.sw-topbar__end {
  @apply flex items-center gap-2 ms-auto shrink-0;
}

.sw-topbar__logo {
  @apply flex items-center h-7 text-text-on-primary;
}

:deep(.sw-topbar__toggle),
:deep(.sw-topbar__menu-btn) {
  @apply text-text-on-primary;
}

:deep(.sw-topbar__toggle:not(:disabled):hover),
:deep(.sw-topbar__menu-btn:not(:disabled):hover) {
  @apply bg-neutral-950/10;
}

.dark :deep(.sw-topbar__toggle:not(:disabled):hover),
.dark :deep(.sw-topbar__menu-btn:not(:disabled):hover) {
  @apply bg-neutral-0/15;
}
</style>
