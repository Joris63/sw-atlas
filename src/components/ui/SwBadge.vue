<script setup lang="ts">
interface Props {
  variant?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md'
  dot?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'neutral',
  size: 'md',
})
</script>

<template>
  <span class="sw-badge" :class="[`sw-badge--${variant}`, `sw-badge--${size}`]">
    <span v-if="dot" class="sw-badge__dot" />
    <slot />
  </span>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-badge {
  @apply inline-flex items-center font-medium rounded-full whitespace-nowrap select-none;
}

/* ---- Sizes ---- */
.sw-badge--sm {
  @apply h-5 px-2 gap-1 text-[11px];
}

.sw-badge--md {
  @apply h-6 px-2.5 gap-1.5 text-xs;
}

/* ---- Variants ---- */
.sw-badge--neutral {
  @apply bg-surface-subtle text-text-muted;
}

.sw-badge--primary {
  /* bg: primary tinted surface, flips correctly in dark mode */
  background: color-mix(in srgb, var(--color-primary) 15%, var(--surface));
  @apply text-primary;
}

.sw-badge--success {
  @apply bg-success-light text-success-dark;
}
.dark .sw-badge--success {
  /* success-light flips to dark green bg in dark mode — lighten the text to match */
  color: color-mix(in srgb, var(--success) 40%, var(--neutral-0));
}

.sw-badge--warning {
  @apply bg-warning-light text-warning-dark;
}
.dark .sw-badge--warning {
  color: color-mix(in srgb, var(--warning) 50%, var(--neutral-0));
}

.sw-badge--danger {
  @apply bg-danger-light text-danger-dark;
}
.dark .sw-badge--danger {
  color: color-mix(in srgb, var(--danger) 50%, var(--neutral-0));
}

/* ---- Dot indicator ---- */
.sw-badge__dot {
  @apply w-1.5 h-1.5 rounded-full bg-current shrink-0;
}
</style>
