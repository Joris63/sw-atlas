<script setup lang="ts"></script>

<template>
  <header class="sw-top-bar">
    <div class="sw-top-bar__inner">
      <slot name="menu-btn" />

      <div v-if="$slots.logo" class="sw-top-bar__start">
        <slot name="logo" />
      </div>

      <nav v-if="$slots.nav" class="sw-top-bar__nav">
        <slot name="nav" />
      </nav>

      <div v-if="$slots.end" class="sw-top-bar__end">
        <slot name="end" />
      </div>
    </div>
  </header>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-top-bar {
  @apply sticky top-0 z-50 w-full bg-primary border-b border-border h-16 shadow-md;
}

.sw-top-bar__inner {
  @apply flex items-center gap-4 h-full px-6;
}

.sw-top-bar__start {
  @apply flex items-center shrink-0;
}

.sw-top-bar__breadcrumbs {
  @apply flex items-center flex-1 border-l border-text-on-primary/15 pl-6 ml-2;
}

.sw-top-bar__nav {
  @apply flex items-center gap-1 flex-1;
}

.sw-top-bar__end {
  @apply flex items-center gap-2 ms-auto shrink-0;
}

.sw-top-bar__logo {
  @apply flex items-center h-7 text-text-on-primary;
}

:deep(.sw-top-bar__toggle),
:deep(.sw-top-bar__menu-btn) {
  @apply text-text-on-primary;
}

:deep(.sw-top-bar__toggle:not(:disabled):hover),
:deep(.sw-top-bar__menu-btn:not(:disabled):hover) {
  @apply bg-neutral-950/10;
}

.dark :deep(.sw-top-bar__toggle:not(:disabled):hover),
.dark :deep(.sw-top-bar__menu-btn:not(:disabled):hover) {
  @apply bg-neutral-0/15;
}
</style>
