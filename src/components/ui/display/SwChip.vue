<script setup lang="ts">
import { computed } from 'vue';
import SwIcon from './SwIcon.vue';

interface Props {
  variant?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  icon?: string;
  dot?: boolean;
  animated?: boolean;
  removable?: boolean;
  selectable?: boolean;
  selected?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'neutral',
  size: 'md',
  icon: undefined,
  dot: false,
  animated: false,
  removable: false,
  selectable: false,
  selected: false,
  disabled: false,
});

const emit = defineEmits<{
  remove: [];
  'update:selected': [boolean];
}>();

const tag = computed(() => (props.selectable ? 'button' : 'span'));
const iconSize = computed(() => (props.size === 'sm' ? 10 : 12));

function handleClick() {
  if (props.selectable && !props.disabled) {
    emit('update:selected', !props.selected);
  }
}
</script>

<template>
  <component
    :is="tag"
    class="sw-chip"
    :class="[
      `sw-chip--${variant}`,
      `sw-chip--${size}`,
      {
        'sw-chip--selectable': selectable,
        'sw-chip--selected': selected,
        'sw-chip--disabled': disabled,
      },
    ]"
    :disabled="selectable ? disabled : undefined"
    :type="selectable ? 'button' : undefined"
    @click="handleClick"
  >
    <SwIcon v-if="selected && selectable" name="check" :size="iconSize" class="sw-chip__icon" />
    <span v-else-if="dot" class="sw-chip__dot" :class="{ 'sw-chip__dot--animated': animated }" />
    <SwIcon v-else-if="icon" :name="icon" :size="iconSize" class="sw-chip__icon" />

    <slot />

    <button
      v-if="removable"
      type="button"
      class="sw-chip__remove"
      :disabled="disabled"
      aria-label="Remove"
      @click.stop="emit('remove')"
    >
      <SwIcon name="x" :size="iconSize" />
    </button>
  </component>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-chip {
  @apply inline-flex items-center font-medium rounded-full whitespace-nowrap select-none;
}

/* ---- Sizes ---- */
.sw-chip--sm {
  @apply h-5 px-2 gap-1 text-[11px];
}

.sw-chip--md {
  @apply h-6 px-2.5 gap-1.5 text-xs;
}

/* ---- Variants ---- */
.sw-chip--neutral {
  @apply bg-surface-subtle text-text-muted;
}

.sw-chip--primary {
  background: color-mix(in srgb, var(--color-primary) 15%, var(--surface));
  @apply text-primary;
}

.sw-chip--success {
  @apply bg-success-subtle text-success-strong;
}

.sw-chip--warning {
  @apply bg-warning-subtle text-warning-strong;
}

.sw-chip--danger {
  @apply bg-danger-subtle text-danger-strong;
}

/* ---- Selectable ---- */
.sw-chip--selectable {
  @apply cursor-pointer transition-all duration-150
         focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-border-focus;
}

.sw-chip--selectable:not(.sw-chip--selected):not(.sw-chip--disabled):hover {
  @apply opacity-80;
}

.sw-chip--selected.sw-chip--neutral {
  background: color-mix(in srgb, var(--color-primary) 15%, var(--surface));
  @apply text-primary;
}

.sw-chip--selected.sw-chip--primary {
  background: var(--color-primary);
  @apply text-text-on-primary;
}

.sw-chip--selected.sw-chip--success {
  background: var(--success);
  @apply text-neutral-0;
}

.sw-chip--selected.sw-chip--warning {
  background: var(--warning);
  @apply text-neutral-0;
}

.sw-chip--selected.sw-chip--danger {
  background: var(--danger);
  @apply text-neutral-0;
}

/* ---- Disabled ---- */
.sw-chip--disabled {
  @apply opacity-50 cursor-not-allowed;
}

/* ---- Dot ---- */
.sw-chip__dot {
  @apply w-1.5 h-1.5 rounded-full bg-current shrink-0;
}

@keyframes chip-pulse {
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

.sw-chip__dot--animated {
  animation: chip-pulse 1.5s ease-in-out infinite;
}

/* ---- Remove button ---- */
.sw-chip__remove {
  @apply -mr-1 flex items-center justify-center rounded-full
         opacity-60 transition-opacity duration-150 cursor-pointer;
}

.sw-chip__remove:not(:disabled):hover {
  @apply opacity-100;
}
</style>
