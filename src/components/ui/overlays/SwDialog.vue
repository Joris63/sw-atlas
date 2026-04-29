<script setup lang="ts">
import { computed } from 'vue';
import {
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
} from '@ark-ui/vue';
import SwIcon from '../display/SwIcon.vue';
import SwIconButton from '../buttons/SwIconButton.vue';

interface Props {
  open: boolean;
  title: string;
  description?: string;
  variant?: 'default' | 'danger' | 'warning' | 'info';
  width?: 'sm' | 'md' | 'lg' | (string & {});
  loading?: boolean;
  persistent?: boolean;
  lazy?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  description: undefined,
  variant: 'default',
  width: 'md',
  loading: false,
  persistent: false,
  lazy: true,
});

const emit = defineEmits<{ 'update:open': [boolean] }>();

const PRESET_WIDTHS = ['sm', 'md', 'lg'] as const;

const isPresetWidth = computed(() =>
  (PRESET_WIDTHS as readonly string[]).includes(props.width ?? 'md'),
);

const ICON_MAP: Record<string, string> = {
  danger: 'triangle-alert',
  warning: 'triangle-alert',
  info: 'info',
  default: 'circle',
};
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
    <slot name="trigger" />

    <Teleport to="#sw-portal">
      <DialogBackdrop class="sw-dialog__backdrop" />
      <DialogPositioner class="sw-dialog__positioner">
        <DialogContent
          :class="['sw-dialog__content', isPresetWidth ? `sw-dialog__content--${props.width}` : null]"
          :style="!isPresetWidth ? { maxWidth: props.width } : undefined"
        >
          <header class="sw-dialog__header" :class="description ? 'items-start' : 'items-center'">
            <div class="sw-dialog__header-title">
              <div
                v-if="variant !== 'default' && ICON_MAP[variant]"
                :class="['sw-dialog__icon', `sw-dialog__icon--${variant}`]"
              >
                <SwIcon :name="ICON_MAP[variant]!" :size="20" />
              </div>

              <div class="sw-dialog__heading">
                <DialogTitle class="sw-dialog__title">{{ title }}</DialogTitle>
                <DialogDescription v-if="description" class="sw-dialog__description">
                  {{ description }}
                </DialogDescription>
              </div>
            </div>

            <div class="sw-dialog__header-actions">
              <DialogCloseTrigger as-child>
                <SwIconButton
                  label="Close"
                  icon="x"
                  variant="plain"
                  size="xs"
                  :disabled="persistent"
                />
              </DialogCloseTrigger>
            </div>
          </header>

          <div v-if="$slots.default" class="sw-dialog__body">
            <slot />
          </div>

          <footer v-if="$slots.footer" class="sw-dialog__footer">
            <slot name="footer" />
          </footer>
        </DialogContent>
      </DialogPositioner>
    </Teleport>
  </DialogRoot>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

/* ---- Backdrop ---- */
.sw-dialog__backdrop {
  @apply fixed inset-0;
  z-index: 9000;
  background: rgba(0, 0, 0, 0.45);
}

.sw-dialog__backdrop[data-state='open'] {
  animation: sw-dialog-backdrop-in 0.18s ease-out;
}

.sw-dialog__backdrop[data-state='closed'] {
  animation: sw-dialog-backdrop-out 0.14s ease-in;
}

/* ---- Positioner ---- */
.sw-dialog__positioner {
  @apply fixed inset-0 flex items-center justify-center pointer-events-none;
  z-index: 9001;
  padding: 1rem;
}

/* ---- Content ---- */
.sw-dialog__content {
  @apply relative pointer-events-auto flex flex-col
         bg-surface rounded-2xl shadow-xl outline-none
         w-full overflow-hidden;
}

.sw-dialog__content--sm { max-width: 22rem; }
.sw-dialog__content--md { max-width: 28rem; }
.sw-dialog__content--lg { max-width: 36rem; }

.sw-dialog__content[data-state='open'] {
  animation: sw-dialog-content-in 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.sw-dialog__content[data-state='closed'] {
  animation: sw-dialog-content-out 0.15s ease-in;
}

/* ---- Header ---- */
.sw-dialog__header {
  @apply flex justify-between gap-3 px-6 pt-6;
}

.sw-dialog__header-title {
  @apply flex items-center gap-4;
}

.sw-dialog__header-actions {
  @apply flex items-center shrink-0;
}

.sw-dialog__icon {
  @apply flex items-center justify-center shrink-0 w-10 h-10 rounded-full;
}

.sw-dialog__icon--danger {
  background: var(--danger-subtle);
  color: var(--danger);
}

.sw-dialog__icon--warning {
  background: var(--warning-subtle);
  color: var(--warning);
}

.sw-dialog__icon--info {
  @apply bg-primary-100 text-primary-600;
}

.sw-dialog__heading {
  @apply flex flex-col gap-1 flex-1 min-w-0;
}

.sw-dialog__title {
  @apply text-base font-semibold text-text leading-none;
}

.sw-dialog__description {
  @apply text-sm text-text-muted leading-snug;
}

/* ---- Body ---- */
.sw-dialog__body {
  @apply text-sm text-text-muted p-6;
}

/* ---- Confirm section ---- */
.sw-dialog__confirm {
  @apply mt-4 flex flex-col gap-2;
}

.sw-dialog__confirm-label {
  @apply text-sm text-text;
}

/* ---- Footer ---- */
.sw-dialog__footer {
  @apply flex items-center justify-end gap-2 py-4 px-6 border-t border-border;
}

/* ---- Animations ---- */
@keyframes sw-dialog-backdrop-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes sw-dialog-backdrop-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes sw-dialog-content-in {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(6px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes sw-dialog-content-out {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.97) translateY(3px);
  }
}
</style>
