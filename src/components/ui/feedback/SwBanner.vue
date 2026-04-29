<script setup lang="ts">
import SwIcon from '../display/SwIcon.vue';
import { computed } from 'vue';

interface Props {
  variant?: 'announcement' | 'info' | 'success' | 'warning' | 'danger';
  title: string;
  description?: string;
  icon?: string;
  dismissible?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'info',
  description: undefined,
  icon: undefined,
  dismissible: false,
});

const emit = defineEmits<{ dismiss: [] }>();

const DEFAULT_ICONS: Record<string, string> = {
  announcement: 'megaphone',
  info: 'info',
  success: 'circle-check',
  warning: 'triangle-alert',
  danger: 'circle-alert',
};

const resolvedIcon = computed(() => props.icon ?? DEFAULT_ICONS[props.variant]);
</script>

<template>
  <div :class="['sw-banner', `sw-banner--${variant}`]" role="status">
    <SwIcon :name="resolvedIcon!" :size="16" class="sw-banner__icon" aria-hidden="true" />

    <p class="sw-banner__body">
      <strong class="sw-banner__title">{{ title }}</strong>
      <span v-if="description" class="sw-banner__description"> {{ description }}</span>
      <slot />
    </p>

    <button
      v-if="dismissible"
      class="sw-banner__close"
      aria-label="Dismiss"
      @click="emit('dismiss')"
    >
      <SwIcon name="x" :size="14" />
    </button>
  </div>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-banner {
  @apply flex items-center gap-3 px-4 py-3 rounded-xl border text-sm;
}

.sw-banner__icon {
  @apply shrink-0;
}

.sw-banner__body {
  @apply flex-1 min-w-0 leading-snug;
}

.sw-banner__title {
  @apply font-semibold mr-1;
}

.sw-banner__close {
  @apply shrink-0 flex items-center justify-center w-6 h-6 rounded-md
         opacity-60 cursor-pointer transition-opacity duration-150;
  color: currentColor;
}

.sw-banner__close:hover {
  @apply opacity-100;
}

/* ---- Announcement ---- */
.sw-banner--announcement {
  @apply border-transparent rounded-none;
  background: var(--color-primary);
  color: var(--text-on-primary);
}

.sw-banner--announcement .sw-banner__description {
  @apply opacity-90;
}

/* ---- Info ---- */
.sw-banner--info {
  background: color-mix(in srgb, var(--color-primary) 12%, var(--surface));
  border-color: color-mix(in srgb, var(--color-primary) 25%, transparent);
}

.sw-banner--info .sw-banner__icon,
.sw-banner--info .sw-banner__title {
  color: var(--color-primary);
}

.sw-banner--info .sw-banner__description {
  color: var(--text-muted);
}

/* ---- Success ---- */
.sw-banner--success {
  background: var(--success-subtle);
  border-color: color-mix(in srgb, var(--success) 30%, transparent);
}

.sw-banner--success .sw-banner__icon,
.sw-banner--success .sw-banner__title {
  color: var(--success-strong);
}

.sw-banner--success .sw-banner__description {
  color: color-mix(in srgb, var(--success-strong) 80%, transparent);
}

/* ---- Warning ---- */
.sw-banner--warning {
  background: var(--warning-subtle);
  border-color: color-mix(in srgb, var(--warning) 30%, transparent);
}

.sw-banner--warning .sw-banner__icon,
.sw-banner--warning .sw-banner__title {
  color: var(--warning-strong);
}

.sw-banner--warning .sw-banner__description {
  color: color-mix(in srgb, var(--warning-strong) 80%, transparent);
}

/* ---- Danger ---- */
.sw-banner--danger {
  background: var(--danger-subtle);
  border-color: color-mix(in srgb, var(--danger) 30%, transparent);
}

.sw-banner--danger .sw-banner__icon,
.sw-banner--danger .sw-banner__title {
  color: var(--danger-strong);
}

.sw-banner--danger .sw-banner__description {
  color: color-mix(in srgb, var(--danger-strong) 80%, transparent);
}
</style>
