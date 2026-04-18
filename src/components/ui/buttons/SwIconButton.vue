<script setup lang="ts">
import { computed } from 'vue';
import SwIcon from '../SwIcon.vue';

interface Props {
  variant?: 'primary' | 'outline' | 'ghost' | 'plain' | 'danger';
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg';
  as?: string;
  disabled?: boolean;
  loading?: boolean;
  rounded?: boolean;
  label: string;
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  as: 'button',
});

const iconSize = computed(() => {
  const map: Record<string, number> = { '2xs': 12, xs: 14, sm: 16, md: 18, lg: 20 };
  return map[props.size];
});
</script>

<template>
  <component
    :is="as"
    class="sw-icon-button"
    :class="[
      `sw-icon-button--${variant}`,
      `sw-icon-button--${size}`,
      { 'sw-icon-button--loading': loading, 'sw-icon-button--rounded': rounded },
    ]"
    :disabled="as === 'button' ? disabled || loading : undefined"
    :aria-label="label"
  >
    <SwIcon
      v-if="loading"
      name="loader-2"
      :size="iconSize"
      class="sw-icon-button__spinner"
      aria-hidden="true"
    />

    <template v-else>
      <SwIcon v-if="icon" :name="icon" :size="iconSize" />
      <slot v-else />
    </template>
  </component>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-icon-button {
  @apply inline-flex items-center justify-center shrink-0
         cursor-pointer select-none rounded-lg
         transition-all duration-150
         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus
         disabled:opacity-50 disabled:cursor-not-allowed;
}

.sw-icon-button__spinner {
  @apply animate-spin;
}

.sw-icon-button--loading {
  @apply cursor-wait;
}
.sw-icon-button--rounded {
  @apply rounded-full;
}

/* --- Sizes --- */
.sw-icon-button--2xs {
  @apply size-6;
}
.sw-icon-button--xs {
  @apply size-7;
}
.sw-icon-button--sm {
  @apply size-8;
}
.sw-icon-button--md {
  @apply size-9;
}
.sw-icon-button--lg {
  @apply size-10;
}

/* --- Variants --- */
.sw-icon-button--primary {
  @apply bg-primary text-text-on-primary;
}
.sw-icon-button--primary:not(:disabled):hover {
  @apply bg-primary-hover;
}

.sw-icon-button--outline {
  @apply bg-surface border border-border-strong text-text;
}
.sw-icon-button--outline:not(:disabled):hover {
  @apply bg-surface-subtle;
}

.sw-icon-button--ghost {
  @apply bg-surface-subtle text-text;
}
.sw-icon-button--ghost:not(:disabled):hover {
  @apply bg-surface-hover;
}

.sw-icon-button--plain {
  @apply bg-transparent text-text;
}
.sw-icon-button--plain:not(:disabled):hover {
  @apply bg-surface-subtle;
}

.sw-icon-button--danger {
  @apply bg-danger text-neutral-0;
}
.sw-icon-button--danger:not(:disabled):hover {
  @apply bg-danger-dark;
}
</style>
