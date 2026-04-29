<script setup lang="ts">
import { computed } from 'vue';
import {
  SegmentGroupRoot,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemText,
  SegmentGroupItemHiddenInput,
} from '@ark-ui/vue';
import SwIcon from '../display/SwIcon.vue';

export interface SwSelectButtonOption {
  value: string;
  label?: string;
  icon?: string;
  disabled?: boolean;
}

interface Props {
  modelValue: string | null;
  options: SwSelectButtonOption[];
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  deselectable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  disabled: false,
  deselectable: false,
});

const emit = defineEmits<{ 'update:modelValue': [string | null] }>();

const ICON_SIZES: Record<string, number> = { sm: 12, md: 14, lg: 16 };
const iconSize = computed(() => ICON_SIZES[props.size] ?? 14);

const onValueUpdate = (eventValue: string | null) => {
  emit('update:modelValue', eventValue);
};

const handleItemClick = (opt: SwSelectButtonOption, event: MouseEvent) => {
  if (props.deselectable && props.modelValue === opt.value) {
    event.preventDefault();
    emit('update:modelValue', null);
  }
};
</script>

<template>
  <SegmentGroupRoot
    class="sw-select-button"
    :class="`sw-select-button--${size}`"
    :model-value="modelValue ?? ''"
    :disabled="disabled"
    @update:model-value="onValueUpdate"
  >
    <SegmentGroupIndicator
      class="sw-select-button__indicator"
      :class="{ 'sw-select-button__indicator--hidden': modelValue == null }"
    />
    <SegmentGroupItem
      v-for="opt in options"
      :key="opt.value"
      :value="opt.value"
      :disabled="opt.disabled"
      class="sw-select-button__item"
      :class="{ 'sw-select-button__item--icon-only': opt.icon && !opt.label }"
      @click="handleItemClick(opt, $event)"
    >
      <SwIcon v-if="opt.icon" :name="opt.icon" :size="iconSize" />
      <SegmentGroupItemText v-if="opt.label">{{ opt.label }}</SegmentGroupItemText>
      <SegmentGroupItemHiddenInput @click.stop />
    </SegmentGroupItem>
  </SegmentGroupRoot>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-select-button {
  @apply relative inline-flex items-center gap-0.5 p-1 rounded-lg bg-surface-subtle;
}

.sw-select-button__indicator {
  @apply absolute rounded-md bg-surface shadow-sm border border-border;
  width: var(--width);
  height: var(--height);
  top: var(--top);
  left: var(--left);
  transition-property: width, height, left, top;
  transition-duration: 150ms;
  transition-timing-function: ease-out;
}

.sw-select-button__indicator--hidden {
  @apply opacity-0 pointer-events-none;
}

.sw-select-button__item {
  @apply relative z-10 inline-flex items-center justify-center gap-1.5
         font-medium cursor-pointer select-none rounded-md
         text-text-muted transition-colors duration-150
         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus;
}

.sw-select-button__item[data-state='checked'] {
  @apply text-text;
}

.sw-select-button[data-disabled] .sw-select-button__item,
.sw-select-button__item[data-disabled] {
  @apply opacity-50 cursor-not-allowed;
}

/* ---- Sizes ---- */
.sw-select-button--sm .sw-select-button__item {
  @apply h-6 px-2 text-xs;
}

.sw-select-button--md .sw-select-button__item {
  @apply h-7 px-2.5 text-sm;
}

.sw-select-button--lg .sw-select-button__item {
  @apply h-8 px-3 text-sm;
}

/* ---- Icon-only: square aspect ---- */
.sw-select-button--sm .sw-select-button__item--icon-only {
  @apply w-6 px-0;
}

.sw-select-button--md .sw-select-button__item--icon-only {
  @apply w-7 px-0;
}

.sw-select-button--lg .sw-select-button__item--icon-only {
  @apply w-8 px-0;
}
</style>
