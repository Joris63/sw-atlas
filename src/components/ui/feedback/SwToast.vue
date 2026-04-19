<script setup lang="ts">
import { Toaster, ToastRoot, ToastCloseTrigger } from '@ark-ui/vue';
import { toaster } from '@/composables/useToast';
import SwIcon from '../SwIcon.vue';
import SwToastRing from './SwToastRing.vue';

const ICON_MAP: Record<string, string> = {
  success: 'circle-check',
  error: 'circle-x',
  warning: 'triangle-alert',
  info: 'info',
  loading: 'loader',
};

// Match zag-js defaults exactly
const DURATIONS: Record<string, number> = {
  success: 2000,
  info: 5000,
  warning: 5000,
  error: 5000,
};
</script>

<template>
  <Toaster :toaster="toaster" class="sw-toaster">
    <template #default="toast">
      <ToastRoot :class="['sw-toast', `sw-toast--${toast.type ?? 'info'}`]">
        <span class="sw-toast__stripe" />

        <SwIcon
          :name="ICON_MAP[toast.type ?? 'info'] ?? 'info'"
          :size="18"
          class="sw-toast__icon"
        />

        <div class="sw-toast__body">
          <p class="sw-toast__title">{{ toast.title }}</p>
          <p v-if="toast.description" class="sw-toast__description">{{ toast.description }}</p>
        </div>

        <div class="sw-toast__actions">
          <!-- Action toast: text button only -->
          <button
            v-if="toast.meta?.action"
            class="sw-toast__action"
            @click="toast.meta.action.onClick()"
          >
            {{ toast.meta.action.label }}
          </button>

          <!-- Default: countdown ring + close -->
          <template v-else>
            <SwToastRing
              :duration="toast.duration ?? DURATIONS[toast.type ?? 'info'] ?? 5000"
              :variant="toast.type ?? 'info'"
            />

            <ToastCloseTrigger class="sw-toast__close">
              <SwIcon name="x" :size="14" />
            </ToastCloseTrigger>
          </template>
        </div>
      </ToastRoot>
    </template>
  </Toaster>
</template>

<style>
@reference "@/styles/tailwind.css";

.sw-toaster {
  @apply w-[22rem];
}

/* ---- Toast card ---- */
.sw-toast {
  @apply relative flex items-center gap-3 pl-4 pr-3 py-3.5
         bg-surface-strong border border-border rounded-xl
         overflow-hidden shadow-lg;

  /* Ark UI drives stacking via these CSS vars on each item */
  translate: var(--x) var(--y);
  scale: var(--scale);
  z-index: var(--z-index);
  height: var(--height);
  opacity: var(--opacity);
  will-change: translate, opacity, scale;

  transition:
    translate 400ms,
    scale 400ms,
    opacity 400ms,
    height 400ms;
  transition-timing-function: cubic-bezier(0.21, 1.02, 0.73, 1);
}

.sw-toast[data-state='closed'] {
  transition:
    translate 400ms,
    scale 400ms,
    opacity 200ms;
  transition-timing-function: cubic-bezier(0.06, 0.71, 0.55, 1);
}

/* ---- Colored left stripe ---- */
.sw-toast__stripe {
  @apply absolute left-0 top-0 bottom-0 w-1 rounded-l-xl;
}

.sw-toast--success .sw-toast__stripe {
  @apply bg-success;
}
.sw-toast--info .sw-toast__stripe {
  @apply bg-primary-400;
}
.sw-toast--warning .sw-toast__stripe {
  @apply bg-warning;
}
.sw-toast--error .sw-toast__stripe {
  @apply bg-danger;
}

/* ---- Icon ---- */
.sw-toast__icon {
  @apply shrink-0;
}

.sw-toast--success .sw-toast__icon {
  @apply text-success;
}
.sw-toast--info .sw-toast__icon {
  @apply text-primary-400;
}
.sw-toast--warning .sw-toast__icon {
  @apply text-warning;
}
.sw-toast--error .sw-toast__icon {
  @apply text-danger;
}

/* ---- Body ---- */
.sw-toast__body {
  @apply flex flex-col gap-0.5 flex-1 min-w-0;
}

.sw-toast__title {
  @apply text-sm font-semibold text-text leading-snug;
}

.sw-toast__description {
  @apply text-xs text-text-muted leading-snug;
}

/* ---- Actions ---- */
.sw-toast__actions {
  @apply flex items-center gap-1.5 shrink-0;
}

.sw-toast__action {
  @apply text-sm font-semibold cursor-pointer transition-opacity duration-150;
}

.sw-toast--success .sw-toast__action {
  @apply text-success;
}
.sw-toast--info .sw-toast__action {
  @apply text-primary-400;
}
.sw-toast--warning .sw-toast__action {
  @apply text-warning;
}
.sw-toast--error .sw-toast__action {
  @apply text-danger;
}

.sw-toast__action:hover {
  @apply opacity-70;
}

.sw-toast__close {
  @apply flex items-center justify-center w-6 h-6 rounded-md text-text-muted
         transition-colors duration-150 cursor-pointer;
}

.sw-toast__close:hover {
  @apply bg-surface-hover text-text;
}
</style>
