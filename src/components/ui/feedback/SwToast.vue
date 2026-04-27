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
        <SwIcon
          :name="ICON_MAP[toast.type ?? 'info'] ?? 'info'"
          :size="20"
          class="sw-toast__icon"
        />

        <div class="sw-toast__body">
          <p class="sw-toast__title">{{ toast.title }}</p>
          <p v-if="toast.description" class="sw-toast__description">{{ toast.description }}</p>
        </div>

        <div class="sw-toast__actions">
          <!-- Action toast: text button + close -->
          <template v-if="toast.meta?.action">
            <button class="sw-toast__action" @click="toast.meta.action.onClick()">
              {{ toast.meta.action.label }}
            </button>
            <ToastCloseTrigger class="sw-toast__close">
              <SwIcon name="x" :size="14" />
            </ToastCloseTrigger>
          </template>

          <!-- Default: countdown ring acts as close -->
          <SwToastRing
            v-else
            :duration="toast.duration ?? DURATIONS[toast.type ?? 'info'] ?? 5000"
            :variant="toast.type ?? 'info'"
            @close="toaster.dismiss(toast.id)"
          />
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
  @apply relative flex items-center gap-3 px-3 py-3
         border rounded-xl overflow-hidden shadow-lg;

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

/* ---- Per-variant card backgrounds and borders ---- */
.sw-toast--success {
  background: var(--success-subtle);
  border-color: color-mix(in srgb, var(--success) 30%, transparent);
}
.sw-toast--warning {
  background: var(--warning-subtle);
  border-color: color-mix(in srgb, var(--warning) 30%, transparent);
}
.sw-toast--error {
  background: var(--danger-subtle);
  border-color: color-mix(in srgb, var(--danger) 30%, transparent);
}
.sw-toast--info {
  background: color-mix(in srgb, var(--primary-400) 10%, var(--surface-strong));
  border-color: color-mix(in srgb, var(--primary-400) 30%, transparent);
}

/* ---- Icon ---- */
.sw-toast__icon {
  @apply shrink-0;
}

.sw-toast--success .sw-toast__icon {
  color: var(--success-strong);
}
.sw-toast--warning .sw-toast__icon {
  color: var(--warning-strong);
}
.sw-toast--error .sw-toast__icon {
  color: var(--danger-strong);
}
.sw-toast--info .sw-toast__icon {
  @apply text-primary-400;
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
  color: var(--success-strong);
}
.sw-toast--info .sw-toast__action {
  @apply text-primary-400;
}
.sw-toast--warning .sw-toast__action {
  color: var(--warning-strong);
}
.sw-toast--error .sw-toast__action {
  color: var(--danger-strong);
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

/* ---- Ring track tint to match card ---- */
.sw-toast--success .sw-toast__ring-track {
  stroke: color-mix(in srgb, var(--success) 25%, transparent);
}
.sw-toast--warning .sw-toast__ring-track {
  stroke: color-mix(in srgb, var(--warning) 25%, transparent);
}
.sw-toast--error .sw-toast__ring-track {
  stroke: color-mix(in srgb, var(--danger) 25%, transparent);
}
.sw-toast--info .sw-toast__ring-track {
  stroke: color-mix(in srgb, var(--primary-400) 25%, transparent);
}
</style>
