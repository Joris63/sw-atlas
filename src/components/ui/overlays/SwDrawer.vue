<script setup lang="ts">
import {
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
} from '@ark-ui/vue';
import { computed } from 'vue';
import SwIcon from '../SwIcon.vue';

const PRESET_WIDTHS = ['sm', 'md', 'lg'] as const;

interface Props {
  open: boolean;
  title?: string;
  description?: string;
  side?: 'right' | 'left';
  width?: 'sm' | 'md' | 'lg' | (string & {});
  persistent?: boolean;
  lazy?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  side: 'right',
  width: 'md',
  persistent: false,
  lazy: true,
});

const emit = defineEmits<{ 'update:open': [boolean] }>();

const isPresetWidth = computed(() =>
  (PRESET_WIDTHS as readonly string[]).includes(props.width ?? 'md'),
);
</script>

<template>
  <DialogRoot
    :open="open"
    :lazy-mount="lazy"
    :unmount-on-exit="lazy"
    :close-on-interact-outside="!persistent"
    :close-on-escape="!persistent"
    @open-change="emit('update:open', $event.open)"
  >
    <Teleport to="#sw-portal">
      <DialogBackdrop class="sw-drawer__backdrop" />
      <DialogPositioner :class="['sw-drawer__positioner', `sw-drawer__positioner--${side}`]">
        <DialogContent
          :class="[
            'sw-drawer__content',
            isPresetWidth ? `sw-drawer__content--${width}` : null,
            `sw-drawer__content--${side}`,
          ]"
          :style="!isPresetWidth ? { width } : undefined"
        >
          <header class="sw-drawer__header">
            <div class="sw-drawer__header-title">
              <DialogTitle v-if="title || $slots.title" class="sw-drawer__title">
                <slot name="title">{{ title }}</slot>
              </DialogTitle>
              <DialogDescription v-if="description" class="sw-drawer__description">
                {{ description }}
              </DialogDescription>
            </div>
            <div class="sw-drawer__header-actions">
              <slot name="header-actions" />
              <DialogCloseTrigger class="sw-drawer__close">
                <SwIcon name="x" :size="16" />
              </DialogCloseTrigger>
            </div>
          </header>

          <div class="sw-drawer__body">
            <slot />
          </div>

          <footer v-if="$slots.footer" class="sw-drawer__footer">
            <slot name="footer" />
          </footer>
        </DialogContent>
      </DialogPositioner>
    </Teleport>
  </DialogRoot>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-drawer__content--sm {
  @apply w-80;
}
.sw-drawer__content--md {
  @apply w-96;
}
.sw-drawer__content--lg {
  @apply w-lg;
}

.sw-drawer__header {
  @apply flex items-start justify-between gap-3
         px-5 py-4 border-b border-border shrink-0;
}

.sw-drawer__header-title {
  @apply flex flex-col gap-1 min-w-0;
}

.sw-drawer__title {
  @apply text-base font-semibold text-text leading-none;
}

.sw-drawer__description {
  @apply text-sm text-text-muted leading-snug;
}

.sw-drawer__header-actions {
  @apply flex items-center gap-1 shrink-0;
}

.sw-drawer__close {
  @apply flex items-center justify-center w-7 h-7 rounded-md
         text-text-muted cursor-pointer
         hover:bg-surface-hover hover:text-text
         transition-colors duration-150;
}

.sw-drawer__body {
  @apply flex-1 overflow-y-auto px-5 py-4;
}

.sw-drawer__footer {
  @apply flex items-center justify-end gap-2
         px-5 py-4 border-t border-border shrink-0;
}

.sw-drawer__backdrop {
  @apply fixed inset-0;
  z-index: 9000;
  background: rgba(0, 0, 0, 0.4);
}

.sw-drawer__backdrop[data-state='open'] {
  animation: sw-drawer-backdrop-in 0.2s ease-out;
}

.sw-drawer__backdrop[data-state='closed'] {
  animation: sw-drawer-backdrop-out 0.15s ease-in;
}

.sw-drawer__positioner {
  @apply fixed inset-0 pointer-events-none flex;
  z-index: 9001;
}

.sw-drawer__positioner--right {
  @apply justify-end;
}
.sw-drawer__positioner--left {
  @apply justify-start;
}

.sw-drawer__content {
  @apply pointer-events-auto flex flex-col h-full bg-surface overflow-hidden outline-none;
}

.sw-drawer__content--right {
  @apply border-l border-border;
}

.sw-drawer__content--left {
  @apply border-r border-border;
}

.sw-drawer__content--right[data-state='open'] {
  animation: sw-drawer-slide-in-right 0.22s cubic-bezier(0.4, 0, 0.2, 1);
}

.sw-drawer__content--right[data-state='closed'] {
  animation: sw-drawer-slide-out-right 0.18s ease-in;
}

.sw-drawer__content--left[data-state='open'] {
  animation: sw-drawer-slide-in-left 0.22s cubic-bezier(0.4, 0, 0.2, 1);
}

.sw-drawer__content--left[data-state='closed'] {
  animation: sw-drawer-slide-out-left 0.18s ease-in;
}

@keyframes sw-drawer-backdrop-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes sw-drawer-backdrop-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes sw-drawer-slide-in-right {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

@keyframes sw-drawer-slide-out-right {
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
}

@keyframes sw-drawer-slide-in-left {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

@keyframes sw-drawer-slide-out-left {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}
</style>
