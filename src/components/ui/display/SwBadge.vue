<script setup lang="ts">
import { computed, type Component } from 'vue';
import SwIcon from './SwIcon.vue';

interface Props {
  variant?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  dot?: boolean;
  animated?: boolean;
  icon?: string;
  as?: string | Component;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'neutral',
  size: 'md',
  as: 'span',
  icon: undefined,
});

const iconSize = computed(() => (props.size === 'sm' ? 10 : 12));
const isInteractive = computed(() => props.as !== 'span');
</script>

<template>
  <component
    :is="as"
    class="sw-badge"
    :class="[
      `sw-badge--${variant}`,
      `sw-badge--${size}`,
      { 'sw-badge--interactive': isInteractive },
    ]"
  >
    <span v-if="dot" class="sw-badge__dot" :class="{ 'sw-badge__dot--animated': animated }" />
    <SwIcon v-if="icon" class="sw-badge__icon" :name="icon" :size="iconSize" aria-hidden="true" />
    <slot />
  </component>
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
  background: color-mix(in srgb, var(--color-primary) 15%, var(--surface));
  @apply text-primary;
}

.sw-badge--success {
  @apply bg-success-subtle text-success-strong;
}

.sw-badge--warning {
  @apply bg-warning-subtle text-warning-strong;
}

.sw-badge--danger {
  @apply bg-danger-subtle text-danger-strong;
}

/* ---- Interactive state (as="button" / as="a") ---- */
.sw-badge--interactive {
  @apply cursor-pointer transition-opacity duration-150
         focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-border-focus;
}

.sw-badge--interactive:hover {
  @apply opacity-75;
}

/* ---- Dot indicator ---- */
.sw-badge__dot {
  @apply w-1.5 h-1.5 rounded-full bg-current shrink-0;
}

@keyframes badge-pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(0.75);
  }
}

.sw-badge__dot--animated {
  animation: badge-pulse 1.5s ease-in-out infinite;
}
</style>
