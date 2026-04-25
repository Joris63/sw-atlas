<script setup lang="ts">
import { computed, type Component } from 'vue';
import SwIcon from '../SwIcon.vue';

interface Props {
  label: string;
  variant?: 'primary' | 'outline' | 'ghost' | 'plain' | 'danger';
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg';
  as?: string | Component;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  iconLeft?: string;
  iconRight?: string;
  block?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  as: 'button',
  type: 'button',
  loadingText: undefined,
  iconLeft: undefined,
  iconRight: undefined,
  block: false,
});

const iconSize = computed(() => (props.size === '2xs' || props.size === 'xs' ? 12 : 16));
</script>

<template>
  <component
    :is="as"
    class="sw-button"
    :class="[
      `sw-button--${variant}`,
      `sw-button--${size}`,
      { 'sw-button--loading': loading, 'sw-button--block': block },
    ]"
    :type="as === 'button' ? type : undefined"
    :disabled="as === 'button' ? disabled || loading : undefined"
  >
    <SwIcon
      v-if="loading"
      name="loader-2"
      :size="iconSize"
      class="sw-button__spinner"
      aria-hidden="true"
    />

    <span v-if="!loading && (iconLeft || $slots['icon-left'])" class="sw-button__icon">
      <SwIcon v-if="iconLeft" :name="iconLeft" :size="iconSize" />
      <slot v-else name="icon-left" />
    </span>

    {{ loading && loadingText ? loadingText : label }}

    <span v-if="!loading && (iconRight || $slots['icon-right'])" class="sw-button__icon">
      <SwIcon v-if="iconRight" :name="iconRight" :size="iconSize" />
      <slot v-else name="icon-right" />
    </span>
  </component>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-button {
  @apply inline-flex items-center justify-center gap-2
         font-medium rounded-lg cursor-pointer select-none
         border border-transparent
         transition-all duration-150 whitespace-nowrap
         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus
         disabled:opacity-50 disabled:cursor-not-allowed;
}

.sw-button__icon {
  @apply flex items-center shrink-0;
}

.sw-button__spinner {
  @apply animate-spin shrink-0;
}

.sw-button--loading {
  @apply cursor-wait;
}

.sw-button--block {
  @apply w-full;
}

/* --- Sizes --- */
.sw-button--2xs {
  @apply h-6 px-1.5 text-xs gap-1;
}
.sw-button--xs {
  @apply h-7 px-2 text-xs gap-1;
}
.sw-button--sm {
  @apply h-8 px-3 text-sm gap-1.5;
}
.sw-button--md {
  @apply h-9 px-4 text-sm;
}
.sw-button--lg {
  @apply h-10 px-5 text-base;
}

/* --- Variants --- */
.sw-button--primary {
  @apply bg-primary text-text-on-primary;
}
.sw-button--primary:not(:disabled):hover {
  @apply bg-primary-hover;
}

.sw-button--outline {
  @apply bg-surface border border-border-strong text-text;
}
.sw-button--outline:not(:disabled):hover {
  @apply bg-surface-subtle;
}

.sw-button--ghost {
  @apply bg-surface-subtle text-text;
}
.sw-button--ghost:not(:disabled):hover {
  @apply bg-surface-hover;
}

.sw-button--plain {
  @apply bg-transparent text-text;
}
.sw-button--plain:not(:disabled):hover {
  @apply bg-surface-subtle;
}

.sw-button--danger {
  @apply bg-danger text-neutral-0;
}
.sw-button--danger:not(:disabled):hover {
  @apply bg-danger-hover;
}
</style>
