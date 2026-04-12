<script setup lang="ts">
import { computed } from 'vue'
import SwIcon from './SwIcon.vue'

interface Props {
  variant?: 'primary' | 'outline' | 'ghost' | 'plain' | 'danger'
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg'
  as?: string
  disabled?: boolean
  loading?: boolean
  rounded?: boolean
  label: string
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  as: 'button',
})

const iconSize = computed(() => {
  const map: Record<string, number> = { '2xs': 12, xs: 14, sm: 16, md: 18, lg: 20 }
  return map[props.size]
})
</script>

<template>
  <component
    :is="as"
    class="sw-icon-btn"
    :class="[
      `sw-icon-btn--${variant}`,
      `sw-icon-btn--${size}`,
      { 'sw-icon-btn--loading': loading, 'sw-icon-btn--rounded': rounded },
    ]"
    :disabled="as === 'button' ? disabled || loading : undefined"
    :aria-label="label"
  >
    <SwIcon
      v-if="loading"
      name="loader-2"
      :size="iconSize"
      class="sw-icon-btn__spinner"
      aria-hidden="true"
    />

    <template v-else>
      <SwIcon v-if="icon" :name="icon" :size="iconSize" />
      <slot v-else />
    </template>
  </component>
</template>

<style scoped>
@reference "../../styles/tailwind.css";

.sw-icon-btn {
  @apply inline-flex items-center justify-center shrink-0
         cursor-pointer select-none rounded-lg
         transition-colors duration-150
         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus
         disabled:opacity-50 disabled:cursor-not-allowed;
}

.sw-icon-btn__spinner {
  @apply animate-spin;
}

.sw-icon-btn--loading {
  @apply cursor-wait;
}
.sw-icon-btn--rounded {
  @apply rounded-full;
}

/* --- Sizes --- */
.sw-icon-btn--2xs {
  @apply size-6;
}
.sw-icon-btn--xs {
  @apply size-7;
}
.sw-icon-btn--sm {
  @apply size-8;
}
.sw-icon-btn--md {
  @apply size-9;
}
.sw-icon-btn--lg {
  @apply size-10;
}

/* --- Variants --- */
.sw-icon-btn--primary {
  @apply bg-primary text-text-on-primary;
}
.sw-icon-btn--primary:not(:disabled):hover {
  @apply bg-primary-hover;
}

.sw-icon-btn--outline {
  @apply bg-transparent border border-border-strong text-text;
}
.sw-icon-btn--outline:not(:disabled):hover {
  @apply bg-surface-subtle;
}

.sw-icon-btn--ghost {
  @apply bg-surface-subtle text-text;
}
.sw-icon-btn--ghost:not(:disabled):hover {
  @apply bg-surface-hover;
}

.sw-icon-btn--plain {
  @apply bg-transparent text-text;
}
.sw-icon-btn--plain:not(:disabled):hover {
  @apply bg-surface-subtle;
}

.sw-icon-btn--danger {
  @apply bg-danger text-neutral-0;
}
.sw-icon-btn--danger:not(:disabled):hover {
  @apply bg-danger-dark;
}
</style>
