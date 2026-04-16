<script setup lang="ts">
import { computed } from 'vue'
import SwIcon from './SwIcon.vue'

interface Props {
  label: string
  variant?: 'primary' | 'outline' | 'ghost' | 'plain' | 'danger'
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg'
  as?: string
  disabled?: boolean
  loading?: boolean
  loadingText?: string
  iconLeft?: string
  iconRight?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  as: 'button',
})

const iconSize = computed(() => (props.size === '2xs' || props.size === 'xs' ? 12 : 16))
</script>

<template>
  <component
    :is="as"
    class="sw-btn"
    :class="[`sw-btn--${variant}`, `sw-btn--${size}`, { 'sw-btn--loading': loading }]"
    :disabled="as === 'button' ? disabled || loading : undefined"
  >
    <SwIcon
      v-if="loading"
      name="loader-2"
      :size="iconSize"
      class="sw-btn__spinner"
      aria-hidden="true"
    />

    <span v-if="!loading && (iconLeft || $slots['icon-left'])" class="sw-btn__icon">
      <SwIcon v-if="iconLeft" :name="iconLeft" :size="iconSize" />
      <slot v-else name="icon-left" />
    </span>

    {{ loading && loadingText ? loadingText : label }}

    <span v-if="!loading && (iconRight || $slots['icon-right'])" class="sw-btn__icon">
      <SwIcon v-if="iconRight" :name="iconRight" :size="iconSize" />
      <slot v-else name="icon-right" />
    </span>
  </component>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-btn {
  @apply inline-flex items-center justify-center gap-2
         font-medium rounded-lg cursor-pointer select-none
         transition-colors duration-150 whitespace-nowrap
         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus
         disabled:opacity-50 disabled:cursor-not-allowed;
}

.sw-btn__icon {
  @apply flex items-center shrink-0;
}

.sw-btn__spinner {
  @apply animate-spin shrink-0;
}

.sw-btn--loading {
  @apply cursor-wait;
}

/* --- Sizes --- */
.sw-btn--2xs {
  @apply h-6 px-1.5 text-xs gap-1;
}
.sw-btn--xs {
  @apply h-7 px-2 text-xs gap-1;
}
.sw-btn--sm {
  @apply h-8 px-3 text-sm gap-1.5;
}
.sw-btn--md {
  @apply h-9 px-4 text-sm;
}
.sw-btn--lg {
  @apply h-10 px-5 text-base;
}

/* --- Variants --- */
.sw-btn--primary {
  @apply bg-primary text-text-on-primary;
}
.sw-btn--primary:not(:disabled):hover {
  @apply bg-primary-hover;
}

.sw-btn--outline {
  @apply bg-transparent border border-border-strong text-text;
}
.sw-btn--outline:not(:disabled):hover {
  @apply bg-surface-subtle;
}

.sw-btn--ghost {
  @apply bg-surface-subtle text-text;
}
.sw-btn--ghost:not(:disabled):hover {
  @apply bg-surface-hover;
}

.sw-btn--plain {
  @apply bg-transparent text-text;
}
.sw-btn--plain:not(:disabled):hover {
  @apply bg-surface-subtle;
}

.sw-btn--danger {
  @apply bg-danger text-neutral-0;
}
.sw-btn--danger:not(:disabled):hover {
  @apply bg-danger-dark;
}
</style>
